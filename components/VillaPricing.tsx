/**
 * Villa pricing — Nisarga launch-offer price list.
 * ₹13,000/sq.ft launch offer inclusive of mandatory infrastructure,
 * two-year maintenance and corpus charges.
 */
const OFFER_RATE = 13000

const inr = new Intl.NumberFormat('en-IN')

function formatCrore(n: number) {
  return `₹${(n / 1e7).toFixed(2)} Cr`
}

const VARIANTS = {
  cinematic: {
    divider: 'border-ink/15',
    label: 'text-aurum-deep',
    price: 'font-display text-ink',
    rate: 'text-ink/60',
    note: 'text-ink/45',
  },
  nisarga: {
    divider: 'border-charcoal/15',
    label: 'text-gold-dark',
    price: 'font-serif text-charcoal',
    rate: 'text-charcoal/60',
    note: 'text-charcoal/45',
  },
} as const

export default function VillaPricing({
  sqft,
  variant = 'cinematic',
}: {
  sqft: number
  variant?: keyof typeof VARIANTS
}) {
  const v = VARIANTS[variant]
  const total = OFFER_RATE * sqft

  return (
    <div className={`mt-6 border-t ${v.divider} pt-5`}>
      <div className="flex items-baseline justify-between gap-3">
        <span className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${v.label}`}>
          Launch Offer
        </span>
        <span className={`text-2xl ${v.price}`}>{formatCrore(total)}</span>
      </div>
      <p className={`mt-1 text-right text-xs ${v.rate}`}>
        ₹{inr.format(OFFER_RATE)} / sq. ft × {inr.format(sqft)} sq. ft
      </p>
      <p className={`mt-3 text-[11px] leading-relaxed ${v.note}`}>
        Mandatory charges included (₹450 infrastructure · ₹100 two-year maintenance ·
        ₹100 corpus fund). East-facing, corner and garden-view premiums are optional at
        ₹300/sq. ft each. Clubhouse, legal and statutory charges are additional.
      </p>
      <p className={`mt-2 text-[10px] uppercase tracking-[0.14em] ${v.label}`}>
        First 25 confirmed bookings · valid through 24 August 2026
      </p>
    </div>
  )
}
