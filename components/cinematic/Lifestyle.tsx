'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { EASE } from './motion'

const SCENES = [
  {
    key: 'Morning',
    img: '/images/nisarga/landscape-lawn.webp',
    head: 'Wake up to birds instead of traffic.',
    sub: 'Sunlight through the canopy. Coffee in the garden. The day arrives gently.',
  },
  {
    key: 'Evening',
    img: '/images/nisarga/landscape-dining.webp',
    head: 'Evenings made for togetherness.',
    sub: 'The outdoor kitchen hums, the light turns to honey, and the day slows down.',
  },
  {
    key: 'Weekend',
    img: '/images/nisarga/landscape-party.webp',
    head: 'Space for every generation.',
    sub: 'Open lawns, an amphitheatre under the sky, and nowhere anyone needs to be.',
  },
  {
    key: 'Night',
    img: '/images/nisarga/hero-7-desktop.webp',
    head: 'Come home to peace.',
    sub: 'Warm windows. Quiet streets. The forest keeping watch.',
  },
]

const N = SCENES.length

function Scene({
  progress,
  index,
  img,
  alt,
}: {
  progress: MotionValue<number>
  index: number
  img: string
  alt: string
}) {
  const start = index / N
  const end = (index + 1) / N
  const fade = 0.16 / N

  const opacity = useTransform(
    progress,
    index === 0
      ? [start, end - fade, end]
      : index === N - 1
        ? [start, start + fade, end]
        : [start, start + fade, end - fade, end],
    index === 0 ? [1, 1, 0] : index === N - 1 ? [0, 1, 1] : [0, 1, 1, 0],
  )
  const scale = useTransform(progress, [start, end], [1.1, 1])

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image src={img} alt={alt} fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/30 via-transparent to-midnight/80" />
    </motion.div>
  )
}

/** A day at Nisarga — four scenes, one held frame. */
export default function Lifestyle() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(N - 1, Math.floor(v * N))
    if (next !== active) setActive(next)
  })

  return (
    <div ref={ref} className="relative h-[440vh] bg-midnight" aria-label="A day at Nisarga">
      <div className="sticky top-0 h-screen overflow-hidden">
        {SCENES.map((scene, i) => (
          <Scene key={scene.key} progress={scrollYProgress} index={i} img={scene.img} alt={scene.head} />
        ))}

        {/* Narration */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-16 md:px-12 md:pb-20">
          <div className="mx-auto max-w-[1600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <p className="mb-4 font-body text-[10px] font-medium uppercase tracking-[0.55em] text-aurum md:text-[11px]">
                  {String(active + 1).padStart(2, '0')} · {SCENES[active].key}
                </p>
                <div className="overflow-hidden">
                  <motion.h2
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-40%', opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="max-w-4xl font-display text-[clamp(2.2rem,5.5vw,5rem)] font-light leading-[1.06] text-ivory"
                  >
                    {SCENES[active].head}
                  </motion.h2>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                  className="mt-5 max-w-xl font-body text-sm font-light leading-relaxed text-ivory/65"
                >
                  {SCENES[active].sub}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Scene index */}
            <div className="mt-10 flex items-center gap-3" aria-hidden="true">
              {SCENES.map((s, i) => (
                <span
                  key={s.key}
                  className={`h-px transition-all duration-700 ${
                    i === active ? 'w-14 bg-aurum' : 'w-6 bg-ivory/25'
                  }`}
                />
              ))}
              <span className="ml-4 font-body text-[10px] tracking-[0.3em] text-ivory/40">
                {String(active + 1).padStart(2, '0')} — {String(N).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
