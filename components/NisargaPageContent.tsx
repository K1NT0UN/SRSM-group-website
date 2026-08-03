import Image from 'next/image'
import FadeInView from '@/components/FadeInView'
import NisargaHeroCarousel from '@/components/NisargaHeroCarousel'
import EditorialSplit from '@/components/EditorialSplit'
import NisargaOverviewLightbox from '@/components/NisargaOverviewLightbox'
import NisargaLandscapeGallery from '@/components/NisargaLandscapeGallery'
import NisargaLeadModal from '@/components/NisargaLeadModal'
import NisargaMap from '@/components/NisargaMap'
import VillaPricing from '@/components/VillaPricing'

const stats = [
  { value: '17+', label: 'Acres' },
  { value: '50+', label: 'Amenities' },
  { value: '4,000', label: 'Acres Greenery Nearby' },
  { value: '2', label: 'Clubhouses' },
  { value: '800 Mts', label: 'Road-Facing Frontage' },
  { value: 'G+2', label: 'Villa Configuration' },
]

const villas = [
  {
    size: '200 Sq. Yd',
    tagline: 'Moody. Majestic. Meticulous.',
    areas: [
      { floor: 'Ground Floor', sqft: '1,300 SQ.FT' },
      { floor: 'First Floor', sqft: '1,275 SQ.FT' },
      { floor: 'Second Floor', sqft: '965 SQ.FT' },
    ],
    total: '3,540 SQ.FT',
    sqftNum: 3540,
    facing: 'East & West Facing',
    image: '/images/nisarga/villa-200-interior.webp',
  },
  {
    size: '239 Sq. Yd',
    tagline: 'Elegant. Elevated. Enchanting.',
    areas: [
      { floor: 'Ground Floor', sqft: '1,593 SQ.FT' },
      { floor: 'First Floor', sqft: '1,571 SQ.FT' },
      { floor: 'Second Floor', sqft: '1,066 SQ.FT' },
    ],
    total: '4,230 SQ.FT',
    sqftNum: 4230,
    facing: 'East & West Facing',
    image: '/images/nisarga/villa-239-interior.webp',
  },
  {
    size: '300 Sq. Yd',
    tagline: 'Serene. Sylvan. Sensuous.',
    areas: [
      { floor: 'Ground Floor', sqft: '1,760 SQ.FT' },
      { floor: 'First Floor', sqft: '1,740 SQ.FT' },
      { floor: 'Second Floor', sqft: '1,485 SQ.FT' },
    ],
    total: '4,985 SQ.FT',
    sqftNum: 4985,
    facing: 'East & West Facing',
    image: '/images/nisarga/villa-300-interior.webp',
  },
]

const nspireAmenities = [
  'Swimming Pool', 'Cafeteria', 'Spa', 'Crèche',
  'Parlour', 'Indoor Games', 'Gym', 'Terrace Garden',
  'Yoga', 'Roof Garden', 'Library', 'Work Station',
]

const nfinityAmenities = [
  'Banquet Hall', 'Pantry', 'Dining Hall',
  'Seating Deck', 'Grocery Store', 'Private Lobby',
]


const locationHighlights = {
  connectivity: ['TSRTC Bus Connectivity', 'Hyderabad Metro Phase-2 (Planned)', 'First/Last Mile Connectivity', 'Hyderabad Road Network', 'Multi-Modal Transport Integration'],
  hospitals: ['Sreshta Multi Speciality Hospital', 'Tirumala Hospital', 'ESI Hospital RC Purani', 'SAI Hospital', 'Lucid Medical Diagnostics'],
  social: ['Wild Waters', 'Asian Greenmart Patancheru', 'Adventure Parks (Patancheru Area)', 'Forum Sujana Mall'],
  education: ['Rainbow International School', 'Sai High School', 'Sreenidhi Global School', 'St. Anniidis High School'],
  work: ['Now IT Hub, Kandlakoya', 'Hyderabad Pharma City', 'Agilent Biopharma Centre', 'Eli Lilly', 'Biotech Park · ICICI Knowledge Park'],
}

