'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { COUNTRY_CODE } from '@/lib/leadConfig'
import { submitNisargaSiteVisit } from '@/lib/submitForm'
import EnvelopeSeal, { ENVELOPE_EASE as EASE, KRAFT } from '@/components/EnvelopeSeal'
import { Eyebrow, MaskLine, Reveal } from './motion'

type Phase = 'form' | 'sealing' | 'sent'

const inputCls =
  'w-full border-b border-[#5a4623]/30 bg-transparent py-2.5 font-body text-sm text-[#3a2e16] placeholder:text-[#7a6437]/50 focus:border-[#5a4623] focus:outline-none'

const labelCls = 'mb-1 block font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-[#7a6437]'

/** The invitation — a letter you seal to reserve your visit. */
export default function BookVisit() {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [phase, setPhase] = useState<Phase>('form')
  const [error, setError] = useState('')

  const tenDigits = mobile.replace(/\D/g, '').slice(-10)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim()) return setError('Please tell us your name.')
    if (tenDigits.length !== 10) return setError('Please enter a valid 10-digit mobile number.')
    if (!date1) return setError('Please pick a preferred date.')

    setPhase('sealing')
    try {
      const send = submitNisargaSiteVisit({
        name: name.trim(),
        mobile: `${COUNTRY_CODE}${tenDigits}`,
        date1: date1 || undefined,
        date2: date2 || undefined,
      })
      await Promise.all([send, new Promise((r) => setTimeout(r, 2000))])
      setPhase('sent')
    } catch {
      setPhase('form')
      setError('Something went sideways. Please call or WhatsApp us instead.')
    }
  }

  function resetForm() {
    setPhase('form')
    setName('')
    setMobile('')
    setDate1('')
    setDate2('')
    setError('')
  }

  return (
    <section id="visit" className="relative overflow-hidden bg-midnight px-6 py-[14vh] text-ivory md:px-12">
      {/* Backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/nisarga/hero-2-desktop.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/92 to-midnight/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-transparent to-midnight" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Invitation */}
        <div>
          <Eyebrow className="mb-8">A Private Visit</Eyebrow>
          <h2 className="font-display font-light leading-[1.08]">
            <MaskLine className="text-[clamp(2.6rem,5.5vw,5.25rem)]">See it in the</MaskLine>
            <MaskLine delay={0.15} className="text-[clamp(2.6rem,5.5vw,5.25rem)] italic text-aurum">
              golden hour.
            </MaskLine>
          </h2>
          <Reveal delay={0.25} className="mt-8 max-w-md">
            <p className="font-body text-sm font-light leading-relaxed text-ivory/60">
              An unhurried walkthrough of the township, the clubhouses and your shortlisted villa —
              by appointment, at the hour the light is kindest.
            </p>
          </Reveal>
          <Reveal delay={0.35} className="mt-10 space-y-3">
            <p className="font-body text-sm font-light text-ivory/70">
              <a href="tel:+919492239339" className="transition-colors duration-300 hover:text-aurum">
                +91 94922 39339
              </a>
            </p>
            <p className="font-body text-sm font-light text-ivory/70">
              <a
                href="mailto:srbuildersnisarga@gmail.com"
                className="transition-colors duration-300 hover:text-aurum"
              >
                srbuildersnisarga@gmail.com
              </a>
            </p>
            <p className="pt-2 font-body text-[10px] uppercase tracking-[0.4em] text-ivory/35">
              TS RERA · P01100010902
            </p>
          </Reveal>
        </div>

        {/* The letter */}
        <Reveal delay={0.2}>
          <div className="relative" style={{ perspective: 1400 }}>
            <AnimatePresence mode="wait">
              {phase === 'form' && (
                <motion.form
                  key="letter"
                  onSubmit={onSubmit}
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
                    <p className="mb-8 font-display text-2xl italic text-[#4a3a1e]">Reserve your visit.</p>

                    <div className="space-y-6">
                      <div>
                        <label className={labelCls} htmlFor="bv-name">Name</label>
                        <input
                          id="bv-name"
                          className={inputCls}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          autoComplete="name"
                        />
                      </div>

                      <div>
                        <label className={labelCls} htmlFor="bv-phone">Mobile</label>
                        <div className="flex items-baseline gap-3">
                          <span className="font-body text-sm text-[#7a6437]">{COUNTRY_CODE}</span>
                          <input
                            id="bv-phone"
                            className={inputCls}
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            inputMode="numeric"
                            placeholder="10-digit mobile number"
                            autoComplete="tel-national"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className={labelCls} htmlFor="bv-date1">Preferred date *</label>
                          <input
                            id="bv-date1"
                            type="date"
                            className={inputCls}
                            value={date1}
                            onChange={(e) => setDate1(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className={labelCls} htmlFor="bv-date2">Alternate date</label>
                          <input
                            id="bv-date2"
                            type="date"
                            className={inputCls}
                            value={date2}
                            onChange={(e) => setDate2(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {error && <p className="mt-5 font-body text-xs text-red-800">{error}</p>}

                    <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-3 bg-[#241f16] px-9 py-4 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e6d7b3] transition-colors duration-300 hover:bg-[#3a2e16]"
                      >
                        Seal & Reserve
                      </button>
                      <a
                        href="https://wa.me/919492239339?text=Hi%2C%20I%27d%20like%20to%20book%20a%20private%20visit%20to%20Nisarga."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-[10px] font-medium uppercase tracking-[0.3em] text-[#7a6437] underline-offset-8 transition-colors duration-300 hover:text-[#3a2e16] hover:underline"
                      >
                        or WhatsApp us
                      </a>
                    </div>

                    <p className="mt-4 font-body text-[10px] leading-relaxed tracking-wide text-[#7a6437]">
                      We&apos;ll call to confirm your time. No spam — ever.
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
                  <p className="font-display text-4xl font-light italic text-aurum">Until then.</p>
                  <p className="mx-auto mt-6 max-w-xs font-body text-sm font-light leading-relaxed text-ivory/65">
                    Your visit is reserved. Our team will call you shortly to confirm the day and hour.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-8 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory/50 underline-offset-8 transition-colors duration-300 hover:text-aurum hover:underline"
                  >
                    Reserve another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
