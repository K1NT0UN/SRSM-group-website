'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Eyebrow, ImageReveal, MaskLine, Reveal } from './motion'
import Magnetic from './Magnetic'
import WhatsAppGlyph from '@/components/WhatsAppGlyph'
import { nisargaWhatsApp } from '@/lib/contact'
import { currentProjects, pipelineProjects, completedProjects } from '@/lib/projects'

const NISARGA_FACTS = [
  { value: '17+', label: 'Acres' },
  { value: '4 & 5 BHK', label: 'Villas · G+2' },
  { value: '2', label: 'Clubhouses' },
  { value: '2028', label: 'Target Completion' },
]

export default function ProjectsContent() {
  const bandRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: bandRef, offset: ['start end', 'end start'] })
  const parallax = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const ongoing = currentProjects.filter((p) => p.name !== 'Nisarga')

  return (
    <>
      {/* Opening statement */}
      <section className="grain relative overflow-hidden bg-midnight px-6 pb-[12vh] pt-52 text-ivory md:px-12">
        {/* Backdrop — cranes and rising towers against the dawn sun, veiled into midnight */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/backdrops/projects-dawn.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/75 via-midnight/60 to-midnight" />
        </div>
        <div className="relative mx-auto max-w-[1600px]">
          <Eyebrow className="mb-10">The Portfolio</Eyebrow>
          <h1 className="font-display font-light leading-[1.08]">
            <MaskLine className="text-[clamp(2.8rem,7vw,6.5rem)]">Every project,</MaskLine>
            <MaskLine delay={0.15} className="text-[clamp(2.8rem,7vw,6.5rem)] italic text-ivory/70">
              a promise kept.
            </MaskLine>
          </h1>
          <Reveal delay={0.3} className="mt-10 max-w-2xl">
            <p className="font-body text-base font-light leading-relaxed text-ivory/65">
              24+ delivered across Hyderabad, Vizag and Bangalore. Three under construction.
              Five more taking shape. All of it self-funded, all of it engineered in-house.
            </p>
          </Reveal>
          <Reveal delay={0.4} className="mt-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <Magnetic>
                <a
                  href={nisargaWhatsApp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-aurum px-10 py-4.5 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-midnight transition-colors duration-500 hover:bg-ivory"
                >
                  <WhatsAppGlyph className="h-4 w-4" />
                  Get in touch
                </a>
              </Magnetic>
            </div>
          </Reveal>

          {/* Portfolio in numbers — the stats band of this page's architecture */}
          <div className="mt-20 grid grid-cols-2 border-t border-white/10 md:grid-cols-4">
            {[
              { value: '24+', label: 'Delivered' },
              { value: '3', label: 'Under Construction' },
              { value: '5', label: 'In Pipeline' },
              { value: '3', label: 'Cities' },
            ].map(({ value, label }, i) => (
              <Reveal key={label} delay={i * 0.08} className="px-2 py-8 text-center">
                <p className="font-display text-3xl font-light text-aurum md:text-4xl">{value}</p>
                <p className="mt-2 font-body text-[10px] uppercase tracking-[0.4em] text-ivory/55">{label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship — Nisarga */}
      <section className="bg-sand px-6 py-[14vh] text-ink md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <Eyebrow tone="ink" className="mb-8">The Flagship</Eyebrow>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="font-display font-light leading-[1.08] text-ink">
              <MaskLine className="text-[clamp(2.6rem,6vw,5.5rem)]">Nisarga.</MaskLine>
              <MaskLine delay={0.15} className="text-[clamp(1.8rem,3.6vw,3.25rem)] italic text-ink/70">
                Where green meets grandeur.
              </MaskLine>
            </h2>
            <Reveal delay={0.25} className="max-w-sm">
              <p className="font-body text-sm font-light leading-relaxed text-ink/70">
                A 17+ acre forestscape villa township in Kollur, on the ORR service road —
                by SR Builders and Developers. TS RERA P01100010902.
              </p>
            </Reveal>
          </div>

          <div ref={bandRef} className="mt-14">
            <ImageReveal className="aspect-[16/9] md:aspect-[21/8]">
              <motion.div style={{ y: parallax }} className="relative h-[112%] w-full -translate-y-[6%]">
                <Image
                  src="/images/nisarga/hero-2-desktop.webp"
                  alt="Nisarga arrival court at dusk — artist's impression"
                  fill
                  sizes="(max-width: 768px) 100vw, 92vw"
                  className="object-cover"
                />
              </motion.div>
            </ImageReveal>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4">
            {NISARGA_FACTS.map(({ value, label }, i) => (
              <Reveal key={label} delay={i * 0.1} className="border-t border-ink/25 px-2 py-8 text-center md:px-6">
                <p className="font-display text-3xl font-light text-ink md:text-4xl">{value}</p>
                <p className="mt-2 font-body text-[10px] uppercase tracking-[0.4em] text-ink/65">{label}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-12 text-center">
            <Magnetic>
              <Link
                href="/"
                className="inline-block bg-midnight px-10 py-4.5 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-ivory transition-colors duration-500 hover:bg-aurum hover:text-midnight"
              >
                Explore Nisarga
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* Ongoing */}
      <section className="grain relative bg-midnight px-6 py-[14vh] text-ivory md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow className="mb-8">Under Construction</Eyebrow>
          <h2 className="font-display font-light leading-[1.1]">
            <MaskLine className="text-[clamp(2.4rem,5.5vw,5rem)]">Currently rising.</MaskLine>
          </h2>

          <div className="mt-16">
            {ongoing.map(({ name, location, type, description }, i) => (
              <Reveal key={name} delay={i * 0.08} className="group border-t border-white/10 py-10 last:border-b">
                <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <p className="font-display text-3xl font-light text-ivory transition-colors duration-500 group-hover:text-aurum md:text-4xl">
                      {name}
                    </p>
                    <p className="mt-2 font-body text-[11px] font-medium uppercase tracking-[0.3em] text-ivory/50">
                      {location} · {type}
                    </p>
                    {description && (
                      <p className="mt-4 max-w-xl font-body text-sm font-light leading-relaxed text-ivory/60">
                        {description}
                      </p>
                    )}
                  </div>
                  <span className="inline-block border border-aurum/40 px-4 py-2 font-body text-[9px] font-semibold uppercase tracking-[0.35em] text-aurum">
                    Ongoing
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="bg-sand px-6 pb-[14vh] pt-[20vh] text-ink md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <Eyebrow tone="ink" className="mb-8">The Pipeline</Eyebrow>
          <h2 className="font-display font-light leading-[1.1] text-ink">
            <MaskLine className="text-[clamp(2.4rem,5.5vw,5rem)]">What comes next.</MaskLine>
          </h2>

          {/* 5 cards, no empty cells: 3 across, then 2 wider (grid of 6 → 2+2+2 / 3+3) */}
          <div className="mt-16 grid gap-px bg-ink/20 sm:grid-cols-2 lg:grid-cols-6">
            {pipelineProjects.map(({ name, location, type, description, targetCompletion }, i) => (
              <Reveal
                key={name}
                delay={i * 0.06}
                className={`bg-sand ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} ${i === 4 ? 'sm:col-span-2 lg:col-span-3' : ''}`}
              >
                <div className="flex h-full flex-col p-8 transition-colors duration-700 hover:bg-ivory md:p-10">
                  {/* Deeper gold than the shared aurum-deep token — that shade only hits 2.7:1
                      contrast on this light sand card, well under WCAG AA (4.5:1) */}
                  <p className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-[#6b5222]">
                    {type}
                  </p>
                  <p className="mt-4 font-display text-2xl font-normal leading-snug text-ink">{name}</p>
                  <p className="mt-1 font-body text-xs font-light uppercase tracking-[0.25em] text-ink/55">
                    {location}
                  </p>
                  {description && (
                    <p className="mt-4 font-body text-[13px] font-light leading-relaxed text-ink/70">
                      {description}
                    </p>
                  )}
                  {targetCompletion && (
                    <p className="mt-auto pt-6 font-body text-[10px] uppercase tracking-[0.35em] text-ink/55">
                      Target · {targetCompletion}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Completed index */}
      <section className="grain relative bg-midnight-deep px-6 py-[14vh] text-ivory md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow className="mb-8">Delivered</Eyebrow>
          <h2 className="font-display font-light leading-[1.1]">
            <MaskLine className="text-[clamp(2.4rem,5.5vw,5rem)]">Twenty-four,</MaskLine>
            <MaskLine delay={0.15} className="text-[clamp(2.4rem,5.5vw,5rem)] italic text-ivory/70">
              and counting.
            </MaskLine>
          </h2>

          <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {completedProjects.map(({ name, location, type, company, image, imageKind }, i) => (
              <Reveal key={`${name}-${location}`} delay={(i % 3) * 0.08} amount={0.15} className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-midnight">
                  {image ? (
                    <>
                      <Image
                        src={image}
                        alt={`${name} — ${location}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight-deep/50 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-30" />
                      {imageKind === 'render' && (
                        <span className="absolute bottom-3 right-3 font-body text-[8px] font-medium uppercase tracking-[0.3em] text-ivory/55">
                          Artist&apos;s impression
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 border border-white/[0.06] bg-[radial-gradient(ellipse_at_center,rgba(197,164,90,0.12),transparent_68%)]">
                      <span className="font-display text-6xl font-light text-aurum/35">
                        {name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                      </span>
                      <span className="font-body text-[9px] uppercase tracking-[0.4em] text-ivory/35">
                        SRSM Archive
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-baseline justify-between gap-4 pt-5">
                  <p className="font-display text-2xl font-light text-ivory/90 transition-colors duration-300 group-hover:text-aurum">
                    {name}
                  </p>
                  <p className="shrink-0 font-body text-[10px] font-light uppercase tracking-[0.25em] text-ivory/55">
                    {location}
                  </p>
                </div>
                <p className="mt-1.5 font-body text-[10px] font-light uppercase tracking-[0.25em] text-ivory/40">
                  {company} · {type}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sand px-6 py-[14vh] text-ink md:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 text-center">
          <h2 className="font-display font-light leading-[1.12] text-ink">
            <MaskLine className="text-[clamp(2.2rem,5vw,4.5rem)]">The next landmark</MaskLine>
            <MaskLine delay={0.15} className="text-[clamp(2.2rem,5vw,4.5rem)] italic text-ink/70">
              could be your address.
            </MaskLine>
          </h2>
          <Reveal delay={0.25}>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <Magnetic>
                <a
                  href={nisargaWhatsApp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-midnight px-10 py-4.5 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-ivory transition-colors duration-500 hover:bg-aurum hover:text-midnight"
                >
                  <WhatsAppGlyph className="h-4 w-4" />
                  Get in touch
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
