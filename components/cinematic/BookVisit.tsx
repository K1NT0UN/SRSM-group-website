'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { COUNTRY_CODE } from '@/lib/leadConfig'
import { submitNisargaSiteVisit } from '@/lib/submitForm'
import { Eyebrow, MaskLine, Reveal } from './motion'
import Magnetic from './Magnetic'

const inputCls =
  'w-full border-b border-white/20 bg-transparent py-3.5 font-body text-sm font-light text-ivory placeholder:text-ivory/35 focus:border-aurum focus:outline-none transition-colors duration-500'

const labelCls = 'block font-body text-[9px] font-medium uppercase tracking-[0.4em] text-ivory/45 mb-1'

/** The invitation — one image, one card, no noise. */
export default function BookVisit() {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const tenDigits = mobile.replace(/\D/g, '').slice(-10)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim()) return setError('Please tell us your name.')
    if (tenDigits.length !== 10) return setError('Please enter a valid 10-digit mobile number.')
    setBusy(true)
    try {
      await submitNisargaSiteVisit({
        name: name.trim(),
        mobile: `${COUNTRY_CODE}${tenDigits}`,
        date1: date1 || undefined,
        date2: date2 || undefined,
      })
      setDone(true)
    } catch {
      setError('Something went sideways. Please call or WhatsApp us instead.')
    } finally {
      setBusy(false)
    }
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

        {/* Card */}
        <Reveal delay={0.2}>
          <div className="border border-white/12 bg-white/[0.05] p-8 backdrop-blur-2xl md:p-12">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="py-16 text-center"
                >
                  <p className="font-display text-4xl font-light italic text-aurum">Until then.</p>
                  <p className="mx-auto mt-6 max-w-xs font-body text-sm font-light leading-relaxed text-ivory/65">
                    Your visit is reserved. Our team will call you shortly to confirm the day and hour.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={false}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-8"
                >
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
                    <label className={labelCls} htmlFor="bv-phone">Phone</label>
                    <div className="flex items-baseline gap-3">
                      <span className="font-body text-sm text-ivory/50">{COUNTRY_CODE}</span>
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
                      <label className={labelCls} htmlFor="bv-date1">Preferred date</label>
                      <input
                        id="bv-date1"
                        type="date"
                        className={`${inputCls} [color-scheme:dark]`}
                        value={date1}
                        onChange={(e) => setDate1(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="bv-date2">Alternate date</label>
                      <input
                        id="bv-date2"
                        type="date"
                        className={`${inputCls} [color-scheme:dark]`}
                        value={date2}
                        onChange={(e) => setDate2(e.target.value)}
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="font-body text-xs font-light text-red-300">{error}</p>
                  )}

                  <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={busy}
                        className="inline-block bg-aurum px-10 py-4.5 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-midnight transition-all duration-500 hover:bg-ivory disabled:opacity-40"
                      >
                        {busy ? 'Reserving…' : 'Reserve My Visit'}
                      </button>
                    </Magnetic>
                    <a
                      href="https://wa.me/919492239339?text=Hi%2C%20I%27d%20like%20to%20book%20a%20private%20visit%20to%20Nisarga."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[10px] font-medium uppercase tracking-[0.3em] text-ivory/55 underline-offset-8 transition-colors duration-300 hover:text-aurum hover:underline"
                    >
                      or WhatsApp us
                    </a>
                  </div>

                  <p className="font-body text-[10px] font-light leading-relaxed tracking-wide text-ivory/30">
                    We&apos;ll call to confirm your time. No spam — ever.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
