'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Eyebrow, MaskLine, Reveal } from './motion'
import Magnetic from './Magnetic'
import { entities } from '@/lib/entities'

const PRINCIPLES = [
  {
    index: '01',
    title: 'Debt-free, self-funded',
    body: 'No loans, no credit lines, no leverage. Every project is built on our own ground — financially and literally.',
  },
  {
    index: '02',
    title: 'In-house engineering',
    body: 'A dedicated civil engineering team walks every site, from the first excavation to the last coat of paint.',
  },
  {
    index: '03',
    title: 'Proven delivery',
    body: '24+ completed projects across residential, commercial and mixed-use — each one handed over, lived in, loved.',
  },
  {
    index: '04',
    title: 'Enduring relationships',
    body: 'Decades-long ties with architects, contractors and legal professionals. The same hands, project after project.',
  },
]

// Drop portraits into /public/images/leadership/ (3:4, ~800px wide) and set
// `image` — the frame renders a styled placeholder until then.
const LEADERSHIP: { name: string; role: string; note: string; image?: string }[] = [
  {
    name: 'Vasu Raavi',
    role: 'Founder & Promoter',
    note: 'From Nellore to Hyderabad — the vision behind 25 years of building.',
  },
  {
    name: 'Yashwanth Raavi',
    role: 'Co-Director, Projects & Development',
    note: 'BBA, Symbiosis International University · MIM, London',
  },
  {
    name: 'Manaswitha Raavi',
    role: 'In-house Architect & Design Head',
    note: 'B.Arch, Hyderabad · M.Des Interior Design, Florence',
  },
  {
    name: 'Raavi Rishi Chowdary',
    role: 'Director, Strategy & Investments',
    note: 'BBA, Christ University · MBA, London',
  },
  {
    name: 'Raavi Chidvilas',
    role: 'Director, Business Development',
    note: 'B.S. Civil Engineering, NC State University',
  },
]

