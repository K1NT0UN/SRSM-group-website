'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from './LenisProvider'
import { EASE } from './motion'

const LINKS: { href: string; label: string }[] = [
  { href: '/projects', label: 'Projects' },
  { href: '#nisarga', label: 'Nisarga' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#location', label: 'Location' },
  { href: '/about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

/**
 * Floating navigation: transparent over the hero, glass after scroll,
 * retreats while scrolling down and returns on the first upward gesture.
 */
export default function CineNav() {
  const lenis = useLenis()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 64)
      setHidden(y > lastY && y > 240 && Math.abs(y - lastY) > 4)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function onAnchor(e: React.MouseEvent, href: string) {
    if (!href.startsWith('#')) {
      setOpen(false)
      return
    }
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    if (!el) return
    if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.8 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[90] transition-[background-color,backdrop-filter,border-color] duration-700 ${
          scrolled && !open
            ? 'bg-midnight/65 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent border-b border-transparent'
        }`}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <nav className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-12">
          <Link href="/" aria-label="SRSM Group — home" className="shrink-0">
            <Image
              src="/images/srsm-logo.png"
              alt="SRSM Group"
              width={400}
              height={120}
              priority
              className="h-9 w-auto object-contain brightness-0 invert opacity-90"
            />
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={(e) => onAnchor(e, href)}
                className="group relative font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ivory/70 transition-colors duration-500 hover:text-ivory"
              >
                {label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-aurum transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="#visit"
              onClick={(e) => onAnchor(e, '#visit')}
              className="ml-3 border border-aurum/60 px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-aurum transition-all duration-500 hover:bg-aurum hover:text-midnight"
            >
              Book a Private Visit
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            className="flex flex-col gap-[7px] p-2 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={`block h-px w-7 bg-ivory transition-all duration-500 ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-px w-7 bg-ivory transition-all duration-500 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-7 bg-ivory transition-all duration-500 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </nav>
      </motion.header>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[85] flex flex-col justify-end bg-midnight-deep/95 px-8 pb-16 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <nav className="flex flex-col gap-2">
              {LINKS.map(({ href, label }, i) => (
                <div key={label} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.08 + i * 0.06 }}
                  >
                    <Link
                      href={href}
                      onClick={(e) => onAnchor(e, href)}
                      className="font-display text-5xl font-light text-ivory transition-colors duration-300 active:text-aurum"
                    >
                      {label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              className="mt-12"
            >
              <Link
                href="#visit"
                onClick={(e) => onAnchor(e, '#visit')}
                className="inline-block border border-aurum px-8 py-4 font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-aurum"
              >
                Book a Private Visit
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
