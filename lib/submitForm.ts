// Leads are posted through /api/lead — a server-side proxy that includes the
// Google Forms session fields (fbzx etc.) so submissions are reliably recorded.
// (Direct browser `no-cors` posts can silently drop responses.)

async function submitLead(form: string, data: Record<string, string | undefined>): Promise<void> {
  await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ form, data }),
  })
}

export async function submitEnquiry(data: { name: string; mobile: string; email?: string }): Promise<void> {
  await submitLead('enquiry', data)
}

export async function submitSiteVisit(data: { name: string; mobile: string; email?: string }): Promise<void> {
  await submitLead('siteVisit', data)
}

// ── Nisarga project leads (separate pipeline) ────────────────────────────────
// These THROW on failure so the UI can surface a real error for enquiry /
// site-visit (the brochure caller catches and downloads regardless).
async function postLead(form: string, data: Record<string, string | undefined>): Promise<Response> {
  return fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ form, data }),
  })
}

export async function submitBrochure(data: { name: string; mobile: string; email?: string }): Promise<void> {
  const res = await postLead('nisargaBrochure', data)
  if (!res.ok) throw new Error(`Brochure lead failed (${res.status})`)
}

export async function submitNisargaEnquiry(data: { name: string; mobile: string; email?: string }): Promise<void> {
  const res = await postLead('nisargaEnquiry', data)
  if (!res.ok) throw new Error(`Enquiry failed (${res.status})`)
}

export async function submitNisargaSiteVisit(data: { name: string; mobile: string; date1?: string; date2?: string }): Promise<void> {
  const res = await postLead('nisargaSiteVisit', data)
  if (!res.ok) throw new Error(`Site-visit failed (${res.status})`)
}
