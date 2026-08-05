'use client'

import Image from 'next/image'
import { contact } from '@/lib/contact'
import { Eyebrow, MaskLine, Reveal } from './motion'
import WhatsAppCTA from './WhatsAppCTA'

/** Get in touch — the letter-and-wax-seal contact experience. */
export default function EnquireContent() {
  return (
    <section className="grain relative overflow-hidden bg-midnight px-6 pb-[14vh] pt-52 text-ivory md:px-12">
      {/* Backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/backdrops/about-dawn.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-midnight/70 to-midnight" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-start gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Invitation */}
        <div>
          <Eyebrow className="mb-8">Get In Touch</Eyebrow>
          <h1 className="font-display font-light leading-[1.08]">
            <MaskLine className="text-[clamp(2.6rem,6vw,5.25rem)]">Enquire</MaskLine>
            <MaskLine delay={0.15} className="text-[clamp(2.6rem,6vw,5.25rem)] italic text-aurum">
              with us.
            </MaskLine>
          </h1>
          <Reveal delay={0.25} className="mt-8 max-w-md">
            <p className="font-body text-sm font-light leading-relaxed text-ivory/65">
              Write to us, or reserve a private walkthrough of Nisarga and our other addresses —
              our team calls back within the day.
            </p>
          </Reveal>

          <Reveal delay={0.35} className="mt-10 space-y-3">
            <p className="font-body text-sm font-light text-ivory/70">
              <a href={contact.phoneHref} className="transition-colors duration-300 hover:text-aurum">
                {contact.phone}
              </a>
            </p>
            <p className="font-body text-sm font-light text-ivory/70">
              <a href={`mailto:${contact.email}`} className="transition-colors duration-300 hover:text-aurum">
                {contact.email}
              </a>
            </p>
            <p className="max-w-xs font-body text-xs font-light leading-relaxed text-ivory/45">
              {contact.address.line1}, {contact.address.line2}
              <br />
              {contact.address.line3}
              <br />
              {contact.address.line4}
              <br />
              {contact.address.line5}
            </p>
          </Reveal>
        </div>

        {/* Reach us — WhatsApp */}
        <Reveal delay={0.2}>
          <WhatsAppCTA message="Hi, I'd like to enquire about Nisarga by SRSM Group." />
        </Reveal>
      </div>
    </section>
  )
}