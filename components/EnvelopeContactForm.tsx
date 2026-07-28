'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COUNTRY_CODE } from '@/lib/leadConfig'
import { submitEnquiry, submitSiteVisit } from '@/lib/submitForm'
import EnvelopeSeal, { ENVELOPE_EASE as EASE, KRAFT } from './EnvelopeSeal'

type Variant = 'enquiry' | 'siteVisit'
type Phase = 'form' | 'sealing' | 'sent'

/**
 * The contact form as a letter: fill it in on aged paper, hit send, and it
 * folds into a kraft envelope that seals shut with the SRSM crest pressed
 * into wax — then the whole thing is "sent."
 *
 * Submits through the same verified /api/lead -> Google Forms pipeline as
 * every other lead form on the site (enquiryForm / siteVisitForm); nothing
 * about the backend changes, only the presentation.
 */
export default function EnvelopeContactForm() {
  const [tab, setTab] = useState<Variant>('enquiry')
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [phase, setPhase] = useState<Phase>('form')
  const [error, setError] = useState('')

  const tenDigits = mobile.replace(/\D/g, '').slice(-10)
  const mobileValid = tenDigits.length === 10

  function switchTab(next: Variant) {
    setTab(next)
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim()) return setError('Please tell us your name.')
    if (!mobileValid) return setError('Please enter a valid 10-digit mobile number.')

    setPhase('sealing')
    try {
      const payload = { name: name.trim(), mobile: `${COUNTRY_CODE}${tenDigits}`, email: email.trim() || undefined }
      const send = tab === 'siteVisit' ? submitSiteVisit(payload) : submitEnquiry(payload)
      // Run the network call alongside the full seal animation, whichever takes longer.
      await Promise.all([send, new Promise((r) => setTimeout(r, 2000))])
      setPhase('sent')
    } catch {
      setPhase('form')
      setError('Something went sideways sending that. Please call or WhatsApp us instead.')
    }
  }

  function resetForm() {
    setPhase('form')
    setName('')
    setMobile('')
    setEmail('')
    setError('')
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      {phase === 'form' && (
        <div className="mb-8 flex gap-1 border-b border-ivory/15">
          {(['enquiry', 'siteVisit'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => switchTab(v)}
              className={`flex-1 pb-4 font-body text-[11px] font-semibold uppercase tracking-[0.3em] transition-colors duration-300 ${
                tab === v ? 'border-b-2 border-aurum text-aurum' : 'text-ivory/40 hover:text-ivory/70'
              }`}
            >
              {v === 'enquiry' ? 'Quick Enquiry' : 'Book Site Visit'}
            </button>
          ))}
        </div>
      )}

      <div className="relative" style={{ perspective: 1400 }}>
        <AnimatePresence mode="wait">
          {phase === 'form' && (
            <motion.form
              key="letter"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 8 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative overflow-hidden p-8 shadow-2xl md:p-10"
              style={{
                backgroundColor: KRAFT,
                backgroundImage:
                  'radial-gradient(circle at 18% 12%, rgba(255,255,255,0.4), transparent 42%), radial-gradient(circle at 88% 92%, rgba(90,70,35,0.14), transparent 55%)',
              }}
            >
              <div className="grain relative">
                <p className="mb-8 font-display text-2xl italic text-[#4a3a1e]">
                  {tab === 'siteVisit' ? 'Reserve your visit.' : 'Write to us.'}
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="mb-1 block font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-[#7a6437]">
                      Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      autoComplete="name"
                      className="w-full border-b border-[#5a4623]/30 bg-transparent py-2.5 font-body text-[#3a2e16] placeholder:text-[#7a6437]/50 focus:border-[#5a4623] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-[#7a6437]">
                      Mobile
                    </label>
                    <div className="flex items-baseline gap-3">
                      <span className="font-body text-sm text-[#7a6437]">{COUNTRY_CODE}</span>
                      <input
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        inputMode="numeric"
                        placeholder="10-digit mobile number"
                        autoComplete="tel-national"
                        className="w-full border-b border-[#5a4623]/30 bg-transparent py-2.5 font-body text-[#3a2e16] placeholder:text-[#7a6437]/50 focus:border-[#5a4623] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-[#7a6437]">
                      Email (optional)
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full border-b border-[#5a4623]/30 bg-transparent py-2.5 font-body text-[#3a2e16] placeholder:text-[#7a6437]/50 focus:border-[#5a4623] focus:outline-none"
                    />
                  </div>
                </div>

                {error && <p className="mt-5 font-body text-xs text-red-800">{error}</p>}

                <button
                  type="submit"
                  className="mt-9 inline-flex items-center gap-3 bg-[#241f16] px-9 py-4 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e6d7b3] transition-colors duration-300 hover:bg-[#3a2e16]"
                >
                  {tab === 'siteVisit' ? 'Seal & Reserve' : 'Seal & Send'}
                </button>

                <p className="mt-4 font-body text-[10px] leading-relaxed tracking-wide text-[#7a6437]">
                  We&apos;ll call to confirm. No spam — ever.
                </p>
              </div>
            </motion.form>
          )}

          {phase === 'sealing' && <EnvelopeSeal key="envelope" />}

          {phase === 'sent' && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="border border-white/12 bg-white/[0.05] px-8 py-16 text-center backdrop-blur-2xl md:px-12"
            >
              <p className="font-display text-4xl font-light italic text-aurum">Sent.</p>
              <p className="mx-auto mt-6 max-w-xs font-body text-sm font-light leading-relaxed text-ivory/65">
                Your {tab === 'siteVisit' ? 'visit request' : 'note'} is on its way to us. Our team will
                call you shortly.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-8 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory/50 underline-offset-8 transition-colors duration-300 hover:text-aurum hover:underline"
              >
                Send another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}