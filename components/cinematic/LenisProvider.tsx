'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

/** Buttery smooth scrolling for the cinematic experience. Respects reduced motion. */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({ lerp: 0.09, smoothWheel: true })
    let raf = requestAnimationFrame(function loop(time: number) {
      instance.raf(time)
      raf = requestAnimationFrame(loop)
    })
    setLenis(instance)

    return () => {
      cancelAnimationFrame(raf)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
