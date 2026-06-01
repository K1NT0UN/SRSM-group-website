'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import FadeInView from '@/components/FadeInView'

export default function NisargaOverviewLightbox() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section className="bg-linen py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">Overview</p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
                Reserved by the Forest
              </h2>
              <p className="text-charcoal/60 mt-3 text-sm max-w-xl mx-auto">
                Each revealed in its own grandeur.
              </p>
            </div>
          </FadeInView>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FadeInView direction="left">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/nisarga/overview-left.webp"
                  alt="Nisarga — aerial township view"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </FadeInView>

            <FadeInView direction="right">
              <div
                className="relative aspect-[4/3] overflow-hidden cursor-zoom-in group"
                onClick={() => setOpen(true)}
              >
                <Image
                  src="/images/nisarga/masterplan.webp"
                  alt="Nisarga master plan"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-forest/80 text-parchment text-xs tracking-widest uppercase px-5 py-2.5">
                    Click to enlarge
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-forest/80 px-6 py-4">
                  <p className="font-serif text-lg text-gold">Master Plan</p>
                  <p className="text-parchment/60 text-xs mt-1">
                    17+ acres · Gated · Vaastu-compliant · Two clubhouses · Wide internal roads
                  </p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <button
              className="absolute top-5 right-6 text-parchment/70 hover:text-parchment text-3xl font-light leading-none"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <motion.div
              className="relative w-full max-w-6xl aspect-[4/3]"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src="/images/nisarga/masterplan.webp"
                alt="Nisarga master plan"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
