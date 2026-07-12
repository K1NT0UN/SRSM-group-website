'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Eyebrow, MaskLine, Reveal } from './motion'

const MILESTONES = [
  {
    marker: '1999',
    title: 'The beginning',
    body: 'Founded in Hyderabad by Mr. Vasu Raavi — from Nellore roots to a city-shaping group.',
  },
  {
    marker: '24+',
    title: 'Projects delivered',
    body: 'Residential and commercial landmarks across Hyderabad, Vizag and Bangalore.',
  },
  {
    marker: 'RERA',
    title: 'Nisarga registered',
    body: 'TS RERA P01100010902 — a 17+ acre forestscape villa township in Kollur.',
  },
  {
    marker: 'Today',
    title: 'Construction underway',
    body: 'Our in-house engineering team on site, executing debt-free and self-funded.',
  },
  {
    marker: '2028',
    title: 'Target completion',
    body: 'Keys to the first families of Nisarga.',
  },
]

/** Trust, drawn as a single line from 1999 to 2028. */
export default function Progress() {
  const lineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 0.75', 'end 0.6'],
  })

  return (
    <section className="bg-ivory px-6 py-[15vh] text-ink md:px-12">
      <div className="mx-auto max-w-[1200px]">
        <Eyebrow tone="ink" className="mb-8 text-center">The Journey</Eyebrow>
        <h2 className="text-center font-display font-light leading-[1.1] text-ink">
          <MaskLine className="text-[clamp(2.4rem,5.5vw,5rem)]">Built with patience.</MaskLine>
          <MaskLine delay={0.15} className="text-[clamp(2.4rem,5.5vw,5rem)] italic text-ink/60">
            Delivered on our word.
          </MaskLine>
        </h2>

        <div ref={lineRef} className="relative mt-24">
          {/* Spine */}
          <div className="absolute left-5 top-0 h-full w-px bg-ink/10 md:left-1/2" aria-hidden="true" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-5 top-0 h-full w-px origin-top bg-aurum md:left-1/2"
            aria-hidden="true"
          />

          <div className="space-y-24">
            {MILESTONES.map(({ marker, title, body }, i) => {
              const right = i % 2 === 1
              return (
                <Reveal key={marker} amount={0.5} className="relative">
                  {/* Node */}
                  <span className="absolute left-5 top-3 z-10 -translate-x-1/2 md:left-1/2" aria-hidden="true">
                    <span className="block h-2.5 w-2.5 rotate-45 border border-aurum bg-ivory" />
                  </span>

                  <div
                    className={`ml-14 md:ml-0 md:w-[44%] ${
                      right ? 'md:ml-auto md:pl-4 md:text-left' : 'md:mr-auto md:pr-4 md:text-right'
                    }`}
                  >
                    <p className="font-display text-4xl font-light text-aurum md:text-5xl">{marker}</p>
                    <p className="mt-3 font-body text-[11px] font-semibold uppercase tracking-[0.35em] text-ink/70">
                      {title}
                    </p>
                    <p className={`mt-3 max-w-sm font-body text-sm font-light leading-relaxed text-ink/55 ${right ? '' : 'md:ml-auto'}`}>
                      {body}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        <Reveal className="mt-24 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {['Debt-free group', 'In-house engineering', 'RERA registered'].map((chip) => (
            <span key={chip} className="font-body text-[10px] uppercase tracking-[0.45em] text-ink/40">
              {chip}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
