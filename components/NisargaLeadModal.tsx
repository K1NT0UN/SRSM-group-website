'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { COUNTRY_CODE } from '@/lib/leadConfig'
import { sendOtp, verifyOtp, resetOtp } from '@/lib/otp'
import { submitBrochure, submitNisargaEnquiry, submitNisargaSiteVisit } from '@/lib/submitForm'
import EnvelopeSeal, { ENVELOPE_EASE as EASE } from '@/components/EnvelopeSeal'

type Variant = 'brochure' | 'enquiry' | 'siteVisit'
type Phase = 'form' | 'sealing' | 'sent'

const TITLES: Record<Variant, string> = {
  brochure: 'Download Brochure',
  enquiry: 'Send Enquiry',
  siteVisit: 'Book a Site Visit',
}

/**
 * OTP-gated lead modal for the Nisarga project. All three variants verify a
 * phone number (Firebase / MSG91 via lib/otp) before recording the lead in the
 * project's own Google Forms (kept separate from the SRSM group pipeline).
 */
export default function NisargaLeadModal({
  variant,
  label,
  className,
  projectName = 'Nisarga',
  brochureUrl = '/nisarga-brochure.pdf',
}: {
  variant: Variant
  label: string
  className?: string
  projectName?: string
  brochureUrl?: string
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [phase, setPhase] = useState<Phase>('form')

  const tenDigits = mobile.replace(/\D/g, '').slice(-10)
  const mobileValid = tenDigits.length === 10
  const e164 = `${COUNTRY_CODE}${tenDigits}`
  const needsOtp = variant === 'brochure' // only the brochure download is OTP-gated

  function reset() {
    setOpen(false)
    setName(''); setMobile(''); setEmail(''); setDate1(''); setDate2('')
    setOtpSent(false); setOtpCode(''); setError(''); setPhase('form')
    resetOtp()
  }

  function triggerDownload() {
    const a = document.createElement('a')
    a.href = brochureUrl
    a.download = `${projectName}-Brochure.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  async function handleSend() {
    setError('')
    if (!name.trim()) return setError('Please enter your name.')
    if (!mobileValid) return setError('Enter a valid 10-digit mobile number.')
    setBusy(true)
    try {
      await sendOtp(e164)
      setOtpSent(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not send OTP.')
    } finally {
      setBusy(false)
    }
  }

  async function handleVerify() {
    setError('')
    setBusy(true)

    // 1) Verify the OTP. A failure here genuinely means a wrong/expired code.
    try {
      await verifyOtp(otpCode)
    } catch {
      setError('Incorrect or expired code.')
      setBusy(false)
      return
    }

    // 2) OTP valid — record the lead in the right Nisarga form.
    try {
      if (variant === 'brochure') {
        // Best-effort: never deny the brochure if lead recording fails.
        try {
          await submitBrochure({ name: name.trim(), mobile: e164, email: email.trim() || undefined })
        } catch (err) {
          console.error('Brochure lead submission failed:', err)
        }
        triggerDownload()
        reset()
        setBusy(false)
        return
      }

      if (variant === 'enquiry') {
        await submitNisargaEnquiry({ name: name.trim(), mobile: e164, email: email.trim() || undefined })
      } else {
        await submitNisargaSiteVisit({ name: name.trim(), mobile: e164, date1: date1 || undefined, date2: date2 || undefined })
      }
      setPhase('sent')
    } catch {
      setError('Something went wrong recording your details. Please call us instead.')
    } finally {
      setBusy(false)
    }
  }

  // Non-brochure variants (enquiry / site-visit) skip OTP entirely and save
  // straight to their Google Form — sealed with the same envelope animation
  // used everywhere else on the site.
  async function handleDirectSubmit() {
    setError('')
    if (!name.trim()) return setError('Please enter your name.')
    if (!mobileValid) return setError('Enter a valid 10-digit mobile number.')
    if (variant === 'siteVisit' && !date1) return setError('Please pick a preferred date.')
    setPhase('sealing')
    try {
      const send =
        variant === 'enquiry'
          ? submitNisargaEnquiry({ name: name.trim(), mobile: e164, email: email.trim() || undefined })
          : submitNisargaSiteVisit({ name: name.trim(), mobile: e164, date1: date1 || undefined, date2: date2 || undefined })
      await Promise.all([send, new Promise((r) => setTimeout(r, 2000))])
      setPhase('sent')
    } catch {
      setPhase('form')
      setError('Something went wrong recording your details. Please call us instead.')
    }
  }

  const inputCls =
    'w-full bg-parchment/80 border border-gold/50 px-4 py-3 text-forest placeholder:text-forest/40 focus:outline-none focus:border-gold focus:bg-parchment transition-colors'

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      {/* Invisible reCAPTCHA mount point for Firebase Phone Auth */}
      <div id="recaptcha-container" />

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-forest/60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={reset}
          >
            <motion.div
              className="bg-gold/10 border border-gold w-full max-w-md relative overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold header band */}
              <div className="bg-gold px-8 py-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-forest/60 mb-0.5">{projectName}</p>
                  <h3 className="font-serif text-xl text-forest font-bold leading-tight">{TITLES[variant]}</h3>
                </div>
                <button
                  onClick={reset}
                  className="text-forest/50 hover:text-forest text-2xl leading-none transition-colors"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Body */}
              <div className="bg-parchment px-8 py-6 space-y-4">
                <AnimatePresence mode="wait">
                {phase === 'sent' ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="text-center py-6"
                  >
                    <p className="font-serif text-2xl text-forest mb-2">Thank you!</p>
                    <p className="text-forest/70 text-sm mb-6">
                      We&apos;ve received your details and our team will reach out shortly.
                    </p>
                    <button
                      onClick={reset}
                      className="px-8 py-3 bg-forest text-parchment text-sm tracking-widest uppercase font-semibold hover:bg-forest-dark transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : phase === 'sealing' ? (
                  <EnvelopeSeal key="envelope" />
                ) : (
                  <motion.div
                    key="form"
                    initial={false}
                    exit={{ opacity: 0, scale: 0.94, y: 8 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="space-y-4"
                  >
                    <input
                      className={inputCls}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name *"
                      disabled={otpSent}
                    />
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-gold/20 border border-r-0 border-gold/50 text-forest text-sm font-semibold">
                        {COUNTRY_CODE}
                      </span>
                      <input
                        className={inputCls}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        inputMode="numeric"
                        placeholder="10-digit mobile number *"
                        disabled={otpSent}
                      />
                    </div>

                    {variant !== 'siteVisit' && (
                      <input
                        className={inputCls}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email address (optional)"
                        disabled={otpSent}
                      />
                    )}

                    {variant === 'siteVisit' && (
                      <div className="grid grid-cols-2 gap-3">
                        <label className="text-[11px] tracking-widest uppercase text-forest/50 space-y-1 block">
                          Preferred date *
                          <input
                            className={inputCls}
                            value={date1}
                            onChange={(e) => setDate1(e.target.value)}
                            type="date"
                            disabled={otpSent}
                          />
                        </label>
                        <label className="text-[11px] tracking-widest uppercase text-forest/50 space-y-1 block">
                          Alternate date
                          <input
                            className={inputCls}
                            value={date2}
                            onChange={(e) => setDate2(e.target.value)}
                            type="date"
                            disabled={otpSent}
                          />
                        </label>
                      </div>
                    )}

                    {otpSent && (
                      <div className="bg-gold/15 border border-gold px-4 py-4 space-y-3">
                        <p className="text-xs tracking-widest uppercase text-forest font-semibold">
                          OTP sent to {COUNTRY_CODE}{tenDigits}
                        </p>
                        <input
                          className="w-full bg-gold/10 border border-gold px-4 py-3 text-forest text-center text-xl tracking-[0.5em] font-semibold focus:outline-none focus:bg-gold/20 transition-colors placeholder:tracking-normal placeholder:text-forest/40"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="— — — — — —"
                          autoFocus
                        />
                      </div>
                    )}

                    {error && <p className="text-xs text-red-600">{error}</p>}

                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={needsOtp ? handleSend : handleDirectSubmit}
                        disabled={busy}
                        className="w-full px-8 py-4 bg-forest text-parchment text-sm tracking-widest uppercase font-semibold hover:bg-forest-dark disabled:opacity-40 transition-colors"
                      >
                        {busy ? 'Please wait…' : needsOtp ? 'Send OTP' : 'Submit'}
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={handleVerify}
                          disabled={busy || otpCode.length < 6}
                          className="w-full px-8 py-4 bg-gold text-forest text-sm tracking-widest uppercase font-semibold hover:bg-gold-dark disabled:opacity-40 transition-colors"
                        >
                          {busy ? 'Verifying…' : variant === 'brochure' ? 'Verify & Download' : 'Verify & Submit'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setOtpSent(false); setOtpCode(''); setError(''); resetOtp() }}
                          className="w-full text-xs text-forest/50 hover:text-forest underline transition-colors"
                        >
                          Change number
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
