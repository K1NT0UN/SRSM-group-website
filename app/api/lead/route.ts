import { NextRequest, NextResponse } from 'next/server'

// Leads are recorded via a Google Apps Script web app bound to the "Nisarga
// Leads" sheet. This replaced the old Google-Forms scrape, which silently
// stopped recording (Google tightened headless /formResponse submissions).
// The /exec URL is server-only (env var) so the endpoint can't be spammed.
const WEBAPP_URL = process.env.LEADS_WEBHOOK_URL

export async function POST(req: NextRequest) {
  const { form, data } = await req.json()

  if (!WEBAPP_URL) {
    console.error('[lead] LEADS_WEBHOOK_URL is not set')
    return NextResponse.json({ ok: false, error: 'not-configured' }, { status: 500 })
  }

  const d = (data ?? {}) as Record<string, string>
  const name = (d.name ?? '').trim()
  const mobile = (d.mobile ?? '').replace(/\D/g, '').slice(-10) // 10-digit national number
  if (!name || mobile.length !== 10) {
    return NextResponse.json({ ok: false, error: 'missing-fields' }, { status: 400 })
  }

  const payload = {
    name,
    mobile,
    email: (d.email ?? '').trim(),
    source: typeof form === 'string' ? form : 'website', // which button/flow it came from
  }

  let res: Response
  try {
    res = await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Apps Script 302-redirects to its googleusercontent echo *after* the row
      // is written; we don't need the echo body, just proof the script ran.
      redirect: 'manual',
    })
  } catch (err) {
    console.error('[lead] webhook network error:', err)
    return NextResponse.json({ ok: false, error: 'network' }, { status: 502 })
  }

  // Success = the script executed: 200 (JSON reply) or a 3xx to googleusercontent.
  // Either way the row has been appended. A 4xx/5xx means it genuinely failed.
  const ok = res.status >= 200 && res.status < 400
  console.log(`[lead] source=${payload.source} webhook status=${res.status} ok=${ok}`)
  if (!ok) return NextResponse.json({ ok: false, status: res.status }, { status: 502 })
  return NextResponse.json({ ok: true })
}
