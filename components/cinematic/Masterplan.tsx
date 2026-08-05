'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { animate, AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { Eyebrow, MaskLine, Reveal } from './motion'
import Magnetic from './Magnetic'
import WhatsAppGlyph from '@/components/WhatsAppGlyph'
import { nisargaWhatsApp } from '@/lib/contact'
import { useLenis } from './LenisProvider'

const MASTERPLAN_SRC = '/images/nisarga/masterplan.webp'
const MIN_SCALE = 1
const MAX_SCALE = 5 // plot numbers are small — allow a deeper zoom
const PLAN_RATIO = '3640 / 4000' // portrait masterplan artwork

/** Real zones from the Nisarga masterplan legend. */
const LEGEND = [
  {
    group: 'Nature & Calm',
    items: ['Healing Garden', 'Flower Garden', 'Lawn & Meditation Area', 'Grass Land', 'Orchids', 'Party Lawn'],
  },
  {
    group: 'Play & Sport',
    items: ['Golf', 'Tennis', 'Pickle Ball', 'Cricket Pitch', 'Basketball', 'Sand Volleyball', 'Outdoor Gym & Reflexology', 'Play Courts'],
  },
  {
    group: 'Life & Gathering',
    items: ['Entrance Court', 'Water Feature', 'Open-Air Theatre', 'Outdoor Kitchen & Bar', 'Multipurpose Lawn', 'Pet Park', 'Elderly Seating Court', 'Outdoor Work Stations'],
  },
]

/** Fullscreen lightbox — opened deliberately by a click; zoom + pan live here,
 *  so the inline page scroll is never hijacked. */
