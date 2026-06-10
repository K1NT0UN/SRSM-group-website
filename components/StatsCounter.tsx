'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Scroll-triggered count-up number (GSAP ScrollTrigger).
 * Renders `0` until the element scrolls into view, then counts to `value`.
 */
export default function StatsCounter({
  value,
  suffix = '',
  duration = 2,
  className,
}: {
  value: number
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.registerPlugin(ScrollTrigger)

    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: value,
      duration,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate() {
        el.textContent = Math.round(obj.val) + suffix
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [value, suffix, duration])

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}
