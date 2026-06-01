import FadeInView from '@/components/FadeInView'
import Link from 'next/link'
import { contact } from '@/lib/contact'

export default function EnquirePage() {
  return (
    <>
      <section className="bg-forest pt-36 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInView>
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">Get in Touch</p>
            <h1 className="font-serif text-5xl md:text-7xl text-parchment leading-tight">
              Enquire <span className="font-light text-gold">Now</span>
            </h1>
          </FadeInView>
        </div>
      </section>

      <section id="site-visit" className="bg-parchment py-24 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
          <FadeInView direction="left">
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">Contact Us</p>
            <h2 className="font-serif text-3xl text-forest mb-6">We&apos;d love to hear from you</h2>
            <div className="space-y-5 text-charcoal-light">
              <div>
                <p className="text-xs tracking-widest uppercase text-gold mb-1">Phone</p>
                <a href={contact.phoneHref} className="text-lg hover:text-gold transition-colors">
                  {contact.phone}
                </a>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-gold mb-1">Email</p>
                <a href={`mailto:${contact.email}`} className="text-lg hover:text-gold transition-colors">
                  {contact.email}
                </a>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-gold mb-1">Office</p>
                <p className="text-sm leading-relaxed">
                  Flat No. 109, First Floor<br />
                  Aparna Green Homes Apartment<br />
                  Opp. Golf View Apartments<br />
                  Nanakramguda Rd, Financial District<br />
                  Nanakramguda, Hyderabad 500032
                </p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-gold mb-1">Flagship Project</p>
                <Link href="/projects/nisarga" className="text-forest font-serif text-xl hover:text-gold transition-colors">
                  Nisarga — Kollur →
                </Link>
                <p className="text-xs text-charcoal-light/50 mt-1">RERA: PO22000007723</p>
              </div>
            </div>
          </FadeInView>

          <FadeInView direction="right" delay={0.1}>
            <div className="bg-linen border border-gold/20 p-8">
              <p className="text-xs tracking-[0.5em] uppercase text-gold mb-6">Quick Enquiry</p>
              <p className="text-charcoal-light text-sm leading-relaxed mb-6">
                To enquire about our projects, book a site visit, or request pricing information,
                please reach us directly via phone or email. Our team will get back to you within 24 hours.
              </p>
              <a
                href={contact.phoneHref}
                className="block w-full text-center px-8 py-4 bg-forest text-parchment text-sm tracking-widest uppercase font-semibold hover:bg-forest-dark transition-colors duration-200 mb-4"
              >
                Call Now
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="block w-full text-center px-8 py-4 border-2 border-forest text-forest text-sm tracking-widest uppercase hover:bg-forest hover:text-parchment transition-colors duration-200"
              >
                Email Us
              </a>
            </div>
          </FadeInView>
        </div>
      </section>
    </>
  )
}
