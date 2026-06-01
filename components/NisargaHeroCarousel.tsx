'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const heroImages = [
  '/images/nisarga/hero-1.webp',
  '/images/nisarga/hero-2.webp',
  '/images/nisarga/hero-3.webp',
  '/images/nisarga/hero-7.webp',
]

function useSlideKeys(count: number) {
  const [keys, setKeys] = useState<number[]>(() => Array(count).fill(0))
  const activate = (i: number) =>
    setKeys(prev => prev.map((k, idx) => (idx === i ? k + 1 : k)))
  return [keys, activate] as const
}

export default function NisargaHeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [keys, activate] = useSlideKeys(heroImages.length)
  const currentRef = useRef(current)
  currentRef.current = current

  useEffect(() => {
    activate(0)
    const timer = setInterval(() => {
      const next = (currentRef.current + 1) % heroImages.length
      setCurrent(next)
      activate(next)
    }, 5000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goTo = (i: number) => {
    setCurrent(i)
    activate(i)
  }

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.4s ease-in-out',
            zIndex: i === current ? 1 : 0,
          }}
        >
          <div
            key={keys[i]}
            className="absolute inset-0"
            style={keys[i] > 0 ? { animation: 'kenburns 7s ease-out forwards' } : undefined}
          >
            <Image
              src={src}
              alt={`Nisarga — view ${i + 1}`}
              fill
              className="object-cover object-center"
              priority={i < 2}
              sizes="100vw"
            />
          </div>
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-transparent z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 pb-20 w-full">
        <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">A Project by SR Builders and Developers</p>
        <h1 className="font-serif text-6xl md:text-8xl text-parchment leading-tight">
          The Nisarga
        </h1>
        <p className="text-parchment/80 text-xl md:text-2xl mt-3 font-light">
          Where Green Meets Grandeur
        </p>
        <p className="text-parchment/60 mt-2 text-sm tracking-wide">
          4 &amp; 5 BHK Forestscape Villas · Patighanpur, Kollur, Hyderabad
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/enquire#site-visit"
            className="px-8 py-3.5 bg-gold text-forest text-sm tracking-widest uppercase font-semibold hover:bg-gold-dark transition-colors duration-200"
          >
            Book a Site Visit
          </Link>
          <a
            href="#villas"
            className="px-8 py-3.5 border border-parchment/40 text-parchment text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-200"
          >
            Explore Villas
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 right-12 z-20 flex gap-2 items-center">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: i === current ? 24 : 6,
              backgroundColor: i === current ? 'var(--color-gold)' : 'rgba(245,240,232,0.35)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
