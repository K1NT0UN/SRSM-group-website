/**
 * SRSM Group lockup — the crest: a landmark tower crowned by the dawn sun
 * between two mountains, a tower crane raising it (the construction domain),
 * and SRSM carved into the base of the emblem over a gold rule. "SRSM" set
 * large in the display serif, "GROUP" letter-spaced in champagne gold beneath.
 *
 * tone 'dark'  → ivory mark/wordmark for midnight backgrounds (default)
 * tone 'light' → ink mark/wordmark for parchment/sand backgrounds
 */
const TONES = {
  dark: { tower: '#f7f5f2' },
  light: { tower: '#1c2b3a' },
} as const

const SIZES = {
  nav: { mark: 56 },
  footer: { mark: 68 },
} as const

const GOLD = '#c8a45a'

export function SrsmMark({ size = 40, tone = 'dark' }: { size?: number; tone?: keyof typeof TONES }) {
  const c = TONES[tone]
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" aria-hidden="true">
      {/* dawn sun, crowning the spire */}
      <circle cx="35" cy="15" r="6.5" fill={GOLD} />
      {/* horizon */}
      <line x1="5" y1="40" x2="67" y2="40" stroke={GOLD} strokeWidth="1.5" />
      {/* two mountains, either side */}
      <path d="M 2 40 Q 4.5 36.5 7 33.5 L 9 35.5 L 12.5 27.5 L 15 32 L 16.5 31 Q 19 35.5 21.5 40 Z" fill={c.tower} />
      <path d="M 52 40 Q 54 36.5 56 33.5 L 58 35.5 L 61.5 28 L 64 32.5 L 65.5 31.5 Q 67.5 36 70 40 Z" fill={c.tower} />
      {/* the landmark tower */}
      <rect x="29" y="22" width="12" height="18" fill={c.tower} />
      <rect x="31" y="15.5" width="8" height="6.5" fill={c.tower} />
      <rect x="34.3" y="10" width="1.4" height="5.5" fill={c.tower} />
      {/* tower crane — mast, jib, A-frame apex, counterweight, cable + hook */}
      <line x1="46.5" y1="40" x2="46.5" y2="10" stroke={c.tower} strokeWidth="1.5" />
      <line x1="25" y1="10" x2="56" y2="10" stroke={c.tower} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="46.5" y1="5.2" x2="39" y2="10" stroke={c.tower} strokeWidth="1.1" />
      <line x1="46.5" y1="5.2" x2="52.5" y2="10" stroke={c.tower} strokeWidth="1.1" />
      <line x1="46.5" y1="5.2" x2="46.5" y2="10" stroke={c.tower} strokeWidth="1.1" />
      <rect x="53" y="10.8" width="3.5" height="3.4" fill={c.tower} />
      <line x1="27" y1="10" x2="27" y2="17.5" stroke={c.tower} strokeWidth="1" />
      <path d="M 25.6 17.5 Q 27 19.8 28.4 17.5" stroke={c.tower} strokeWidth="1.1" fill="none" />
      {/* the name, carved into the base */}
      <text
        x="36"
        y="57"
        textAnchor="middle"
        fontFamily="var(--font-display), Georgia, serif"
        fontWeight="600"
        fontSize="16.5"
        letterSpacing="2.5"
        fill={c.tower}
      >
        SRSM
      </text>
      <text
        x="37.5"
        y="66"
        textAnchor="middle"
        fontFamily="var(--font-body), sans-serif"
        fontWeight="600"
        fontSize="5.8"
        letterSpacing="4.6"
        fill={GOLD}
      >
        GROUP
      </text>
    </svg>
  )
}

export default function SrsmLogo({
  tone = 'dark',
  size = 'nav',
}: {
  tone?: keyof typeof TONES
  size?: keyof typeof SIZES
}) {
  return <SrsmMark size={SIZES[size].mark} tone={tone} />
}
