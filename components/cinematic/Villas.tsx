'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Eyebrow, ImageReveal, MaskLine, Reveal } from './motion'
import WhatsAppGlyph from '@/components/WhatsAppGlyph'
import { nisargaWhatsApp } from '@/lib/contact'

type FloorAreas = { areas: { floor: string; sqft: string }[]; total: string }
type Villa = { size: string; tagline: string; east: FloorAreas; west: FloorAreas }

// Rate per sq. ft on built-up area. West is the base; east carries a Vastu
// premium. We show the RATE and never the computed total — totals, specs and
// payment plans are deliberately a WhatsApp conversation, and the built-up
// areas above are not final. See AGENTS.md.
const EAST_PREMIUM = 300
const BASE_RATE = 12999
const RATES = { west: BASE_RATE, east: BASE_RATE + EAST_PREMIUM } as const

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

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
  // Opens on west: it is the base rate (Rs 12,999), so the first figure a
  // visitor sees is the headline number rather than the east premium.
  const [facing, setFacing] = useState<'east' | 'west'>('west')

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
        <div className="mt-8 grid gap-px bg-white/10 md:grid-cols-3">
          {VILLAS.map((villa, i) => {
            const cfg = villa[facing]
            return (
              <Reveal key={villa.size} delay={i * 0.12} className="group relative bg-[#0c2340]">
                <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-aurum transition-transform duration-700 ease-out group-hover:scale-x-100" />
                <div className="flex h-full flex-col p-10 transition-all duration-700 group-hover:-translate-y-1.5 group-hover:bg-[#0f2c4f] md:p-12">
                  <p className="font-display text-[clamp(4rem,7vw,6.5rem)] font-light leading-none text-aurum">
                    {villa.size}
                    <span className="ml-3 align-middle font-body text-[10px] uppercase tracking-[0.4em] text-ivory/45">
                      Sq. Yd
                    </span>
                  </p>
                  <p className="mt-4 font-display text-lg italic text-aurum">{villa.tagline}</p>

                  <div className="mt-10 space-y-3">
                    {cfg.areas.map(({ floor, sqft }) => (
                      <div
                        key={floor}
                        className="flex items-baseline justify-between border-b border-white/12 pb-3 font-body text-sm font-light text-ivory/70"
                      >
                        <span>{floor}</span>
                        <span className="text-ivory">{sqft}</span>
                      </div>
                    ))}
                    <div className="flex items-baseline justify-between pt-2">
                      <span className="font-body text-[10px] uppercase tracking-[0.35em] text-ivory/60">
                        Total built-up
                      </span>
                      <span className="font-display text-2xl text-ivory">{cfg.total}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-6 pt-2">
                    <a
                      href={nisargaWhatsApp(`Hi, I'm interested in the Nisarga ${villa.size} Sq. Yd villa.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory underline-offset-8 transition-colors duration-300 hover:text-aurum hover:underline"
                    >
                      <WhatsAppGlyph className="h-3.5 w-3.5" />
                      Get in touch
                    </a>
                  </div>
                </div>
              </Reveal>
            )
          })}


          {/* Base price — the starting rate, common to every plot, so it belongs
              to the collection rather than to any single villa. Full-width row
              inside the same grid, so the 1px divider reads it as the tiles'
              footer. Still driven by the facing toggle: west is the base, east
              adds the premium.
              NOTE: corner and garden-view plots carry additional charges. Those
              are deliberately NOT itemised here — the page shows the base rate
              and sends the buyer to the team for the full breakdown. Do not add
              a "same rate for every plot" line back in; it is not true. */}
          <Reveal delay={0.4} className="bg-[#0c2340] md:col-span-3">
            <div className="flex flex-col gap-7 p-10 md:flex-row md:items-end md:justify-between md:p-12">
              <div>
                <p className="font-body text-[10px] font-medium uppercase tracking-[0.35em] text-ivory/55">
                  Base price · all plots
                </p>
                <p className="mt-3 flex items-baseline gap-2 font-body font-semibold tabular-nums tracking-[-0.02em] text-aurum">
                  <span className="text-[clamp(2.1rem,4.2vw,3.1rem)] leading-none">
                    {inr(RATES[facing])}
                  </span>
                  <span className="font-body text-xs font-medium tracking-[0.06em] text-ivory/60">
                    / sq.ft
                  </span>
                </p>
              </div>
              <p className="max-w-md font-body text-xs font-light leading-relaxed text-ivory/65 md:text-right">
                {facing === 'east'
                  ? `East facing — the ${inr(BASE_RATE)} base rate plus a ${inr(EAST_PREMIUM)} per sq.ft premium.`
                  : `West facing — the ${inr(BASE_RATE)} base rate.`}{' '}
                Reach out to our team for a detailed breakdown.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8 space-y-3">
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-ink/70">
            East &amp; west facing · G+2 configuration · Areas as per brochure
          </p>
          <p className="max-w-2xl font-body text-xs font-light leading-relaxed text-ink/70">
            All prices shown here are indicative, not final — they may be revised
            periodically in line with prevailing market rates. Reach out to us on{' '}
            {/* Full ink rather than gold: aurum on the sand ground is 1.83:1.
                Darker than the surrounding ink/70 copy and underlined, so the
                link never signals itself by colour alone. */}
            <a
              href={nisargaWhatsApp(
                "Hi, could I have a detailed price breakdown for the Nisarga villas?",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="font-normal text-ink underline decoration-ink/40 underline-offset-4 transition-colors duration-300 hover:decoration-ink"
            >
              WhatsApp
            </a>{' '}
            for a detailed price breakdown.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
