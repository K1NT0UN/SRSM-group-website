import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { contact } from '@/lib/contact'

const mapUrl = 'https://maps.app.goo.gl/yxfvg5yYWYH7TZWE9'
const consultationUrl =
  process.env.NEXT_PUBLIC_NRI_CONSULTATION_URL ||
  'https://wa.me/919989990256?text=Hi%2C%20I%20am%20an%20NRI%20interested%20in%20The%20Nisarga.%20I%20would%20like%20to%20schedule%20a%20video%20consultation.'

const villas = [
  { plot: '200 sq yd', area: '3,540 sq ft', price: '₹4.60 Cr', optionLeft: '8.3%', projectLeft: '2.5%' },
  { plot: '239 sq yd', area: '4,250 sq ft', price: '₹5.53 Cr', optionLeft: '49.3%', projectLeft: '16.8%' },
  { plot: '300 sq yd', area: '5,000 sq ft', price: '₹6.50 Cr', optionLeft: '67.3%', projectLeft: '17.8%' },
] as const

export const metadata: Metadata = {
  title: 'The Nisarga for NRIs | SR Builders & Developers',
  description:
    'The Nisarga is developed by SR Builders & Developers, a member of the family-owned SRSM Group. Explore 4 and 5 BHK forestscape villas near Kollur.',
  alternates: { canonical: '/nri' },
  openGraph: {
    title: 'The Nisarga by SR Builders & Developers',
    description: 'A member of the family-owned SRSM Group. Limited NRI launch offer for the first 25 confirmed bookings.',
    url: '/nri',
    images: ['/images/nisarga/hero-1-desktop.webp'],
  },
}

function ConsultationLink({ children, className }: { children: React.ReactNode; className: string }) {
  return <a href={consultationUrl} target="_blank" rel="noreferrer" className={className}>{children}</a>
}