export default function NisargaPageContent() {
  return (
    <>
      <NisargaHeroCarousel />

      <section className="bg-forest-dark py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="font-serif text-3xl text-gold">{value}</p>
              <p className="text-xs tracking-widest uppercase text-parchment/50 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-parchment py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeInView direction="left">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/nisarga/vision-forest.webp"
                alt="Nisarga — forest lifestyle"
                fill
                className="object-cover"
              />
            </div>
          </FadeInView>
          <FadeInView direction="right">
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">The Viewsion</p>
            <h2 className="font-serif text-5xl md:text-6xl text-charcoal leading-tight mb-6">
              Wood Morning.
            </h2>
            <p className="text-charcoal/70 leading-relaxed mb-6">
              Here, the forest greets you before the city does. Light filters through the canopy. The air carries its own vitality. Silence returns as the rarest luxury. This is where life begins with the moments that cannot be repeated, only lived.
            </p>
            <blockquote className="border-l-2 border-gold pl-6 text-charcoal/60 italic leading-relaxed">
              "Living becomes an experience where vision turns into the view of every day. Life flows with nature, expanding gently and deepening with meaning. Every breath feels renewed. Every moment feels entirely yours, revealing forest-deep joys within, immersed in natural bliss."
            </blockquote>
            <p className="mt-6 text-charcoal/70 leading-relaxed">
              Each villa opens to distinction. Indulgence within; privacy beyond. Luxury here isn't counted, it's carved. A rare privilege held within nature's reserve. Curated, but untamed and limitless.
            </p>
          </FadeInView>
        </div>
      </section>

      <EditorialSplit
        pre="Impre"
        repeat="S"
        post="ion"
        labels={['Structure', 'Stature', 'Signature']}
        headline="Architecture That Commands."
        body="Some landmarks are built; others evolve. NISARGA belongs to the latter. Its architecture rises with a sense of permanence, inspired by nature, crafted for today, envisioned for every day, and designed to leave an impression that lasts forever. Every angle, every line, every detail speaks of scale and stature — a monument destined to be lived N'finitely."
        image={{ src: '/images/nisarga/impression-render.webp', alt: 'Nisarga villas — golden hour' }}
        imageSide="right"
      />

      <section id="villas" className="bg-parchment py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">Life. Lifestyle. Living.</p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
                Choose Your Forest Home.
              </h2>
              <p className="text-charcoal/60 mt-3">
                Three villa configurations. Six orientations. One address that elevates every standard.
              </p>
            </div>
          </FadeInView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {villas.map((villa, i) => (
              <FadeInView key={villa.size} delay={i * 0.1}>
                <div className="bg-white group overflow-hidden flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={villa.image}
                      alt={`Nisarga ${villa.size} villa`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1 border border-linen border-t-0">
                    <p className="text-xs tracking-[0.4em] uppercase text-gold mb-1">{villa.facing}</p>
                    <h3 className="font-serif text-2xl text-charcoal mb-1">{villa.size} Villa</h3>
                    <p className="text-charcoal/50 text-sm mb-5">{villa.tagline}</p>
                    <div className="space-y-2 mb-5">
                      {villa.areas.map(({ floor, sqft }) => (
                        <div key={floor} className="flex justify-between text-sm border-b border-linen pb-2">
                          <span className="text-charcoal/60">{floor}</span>
                          <span className="font-semibold text-charcoal">{sqft}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-forest text-parchment px-4 py-3 mt-auto flex justify-between items-center">
                      <span className="text-xs tracking-widest uppercase text-parchment/60">Total Built-Up</span>
                      <span className="font-serif text-lg text-gold">{villa.total}</span>
                    </div>
                    <VillaPricing sqft={villa.sqftNum} variant="nisarga" />
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
          <FadeInView>
            <div className="mt-10 text-center">
              <NisargaLeadModal
                variant="enquiry"
                label="Get in touch"
                className="inline-block px-10 py-4 bg-gold text-forest text-sm tracking-widest uppercase font-semibold hover:bg-gold-dark transition-colors duration-200"
              />
            </div>
          </FadeInView>
        </div>
      </section>

      <EditorialSplit
        pre="Ele"
        repeat="G"
        post="ance"
        labels={['Grandeur', 'Grace', 'Gravitas']}
        headline="Where Every Villa Is a Statement."
        body="Step within and the villa unfolds as an ode to refinement. Sunlight moves with rhythm, breeze carries its cadence, and proportions settle into harmony. Craftsmanship resides in every contour, finesse in every finish — each detail composed as if time were its guest."
        image={{ src: '/images/nisarga/elegance-render.webp', alt: 'Nisarga villa streetscape' }}
        imageSide="left"
      />

      <section className="bg-parchment py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">Privilege</p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
                50+ Amenities Across Two Exclusive Clubhouses.
              </h2>
            </div>
          </FadeInView>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-16 overflow-hidden">
            <FadeInView direction="left" className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
              <Image
                src="/images/nisarga/clubhouse-nfinity.webp"
                alt="Club N'finity"
                fill
                className="object-cover"
              />
            </FadeInView>
            <FadeInView direction="right" className="bg-forest p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-xs tracking-[0.4em] uppercase text-gold/60 mb-3">Clubhouse 1</p>
              <h3 className="font-serif text-4xl text-parchment mb-4">Club N'finity</h3>
              <p className="text-parchment/60 leading-relaxed mb-2 text-sm">
                Evolved luxury speaks here in the language of privilege. Every chamber carries its own stature, every setting rises into an experience that belongs to the chosen few.
              </p>
              <p className="text-gold/70 text-xs tracking-widest uppercase mb-6">6 Exclusive Amenities</p>
              <div className="grid grid-cols-2 gap-2">
                {nfinityAmenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-parchment/70">
                    <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </FadeInView>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
            <FadeInView direction="left" className="bg-charcoal p-10 lg:p-14 flex flex-col justify-center lg:order-1">
              <p className="text-xs tracking-[0.4em] uppercase text-gold/60 mb-3">Clubhouse 2</p>
              <h3 className="font-serif text-4xl text-parchment mb-4">Club N'Spire</h3>
              <p className="text-parchment/60 leading-relaxed mb-2 text-sm">
                Every visit becomes a passage into calm, where zen-like balance, deep detox, and pure rejuvenation weave into a ritual. To immerse here is to indulge in atmospheres shaped for body, mind and spirit.
              </p>
              <p className="text-gold/70 text-xs tracking-widest uppercase mb-6">12 World-Class Amenities</p>
              <div className="grid grid-cols-2 gap-2">
                {nspireAmenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-parchment/70">
                    <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </FadeInView>
            <FadeInView direction="right" className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] lg:order-2">
              <Image
                src="/images/nisarga/clubhouse-nspire.webp"
                alt="Club N'Spire"
                fill
                className="object-cover"
              />
            </FadeInView>
          </div>
        </div>
      </section>

      <NisargaOverviewLightbox />

      <NisargaLandscapeGallery />

      <section className="bg-forest py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">Where You'll Find Us</p>
              <h2 className="font-serif text-4xl md:text-5xl text-parchment">Location Highlights</h2>
              <p className="text-parchment/50 text-sm mt-3 max-w-xl mx-auto">
                Kollur, Patancheru, Hyderabad, Telangana – 502300
              </p>
            </div>
          </FadeInView>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
            <FadeInView direction="left">
              <NisargaMap />
            </FadeInView>
            <FadeInView direction="right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full content-start">
                {[
                  { title: 'Connectivity', items: locationHighlights.connectivity },
                  { title: 'Hospitals', items: locationHighlights.hospitals },
                  { title: 'Education', items: locationHighlights.education },
                  { title: 'Social & Leisure', items: locationHighlights.social },
                  { title: 'Work & IT Hubs', items: locationHighlights.work },
                ].map(({ title, items }) => (
                  <div key={title}>
                    <p className="text-xs tracking-widest uppercase text-gold mb-3">{title}</p>
                    <ul className="space-y-1.5">
                      {items.map((item) => (
                        <li key={item} className="text-parchment/60 text-sm flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-gold/40 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      <section className="bg-gold py-20 px-6 text-center">
        <FadeInView>
          <p className="text-xs tracking-[0.5em] uppercase text-forest/60 mb-4">Enquire Today</p>
          <h2 className="font-serif text-4xl md:text-5xl text-forest mb-4">
            The World of N'finite Kind,<br className="hidden md:block" /> Woven in the Woods.
          </h2>
          <p className="text-forest/70 text-sm mb-2">RERA: P01100010902 · T.S. RERA</p>
          <p className="text-forest/70 text-sm mb-1">
            <a href="tel:+919492239339" className="hover:text-forest transition-colors">+91 94922 39339</a>
            {' · '}
            <a href="mailto:srbuildersnisarga@gmail.com" className="hover:text-forest transition-colors">srbuildersnisarga@gmail.com</a>
          </p>
          <p className="text-forest/50 text-xs mb-8">
            Site Office:{' '}
            <a
              href="https://maps.app.goo.gl/ohHkRPB9tcTFn6td7"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-forest transition-colors"
            >
              F6RX+9J4, Patancheruvu, Hyderabad – 502300
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <NisargaLeadModal
              variant="enquiry"
              label="Get in touch"
              className="px-10 py-4 bg-forest text-parchment text-sm tracking-widest uppercase font-semibold hover:bg-forest-dark transition-colors duration-200"
            />
          </div>
        </FadeInView>
      </section>
    </>
  )
}
