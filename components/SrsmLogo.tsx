/**
 * SRSM Group wordmark — text lockup only, no emblem.
 * "SRSM" set in the display serif, "GROUP" letter-spaced in champagne gold.
 *
 * Per Batman (2026-07-28): drop the crest/logo from the site and use the
 * SRSM Group wordmark everywhere the logo appeared — nav + footer, across
 * both the classic and cinematic layouts (all consume this one component).
 *
 * tone 'dark'  → ivory wordmark for midnight backgrounds (default)
 * tone 'light' → ink wordmark for parchment/sand backgrounds
 */
const TONES = {
  dark: { srsm: '#f7f5f2' },
  light: { srsm: '#1c2b3a' },
} as const

const SIZES = {
  nav: { srsm: '1.4rem', group: '0.6rem', gap: '0.5rem' },
  footer: { srsm: '1.65rem', group: '0.68rem', gap: '0.58rem' },
} as const

const GOLD = '#c8a45a'

export function SrsmWordmark({
  tone = 'dark',
  size = 'nav',
}: {
  tone?: keyof typeof TONES
  size?: keyof typeof SIZES
}) {
  const c = TONES[tone]
  const s = SIZES[size]
  return (
    <span
      aria-label="SRSM Group"
      style={{ display: 'inline-flex', alignItems: 'baseline', gap: s.gap, lineHeight: 1 }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display), Georgia, serif',
          fontWeight: 600,
          fontSize: s.srsm,
          letterSpacing: '0.06em',
          color: c.srsm,
        }}
      >
        SRSM
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body), system-ui, sans-serif',
          fontWeight: 600,
          fontSize: s.group,
          letterSpacing: '0.34em',
          textTransform: 'uppercase',
          color: GOLD,
        }}
      >
        Group
      </span>
    </span>
  )
}

export default function SrsmLogo({
  tone = 'dark',
  size = 'nav',
}: {
  tone?: keyof typeof TONES
  size?: keyof typeof SIZES
}) {
  return <SrsmWordmark tone={tone} size={size} />
}
