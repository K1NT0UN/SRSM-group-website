'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Magnetic from './Magnetic'
import { EASE, MaskLine } from './motion'
import { useLenis } from './LenisProvider'

/** Fullscreen cinematic opening — film, slow drift, typography that rises. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const lenis = useLenis()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const filmScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  function toAnchor(e: React.MouseEvent, href: string) {
    e.preventDefault()
    const el = document.querySelector(href)
    if (!el) return
    if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.8 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-midnight">
      {/* Film — dawn over the township, drifting slowly */}
      <motion.div style={{ scale: filmScale }} className="absolute inset-0" aria-hidden="true">
        <div
          className="hero-drift absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/backdrops/home-dawn.webp')" }}
        />
      </motion.div>

      {/* Veils — quiet at the centre, weighted at the edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/55 via-midnight/5 to-midnight" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_20%,transparent_40%,rgba(4,16,29,0.55)_100%)]" aria-hidden="true" />

      {/* Composition */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
          className="mb-8 flex items-center gap-5 font-body text-[10px] font-medium uppercase tracking-[0.6em] text-aurum/90 md:text-[11px]"
        >
          <span className="hidden h-px w-14 bg-aurum/50 md:block" />
          SRSM Group
          <span className="hidden h-px w-14 bg-aurum/50 md:block" />
        </motion.p>

        <h1 className="font-display text-[clamp(3rem,9.5vw,8.75rem)] font-light uppercase leading-[1.04] tracking-[0.06em] text-ivory">
          <MaskLine delay={0.7}>Where life</MaskLine>
          <MaskLine delay={0.85}>finds its place</MaskLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 1.25 }}
          className="mt-8 font-body text-sm font-light tracking-[0.02em] text-ivory/70 md:text-base"
        >
          Luxury villas crafted for generations.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 1.35 }}
          className="mt-4 font-body text-[10px] font-medium uppercase tracking-[0.35em] text-ivory/50 md:text-[11px]"
        >
          Builders &amp; Developers · Hyderabad · Vizag · Bangalore
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 1.5 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <Magnetic>
            <Link
              href="#nisarga"
              onClick={(e) => toAnchor(e, '#nisarga')}
              className="inline-block bg-aurum px-10 py-4.5 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-midnight transition-colors duration-500 hover:bg-ivory"
            >
              Explore Nisarga
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="#visit"
              onClick={(e) => toAnchor(e, '#visit')}
              className="inline-block border border-ivory/30 px-10 py-4.5 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-ivory transition-colors duration-500 hover:border-aurum hover:text-aurum"
            >
              Book Private Visit
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/projects"
              className="inline-block border border-ivory/30 px-10 py-4.5 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-ivory transition-colors duration-500 hover:border-aurum hover:text-aurum"
            >
              View Portfolio
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 2.2 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="font-body text-[9px] uppercase tracking-[0.5em] text-ivory/40">Scroll</span>
        <span className="relative block h-14 w-px overflow-hidden bg-ivory/15">
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-px bg-aurum"
            animate={{ y: ['-100%', '250%'] }}
            transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  )
}
