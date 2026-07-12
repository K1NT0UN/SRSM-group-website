'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const STATS = [
  { value: 25, suffix: '+', label: 'Years of Trust', note: 'Building Hyderabad since 1999' },
  { value: 24, suffix: '+', label: 'Landmark Projects', note: 'Delivered across residential and commercial' },
  { value: 3, suffix: '', label: 'Cities', note: 'Hyderabad · Vizag · Bangalore' },
  { value: 100, suffix: '%', label: 'Debt-Free', note: 'Self-funded. No loans. No shortcuts.' },
]

const N = STATS.length

function Stat({
  progress,
  index,
  value,
  suffix,
  label,
  note,
}: {
  progress: MotionValue<number>
  index: number
  value: number
  suffix: string
  label: string
  note: string
}) {
  const start = index / N
  const end = (index + 1) / N
  const fade = 0.22 / N

  const opacity = useTransform(
    progress,
    index === 0
      ? [start, end - fade, end]
      : index === N - 1
        ? [start, start + fade, end]
        : [start, start + fade, end - fade, end],
    index === 0 ? [1, 1, 0] : index === N - 1 ? [0, 1, 1] : [0, 1, 1, 0],
  )
  const y = useTransform(progress, [start, end], [40, -40])
  const count = useTransform(progress, [start, start + 0.6 / N], [0, value])
  const rounded = useTransform(count, (v) => Math.round(v).toString())

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <p className="font-display font-light leading-none text-aurum">
        <motion.span className="text-[clamp(7rem,24vw,19rem)] tabular-nums tracking-tight">
          {rounded}
        </motion.span>
        <span className="text-[clamp(3.5rem,10vw,8rem)] align-top">{suffix}</span>
      </p>
      <p className="mt-4 font-display text-[clamp(1.5rem,3.4vw,2.75rem)] font-light text-ivory">
        {label}
      </p>
      <p className="mt-4 font-body text-[11px] font-light uppercase tracking-[0.4em] text-ivory/45">
        {note}
      </p>
    </motion.div>
  )
}

/** The legacy in four breaths — each number holds the whole screen. */
export default function Legacy() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const background = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ['#071a2e', '#04101d', '#0a2138', '#04101d'],
  )

  return (
    <div ref={ref} className="relative h-[420vh]" aria-label="SRSM Group in numbers">
      <motion.div
        style={{ backgroundColor: background }}
        className="grain sticky top-0 flex h-screen items-center justify-center overflow-hidden"
      >
        <p className="absolute top-24 left-1/2 -translate-x-1/2 font-body text-[10px] font-medium uppercase tracking-[0.55em] text-aurum md:top-28">
          The Legacy
        </p>

        {STATS.map((stat, i) => (
          <Stat key={stat.label} progress={scrollYProgress} index={i} {...stat} />
        ))}

        {/* Progress markers */}
        <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col gap-4 md:flex" aria-hidden="true">
          {STATS.map((s, i) => {
            return <Marker key={s.label} progress={scrollYProgress} index={i} />
          })}
        </div>
      </motion.div>
    </div>
  )
}

function Marker({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const start = index / N
  const end = (index + 1) / N
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.02), start + 0.001, end - 0.001, Math.min(1, end + 0.02)],
    [0.25, 1, 1, 0.25],
  )
  const scaleY = useTransform(progress, [start, end], [0.4, 1])
  return (
    <motion.span style={{ opacity }} className="flex flex-col items-center gap-1">
      <motion.span style={{ scaleY }} className="block h-8 w-px origin-top bg-aurum" />
    </motion.span>
  )
}
