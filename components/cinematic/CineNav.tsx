'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from './LenisProvider'
import { EASE } from './motion'
import SrsmLogo from '@/components/SrsmLogo'
import WhatsAppGlyph from '@/components/WhatsAppGlyph'
import { nisargaWhatsApp } from '@/lib/contact'

type NavLink = { href: string; label: string; children?: { href: string; label: string }[] }

const LINKS: NavLink[] = [
  { href: '/projects', label: 'Projects' },
  {
    href: '#nisarga',
    label: 'Nisarga',
    children: [
      { href: '#villas', label: 'Villas' },
      { href: '#amenities', label: 'Amenities' },
      { href: '#gallery', label: 'Gallery' },
      { href: '#location', label: 'Location' },
    ],
  },
  { href: '/about', label: 'About' },
  { href: '#visit', label: 'Contact' },
]

/**
 * Floating navigation: transparent over the hero, glass after scroll,
 * retreats while scrolling down and returns on the first upward gesture.
 */
export default function CineNav() {
  const lenis = useLenis()
  const pathname = usePathname()
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

  /** On the home page, anchors glide via Lenis; elsewhere they navigate to /#section. */
  function resolveHref(href: string) {
    return href.startsWith('#') && pathname !== '/' ? `/${href}` : href
  }

  function onAnchor(e: React.MouseEvent, href: string) {
    if (!href.startsWith('#') || pathname !== '/') {
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
        className={`fixed inset-x-0 top-9 z-[90] transition-[background-color,backdrop-filter,border-color] duration-700 ${
          scrolled && !open
            ? 'bg-midnight/65 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent border-b border-transparent'
        }`}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <nav className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-12">
          <Link href="/" aria-label="SRSM Group — home" className="shrink-0">
            <SrsmLogo tone="dark" size="nav" />
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {LINKS.map(({ href, label, children }) =>
              children ? (
                <div key={label} className="group/drop relative">
                  <Link
                    href={resolveHref(href)}
                    onClick={(e) => onAnchor(e, href)}
                    className="group relative flex items-center gap-1.5 font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ivory/70 transition-colors duration-500 hover:text-ivory"
                  >
                    {label}
                    <svg width="8" height="8" viewBox="0 0 10 10" className="mt-px opacity-60 transition-transform duration-300 group-hover/drop:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M2 3.5 L5 6.5 L8 3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-aurum transition-all duration-500 group-hover:w-full" />
                  </Link>
                  {/* Sub-tabs — Gallery / Location under Nisarga */}
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-all duration-300 group-hover/drop:visible group-hover/drop:opacity-100">
                    <div className="flex min-w-[150px] flex-col border border-white/10 bg-midnight/90 p-1.5 shadow-xl backdrop-blur-xl">
                      {children.map((c) => (
                        <Link
                          key={c.label}
                          href={resolveHref(c.href)}
                          onClick={(e) => onAnchor(e, c.href)}
                          className="px-3.5 py-2.5 font-body text-[10px] font-medium uppercase tracking-[0.28em] text-ivory/65 transition-colors duration-300 hover:bg-white/5 hover:text-aurum"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={label}
                  href={resolveHref(href)}
                  onClick={(e) => onAnchor(e, href)}
                  className="group relative font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ivory/70 transition-colors duration-500 hover:text-ivory"
                >
                  {label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-aurum transition-all duration-500 group-hover:w-full" />
                </Link>
              ),
            )}
            <a
              href={nisargaWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-2 border border-aurum/60 px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-aurum transition-all duration-500 hover:bg-aurum hover:text-midnight"
            >
              <WhatsAppGlyph className="h-3.5 w-3.5" />
              Get in touch
            </a>
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
              {LINKS.map(({ href, label, children }, i) => (
                <div key={label} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.08 + i * 0.06 }}
                  >
                    <Link
                      href={resolveHref(href)}
                      onClick={(e) => onAnchor(e, href)}
                      className="font-display text-5xl font-light text-ivory transition-colors duration-300 active:text-aurum"
                    >
                      {label}
                    </Link>
                    {children && (
                      <div className="mt-2.5 ml-1 flex flex-col gap-2.5 border-l border-white/15 pl-4">
                        {children.map((c) => (
                          <Link
                            key={c.label}
                            href={resolveHref(c.href)}
                            onClick={(e) => onAnchor(e, c.href)}
                            className="font-body text-sm font-medium uppercase tracking-[0.28em] text-ivory/55 transition-colors duration-300 active:text-aurum"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
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
              <a
                href={nisargaWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 border border-aurum px-8 py-4 font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-aurum"
              >
                <WhatsAppGlyph className="h-3.5 w-3.5" />
                Get in touch
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
