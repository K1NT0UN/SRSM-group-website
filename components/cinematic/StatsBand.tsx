'use client'

import { Reveal } from './motion'

const STATS = [
  { value: '25+', label: 'Years of Trust' },
  { value: '24+', label: 'Projects Delivered' },
  { value: '3', label: 'Under Construction' },
  { value: '5', label: 'In Pipeline' },
  { value: '3', label: 'Cities' },
  { value: '100%', label: 'Debt-Free · Self-Funded' },
]

/**
 * Compact stats strip directly beneath the hero — the group in six numbers,
 * mirroring the Nisarga page's information architecture.
 */
export default function StatsBand() {
  return (
    <section className="grain relative border-b border-white/[0.04] bg-midnight-deep px-6 py-14 md:px-12" aria-label="SRSM Group in numbers">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-10 text-center md:grid-cols-3 lg:grid-cols-6">
        {STATS.map(({ value, label }, i) => (
          <Reveal key={label} delay={i * 0.06}>
            <p className="font-display text-3xl font-light text-aurum md:text-4xl">{value}</p>
            <p className="mt-2 font-body text-[9px] uppercase tracking-[0.35em] text-ivory/50">{label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
