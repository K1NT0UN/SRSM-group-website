'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Eyebrow, ImageReveal, MaskLine, Reveal } from './motion'
import NisargaLeadModal from '@/components/NisargaLeadModal'

type FloorAreas = { areas: { floor: string; sqft: string }[]; total: string }
type Villa = { size: string; tagline: string; east: FloorAreas; west: FloorAreas }

// Floor areas per the brochure. 200 Sq. Yd is identical for both facings;
// 239 and 300 differ between east and west.
const VILLAS: Villa[] = [
  {
    size: '200',
    tagline: 'Moody. Majestic. Meticulous.',
    east: {
      areas: [
        { floor: 'Ground floor', sqft: '1,300 sq. ft' },
        { floor: 'First floor', sqft: '1,275 sq. ft' },
        { floor: 'Second floor', sqft: '965 sq. ft' },
      ],
      total: '3,540 sq. ft',
    },
    west: {
      areas: [
        { floor: 'Ground floor', sqft: '1,300 sq. ft' },
        { floor: 'First floor', sqft: '1,275 sq. ft' },
        { floor: 'Second floor', sqft: '965 sq. ft' },
      ],
      total: '3,540 sq. ft',
    },
  },
  {
    size: '239',
    tagline: 'Elegant. Elevated. Enchanting.',
    east: {
      areas: [
        { floor: 'Ground floor', sqft: '1,593 sq. ft' },
        { floor: 'First floor', sqft: '1,571 sq. ft' },
        { floor: 'Second floor', sqft: '1,066 sq. ft' },
      ],
      total: '4,230 sq. ft',
    },
    west: {
      areas: [
        { floor: 'Ground floor', sqft: '1,590 sq. ft' },
        { floor: 'First floor', sqft: '1,570 sq. ft' },
        { floor: 'Second floor', sqft: '1,090 sq. ft' },
      ],
      total: '4,250 sq. ft',
    },
  },
  {
    size: '300',
    tagline: 'Serene. Sylvan. Sensuous.',
    east: {
      areas: [
        { floor: 'Ground floor', sqft: '1,760 sq. ft' },
        { floor: 'First floor', sqft: '1,740 sq. ft' },
        { floor: 'Second floor', sqft: '1,485 sq. ft' },
      ],
      total: '4,985 sq. ft',
    },
    west: {
      areas: [
        { floor: 'Ground floor', sqft: '1,760 sq. ft' },
        { floor: 'First floor', sqft: '1,625 sq. ft' },
        { floor: 'Second floor', sqft: '1,515 sq. ft' },
      ],
      total: '4,900 sq. ft',
    },
  },
]

/** The collection — three sizes, one standard; East/West areas per the brochure. */
export default function Villas() {
  const [facing, setFacing] = useState<'east' | 'west'>('east')

  return (
    <section id="villas" className="bg-sand px-6 py-[15vh] text-ink md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <Eyebrow tone="ink" className="mb-8">The Villa Collection</Eyebrow>

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="font-display font-light leading-[1.08] text-ink">
            <MaskLine className="text-[clamp(2.6rem,6vw,5.5rem)]">Three sizes.</MaskLine>
            <MaskLine delay={0.15} className="text-[clamp(2.6rem,6vw,5.5rem)] italic text-ink/70">
              One standard.
            </MaskLine>
          </h2>
          <Reveal delay={0.25} className="max-w-sm">
            <p className="font-body text-sm font-light leading-relaxed text-ink/70">
              4 &amp; 5 BHK forestscape villas, G+2, facing east or west — every one of them
              opening onto green.
            </p>
          </Reveal>
        </div>

        {/* Cinematic band — hero-5 is 1920×1600 (6:5); container matches so the full frame shows */}
        <div className="mt-16">
          <ImageReveal className="mx-auto aspect-[6/5] max-w-[880px]">
            <Image
              src="/images/nisarga/hero-5.webp"
              alt="A Nisarga villa at dusk — artist's impression"
              fill
              sizes="(max-width: 920px) 100vw, 880px"
              className="object-cover"
            />
          </ImageReveal>
        </div>

        {/* East / West facing toggle — 239 & 300 differ; 200 is the same either way */}
        <Reveal className="mt-16 flex items-center gap-4">
          <span className="font-body text-[10px] uppercase tracking-[0.35em] text-ink/45">Facing</span>
          <div className="flex border border-ink/20">
            {(['east', 'west'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFacing(f)}
                aria-pressed={facing === f}
                className={`px-5 py-2.5 font-body text-[10px] font-semibold uppercase tracking-[0.3em] transition-colors duration-300 ${
                  facing === f ? 'bg-ink text-ivory' : 'text-ink/55 hover:text-ink'
                }`}
              >
                {f} facing
              </button>
            ))}
          </div>
        </Reveal>

        {/* Spec cards */}
        <div className="mt-8 grid gap-px bg-ink/20 md:grid-cols-3">
          {VILLAS.map((villa, i) => {
            const cfg = villa[facing]
            return (
              <Reveal key={villa.size} delay={i * 0.12} className="group relative bg-ivory">
                <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-aurum transition-transform duration-700 ease-out group-hover:scale-x-100" />
                <div className="flex h-full flex-col p-10 transition-all duration-700 group-hover:-translate-y-1.5 group-hover:bg-white md:p-12">
                  <p className="font-display text-[clamp(4rem,7vw,6.5rem)] font-light leading-none text-ink">
                    {villa.size}
                    <span className="ml-3 align-middle font-body text-[10px] uppercase tracking-[0.4em] text-ink/45">
                      Sq. Yd
                    </span>
                  </p>
                  <p className="mt-4 font-display text-lg italic text-aurum-deep">{villa.tagline}</p>

                  <div className="mt-10 space-y-3">
                    {cfg.areas.map(({ floor, sqft }) => (
                      <div
                        key={floor}
                        className="flex items-baseline justify-between border-b border-ink/15 pb-3 font-body text-sm font-light text-ink/70"
                      >
                        <span>{floor}</span>
                        <span className="text-ink">{sqft}</span>
                      </div>
                    ))}
                    <div className="flex items-baseline justify-between pt-2">
                      <span className="font-body text-[10px] uppercase tracking-[0.35em] text-ink/60">
                        Total built-up
                      </span>
                      <span className="font-display text-2xl text-ink">{cfg.total}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-6 pt-2">
                    <NisargaLeadModal
                      variant="enquiry"
                      label="Request Brochure"
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
            )
          })}
        </div>

        <Reveal className="mt-8">
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-ink/55">
            East &amp; west facing · G+2 configuration · Areas as per brochure
          </p>
        </Reveal>
      </div>
    </section>
  )
}
