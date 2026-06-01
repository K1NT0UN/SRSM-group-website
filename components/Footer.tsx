import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-forest text-parchment/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <Image
                src="/images/srsm-logo.png"
                alt="SRSM Group"
                width={400}
                height={120}
                className="h-12 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-sm leading-relaxed text-parchment/60 max-w-xs">
              25+ years of excellence in construction and real estate across Hyderabad, Vizag, and Bangalore.
            </p>
            <div className="mt-5 space-y-1 text-xs text-parchment/40 tracking-wide">
              <p>SR Builders &amp; Developers</p>
              <p>SM Builders</p>
              <p>SM Builders and Developers</p>
              <p>SM Projects</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-5 tracking-wide">Navigate</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/projects', label: 'Projects' },
                { href: '/about#leadership', label: 'Leadership' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-gold transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-5 tracking-wide">Contact</h4>
            <address className="not-italic space-y-2 text-sm text-parchment/60">
              <p>Flat No. 109, First Floor</p>
              <p>Aparna Green Homes Apartment</p>
              <p>Opp. Golf View Apartments</p>
              <p>Nanakramguda Rd, Financial District</p>
              <p>Nanakramguda, Hyderabad 500032</p>
              <p className="pt-2">Phone: +1800-4123-3970</p>
              <p>Email: sales@srbuilders.com</p>
            </address>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-parchment/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-parchment/30 tracking-wide">
          <p>© {new Date().getFullYear()} SRSM Group. All rights reserved.</p>
          <p>Hyderabad · Vizag · Bangalore</p>
        </div>
      </div>
    </footer>
  )
}
