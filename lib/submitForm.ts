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
