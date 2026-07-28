'use client'

import { motion } from 'framer-motion'
import SrsmWaxSeal from './SrsmWaxSeal'

export const ENVELOPE_EASE = [0.16, 1, 0.3, 1] as const
export const KRAFT = '#e6d7b3'
export const KRAFT_LINE = 'rgba(90,70,35,0.28)'

/**
 * The fold-and-seal sequence shared by every contact form on the site:
 * creased kraft envelope back, top flap swings shut on a 3D hinge, then the
 * SRSM wax seal stamps down at the center. Callers show this in place of
 * their form for ~2s while the real submission runs in the background, then
 * swap to their own "sent" confirmation.
 */
export default function EnvelopeSeal() {
  return (
    <motion.div
      key="envelope"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: ENVELOPE_EASE }}
      className="relative aspect-[3/2] w-full overflow-visible shadow-2xl"
      style={{
        backgroundColor: KRAFT,
        backgroundImage:
          'radial-gradient(circle at 20% 15%, rgba(255,255,255,0.35), transparent 45%), radial-gradient(circle at 85% 88%, rgba(90,70,35,0.16), transparent 55%)',
      }}
    >
      {/* Static fold creases — the four lines an envelope-back always shows */}
      <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <path d="M 0 0 L 150 100 L 300 0" fill="none" stroke={KRAFT_LINE} strokeWidth="1.5" />
        <path d="M 0 200 L 150 100 L 300 200" fill="none" stroke={KRAFT_LINE} strokeWidth="1.5" />
      </svg>

      {/* The flap — swings down on a top hinge to meet the crease already drawn above */}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 50% 50%)',
          transformOrigin: 'top center',
          backgroundColor: KRAFT,
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.3), rgba(90,70,35,0.08))',
          boxShadow: '0 6px 14px rgba(0,0,0,0.25)',
        }}
        initial={{ rotateX: -42 }}
        animate={{ rotateX: 0 }}
        transition={{ duration: 0.75, ease: ENVELOPE_EASE }}
      />

      {/* The wax seal — stamps down once the flap has landed */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ translateX: '-50%', translateY: '-50%' }}
        initial={{ scale: 0, rotate: -24, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.55, type: 'spring', stiffness: 260, damping: 13 }}
      >
        <SrsmWaxSeal size={88} />
      </motion.div>
    </motion.div>
  )
}
