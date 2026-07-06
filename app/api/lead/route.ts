import { NextRequest, NextResponse } from 'next/server'
import { enquiryForm, siteVisitForm, nisargaBrochureForm, nisargaEnquiryForm, nisargaSiteVisitForm } from '@/lib/leadConfig'

// Server-side Google Forms proxy.
// Posting from the browser with `no-cors` silently drops submissions unless the
// fbzx/session fields are present — this route fetches them and posts reliably.

const FORMS = {
  enquiry: enquiryForm,
  siteVisit: siteVisitForm,
  // Nisarga project pipeline — separate Google Forms from the group ones above
  nisargaBrochure: nisargaBrochureForm,
  nisargaEnquiry: nisargaEnquiryForm,
  nisargaSiteVisit: nisargaSiteVisitForm,
}

async function getFbzx(viewUrl: string): Promise<string | null> {
  try {
    const html = await fetch(viewUrl).then(r => r.text())
    // Hidden input has the value (sometimes negative); use absolute value as Google Forms JS does
    const m = html.match(/name="fbzx"\s+value="-?(\d+)"/)
    if (m) return m[1]
    // Fallback: find large number (17-19 digits) repeated 3+ times in the page data
    const nums = html.match(/\d{17,19}/g) ?? []
    const counts: Record<string, number> = {}
    for (const n of nums) counts[n] = (counts[n] ?? 0) + 1
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
    return top ? top[0] : null
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  const { form, data } = await req.json()
  const config = FORMS[form as keyof typeof FORMS]
  if (!config) return NextResponse.json({ error: 'Unknown form' }, { status: 400 })
  if (!config.actionUrl.startsWith('http')) {
    return NextResponse.json({ error: 'Form not configured' }, { status: 500 })
  }

  const body = new URLSearchParams()
  for (const [key, entryId] of Object.entries(config.fields as Record<string, string>)) {
    let value = (data as Record<string, string>)[key]
    if (!value) continue
    // Google Forms rejects E.164 format — keep just the 10-digit national number.
    // (The old /^\+\d{1,3}/ was greedy and ate the mobile's first digit,
    //  e.g. +919000543635 -> 000543635, corrupting every lead.)
    if (key === 'mobile') value = value.replace(/\D/g, '').slice(-10)
    // Date fields (YYYY-MM-DD) must be split into _year/_month/_day parts
    if ((key === 'date1' || key === 'date2') && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split('-')
      body.append(`${entryId}_year`, year)
      body.append(`${entryId}_month`, month)
      body.append(`${entryId}_day`, day)
      continue
    }
    body.append(entryId, value)
  }

  // Google Forms requires these session fields to actually record the response
  const viewUrl = config.actionUrl.replace('formResponse', 'viewform')
  const fbzx = (await getFbzx(viewUrl)) ?? String(Math.floor(Math.random() * 9e18))
  body.append('fvv', '1')
  body.append('pageHistory', '0')
  body.append('fbzx', fbzx)
  body.append('partialResponse', JSON.stringify([null, null, fbzx]))
  body.append('submissionTimestamp', Date.now().toString())

  let res: Response
  try {
    res = await fetch(config.actionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
  } catch (err) {
    console.error('[lead] google submit network error:', err)
    return NextResponse.json({ ok: false, error: 'network' }, { status: 502 })
  }
  console.log(`[lead] form=${form} google status=${res.status}`)

  // Surface real failures instead of always returning 200 (was hiding dropped leads)
  if (!res.ok) {
    return NextResponse.json({ ok: false, status: res.status }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
