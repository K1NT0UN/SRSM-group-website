/**
 * The SRSM crest, pressed into wax — used to "seal" the envelope contact
 * form on submit. Same tower/mountains/dawn-sun iconography as SrsmLogo,
 * simplified and embossed (gold-on-oxblood) to read as a stamped medallion.
 */
export default function SrsmWaxSeal({ size = 96 }: { size?: number }) {
  const emboss = '#d8b46e'
  const shadow = 'rgba(0,0,0,0.45)'
  const highlight = 'rgba(255,231,180,0.35)'

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="waxBody" cx="35%" cy="28%" r="75%">
          <stop offset="0%" stopColor="#8a2020" />
          <stop offset="45%" stopColor="#651616" />
          <stop offset="100%" stopColor="#360b0b" />
        </radialGradient>
        <radialGradient id="waxGloss" cx="32%" cy="24%" r="30%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* Wax drips — small overlapping blobs for an organic poured edge */}
      <circle cx="30" cy="96" r="9" fill="url(#waxBody)" />
      <circle cx="90" cy="98" r="8" fill="url(#waxBody)" />
      <circle cx="60" cy="103" r="7" fill="url(#waxBody)" />

      {/* Main wax body */}
      <circle cx="60" cy="58" r="52" fill="url(#waxBody)" />
      <circle cx="60" cy="58" r="52" fill="url(#waxGloss)" />

      {/* Embossed ring */}
      <circle cx="60" cy="58" r="43" fill="none" stroke={shadow} strokeWidth="1.6" />
      <circle cx="59" cy="57" r="43" fill="none" stroke={highlight} strokeWidth="1.1" />

      {/* Crest — shadow pass (depth), then gold emboss on top */}
      <g transform="translate(60 51) scale(0.62) translate(-36 -33)" opacity="0.5">
        <path d="M 2 41 Q 4.5 37.5 7 34.5 L 9 36.5 L 12.5 28.5 L 15 33 L 16.5 32 Q 19 36.5 21.5 41 Z" fill={shadow} transform="translate(1,1.4)" />
        <path d="M 52 41 Q 54 37.5 56 34.5 L 58 36.5 L 61.5 29 L 64 33.5 L 65.5 32.5 Q 67.5 37 70 41 Z" fill={shadow} transform="translate(1,1.4)" />
        <rect x="29" y="23" width="12" height="18" fill={shadow} transform="translate(1,1.4)" />
        <rect x="31" y="16.5" width="8" height="6.5" fill={shadow} transform="translate(1,1.4)" />
      </g>
      <g transform="translate(60 51) scale(0.62) translate(-36 -33)">
        <path d="M 2 41 Q 4.5 37.5 7 34.5 L 9 36.5 L 12.5 28.5 L 15 33 L 16.5 32 Q 19 36.5 21.5 41 Z" fill={emboss} />
        <path d="M 52 41 Q 54 37.5 56 34.5 L 58 36.5 L 61.5 29 L 64 33.5 L 65.5 32.5 Q 67.5 37 70 41 Z" fill={emboss} />
        <rect x="29" y="23" width="12" height="18" fill={emboss} />
        <rect x="31" y="16.5" width="8" height="6.5" fill={emboss} />
        <rect x="34.3" y="11" width="1.4" height="5.5" fill={emboss} />
        <circle cx="35" cy="7.5" r="4.2" fill={emboss} opacity="0.9" />
      </g>

      {/* SRSM, arced beneath the crest */}
      <text
        x="60"
        y="86"
        textAnchor="middle"
        fontFamily="var(--font-display), Georgia, serif"
        fontWeight="600"
        fontSize="13"
        letterSpacing="3"
        fill={emboss}
        opacity="0.92"
      >
        SRSM
      </text>
    </svg>
  )
}