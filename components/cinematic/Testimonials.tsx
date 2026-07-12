'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

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

function Quote({
  progress,
  index,
  quote,
  name,
  role,
}: {
  progress: MotionValue<number>
  index: number
  quote: string
  name: string
  role: string
}) {
  const start = index / N
  const end = (index + 1) / N
  const fade = 0.2 / N

  const opacity = useTransform(
    progress,
    index === 0
      ? [start, end - fade, end]
      : index === N - 1
        ? [start, start + fade, end]
        : [start, start + fade, end - fade, end],
    index === 0 ? [1, 1, 0] : index === N - 1 ? [0, 1, 1] : [0, 1, 1, 0],
  )
  const y = useTransform(progress, [start, end], [34, -34])

  return (
    <motion.blockquote
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:px-12"
    >
      <p className="mx-auto max-w-4xl font-display text-[clamp(1.7rem,4vw,3.4rem)] font-light italic leading-[1.3] text-ink">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="mt-10">
        <p className="font-body text-[12px] font-semibold uppercase tracking-[0.3em] text-ink">{name}</p>
        <p className="mt-2 font-body text-[10px] uppercase tracking-[0.4em] text-aurum">{role}</p>
      </footer>
    </motion.blockquote>
  )
}

/** One voice at a time, held for a full screen. */
export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <div ref={ref} className="relative h-[340vh] bg-ivory" aria-label="What our homeowners say">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <span
          className="pointer-events-none absolute left-1/2 top-[8vh] -translate-x-1/2 select-none font-display text-[24rem] leading-none text-ink/[0.045]"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="absolute top-24 left-1/2 -translate-x-1/2 font-body text-[10px] font-medium uppercase tracking-[0.55em] text-aurum md:top-28">
          Words From Home
        </p>

        {QUOTES.map((q, i) => (
          <Quote key={q.name} progress={scrollYProgress} index={i} {...q} />
        ))}
      </div>
    </div>
  )
}
