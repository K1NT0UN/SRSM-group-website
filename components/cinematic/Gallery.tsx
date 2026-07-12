'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Eyebrow, MaskLine, Reveal } from './motion'
import { useLenis } from './LenisProvider'

type Item = { src: string; w: number; h: number; caption: string }

const ITEMS: Item[] = [
  { src: '/images/nisarga/hero-1-desktop.webp', w: 4096, h: 1880, caption: 'The entrance at dusk' },
  { src: '/images/nisarga/landscape-lawn.webp', w: 2400, h: 1350, caption: 'Gardens at golden hour' },
  { src: '/images/nisarga/hero-5.webp', w: 1920, h: 1600, caption: 'A Nisarga villa' },
  { src: '/images/nisarga/landscape-dining.webp', w: 2400, h: 1350, caption: 'The outdoor kitchen & bar' },
  { src: '/images/nisarga/clubhouse-nfinity.webp', w: 1002, h: 800, caption: 'Club N’finity' },
  { src: '/images/nisarga/landscape-golf2.webp', w: 2400, h: 1350, caption: 'The golf green' },
  { src: '/images/nisarga/hero-2-desktop.webp', w: 4096, h: 1783, caption: 'The arrival court' },
  { src: '/images/nisarga/landscape-tennis.webp', w: 2400, h: 1350, caption: 'The courts' },
  { src: '/images/nisarga/landscape-party.webp', w: 2400, h: 1350, caption: 'The party lawn & amphitheatre' },
  { src: '/images/nisarga/hero-7-desktop.webp', w: 4096, h: 1807, caption: 'The boulevard at nightfall' },
  { src: '/images/nisarga/landscape-elderly.webp', w: 2400, h: 1350, caption: 'Quiet corners' },
  { src: '/images/nisarga/landscape-grassland.webp', w: 2400, h: 1350, caption: 'The grassland' },
]

/** Masonry that breathes, and a lightbox that goes fullscreen dark. */
export default function Gallery() {
  const lenis = useLenis()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpenIndex((i) => (i === null ? i : (i + dir + ITEMS.length) % ITEMS.length)),
    [],
  )

  useEffect(() => {
    if (openIndex === null) {
      lenis?.start()
      document.body.style.overflow = ''
      return
    }
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex, lenis, close, step])

  return (
    <section id="gallery" className="grain relative bg-midnight px-6 py-[14vh] text-ivory md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <Eyebrow className="mb-8">The Gallery</Eyebrow>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display font-light leading-[1.1]">
            <MaskLine className="text-[clamp(2.4rem,5.5vw,5rem)]">A place best</MaskLine>
            <MaskLine delay={0.15} className="text-[clamp(2.4rem,5.5vw,5rem)] italic text-ivory/70">
              seen slowly.
            </MaskLine>
          </h2>
          <Reveal delay={0.2}>
            <p className="max-w-xs font-body text-sm font-light leading-relaxed text-ivory/50">
              Artist&apos;s impressions of the township — entrances, gardens, clubhouses, dusk.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {ITEMS.map((item, i) => (
            <Reveal key={item.src} delay={(i % 3) * 0.08} amount={0.2}>
              <button
                onClick={() => setOpenIndex(i)}
                className="group relative block w-full cursor-zoom-in overflow-hidden text-left"
                aria-label={`Open image: ${item.caption}`}
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  width={item.w}
                  height={item.h}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full transform-gpu transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-4 left-5 translate-y-2 font-body text-[10px] uppercase tracking-[0.35em] text-ivory opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[120] flex flex-col bg-midnight-deep/97 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onClick={close}
            data-lenis-prevent
          >
            <div className="flex items-center justify-between px-6 py-5 md:px-10">
              <p className="font-body text-[10px] uppercase tracking-[0.4em] text-ivory/50">
                {String(openIndex + 1).padStart(2, '0')} / {String(ITEMS.length).padStart(2, '0')}
              </p>
              <button
                onClick={close}
                aria-label="Close gallery"
                className="font-body text-[11px] uppercase tracking-[0.4em] text-ivory/70 transition-colors hover:text-aurum"
              >
                Close ✕
              </button>
            </div>

            <div className="relative flex-1 px-4 pb-6 md:px-16" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={openIndex}
                  className="relative h-full w-full"
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={ITEMS[openIndex].src}
                    alt={ITEMS[openIndex].caption}
                    fill
                    sizes="100vw"
                    quality={90}
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / next */}
              <button
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 p-4 font-display text-3xl text-ivory/50 transition-colors hover:text-aurum md:left-4"
              >
                ←
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-4 font-display text-3xl text-ivory/50 transition-colors hover:text-aurum md:right-4"
              >
                →
              </button>
            </div>

            <p className="pb-8 text-center font-body text-[10px] uppercase tracking-[0.4em] text-ivory/50">
              {ITEMS[openIndex].caption} — artist&apos;s impression
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
