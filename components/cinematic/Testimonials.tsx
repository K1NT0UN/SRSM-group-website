'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { EASE } from './motion'

const QUOTES = [
  {
    name: 'Mahendar Gainibaiti',
    role: 'SRSM Group Homeowner',
    quote: 'Exceptional build quality and timely delivery — SRSM Group exceeded every expectation we had.',
  },
  {
    name: 'Chandan Mudiam',
    role: 'NRI Customer',
    quote: 'From documentation to handover, the entire experience was smooth and stress-free.',
  },
  {
    name: 'Govinda Raju',
    role: 'SRSM Group Homeowner',
    quote: 'The team was transparent throughout the entire process and delivered exactly what was promised.',
  },
  {
    name: 'Pruthviraj Tanjutoori',
    role: 'NRI Customer',
    quote: 'Trusted the Group based on their track record and they absolutely delivered. Highly recommended.',
  },
]

const N = QUOTES.length

/** One voice at a time, held for a full screen. */
export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(N - 1, Math.max(0, Math.floor(v * N)))
    if (next !== active) setActive(next)
  })

  const q = QUOTES[active]

  return (
    <div ref={ref} className="relative h-[340vh] bg-sand" aria-label="What our homeowners say">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <span
          className="pointer-events-none absolute left-1/2 top-[8vh] -translate-x-1/2 select-none font-display text-[24rem] leading-none text-ink/[0.05]"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="absolute top-24 left-1/2 -translate-x-1/2 font-body text-[10px] font-medium uppercase tracking-[0.55em] text-aurum md:top-28">
          Words From Home
        </p>

        <AnimatePresence mode="wait">
          <motion.blockquote
            key={active}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex flex-col items-center justify-center px-6 text-center md:px-12"
          >
            <p className="mx-auto max-w-4xl font-display text-[clamp(1.7rem,4vw,3.4rem)] font-light italic leading-[1.3] text-ink">
              &ldquo;{q.quote}&rdquo;
            </p>
            <footer className="mt-10">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.3em] text-ink">{q.name}</p>
              <p className="mt-2 font-body text-[10px] uppercase tracking-[0.4em] text-aurum">{q.role}</p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        {/* Progress markers */}
        <div className="absolute bottom-14 left-1/2 flex -translate-x-1/2 items-center gap-3" aria-hidden="true">
          {QUOTES.map((item, i) => (
            <span
              key={item.name}
              className={`h-px transition-all duration-700 ${
                i === active ? 'w-12 bg-aurum' : 'w-5 bg-ink/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
