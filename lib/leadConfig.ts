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

// ── Get in touch — ONE working form for every lead ───────────────────────────
// Every lead surface (contact, brochure request, homepage invitation) records
// to the single verified Google Form — the "Brochure Download" form, the only
// sheet confirmed to be receiving entries. There is no separate site-visit
// form any more. Captures name + mobile + email.
export const GET_IN_TOUCH_FORM = {
  actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfmvwbfQcxSJ_uKn6vl-kJnSbp8JkzKTUlRy5ZSFP0HkYibgw/formResponse',
  fields: { name: 'entry.1790036588', mobile: 'entry.1567757704', email: 'entry.1683077939' },
}

export const enquiryForm: FormConfig = GET_IN_TOUCH_FORM
export const siteVisitForm: FormConfig = GET_IN_TOUCH_FORM

export function formConfigured(f: FormConfig) {
  return f.actionUrl.startsWith('http')
}

// ── Nisarga lead forms — all consolidated onto the one Get-in-touch form ──────
export type NisargaForm = { actionUrl: string; fields: Record<string, string> }

export const nisargaBrochureForm: NisargaForm = GET_IN_TOUCH_FORM
export const nisargaEnquiryForm: NisargaForm = GET_IN_TOUCH_FORM
export const nisargaSiteVisitForm: NisargaForm = GET_IN_TOUCH_FORM
