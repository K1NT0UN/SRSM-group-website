'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Eyebrow, MaskLine, Reveal } from './motion'

type SceneDef = {
  index: string
  eyebrow: string
  head: string
  body: string
  img: string
  alt: string
  objectPosition?: string
  list?: string[]
}

const SCENES: SceneDef[] = [
  {
    index: '01',
    eyebrow: 'Clubhouse · Club N’finity',
    head: 'Arrivals worth arriving for.',
    body:
      'Evolved luxury speaks here in the language of privilege — a banquet hall, private lobby and dining rooms that rise to every occasion.',
    img: '/images/nisarga/clubhouse-nfinite-exterior.webp',
    alt: 'Club N’finity clubhouse at dusk — artist’s impression',
    objectPosition: 'object-left',
    list: ['Banquet Hall', 'Dining Hall', 'Private Lobby', 'Seating Deck', 'Pantry', 'Grocery Store'],
  },
  {
    index: '02',
    eyebrow: 'Clubhouse · Club N’Spire',
    head: 'A ritual of stillness.',
    body:
      'Zen-like balance, deep detox, pure rejuvenation — twelve rooms shaped for body, mind and spirit.',
    img: '/images/nisarga/clubhouse-nfinity.webp',
    alt: 'Club N’Spire clubhouse — artist’s impression',
    list: ['Swimming Pool', 'Spa', 'Gym', 'Yoga', 'Library', 'Indoor Games', 'Terrace Garden', 'Roof Garden', 'Crèche', 'Cafeteria', 'Work Station', 'Parlour'],
  },
  {
    index: '03',
    eyebrow: 'The Green',
    head: 'Mornings on the green.',
    body: 'A golf lawn inside your own gates — dew underfoot, city nowhere in sight.',
    img: '/images/nisarga/landscape-golf1.webp',
    alt: 'Golf green at Nisarga — artist’s impression',
  },
  {
    index: '04',
    eyebrow: 'The Courts',
    head: 'Choose your game.',
    body: 'Tennis, pickleball, basketball, cricket, sand volleyball — every evening, a season.',
    img: '/images/nisarga/landscape-tennis.webp',
    alt: 'Tennis courts at Nisarga — artist’s impression',
  },
  {
    index: '05',
    eyebrow: 'The Gardens',
    head: 'Gardens that heal.',
    body: 'Healing gardens, meditation lawns and flower walks, laid out for slow afternoons.',
    img: '/images/nisarga/landscape-grassland.webp',
    alt: 'Meditation lawns and gardens at Nisarga — artist’s impression',
  },
  {
    index: '06',
    eyebrow: 'For the Young',
    head: 'Room to grow up wild.',
    body: 'Play courts, tot-lots, sand pits and a pet park — childhood, the outdoor kind.',
    img: '/images/nisarga/landscape-playcourts.webp',
    alt: 'Play courts at Nisarga — artist’s impression',
  },
]

function Scene({ scene, flip }: { scene: SceneDef; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const parallax = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div
      ref={ref}
      className={`flex min-h-[88vh] flex-col gap-10 py-[6vh] md:items-center md:gap-0 ${
        flip ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden md:w-[58%]">
        <motion.div
          initial={{ clipPath: 'inset(8% 4% 8% 4%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/3] overflow-hidden md:aspect-[10/11] lg:aspect-[4/3]"
        >
          <motion.div style={{ y: parallax }} className="absolute inset-x-0 -inset-y-[8%]">
            <Image
              src={scene.img}
              alt={scene.alt}
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className={`object-cover ${scene.objectPosition ?? ''}`}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Words */}
      <div className={`w-full md:w-[42%] ${flip ? 'md:pr-[7%]' : 'md:pl-[7%]'}`}>
        <Reveal y={16}>
          <p className="font-display text-6xl font-light text-white/10">{scene.index}</p>
        </Reveal>
        <Eyebrow className="mb-6 mt-2">{scene.eyebrow}</Eyebrow>
        <h3 className="font-display font-light leading-[1.1] text-ivory">
          <MaskLine className="text-[clamp(2rem,4vw,3.5rem)]">{scene.head}</MaskLine>
        </h3>
        <Reveal delay={0.15} className="mt-6 max-w-md">
          <p className="font-body text-sm font-light leading-relaxed text-ivory/60">{scene.body}</p>
        </Reveal>
        {scene.list && (
          <Reveal delay={0.25} className="mt-8">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {scene.list.map((item) => (
                <li key={item} className="flex items-baseline gap-3 font-body text-[13px] font-light text-ivory/55">
                  <span className="h-px w-3 shrink-0 translate-y-[-3px] bg-aurum/50" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </div>
  )
}

/** No icon grids. Every amenity gets its own breath. */
export default function Amenities() {
  return (
    <section className="grain relative bg-midnight-deep px-6 text-ivory md:px-12">
      {/* Statement */}
      <div className="mx-auto flex min-h-[70vh] max-w-[1600px] flex-col items-center justify-center py-[12vh] text-center">
        <Eyebrow className="mb-8">Privilege</Eyebrow>
        <h2 className="font-display font-light leading-[1.1]">
          <MaskLine className="text-[clamp(2.6rem,6.5vw,6rem)]">Fifty ways</MaskLine>
          <MaskLine delay={0.15} className="text-[clamp(2.6rem,6.5vw,6rem)] italic text-ivory/65">
            to do nothing at all.
          </MaskLine>
        </h2>
        <Reveal delay={0.3} className="mt-8 max-w-lg">
          <p className="font-body text-sm font-light leading-relaxed text-ivory/55">
            50+ amenities across two clubhouses and seventeen landscaped acres —
            each one given room, none of them shouting.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1600px] pb-[10vh]">
        {SCENES.map((scene, i) => (
          <Scene key={scene.index} scene={scene} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
