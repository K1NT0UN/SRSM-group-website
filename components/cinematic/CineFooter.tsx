'use client'

import Link from 'next/link'
import Image from 'next/image'
import { contact } from '@/lib/contact'
import { Reveal } from './motion'

const EXPLORE = [
  { href: '/projects', label: 'Projects' },
  { href: '/projects/nisarga', label: 'Nisarga' },
  { href: '/about', label: 'About the Group' },
  { href: '/enquire', label: 'Enquire' },
]

const ENTITIES = [
  'SR Builders and Developers',
  'SM Builders',
  'SM Builders and Developers',
  'SM Projects',
]

/** Dark, quiet close. */
export default function CineFooter() {
  return (
    <footer id="contact" className="grain relative bg-midnight-deep px-6 pb-10 pt-24 text-ivory/60 md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 border-b border-white/[0.08] pb-16 md:flex-row md:items-end">
            <div>
              <Image
                src="/images/srsm-logo.png"
                alt="SRSM Group"
                width={400}
                height={120}
                className="h-11 w-auto object-contain brightness-0 invert opacity-90"
              />
              <p className="mt-6 max-w-xs font-body text-sm font-light leading-relaxed text-ivory/45">
                Built on trust. Delivered with excellence — since 1999.
              </p>
            </div>
            <p className="font-display text-[clamp(1.6rem,3vw,2.5rem)] font-light italic leading-snug text-ivory/80">
              Where life finds its place.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-12 py-16 md:grid-cols-4">
          <Reveal delay={0.05}>
            <p className="mb-6 font-body text-[10px] font-semibold uppercase tracking-[0.5em] text-aurum">
              Explore
            </p>
            <ul className="space-y-3.5">
              {EXPLORE.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm font-light text-ivory/60 transition-colors duration-300 hover:text-aurum"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mb-6 font-body text-[10px] font-semibold uppercase tracking-[0.5em] text-aurum">
              Contact
            </p>
            <ul className="space-y-3.5 font-body text-sm font-light">
              <li>
                <a href={contact.phoneHref} className="transition-colors duration-300 hover:text-aurum">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-colors duration-300 hover:text-aurum"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-aurum"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mb-6 font-body text-[10px] font-semibold uppercase tracking-[0.5em] text-aurum">
              Office
            </p>
            <address className="space-y-1.5 font-body text-sm font-light not-italic leading-relaxed text-ivory/50">
              <p>{contact.address.line1}</p>
              <p>{contact.address.line2}</p>
              <p>{contact.address.line4}</p>
              <p>{contact.address.line5}</p>
            </address>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mb-6 font-body text-[10px] font-semibold uppercase tracking-[0.5em] text-aurum">
              The Group
            </p>
            <ul className="space-y-3.5 font-body text-sm font-light text-ivory/50">
              {ENTITIES.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-8 font-body text-[10px] font-light uppercase tracking-[0.3em] text-ivory/30 md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} SRSM Group · All rights reserved</p>
            <p>Nisarga · TS RERA P01100010902</p>
            <p>Hyderabad · Vizag · Bangalore</p>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
