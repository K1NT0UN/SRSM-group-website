'use client'

import { useState } from 'react'
import Image from 'next/image'

/**
 * Nisarga location map — Google-Maps-style cartography of the Kollur corridor
 * (single 214KB webp, no map library or tiles) with category filters that
 * spotlight points of interest. Marker positions are percentage coordinates
 * measured against the artwork. "Open in Google Maps" hands off to the real
 * pin for navigation.
 */

type Category = 'connectivity' | 'work' | 'education' | 'health' | 'leisure'

const CATEGORIES: { key: Category; label: string; color: string }[] = [
  { key: 'connectivity', label: 'Connectivity', color: '#d2b277' },
  { key: 'work', label: 'IT & Work', color: '#6fa8d6' },
  { key: 'education', label: 'Schools', color: '#5cae74' },
  { key: 'health', label: 'Hospitals', color: '#e06c6c' },
  { key: 'leisure', label: 'Leisure', color: '#b087c9' },
]

const CAT_COLOR = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.color])) as Record<Category, string>

interface Poi {
  name: string
  cat: Category
  x: number // % of image width
  y: number // % of image height
  note?: string
}

const POIS: Poi[] = [
  // Connectivity
  { name: 'ORR · Kollur Exit', cat: 'connectivity', x: 58.3, y: 56.6, note: '≈ 5 min from the gate' },
  { name: 'Miyapur Metro', cat: 'connectivity', x: 88.9, y: 31.6, note: 'Nearest metro today' },
  { name: 'NH-65 Mumbai Highway', cat: 'connectivity', x: 42.4, y: 16.6 },
  // Work & IT
  { name: 'Financial District', cat: 'work', x: 80.4, y: 62.6, note: '≈ 20 min via ORR' },
  { name: 'Gachibowli', cat: 'work', x: 88.1, y: 54.8, note: '≈ 25 min' },
  { name: 'HITEC City', cat: 'work', x: 95.1, y: 76.4, note: '≈ 30 min' },
  { name: 'Kokapet · Neopolis', cat: 'work', x: 73.7, y: 92 },
  { name: 'Patancheru Industrial', cat: 'work', x: 33.5, y: 11.8 },
  // Education
  { name: 'Rainbow International', cat: 'education', x: 78.8, y: 51.8 },
  { name: 'Sreenidhi Global School', cat: 'education', x: 80.9, y: 96.2 },
  // Health
  { name: 'Sreshta Multi-Speciality', cat: 'health', x: 54.1, y: 24.5 },
  // Leisure
  { name: 'Wild Waters', cat: 'leisure', x: 44.4, y: 3.8 },
  { name: 'Adventure Parks · Patancheru', cat: 'leisure', x: 36.5, y: 30.4 },
]

const NISARGA = { x: 38.8, y: 50.1 }

export default function NisargaMap() {
  const [active, setActive] = useState<Category | 'all'>('all')
  const [tip, setTip] = useState<Poi | null>(null)

  const filtered = active !== 'all'
  const shown = filtered ? POIS.filter((p) => p.cat === active) : POIS

  return (
    <div>
      {/* Category filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {[{ key: 'all' as const, label: 'All', color: '#d2b277' }, ...CATEGORIES].map(({ key, label, color }) => (
          <button
            key={key}
            type="button"
            onClick={() => { setActive(key); setTip(null) }}
            aria-pressed={active === key}
            className="border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200"
            style={
              active === key
                ? { borderColor: color, backgroundColor: color, color: '#0c2340' }
                : { borderColor: `${color}66`, color }
            }
          >
            {label}
          </button>
        ))}
      </div>

      <div className="group relative aspect-[6/5] overflow-hidden border border-gold/20 bg-forest-dark">
        <Image
          src="/images/nisarga/location-map-gmaps.webp"
          alt="Map of west Hyderabad showing Nisarga at Kollur — near the ORR Kollur Exit, NH-65, Patancheru, Miyapur, Gachibowli and the Financial District"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-[filter] duration-500"
          style={{ filter: filtered ? 'brightness(0.55) saturate(0.75)' : 'none' }}
        />

        {/* Nisarga — always spotlit */}
        <div className="absolute" style={{ left: `${NISARGA.x}%`, top: `${NISARGA.y}%` }}>
          <span className="absolute -translate-x-1/2 -translate-y-1/2">
            <span className="block h-5 w-5 animate-ping rounded-full bg-gold/40" />
          </span>
          <span className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-gold/25 p-2.5 shadow-[0_0_14px_rgba(210,178,119,0.65)]" />
        </div>

        {/* POI markers */}
        {shown.map((poi) => {
          const color = CAT_COLOR[poi.cat]
          const nearTop = poi.y < 12
          const nearRight = poi.x > 84
          return (
            <button
              key={poi.name}
              type="button"
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
              onClick={() => setTip(tip?.name === poi.name ? null : poi)}
              onMouseEnter={() => setTip(poi)}
              onMouseLeave={() => setTip(null)}
              aria-label={poi.name}
            >
              <span
                className="block rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor: color,
                  backgroundColor: `${color}44`,
                  width: filtered ? 18 : 12,
                  height: filtered ? 18 : 12,
                  boxShadow: filtered ? `0 0 12px ${color}` : 'none',
                }}
              />
              {/* Persistent label chips when a category is active */}
              {filtered && (
                <span
                  className={`absolute left-1/2 whitespace-nowrap border px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] backdrop-blur-sm ${nearTop ? 'top-full mt-1.5' : 'bottom-full mb-1.5'}`}
                  style={{
                    borderColor: `${color}88`,
                    backgroundColor: 'rgba(7,23,41,0.9)',
                    color,
                    transform: nearRight ? 'translateX(-90%)' : 'translateX(-50%)',
                  }}
                >
                  {poi.name}
                  {poi.note && <span className="ml-1.5 font-normal normal-case tracking-normal text-parchment/70">{poi.note}</span>}
                </span>
              )}
            </button>
          )
        })}

        {/* Hover tooltip (All view) */}
        {tip && !filtered && (
          <div
            className="pointer-events-none absolute z-20 border border-gold/40 bg-forest-dark/95 px-3 py-2 text-center shadow-lg"
            style={{ left: `${tip.x}%`, top: `${tip.y}%`, transform: `translate(-50%, ${tip.y < 12 ? '18px' : '-115%'})` }}
          >
            <p className="whitespace-nowrap text-xs font-semibold text-parchment">{tip.name}</p>
            {tip.note && <p className="mt-0.5 whitespace-nowrap text-[10px] text-gold">{tip.note}</p>}
          </div>
        )}

        <a
          href="https://maps.app.goo.gl/yxfvg5yYWYH7TZWE9"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 z-20 border border-gold/50 bg-forest-dark/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur-sm transition-colors duration-300 hover:bg-gold hover:text-forest-dark"
        >
          Open in Google Maps ↗
        </a>
      </div>
    </div>
  )
}
