import Image from 'next/image'
import { NISARGA_TEL, NISARGA_TEL_HREF } from '@/lib/contact'
import WhatsAppCTA from './WhatsAppCTA'
import { Eyebrow, MaskLine, Reveal } from './motion'

/** The invitation — reach us on WhatsApp. */
export default function BookVisit() {
  return (
    <section id="visit" className="relative overflow-hidden bg-midnight px-6 py-[14vh] text-ivory md:px-12">
      {/* Backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/nisarga/hero-2-desktop.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/92 to-midnight/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-transparent to-midnight" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Invitation */}
        <div>
          <Eyebrow className="mb-8">Get In Touch</Eyebrow>
          <h2 className="font-display font-light leading-[1.08]">
            <MaskLine className="text-[clamp(2.6rem,5.5vw,5.25rem)]">See it in the</MaskLine>
            <MaskLine delay={0.15} className="text-[clamp(2.6rem,5.5vw,5.25rem)] italic text-aurum">
              golden hour.
            </MaskLine>
          </h2>
          <Reveal delay={0.25} className="mt-8 max-w-md">
            <p className="font-body text-sm font-light leading-relaxed text-ivory/60">
              Message us on WhatsApp for the brochure, pricing and plot availability — or to arrange
              an unhurried walkthrough of the township and its two clubhouses. Our team replies
              straight away.
            </p>
          </Reveal>
          <Reveal delay={0.35} className="mt-10 space-y-3">
            <p className="font-body text-sm font-light text-ivory/70">
              <a href={NISARGA_TEL_HREF} className="transition-colors duration-300 hover:text-aurum">
                {NISARGA_TEL}
              </a>
            </p>
            <p className="font-body text-sm font-light text-ivory/70">
              <a
                href="mailto:srbuildersnisarga@gmail.com"
                className="transition-colors duration-300 hover:text-aurum"
              >
                srbuildersnisarga@gmail.com
              </a>
            </p>
            <p className="pt-2 font-body text-[10px] uppercase tracking-[0.4em] text-ivory/35">
              TS RERA · P01100010902
            </p>
          </Reveal>
        </div>

        {/* Reach us — WhatsApp */}
        <Reveal delay={0.2}>
          <WhatsAppCTA message="Hi, I'd like to get in touch about Nisarga." />
        </Reveal>
      </div>
    </section>
  )
}
