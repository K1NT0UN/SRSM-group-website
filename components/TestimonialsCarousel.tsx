'use client'

import FadeInView from '@/components/FadeInView'

const testimonials: { name: string; rating: number; review: string; nri?: boolean }[] = [
  { name: 'Mahendar Gainibaiti', rating: 5.0, review: 'Exceptional build quality and timely delivery — SRSM Group exceeded every expectation we had.' },
  { name: 'Chandan Mudiam', nri: true, rating: 4.8, review: 'From documentation to handover, the entire experience was smooth and stress-free.' },
  { name: 'Govinda Raju', rating: 5.0, review: 'The team was transparent throughout the entire process and delivered exactly what was promised.' },
  { name: 'Pruthviraj Tanjutoori', nri: true, rating: 4.7, review: 'Trusted the Group based on their track record and they absolutely delivered. Highly recommended.' },
  { name: 'Rajashekar', rating: 4.8, review: 'Reliable, professional, and quality-focused. SRSM Group stands out among Hyderabad real estate developers.' },
]

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const partial = rating % 1
  return (
    <div className="flex items-center gap-0.5 mb-3">
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) {
          return <span key={i} className="text-gold text-sm">★</span>
        } else if (i === full && partial > 0) {
          return (
            <span key={i} className="relative text-sm">
              <span className="text-gold/20">★</span>
              <span className="absolute inset-0 overflow-hidden text-gold" style={{ width: `${partial * 100}%` }}>★</span>
            </span>
          )
        }
        return <span key={i} className="text-gold/20 text-sm">★</span>
      })}
      <span className="ml-1.5 text-xs text-charcoal-light/50">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function TestimonialsCarousel() {
  // Two identical halves (2 sets each) so the -50% scrollLeft loop stays seamless
  const doubled = [...testimonials, ...testimonials, ...testimonials, ...testimonials]

  return (
    <section className="bg-linen py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <FadeInView>
          <div className="text-center">
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-3">What Our Customers Say</p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest">
              Trusted by Homeowners <span className="font-light">Across Hyderabad</span>
            </h2>
          </div>
        </FadeInView>
      </div>

      {/* Scrolling track */}
      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-linen to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-linen to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-5 w-max"
          style={{ animation: 'scrollLeft 40s linear infinite' }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {doubled.map((t, i) => (
            <div
              key={i}
              className="w-72 shrink-0 bg-parchment border border-gold/20 p-6 flex flex-col"
            >
              <StarRating rating={t.rating} />
              <p className="text-charcoal-light text-sm leading-relaxed mb-5 flex-1">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="pt-4 border-t border-gold/15">
                <p className="font-serif text-base text-forest flex items-center gap-2">
                  {t.name}
                  {t.nri && (
                    <span className="text-[9px] tracking-widest uppercase px-1.5 py-0.5 border border-gold/50 text-gold-dark font-sans">
                      NRI
                    </span>
                  )}
                </p>
                <p className="text-[10px] tracking-widest uppercase text-charcoal-light/40 mt-0.5">
                  {t.nri ? 'NRI Customer' : 'SRSM Group Homeowner'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