export default function AboutContent() {
  return (
    <>
      {/* Opening statement */}
      <section className="grain relative overflow-hidden bg-midnight px-6 pb-[14vh] pt-52 text-ivory md:px-12">
        {/* Backdrop — the lone builder at dawn, veiled into midnight */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/backdrops/about-dawn.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/75 via-midnight/60 to-midnight" />
        </div>
        <div className="relative mx-auto max-w-[1600px]">
          <Eyebrow className="mb-10">The Group · Since 1999</Eyebrow>
          <h1 className="font-display font-light leading-[1.08]">
            <MaskLine className="text-[clamp(2.8rem,7vw,6.5rem)]">Built on trust.</MaskLine>
            <MaskLine delay={0.15} className="text-[clamp(2.8rem,7vw,6.5rem)] italic text-ivory/70">
              Delivered with excellence.
            </MaskLine>
          </h1>
          <Reveal delay={0.3} className="mt-10 max-w-2xl">
            <p className="font-body text-base font-light leading-relaxed text-ivory/65">
              Founded by Mr. Vasu Raavi, SRSM Group grew from humble beginnings in Nellore,
              Andhra Pradesh, into one of Hyderabad&apos;s most quietly trusted real estate groups —
              24+ residential and commercial projects delivered across Hyderabad, Vizag and
              Bangalore, without ever borrowing a rupee.
            </p>
          </Reveal>
          <Reveal delay={0.4} className="mt-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <Magnetic>
                <Link
                  href="/projects"
                  className="inline-block bg-aurum px-10 py-4.5 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-midnight transition-colors duration-500 hover:bg-ivory"
                >
                  See the Portfolio
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/#visit"
                  className="inline-block border border-ivory/30 px-10 py-4.5 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-ivory transition-colors duration-500 hover:border-aurum hover:text-aurum"
                >
                  Get in touch
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          {/* Numbers, engraved */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4">
            {[
              { value: '25+', label: 'Years of Legacy' },
              { value: '24+', label: 'Completed Projects' },
              { value: '4', label: 'Group Entities' },
              { value: '3', label: 'Cities' },
            ].map(({ value, label }, i) => (
              <Reveal key={label} delay={i * 0.1} className="border-t border-white/15 px-2 py-8 text-center md:px-6">
                <p className="font-display text-3xl font-light text-aurum md:text-4xl">{value}</p>
                <p className="mt-2 font-body text-[10px] uppercase tracking-[0.4em] text-ivory/55">{label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-sand px-6 py-[14vh] text-ink md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <Eyebrow tone="ink" className="mb-8">How We Build</Eyebrow>
          <h2 className="font-display font-light leading-[1.1] text-ink">
            <MaskLine className="text-[clamp(2.4rem,5.5vw,5rem)]">Four principles,</MaskLine>
            <MaskLine delay={0.15} className="text-[clamp(2.4rem,5.5vw,5rem)] italic text-ink/70">
              never negotiated.
            </MaskLine>
          </h2>

          <div className="mt-16 grid gap-px bg-ink/20 md:grid-cols-2">
            {PRINCIPLES.map(({ index, title, body }, i) => (
              <Reveal key={index} delay={i * 0.08} className="bg-sand">
                <div className="h-full p-10 transition-colors duration-700 hover:bg-ivory md:p-14">
                  <p className="font-display text-5xl font-light text-ink/15">{index}</p>
                  <p className="mt-6 font-display text-2xl font-normal text-ink md:text-3xl">{title}</p>
                  <p className="mt-4 max-w-md font-body text-sm font-light leading-relaxed text-ink/70">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="grain relative bg-midnight px-6 py-[14vh] text-ivory md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow className="mb-8">Leadership</Eyebrow>
          <h2 className="font-display font-light leading-[1.1]">
            <MaskLine className="text-[clamp(2.4rem,5.5vw,5rem)]">A family that builds,</MaskLine>
            <MaskLine delay={0.15} className="text-[clamp(2.4rem,5.5vw,5rem)] italic text-ivory/70">
              across generations.
            </MaskLine>
          </h2>

          <div className="mt-16">
            {LEADERSHIP.map(({ name, role, note, image }, i) => (
              <Reveal key={name} delay={i * 0.06} className="group border-t border-white/10 py-8 last:border-b">
                <div className="grid grid-cols-[96px_1fr] items-center gap-6 md:grid-cols-[128px_1fr_auto] md:gap-10">
                  <div className="relative aspect-[3/4] overflow-hidden border border-white/10 bg-white/[0.03]">
                    {image ? (
                      <Image
                        src={image}
                        alt={`${name} — ${role}`}
                        fill
                        sizes="128px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-2 bg-[radial-gradient(ellipse_at_center,rgba(197,164,90,0.10),transparent_70%)]">
                        <span className="font-display text-2xl font-light text-aurum/45 md:text-3xl">
                          {name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                        </span>
                        <span className="font-body text-[7px] uppercase tracking-[0.35em] text-ivory/30">
                          Portrait
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-display text-3xl font-light text-ivory transition-colors duration-500 group-hover:text-aurum md:text-4xl">
                      {name}
                    </p>
                    <p className="mt-2 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-aurum">
                      {role}
                    </p>
                    <p className="mt-3 font-body text-xs font-light leading-relaxed text-ivory/50 md:hidden">
                      {note}
                    </p>
                  </div>
                  <p className="hidden font-body text-xs font-light leading-relaxed text-ivory/50 md:block md:max-w-xs md:text-right">
                    {note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Entities */}
      <section className="bg-sand px-6 py-[14vh] text-ink md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <Eyebrow tone="ink" className="mb-8">The Entities</Eyebrow>
          <h2 className="font-display font-light leading-[1.1] text-ink">
            <MaskLine className="text-[clamp(2.4rem,5.5vw,5rem)]">Four names.</MaskLine>
            <MaskLine delay={0.15} className="text-[clamp(2.4rem,5.5vw,5rem)] italic text-ink/70">
              One signature.
            </MaskLine>
          </h2>

          <div className="mt-16 grid gap-px bg-ink/20 sm:grid-cols-2 lg:grid-cols-4">
            {entities.map(({ name, segment, description }, i) => (
              <Reveal key={name} delay={i * 0.08} className="bg-sand">
                <div className="flex h-full flex-col p-8 transition-colors duration-700 hover:bg-ivory md:p-10">
                  <p className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-aurum-deep">
                    {segment}
                  </p>
                  <p className="mt-4 font-display text-2xl font-normal leading-snug text-ink">{name}</p>
                  <p className="mt-4 font-body text-[13px] font-light leading-relaxed text-ink/70">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="grain relative bg-midnight-deep px-6 py-[16vh] text-ivory md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-10 text-center">Our Mission</Eyebrow>
          <Reveal>
            <blockquote className="font-display text-[clamp(1.7rem,3.6vw,3rem)] font-light italic leading-[1.35] text-ivory">
              &ldquo;To deliver homes and spaces that enrich lives — built with integrity, crafted
              with precision, and rooted in the communities we serve.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <p className="font-body text-[10px] uppercase tracking-[0.45em] text-ivory/45">
              Vasu Raavi · Founder &amp; Promoter
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-20">
            <Magnetic>
              <Link
                href="/projects"
                className="inline-block border border-aurum/60 px-10 py-4.5 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-aurum transition-colors duration-500 hover:bg-aurum hover:text-midnight"
              >
                See What We&apos;re Building
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  )
}