function MasterplanViewer({ onClose }: { onClose: () => void }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const [scale, setScale] = useState(1)
  const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 })
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Lock the page + smooth-scroll while the lightbox is open; Esc to close.
  useEffect(() => {
    lenis?.stop()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [lenis, onClose])

  // Wheel to zoom — non-passive so we can preventDefault inside the lightbox only.
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * (e.deltaY < 0 ? 1.1 : 0.9))))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Recompute pan limits when the zoom changes; ease the plan back inside them.
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const mx = (el.clientWidth * (scale - 1)) / 2
    const my = (el.clientHeight * (scale - 1)) / 2
    setConstraints({ left: -mx, right: mx, top: -my, bottom: my })
    const clamp = (v: number, m: number) => Math.min(m, Math.max(-m, v))
    animate(x, clamp(x.get(), mx), { duration: 0.4, ease: 'easeOut' })
    animate(y, clamp(y.get(), my), { duration: 0.4, ease: 'easeOut' })
  }, [scale, x, y])

  function zoom(dir: 1 | -1) {
    setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * (dir > 0 ? 1.35 : 0.74))))
  }

  function reset() {
    setScale(1)
    animate(x, 0, { duration: 0.5, ease: 'easeOut' })
    animate(y, 0, { duration: 0.5, ease: 'easeOut' })
  }

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex flex-col bg-midnight/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <p className="font-body text-[10px] uppercase tracking-[0.4em] text-ivory/60">Nisarga Masterplan</p>
        <button
          onClick={onClose}
          aria-label="Close masterplan"
          className="flex h-10 w-10 items-center justify-center text-2xl leading-none text-ivory/70 transition-colors hover:text-aurum"
        >
          ×
        </button>
      </div>

      {/* Zoom + pan viewport */}
      <div
        ref={viewportRef}
        className="relative flex flex-1 cursor-grab items-center justify-center overflow-hidden active:cursor-grabbing"
      >
        <motion.div
          drag
          dragConstraints={constraints}
          dragElastic={0.05}
          dragTransition={{ power: 0.25, timeConstant: 180 }}
          style={{ x, y, scale }}
          className="absolute inset-0"
        >
          <Image
            src={MASTERPLAN_SRC}
            alt="Nisarga masterplan — plots, clubhouses, amenities and roads across 17+ acres"
            fill
            sizes="100vw"
            quality={95}
            className="select-none object-contain"
            draggable={false}
          />
        </motion.div>

        {/* Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-px border border-white/15 bg-midnight/70 backdrop-blur-md">
          <button onClick={() => zoom(1)} aria-label="Zoom in" className="flex h-11 w-11 items-center justify-center text-ivory/80 transition-colors hover:bg-white/10 hover:text-aurum">+</button>
          <button onClick={() => zoom(-1)} aria-label="Zoom out" className="flex h-11 w-11 items-center justify-center text-ivory/80 transition-colors hover:bg-white/10 hover:text-aurum">−</button>
          <button onClick={reset} aria-label="Reset view" className="flex h-11 w-11 items-center justify-center text-[10px] uppercase tracking-wider text-ivory/60 transition-colors hover:bg-white/10 hover:text-aurum">⟲</button>
        </div>

        <p className="pointer-events-none absolute bottom-6 left-6 font-body text-[9px] uppercase tracking-[0.35em] text-ivory/40">
          Drag to pan · Scroll to zoom · Esc to close
        </p>
      </div>
    </motion.div>
  )
}

/** The seventeen acres — a still preview inline; click to enlarge and explore. */
export default function Masterplan() {
  const [open, setOpen] = useState(false)

  return (
    <section className="grain relative bg-midnight px-6 py-[14vh] text-ivory md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <Eyebrow className="mb-8">The Masterplan</Eyebrow>
        <h2 className="max-w-4xl font-display font-light leading-[1.1]">
          <MaskLine className="text-[clamp(2.4rem,5.5vw,5rem)]">Seventeen acres,</MaskLine>
          <MaskLine delay={0.15} className="text-[clamp(2.4rem,5.5vw,5rem)] italic text-ivory/70">
            composed like a garden.
          </MaskLine>
        </h2>

        <Reveal delay={0.2} className="mt-6 max-w-xl">
          <p className="font-body text-sm font-light leading-relaxed text-ivory/60">
            Every villa faces east or west. Every street ends in green. Two clubhouses anchor
            the township — one for celebration, one for stillness.
          </p>
        </Reveal>

        {/* Inline preview — a plain image that opens the interactive lightbox on click */}
        <Reveal delay={0.1} className="mt-14">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Enlarge the masterplan to zoom and explore"
            style={{ aspectRatio: PLAN_RATIO }}
            className="group relative mx-auto block w-full max-w-[760px] cursor-zoom-in overflow-hidden border border-white/10 bg-[#e9ecdf]"
          >
            <Image
              src={MASTERPLAN_SRC}
              alt="Nisarga masterplan — plots, clubhouses, amenities and roads across 17+ acres"
              fill
              sizes="(max-width: 768px) 100vw, 760px"
              quality={90}
              className="object-contain"
            />

            {/* Affordances — always subtly present, brighten on hover. No zoom on hover. */}
            <span className="pointer-events-none absolute inset-0 bg-midnight/0 transition-colors duration-500 group-hover:bg-midnight/10" />
            <span className="pointer-events-none absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-midnight/20 bg-white/70 text-midnight/70 backdrop-blur-md transition-colors duration-500 group-hover:border-aurum group-hover:text-aurum-deep">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5" />
              </svg>
            </span>
            <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 border border-midnight/15 bg-white/75 px-5 py-2.5 font-body text-[10px] uppercase tracking-[0.35em] text-midnight/80 backdrop-blur-md transition-colors duration-500 group-hover:border-aurum/60 group-hover:text-aurum-deep">
              Click to enlarge
            </span>
          </button>
        </Reveal>

        {/* Legend — the real one */}
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {LEGEND.map(({ group, items }, gi) => (
            <Reveal key={group} delay={gi * 0.12}>
              <p className="mb-5 font-body text-[10px] font-medium uppercase tracking-[0.5em] text-aurum">
                {group}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item} className="flex items-baseline gap-3 font-body text-sm font-light text-ivory/65">
                    <span className="h-px w-4 shrink-0 translate-y-[-3px] bg-aurum/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center">
          <p className="max-w-md font-body text-xs font-light leading-relaxed text-ivory/45">
            Masterplan is illustrative. Plots range from 200 to 313 sq. yd. on 30&#8242; and 40&#8242; wide roads.
          </p>
          <Magnetic>
            <a
              href={nisargaWhatsApp("Hi, I'd like to check plot availability at Nisarga.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-aurum/60 px-9 py-4 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-aurum transition-colors duration-500 hover:bg-aurum hover:text-midnight"
            >
              <WhatsAppGlyph className="h-4 w-4" />
              Get in touch
            </a>
          </Magnetic>
        </Reveal>
      </div>

      <AnimatePresence>
        {open && <MasterplanViewer onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
