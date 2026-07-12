'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Eyebrow, MaskLine, Reveal } from './motion'
import Magnetic from './Magnetic'

const NEIGHBOURHOOD = [
  {
    group: 'Connectivity',
    items: ['ORR Service Road — at the doorstep', 'Hyderabad Metro Phase-2 (planned)', 'TSRTC bus connectivity', 'Multi-modal transport integration'],
  },
  {
    group: 'Work & IT',
    items: ['Hyderabad Pharma City', 'Biotech Park · ICICI Knowledge Park', 'Agilent Biopharma Centre', 'Eli Lilly'],
  },
  {
    group: 'Schools',
    items: ['Rainbow International School', 'Sreenidhi Global School', 'Sai High School'],
  },
  {
    group: 'Hospitals',
    items: ['Sreshta Multi Speciality', 'Tirumala Hospital', 'Lucid Medical Diagnostics'],
  },
  {
    group: 'Leisure',
    items: ['Wild Waters', 'Forum Sujana Mall', 'Adventure parks, Patancheru'],
  },
]

/** The address — city close, city quiet. */
export default function Location() {
  const mapRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: mapRef, offset: ['start end', 'end start'] })
  const parallax = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section id="location" className="bg-stone/40 px-6 py-[15vh] text-ink md:px-12" style={{ backgroundColor: '#efece7' }}>
      <div className="mx-auto max-w-[1600px]">
        <Eyebrow tone="ink" className="mb-8">The Address</Eyebrow>
        <h2 className="max-w-4xl font-display font-light leading-[1.1] text-ink">
          <MaskLine className="text-[clamp(2.4rem,5.5vw,5rem)]">Kollur — the city,</MaskLine>
          <MaskLine delay={0.15} className="text-[clamp(2.4rem,5.5vw,5rem)] italic text-ink/60">
            at a courteous distance.
          </MaskLine>
        </h2>
        <Reveal delay={0.2} className="mt-6 max-w-xl">
          <p className="font-body text-sm font-light leading-relaxed text-ink/55">
            On the ORR service road in Hyderabad&apos;s western growth corridor — beside 4,000 acres
            of reserved greenery, and a short drive from the Financial District belt.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Neighbourhood */}
          <div className="order-2 lg:order-1">
            {NEIGHBOURHOOD.map(({ group, items }, gi) => (
              <Reveal key={group} delay={gi * 0.08} className="border-t border-ink/10 py-7">
                <div className="grid grid-cols-[110px_1fr] gap-6 md:grid-cols-[160px_1fr]">
                  <p className="font-body text-[10px] font-semibold uppercase tracking-[0.4em] text-aurum">
                    {group}
                  </p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="font-body text-sm font-light text-ink/65">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Map */}
          <div ref={mapRef} className="order-1 lg:order-2">
            <Reveal>
              <div className="relative overflow-hidden border border-ink/10 bg-white">
                <motion.div style={{ y: parallax }} className="relative aspect-[6/5] w-full scale-[1.08]">
                  <Image
                    src="/images/nisarga/location-map.webp"
                    alt="Nisarga location map — Kollur, off the ORR service road, Hyderabad"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-6"
                  />
                </motion.div>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <address className="font-body text-xs font-light not-italic leading-relaxed text-ink/50">
                Nisarga, Kollur, Patancheruvu,<br />
                Hyderabad, Telangana — 502300
              </address>
              <Magnetic>
                <a
                  href="https://maps.app.goo.gl/ohHkRPB9tcTFn6td7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-ink/25 px-8 py-4 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:border-aurum hover:text-aurum"
                >
                  Open in Google Maps
                </a>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
