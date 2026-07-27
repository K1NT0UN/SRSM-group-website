'use client'

import { motion } from 'framer-motion'

/** The one easing curve of the experience — slow out, expensive. */
export const EASE = [0.16, 1, 0.3, 1] as const

/**
 * A single headline line that rises out of an overflow mask.
 * The viewport observer lives on the (unclipped) mask wrapper — observing the
 * translated child never fires, since it sits fully outside the clip.
 */
export function MaskLine({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.span
      className="block overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.span
        className={`block will-change-transform ${className ?? ''}`}
        variants={{ hidden: { y: '112%' }, visible: { y: '0%' } }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

/** Soft blur-and-rise reveal for body copy and blocks. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  amount = 0.35,
  duration = 1.1,
  className,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  amount?: number
  duration?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Cinematic image unveiling — the frame opens while the image settles. */
export function ImageReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className ?? ''}`}
      initial={{ clipPath: 'inset(12% 6% 12% 6%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.5, ease: EASE, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.8, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Micro-label — the quiet uppercase eyebrow used across the experience. */
export function Eyebrow({
  children,
  className,
  tone = 'gold',
}: {
  children: React.ReactNode
  className?: string
  tone?: 'gold' | 'ivory' | 'ink'
}) {
  const tones = {
    gold: 'text-aurum',
    ivory: 'text-ivory/60',
    ink: 'text-ink/60',
  }
  return (
    <Reveal
      y={14}
      className={`text-[10px] md:text-[11px] font-body font-medium tracking-[0.55em] uppercase ${tones[tone]} ${className ?? ''}`}
    >
      {children}
    </Reveal>
  )
}
