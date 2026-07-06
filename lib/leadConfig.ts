// ─────────────────────────────────────────────────────────────────────────────
// Lead-capture configuration: Phone OTP (Firebase or MSG91) + Google Forms.
//
// 1. OTP provider: Firebase (client-side, current default) or MSG91 (server-side,
//    same setup as the SR Builders site). Set NEXT_PUBLIC_OTP_PROVIDER=msg91 and
//    add MSG91_AUTH_KEY + MSG91_TEMPLATE_ID once MSG91 is configured.
// 2. Google Form action URLs + field entry IDs are filled in below (these are
//    NOT secret — they live in the page source either way). Leads are submitted
//    through the /api/lead server proxy. Setup steps: see SETUP_LEADS_OTP.md.
// ─────────────────────────────────────────────────────────────────────────────

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
}

// Which OTP provider to use. 'msg91' once MSG91 keys are set; Firebase otherwise.
export type OtpProvider = 'firebase' | 'msg91'
export const otpProvider: OtpProvider =
  process.env.NEXT_PUBLIC_OTP_PROVIDER === 'msg91' ? 'msg91' : 'firebase'

// OTP is active when the chosen provider is configured.
export const otpEnabled =
  otpProvider === 'msg91' ? true : firebaseConfig.apiKey.length > 0

// Default country code for the mobile field.
export const COUNTRY_CODE = '+91'

// ── Google Forms ─────────────────────────────────────────────────────────────
// After creating each form: open it → ⋮ → "Get pre-filled link", fill dummy
// values, copy the link, and read the entry.XXXXX IDs from the URL. Paste them
// below. The action URL is the form's /viewform link with /viewform → /formResponse.
type FormConfig = {
  actionUrl: string
  fields: { name: string; mobile: string; email: string }
}

export const enquiryForm: FormConfig = {
  actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdB9VZaGPgvDJ1aM3h8VcgdHCUJwsP6zDZmbnIt3K0BLM2vnQ/formResponse',
  fields: {
    name: 'entry.1192273686',
    mobile: 'entry.896801780',
    email: 'entry.229658143',
  },
}

export const siteVisitForm: FormConfig = {
  actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdHF0fGjbSUQZS1HUoQbDKr86F9FIpuw_U9YIDxzHfzWtAMJA/formResponse',
  fields: {
    name: 'entry.1192273686',
    mobile: 'entry.896801780',
    email: 'entry.229658143',
  },
}

export function formConfigured(f: FormConfig) {
  return f.actionUrl.startsWith('http')
}

// ── Nisarga project forms (separate pipeline from the SRSM group forms above) ──
// Live Google Forms carried over from the SR Builders / Nisarga site so Nisarga
// brochure, enquiry and site-visit leads keep landing in their existing sheets —
// never mixed with the SRSM group's own enquiries. (Values are the live ones
// from the SR Builders /api/lead route, not secret.)
export type NisargaForm = { actionUrl: string; fields: Record<string, string> }

export const nisargaBrochureForm: NisargaForm = {
  actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfmvwbfQcxSJ_uKn6vl-kJnSbp8JkzKTUlRy5ZSFP0HkYibgw/formResponse',
  fields: { name: 'entry.1790036588', mobile: 'entry.1567757704', email: 'entry.1683077939' },
}

export const nisargaEnquiryForm: NisargaForm = {
  actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdhswMnIPbmRTTSg7ZLc8RaCQ36caYkUOwdFoA-D5Eeumn2Qw/formResponse',
  fields: { name: 'entry.1515255903', mobile: 'entry.1653291305', email: 'entry.850337073' },
}

export const nisargaSiteVisitForm: NisargaForm = {
  actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScJ74LMqHlUJiTRVEpk-W24esO9Ssa3HnDBWxZbUOuJxp3gPQ/formResponse',
  fields: { name: 'entry.1790036588', mobile: 'entry.1567757704', email: 'entry.1683077939', date1: 'entry.389006286', date2: 'entry.1376214177' },
}
