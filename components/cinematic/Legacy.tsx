'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { EASE } from './motion'

const STATS = [
  { value: 25, suffix: '+', label: 'Years of Trust', note: 'Building Hyderabad since 1999' },
  { value: 24, suffix: '+', label: 'Landmark Projects', note: 'Delivered across residential and commercial' },
  { value: 3, suffix: '', label: 'Cities', note: 'Hyderabad · Vizag · Bangalore' },
  { value: 100, suffix: '%', label: 'Debt-Free', note: 'Self-funded. No loans. No shortcuts.' },
]

const BACKGROUNDS = ['#071a2e', '#04101d', '#0a2138', '#04101d']
const N = STATS.length

/** Counts up from zero each time a stat takes the stage. */
function CountUp({ value }: { value: number }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [value])
  return <>{display}</>
}

/**
 * The legacy in four breaths — each number holds the whole screen.
 * One stat on stage at a time (AnimatePresence), so nothing ever reads
 * through anything else.
 */
export default function Legacy() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(N - 1, Math.max(0, Math.floor(v * N)))
    if (next !== active) setActive(next)
  })

  const stat = STATS[active]

  return (
    <div ref={ref} className="relative h-[420vh]" aria-label="SRSM Group in numbers">
      <motion.div
        animate={{ backgroundColor: BACKGROUNDS[active] }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="grain sticky top-0 flex h-screen items-center justify-center overflow-hidden"
      >
        <p className="absolute top-24 left-1/2 -translate-x-1/2 font-body text-[10px] font-medium uppercase tracking-[0.55em] text-aurum md:top-28">
          The Legacy
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -48 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-display font-light leading-none text-aurum">
              <span className="text-[clamp(7rem,24vw,19rem)] tabular-nums tracking-tight">
                <CountUp value={stat.value} />
              </span>
              <span className="align-top text-[clamp(3.5rem,10vw,8rem)]">{stat.suffix}</span>
            </p>
            <p className="mt-4 font-display text-[clamp(1.5rem,3.4vw,2.75rem)] font-light text-ivory">
              {stat.label}
            </p>
            <p className="mt-4 font-body text-[11px] font-light uppercase tracking-[0.4em] text-ivory/50">
              {stat.note}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress markers */}
        <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col gap-4 md:flex" aria-hidden="true">
          {STATS.map((s, i) => (
            <span
              key={s.label}
              className={`block w-px transition-all duration-700 ${
                i === active ? 'h-8 bg-aurum' : 'h-4 bg-ivory/25'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
