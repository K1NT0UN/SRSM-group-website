'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { animate, motion, useMotionValue } from 'framer-motion'
import { Eyebrow, MaskLine, Reveal } from './motion'
import Magnetic from './Magnetic'
import { useLenis } from './LenisProvider'

const MIN_SCALE = 1
const MAX_SCALE = 3

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

/** Markers as drawn on the plan itself. */
const MARKERS = [
  { x: 78.4, y: 23.8, label: 'Clubhouse 01' },
  { x: 62.2, y: 73.9, label: 'Clubhouse 02' },
  { x: 80.5, y: 80.5, label: 'Grand Entrance' },
]

/** The seventeen acres, explorable — drag, zoom, wander. */
export default function Masterplan() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const [scale, setScale] = useState(1)
  const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 })
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Native wheel listener — React registers wheel as passive, preventDefault needs this.
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
    animate(x, clamp(x.get(), mx), { duration: 0.5, ease: 'easeOut' })
    animate(y, clamp(y.get(), my), { duration: 0.5, ease: 'easeOut' })
  }, [scale, x, y])

  function zoom(dir: 1 | -1) {
    setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * (dir > 0 ? 1.35 : 0.74))))
  }

  function reset() {
    setScale(1)
    animate(x, 0, { duration: 0.6, ease: 'easeOut' })
    animate(y, 0, { duration: 0.6, ease: 'easeOut' })
  }

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

        {/* Viewer */}
        <Reveal delay={0.1} className="mt-14">
          <div
            ref={viewportRef}
            data-lenis-prevent
            onMouseEnter={() => lenis?.stop()}
            onMouseLeave={() => lenis?.start()}
            className="relative h-[62vh] cursor-grab overflow-hidden border border-white/10 bg-[#0b2036] active:cursor-grabbing md:h-[74vh]"
          >
            <motion.div
              drag
              dragConstraints={constraints}
              dragElastic={0.05}
              dragTransition={{ power: 0.25, timeConstant: 180 }}
              style={{ x, y, scale }}
              className="absolute inset-0"
            >
              <div className="relative mx-auto aspect-[4/3] h-full max-w-full">
                <Image
                  src="/images/nisarga/masterplan.webp"
                  alt="Nisarga masterplan — plots, clubhouses, amenities and roads across 17+ acres"
                  fill
                  sizes="(max-width: 768px) 160vw, 100vw"
                  quality={90}
                  className="select-none object-contain"
                  draggable={false}
                />
                {MARKERS.map(({ x: mx, y: my, label }) => (
                  <div
                    key={label}
                    className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${mx}%`, top: `${my}%` }}
                  >
                    <span className="relative flex h-3 w-3 items-center justify-center">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-aurum/50 [animation-duration:2.2s]" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-aurum" />
                    </span>
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap border border-aurum/30 bg-midnight/85 px-3 py-1.5 font-body text-[9px] uppercase tracking-[0.3em] text-ivory opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Controls */}
            <div className="absolute bottom-5 right-5 flex flex-col gap-px border border-white/15 bg-midnight/70 backdrop-blur-md">
              <button onClick={() => zoom(1)} aria-label="Zoom in" className="flex h-11 w-11 items-center justify-center text-ivory/80 transition-colors hover:bg-white/10 hover:text-aurum">+</button>
              <button onClick={() => zoom(-1)} aria-label="Zoom out" className="flex h-11 w-11 items-center justify-center text-ivory/80 transition-colors hover:bg-white/10 hover:text-aurum">−</button>
              <button onClick={reset} aria-label="Reset view" className="flex h-11 w-11 items-center justify-center text-[10px] uppercase tracking-wider text-ivory/60 transition-colors hover:bg-white/10 hover:text-aurum">⟲</button>
            </div>

            <p className="pointer-events-none absolute bottom-5 left-5 font-body text-[9px] uppercase tracking-[0.35em] text-ivory/40">
              Drag to explore · Scroll to zoom
            </p>
          </div>
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
            <Link
              href="#visit"
              className="inline-block border border-aurum/60 px-9 py-4 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-aurum transition-colors duration-500 hover:bg-aurum hover:text-midnight"
            >
              Request Plot Availability
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
