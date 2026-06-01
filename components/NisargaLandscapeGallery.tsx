'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import FadeInView from '@/components/FadeInView'

const landscapeViews = [
  { label: 'Play Courts', image: '/images/nisarga/landscape-playcourts.jpg' },
  { label: 'Outdoor Dining', image: '/images/nisarga/landscape-dining.jpg' },
  { label: 'Elderly Seating', image: '/images/nisarga/landscape-elderly.jpg' },
  { label: 'Golf Course', image: '/images/nisarga/landscape-golf1.jpg' },
  { label: 'Golf Course 2', image: '/images/nisarga/landscape-golf2.jpg' },
  { label: 'Grassland', image: '/images/nisarga/landscape-grassland.jpg' },
  { label: 'Lawn & Meditation', image: '/images/nisarga/landscape-lawn.jpg' },
  { label: 'Party Lawn', image: '/images/nisarga/landscape-party.jpg' },
  { label: 'Tennis Court', image: '/images/nisarga/landscape-tennis.jpg' },
  { label: 'Basketball Court', image: '/images/nisarga/landscape-basketball.jpg' },
  { label: 'Volleyball Court', image: '/images/nisarga/landscape-volleyball.jpg' },
]

export default function NisargaLandscapeGallery() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="bg-linen py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeInView>
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">Open Air</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
              Life Beyond Four Walls.
            </h2>
          </div>
        </FadeInView>

        <AnimatePresence mode="wait">
          {active === null ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8"
            >
              {landscapeViews.map((view, i) => (
                <div
                  key={view.label}
                  onClick={() => setActive(i)}
                  className={`relative overflow-hidden cursor-pointer group ${
                    i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={view.image}
                    alt={view.label}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/50 transition-colors duration-300 flex items-end p-3">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-parchment text-xs tracking-wide uppercase">
                      {view.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`single-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[16/7] overflow-hidden mb-8"
            >
              <Image
                src={landscapeViews[active].image}
                alt={landscapeViews[active].label}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <button
                className="absolute top-4 right-4 bg-forest/80 hover:bg-forest text-parchment text-xs tracking-widest uppercase px-4 py-2 transition-colors duration-200"
                onClick={() => setActive(null)}
              >
                ← All Views
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-forest/80 px-6 py-4">
                <p className="font-serif text-lg text-gold">{landscapeViews[active].label}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {landscapeViews.map((view, i) => (
            <button
              key={view.label}
              onClick={() => setActive(i)}
              className={`text-xs tracking-wide uppercase py-2 px-3 border transition-colors duration-200 ${
                active === i
                  ? 'border-gold text-gold bg-gold/5'
                  : 'border-charcoal/20 text-charcoal/60 hover:border-gold hover:text-gold'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
