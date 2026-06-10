'use client'

import { useState } from 'react'
import {
  COUNTRY_CODE,
  otpEnabled,
  enquiryForm,
  siteVisitForm,
  formConfigured,
} from '@/lib/leadConfig'
import { sendOtp, verifyOtp, resetOtp } from '@/lib/otp'
import { submitEnquiry, submitSiteVisit } from '@/lib/submitForm'

type Variant = 'enquiry' | 'siteVisit'

const RECAPTCHA_ID = 'recaptcha-container'

export default function LeadForm({ variant }: { variant: Variant }) {
  const form = variant === 'siteVisit' ? siteVisitForm : enquiryForm

  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')

  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [verified, setVerified] = useState(false)

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const tenDigits = mobile.replace(/\D/g, '').slice(-10)
  const mobileValid = tenDigits.length === 10
  const e164 = `${COUNTRY_CODE}${tenDigits}`

  async function handleSendOtp() {
    setError('')
    if (!name.trim()) return setError('Please enter your name.')
    if (!mobileValid) return setError('Enter a valid 10-digit mobile number.')
    setBusy(true)
    try {
      await sendOtp(e164, RECAPTCHA_ID)
      setOtpSent(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not send OTP. Try again.')
    } finally {
      setBusy(false)
    }
  }

  async function handleVerify() {
    setError('')
    setBusy(true)
    try {
      await verifyOtp(otpCode)
      setVerified(true)
    } catch {
      setError('Incorrect or expired code. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  async function handleSubmit() {
    setError('')
    if (!name.trim()) return setError('Please enter your name.')
    if (!mobileValid) return setError('Enter a valid 10-digit mobile number.')
    if (otpEnabled && !verified) return setError('Please verify your mobile number first.')
    setBusy(true)
    try {
      const payload = { name: name.trim(), mobile: e164, email: email.trim() || undefined }
      if (variant === 'siteVisit') await submitSiteVisit(payload)
      else await submitEnquiry(payload)
      setDone(true)
      resetOtp()
    } catch {
      setError('Something went wrong submitting. Please call us instead.')
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="bg-linen border border-gold/30 p-8 text-center">
        <p className="font-serif text-2xl text-forest mb-2">Thank you{name ? `, ${name.split(' ')[0]}` : ''}.</p>
        <p className="text-charcoal-light text-sm leading-relaxed">
          {variant === 'siteVisit'
            ? 'Your site-visit request has been received. Our team will call you shortly to confirm a time.'
            : 'Your enquiry has been received. We’ll get back to you within 24 hours.'}
        </p>
      </div>
    )
  }

  const inputCls =
    'w-full bg-parchment border border-gold/30 px-4 py-3 text-charcoal focus:outline-none focus:border-gold transition-colors'

  return (
    <div className="bg-linen border border-gold/20 p-8">
      <p className="text-xs tracking-[0.5em] uppercase text-gold mb-6">
        {variant === 'siteVisit' ? 'Book a Site Visit' : 'Quick Enquiry'}
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 mb-1">Name *</label>
          <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
        </div>

        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 mb-1">Mobile *</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-forest/5 border border-r-0 border-gold/30 text-charcoal-light text-sm">
              {COUNTRY_CODE}
            </span>
            <input
              className={inputCls + ' rounded-none'}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              inputMode="numeric"
              placeholder="10-digit mobile number"
              disabled={verified}
            />
          </div>
        </div>

        {/* OTP flow (only when Firebase is configured) */}
        {otpEnabled && !verified && (
          <div className="pt-1">
            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={busy || !mobileValid}
                className="text-xs tracking-widest uppercase text-forest border-b border-gold pb-0.5 hover:text-gold disabled:opacity-40 transition-colors"
              >
                {busy ? 'Sending…' : 'Send OTP'}
              </button>
            ) : (
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 mb-1">Enter OTP</label>
                  <input
                    className={inputCls}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    inputMode="numeric"
                    placeholder="6-digit code"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={busy || otpCode.length < 6}
                  className="px-5 py-3 bg-forest text-parchment text-xs tracking-widest uppercase hover:bg-forest-dark disabled:opacity-40 transition-colors"
                >
                  Verify
                </button>
              </div>
            )}
          </div>
        )}

        {verified && (
          <p className="text-xs text-green-700 tracking-wide">✓ Mobile verified</p>
        )}

        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 mb-1">Email (optional)</label>
          <input className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" />
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={busy || !formConfigured(form)}
          className="w-full px-8 py-4 bg-gold text-forest text-sm tracking-widest uppercase font-semibold hover:bg-gold-dark disabled:opacity-40 transition-colors duration-200"
        >
          {busy ? 'Please wait…' : variant === 'siteVisit' ? 'Request Site Visit' : 'Submit Enquiry'}
        </button>

        {!formConfigured(form) && (
          <p className="text-[11px] text-charcoal-light/50 text-center">
            Form not yet connected — see SETUP_LEADS_OTP.md.
          </p>
        )}
      </div>

      {/* invisible reCAPTCHA mount point for Firebase Phone Auth */}
      <div id={RECAPTCHA_ID} />
    </div>
  )
}
