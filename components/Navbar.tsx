'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 40
      setScrolled(prev => prev === next ? prev : next)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-parchment shadow-md' : 'bg-parchment/95 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-18">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/srsm-logo.png"
            alt="SRSM Group"
            width={400}
            height={120}
            className="h-10 w-auto object-contain drop-shadow-sm"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm tracking-widest uppercase transition-colors duration-200 relative group font-medium ${
                pathname === href ? 'text-forest' : 'text-forest/70 hover:text-forest'
              }`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                  pathname === href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
          <Link
            href="/enquire"
            className="ml-4 px-6 py-2.5 bg-forest text-parchment text-sm tracking-widest uppercase font-semibold hover:bg-forest-dark transition-colors duration-200"
          >
            Enquire Now
          </Link>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-forest transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-forest transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-forest transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-forest border-t border-gold/20 px-6 py-6 flex flex-col gap-5">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm tracking-widest uppercase transition-colors duration-200 ${
                pathname === href ? 'text-gold' : 'text-parchment/80 hover:text-gold'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/enquire"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-6 py-3 bg-gold text-forest text-sm tracking-widest uppercase font-semibold text-center"
          >
            Enquire Now
          </Link>
        </div>
      )}
    </header>
  )
}