export default function NriLandingPage() {
  return (
    <main className="min-h-screen bg-[#f5f0e6] pb-16 text-[#13251a] md:pb-0">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link href="/" className="group">
            <span className="block font-serif text-xl font-semibold uppercase tracking-[0.16em] text-white">The Nisarga</span>
            <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/65 transition group-hover:text-white">
              By SR Builders &amp; Developers · A member of SRSM Group
            </span>
          </Link>
          <span className="rounded-full border border-white/30 bg-black/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">RERA P01100010902</span>
        </div>
      </header>

      <section className="relative isolate min-h-[760px] overflow-hidden bg-[#102b1b]">
        <Image src="/images/nisarga/hero-1-desktop.webp" alt="Artist impression of The Nisarga forestscape villas near Kollur" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07150d]/95 via-[#07150d]/70 to-[#07150d]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07150d] via-transparent to-black/25" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-end px-5 pb-20 pt-32 sm:px-8 lg:items-center lg:px-12 lg:pb-12">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 border border-[#e4c875]/50 bg-[#07150d]/65 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f1d981] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#e4c875]" />
              One-month launch offer · First 25 confirmed bookings
            </div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#e4c875]">The Nisarga</p>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-white/65">
              Developed by SR Builders &amp; Developers · A member of the family-owned SRSM Group
            </p>
            <h1 className="font-serif text-5xl font-medium leading-[0.98] text-white sm:text-6xl lg:text-8xl">Come home to more room to live.</h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              4 &amp; 5 BHK forestscape villas near Kollur—planned across 17+ acres with two clubhouses, 50+ amenities and the space your family can grow into.
            </p>
            <div className="mt-7 grid max-w-2xl gap-0 overflow-hidden border border-white/20 bg-[#07150d]/75 backdrop-blur sm:grid-cols-[1.2fr_1fr]">
              <div className="border-b border-white/15 px-5 py-4 sm:border-b-0 sm:border-r">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">NRI launch-offer rate</p>
                <p className="mt-1 font-serif text-4xl text-[#f1d981] sm:text-5xl">₹13,000<span className="ml-1 font-sans text-sm text-white/70">/ sq ft</span></p>
                <p className="mt-1 text-xs font-semibold text-white">Mandatory charges included</p>
              </div>
              <div className="grid grid-cols-2">
                <div className="border-r border-white/15 px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/50">Villas from</p>
                  <p className="mt-2 font-serif text-2xl text-white">₹4.60 Cr</p>
                </div>
                <div className="px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/50">Offer ends</p>
                  <p className="mt-2 font-serif text-2xl text-white">24 Aug</p>
                  <p className="text-[10px] text-white/50">2026</p>
                </div>
              </div>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ConsultationLink className="inline-flex min-h-14 items-center justify-center bg-[#d9bd69] px-7 text-sm font-bold uppercase tracking-[0.16em] text-[#102016] transition hover:bg-[#ecd47f]">Schedule an NRI consultation</ConsultationLink>
              <a href={mapUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center border border-white/35 bg-white/5 px-7 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur transition hover:bg-white/10">View Kollur location</a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/70"><span>Private video walkthroughs</span><span>US-friendly hours</span><span>Direct promoter access</span></div>
          </div>
        </div>
      </section>

      <section className="bg-[#102b1b]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
          {[['17+ acres', 'Low-density villa community'], ['4 & 5 BHK', 'G+2 forestscape villas'], ['50+ amenities', 'Across two clubhouses'], ['End 2028', 'Expected possession']].map(([value, label]) => (
            <div key={value} className="border-white/10 px-3 py-7 text-center lg:border-r lg:last:border-r-0"><p className="font-serif text-3xl text-[#e4c875]">{value}</p><p className="mt-1 text-xs text-white/60">{label}</p></div>
          ))}
        </div>
      </section>

      <section id="pricing" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9a7a25]">One-month launch offer</p><h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">₹13,000 per sq ft, mandatory charges included.</h2></div>
            <div className="border-2 border-[#9a7a25]/45 bg-[#fffdf7] p-6 shadow-[0_18px_50px_rgba(46,55,37,0.08)] sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#856719]">Offer eligibility</p>
              <p className="mt-2 text-lg font-semibold">Valid through 24 August 2026 for the first 25 confirmed bookings.</p>
              <p className="mt-2 text-sm leading-6 text-[#284231]/75">A booking is confirmed only after the first scheduled payment is completed.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="border border-[#173522]/15 bg-[#173522] p-6 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e4c875]">Included in ₹13,000/sq ft</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-white/85">
                <li>₹450/sq ft infrastructure</li>
                <li>₹100/sq ft two-year maintenance</li>
                <li>₹100/sq ft corpus fund</li>
              </ul>
            </div>
            <div className="border border-[#173522]/15 bg-white/65 p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#856719]">Optional location premiums</p>
              <p className="mt-4 text-3xl font-serif">₹300/sq ft each</p>
              <p className="mt-2 text-sm leading-6 text-[#284231]/70">East-facing · Corner · Garden view</p>
            </div>
            <div className="border border-[#173522]/15 bg-white/65 p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#856719]">Additional charges</p>
              <p className="mt-4 text-sm font-semibold leading-6">₹1.5 lakh clubhouse fee and legal/documentation charges</p>
              <p className="mt-2 text-sm leading-6 text-[#284231]/70">GST, stamp duty and registration as applicable</p>
            </div>
          </div>

          <div className="mt-12 overflow-hidden border border-[#173522]/15 bg-[#fbfaf6]">
            <div className="hidden grid-cols-[1fr_1.1fr_1fr_1fr] bg-[#132b1c] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white/65 md:grid"><span>Plot option</span><span>Built-up area</span><span>Offer price</span><span>Availability</span></div>
            {villas.map((villa) => (
              <div key={villa.plot} className="grid gap-4 border-b border-[#173522]/12 px-5 py-7 last:border-b-0 md:grid-cols-[1fr_1.1fr_1fr_1fr] md:items-center md:px-7">
                <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a7a25] md:hidden">Plot option</p><p className="font-serif text-2xl">{villa.plot}</p></div>
                <p className="text-[#284231]/70">{villa.area}</p>
                <div><p className="font-serif text-3xl">{villa.price}</p><p className="text-xs text-[#284231]/55">at ₹13,000/sq ft</p></div>
                <div><p className="font-semibold">{villa.optionLeft} of this option remains</p><p className="mt-1 text-xs text-[#284231]/55">Available homes equal {villa.projectLeft} of the 197-villa project</p></div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-5 text-[#284231]/60">Prices are indicative and availability changes in real time. East-facing, corner and garden-view choices are optional at ₹300/sq ft each. Clubhouse fee of ₹1.5 lakh, legal/documentation charges and applicable GST, stamp duty and registration are additional. Final pricing is governed by the allotment and sale documents.</p>
          <div className="mt-9 text-center"><ConsultationLink className="inline-flex min-h-14 items-center justify-center bg-[#173522] px-7 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#244a31]">Discuss the right villa option</ConsultationLink></div>
        </div>
      </section>

      <section className="bg-[#e8dfca] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden"><Image src="/images/nisarga/aerial.webp" alt="Artist impression of The Nisarga villa community" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /><span className="absolute bottom-3 right-3 bg-black/55 px-3 py-1 text-[10px] uppercase tracking-widest text-white">Artist impression</span></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#856719]">Buying from abroad, made personal</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">See the villa, understand the paperwork, involve your family.</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {[['Live video walkthrough', 'Tour the site and shortlisted options with our team on video.'], ['Family consultation', 'Invite decision-makers in India or abroad to the same Google Meet.'], ['Document coordination', 'Receive the price sheet, RERA details and next steps in one place.'], ['India visit planning', 'Reserve a focused site visit when you travel.']].map(([title, copy]) => (
                <div key={title} className="border-t border-[#173522]/25 pt-4"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#284231]/70">{copy}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9a7a25]">The developer and the group</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">One project entity. One family-owned legacy.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#284231]/75">
              The Nisarga is developed by SR Builders &amp; Developers, the project&apos;s
              development entity and a member of the family-owned SRSM Group.
            </p>
          </div>
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border-2 border-[#173522]/25 bg-[#173522] p-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e4c875]">Project developer</p>
                <h3 className="mt-3 font-serif text-3xl">SR Builders &amp; Developers</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">The entity developing and executing The Nisarga.</p>
              </div>
              <div className="border-2 border-[#9a7a25]/35 bg-white/65 p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#856719]">Family-owned group</p>
                <h3 className="mt-3 font-serif text-3xl">SRSM Group</h3>
                <p className="mt-3 text-sm leading-6 text-[#284231]/70">The group identity behind the family&apos;s experience and track record.</p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[['25+ years', 'Construction and real-estate experience'], ['7 projects', 'Delivered independently before the group'], ['24+ projects', 'Completed across group companies']].map(([value, label]) => (
                <div key={value} className="border border-[#173522]/15 bg-white/55 p-5"><p className="font-serif text-3xl text-[#856719]">{value}</p><p className="mt-2 text-sm leading-5 text-[#284231]/70">{label}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="consultation" className="bg-[#102b1b] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e4c875]">Your private NRI consultation</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">Start with a conversation, not a commitment.</h2>
          <p className="mx-auto mt-6 max-w-2xl leading-7 text-white/70">Tell us your time zone and preferred villa size. We will arrange a focused video call, answer your pricing questions and plan a virtual or in-person walkthrough.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ConsultationLink className="inline-flex min-h-14 items-center justify-center bg-[#d9bd69] px-8 text-sm font-bold uppercase tracking-[0.16em] text-[#102016] transition hover:bg-[#ecd47f]">Schedule on WhatsApp</ConsultationLink>
            <a href={contact.phoneHref} className="inline-flex min-h-14 items-center justify-center border border-white/30 px-8 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white/10">Call {contact.phone}</a>
          </div>
          <p className="mt-6 text-xs text-white/45">Google Meet link is shared after the consultation time is confirmed.</p>
        </div>
      </section>

      <footer className="bg-[#07150d] px-5 py-8 text-white/55 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 text-xs md:grid-cols-[1.3fr_1fr_auto] md:items-end">
          <div>
            <p className="font-serif text-xl text-white">The Nisarga</p>
            <p className="mt-2 leading-5">Developed by SR Builders &amp; Developers</p>
            <p className="leading-5">A member of the family-owned SRSM Group</p>
          </div>
          <div>
            <p>Location branding: Kollur, Hyderabad</p>
            <p className="mt-1 text-white/80">RERA: P01100010902</p>
          </div>
          <div className="flex flex-wrap gap-5 md:justify-end">
            <a href={mapUrl} target="_blank" rel="noreferrer" className="hover:text-white">Google Maps</a>
            <a href={`mailto:${contact.email}`} className="hover:text-white">Email</a>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#173522]/15 bg-[#f8f5ed]/95 p-3 backdrop-blur md:hidden"><ConsultationLink className="flex min-h-12 w-full items-center justify-center gap-3 bg-[#173522] px-5 text-xs font-bold uppercase tracking-[0.12em] text-white"><span className="text-[#e4c875]">₹13,000/sq ft</span><span className="h-4 w-px bg-white/25" />Schedule consultation</ConsultationLink></div>
    </main>
  )
}
