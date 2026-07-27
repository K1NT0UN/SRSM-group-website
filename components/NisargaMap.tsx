import Image from 'next/image'

/**
 * Nisarga location map — the official brochure location map (branded, drawn to
 * the project's own key). A single lightweight webp, no map library or tiles,
 * so it loads instantly on phones. The overlay button hands off to real Google
 * Maps for navigation.
 *
 * NOTE: replace `/images/nisarga/location-map.webp` with the updated map when
 * the new artwork is provided.
 */
export default function NisargaMap() {
  return (
    <div className="group relative overflow-hidden border border-gold/20 bg-[#fbfaf6]">
      <Image
        src="/images/nisarga/location-map.webp"
        alt="Nisarga location map — off the ORR at Kollur Exit No. 2, near Tellapur, BHEL, Gachibowli and the Financial District, Hyderabad"
        width={1706}
        height={1404}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="h-auto w-full"
      />
      <a
        href="https://maps.app.goo.gl/yxfvg5yYWYH7TZWE9"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 border border-gold/50 bg-forest-dark/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur-sm transition-colors duration-300 hover:bg-gold hover:text-forest-dark"
      >
        Open in Google Maps ↗
      </a>
    </div>
  )
}