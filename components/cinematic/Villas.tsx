'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Eyebrow, ImageReveal, MaskLine, Reveal } from './motion'
import NisargaLeadModal from '@/components/NisargaLeadModal'

const VILLAS = [
  {
    size: '200',
    tagline: 'Moody. Majestic. Meticulous.',
    areas: [
      { floor: 'Ground floor', sqft: '1,300 sq. ft' },
      { floor: 'First floor', sqft: '1,275 sq. ft' },
      { floor: 'Second floor', sqft: '965 sq. ft' },
    ],
    total: '3,540 sq. ft',
  },
  {
    size: '239',
    tagline: 'Elegant. Elevated. Enchanting.',
    areas: [
      { floor: 'Ground floor', sqft: '1,593 sq. ft' },
      { floor: 'First floor', sqft: '1,571 sq. ft' },
      { floor: 'Second floor', sqft: '1,066 sq. ft' },
    ],
    total: '4,230 sq. ft',
  },
  {
    size: '300',
    tagline: 'Serene. Sylvan. Sensuous.',
    areas: [
      { floor: 'Ground floor', sqft: '1,760 sq. ft' },
      { floor: 'First floor', sqft: '1,740 sq. ft' },
      { floor: 'Second floor', sqft: '1,485 sq. ft' },
    ],
    total: '4,985 sq. ft',
  },
]

/** The collection — three sizes, one standard, set in type rather than clutter. */
export default function Villas() {
  const bandRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: bandRef, offset: ['start end', 'end start'] })
  const parallax = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  return (
    <section className="bg-ivory px-6 py-[15vh] text-ink md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <Eyebrow tone="ink" className="mb-8">The Villa Collection</Eyebrow>

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="font-display font-light leading-[1.08] text-ink">
            <MaskLine className="text-[clamp(2.6rem,6vw,5.5rem)]">Three sizes.</MaskLine>
            <MaskLine delay={0.15} className="text-[clamp(2.6rem,6vw,5.5rem)] italic text-ink/60">
              One standard.
            </MaskLine>
          </h2>
          <Reveal delay={0.25} className="max-w-sm">
            <p className="font-body text-sm font-light leading-relaxed text-ink/55">
              4 &amp; 5 BHK forestscape villas, G+2, facing east or west — every one of them
              opening onto green.
            </p>
          </Reveal>
        </div>

        {/* Cinematic band */}
        <div ref={bandRef} className="mt-16">
          <ImageReveal className="aspect-[16/9] md:aspect-[21/8]">
            <motion.div style={{ y: parallax }} className="relative h-[114%] w-full -translate-y-[7%]">
              <Image
                src="/images/nisarga/hero-5.webp"
                alt="A Nisarga villa at dusk — artist's impression"
                fill
                sizes="(max-width: 768px) 100vw, 92vw"
                className="object-cover"
              />
            </motion.div>
          </ImageReveal>
        </div>

        {/* Spec cards */}
        <div className="mt-px grid gap-px bg-ink/10 md:grid-cols-3">
          {VILLAS.map((villa, i) => (
            <Reveal key={villa.size} delay={i * 0.12} className="group relative bg-ivory">
              <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-aurum transition-transform duration-700 ease-out group-hover:scale-x-100" />
              <div className="flex h-full flex-col p-10 transition-all duration-700 group-hover:-translate-y-1.5 group-hover:bg-white md:p-12">
                <p className="font-display text-[clamp(4rem,7vw,6.5rem)] font-light leading-none text-ink">
                  {villa.size}
                  <span className="ml-3 align-middle font-body text-[10px] uppercase tracking-[0.4em] text-ink/45">
                    Sq. Yd
                  </span>
                </p>
                <p className="mt-4 font-display text-lg italic text-aurum">{villa.tagline}</p>

                <div className="mt-10 space-y-3">
                  {villa.areas.map(({ floor, sqft }) => (
                    <div
                      key={floor}
                      className="flex items-baseline justify-between border-b border-ink/10 pb-3 font-body text-sm font-light text-ink/60"
                    >
                      <span>{floor}</span>
                      <span className="text-ink">{sqft}</span>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between pt-2">
                    <span className="font-body text-[10px] uppercase tracking-[0.35em] text-ink/45">
                      Total built-up
                    </span>
                    <span className="font-display text-2xl text-ink">{villa.total}</span>
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-6 pt-2">
                  <NisargaLeadModal
                    variant="brochure"
                    label="Brochure"
                    className="font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-ink underline-offset-8 transition-colors duration-300 hover:text-aurum hover:underline"
                  />
                  <Link
                    href="#visit"
                    className="font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-ink underline-offset-8 transition-colors duration-300 hover:text-aurum hover:underline"
                  >
                    Book a Visit
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-ink/35">
            East &amp; west facing · G+2 configuration · Areas as per brochure
          </p>
        </Reveal>
      </div>
    </section>
  )
}
