'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Eyebrow, ImageReveal, MaskLine, Reveal } from './motion'
import Magnetic from './Magnetic'

const FACTS = [
  { value: '17+', label: 'Acres' },
  { value: '4 & 5 BHK', label: 'Villas · G+2' },
  { value: '50+', label: 'Amenities' },
  { value: '2', label: 'Clubhouses' },
]

/** The flagship, introduced the way it deserves — one image, few words. */
export default function NisargaIntro() {
  const frameRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  })
  const parallax = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section id="nisarga" className="bg-sand px-6 py-[16vh] text-ink md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <Eyebrow tone="ink" className="mb-10 text-center">
          The Flagship · Kollur, Hyderabad
        </Eyebrow>

        <h2 className="text-center font-display font-light leading-[1.12] text-ink">
          <MaskLine className="text-[clamp(2.6rem,6vw,5.75rem)]">Not another villa project.</MaskLine>
          <MaskLine delay={0.15} className="text-[clamp(1.6rem,3.4vw,3.25rem)] italic text-ink/70">
            A place where mornings begin with nature
          </MaskLine>
          <MaskLine delay={0.28} className="text-[clamp(1.6rem,3.4vw,3.25rem)] italic text-ink/70">
            and evenings belong to family.
          </MaskLine>
        </h2>

        <div ref={frameRef} className="mt-20 md:mt-28">
          <ImageReveal className="aspect-[16/10] md:aspect-[21/9]">
            <motion.div style={{ y: parallax }} className="relative h-[112%] w-full -translate-y-[6%]">
              <Image
                src="/images/nisarga/hero-1-desktop.webp"
                alt="The Nisarga grand entrance at dusk — artist's impression"
                fill
                sizes="(max-width: 768px) 100vw, 92vw"
                className="object-cover"
              />
            </motion.div>
          </ImageReveal>
          <Reveal y={12} className="mt-4 flex items-center justify-between">
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-ink/60">
              The Nisarga entrance — artist&apos;s impression
            </p>
            <p className="hidden font-body text-[10px] uppercase tracking-[0.35em] text-ink/60 md:block">
              TS RERA · P01100010902
            </p>
          </Reveal>
        </div>

        {/* Facts — set like an engraving, not a dashboard */}
        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-2 md:grid-cols-4">
          {FACTS.map(({ value, label }, i) => (
            <Reveal
              key={label}
              delay={i * 0.1}
              className="border-t border-ink/25 px-2 py-8 text-center md:px-6"
            >
              <p className="font-display text-3xl font-light text-ink md:text-4xl">{value}</p>
              <p className="mt-2 font-body text-[10px] uppercase tracking-[0.4em] text-ink/65">{label}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-16 text-center">
          <Magnetic>
            <Link
              href="/projects/nisarga"
              className="group inline-flex items-center gap-4 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-ink"
            >
              Discover Nisarga
              <span className="relative h-px w-12 bg-ink/30 transition-all duration-500 group-hover:w-20 group-hover:bg-aurum" />
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
