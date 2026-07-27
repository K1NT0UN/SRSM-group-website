import type { Metadata } from 'next'
import { Oswald, Barlow, Cormorant_Garamond, Manrope } from 'next/font/google'
import Script from 'next/script'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import './globals.css'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

// Cinematic home experience — editorial serif + quiet grotesk
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://srsmbuilders.com'),
  alternates: { canonical: '/' },
  title: 'SRSM Group | Where Life Finds Its Place',
  description:
    'SRSM Group — a Hyderabad real estate group with 25+ years of legacy and 24+ completed projects. Now crafting Nisarga: 4 & 5 BHK forestscape villas on 17+ acres in Kollur.',
  openGraph: {
    title: 'SRSM Group | Where Life Finds Its Place',
    description:
      'A Hyderabad-based real estate group with 25+ years of legacy, 24+ completed projects, and Nisarga — a 17+ acre forestscape villa township in Kollur.',
    url: '/',
    siteName: 'SRSM Group',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og/og-default.png',
        width: 1200,
        height: 630,
        alt: 'SRSM Group — 25 Years of Excellence in Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SRSM Group | Where Life Finds Its Place',
    description:
      'A Hyderabad-based real estate group with 25+ years of legacy and 24+ completed projects.',
    images: ['/og/og-default.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${barlow.variable} ${cormorant.variable} ${manrope.variable}`}
    >
      <body>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P5THW5VG');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P5THW5VG"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        {/* Primary conversion CTA (WhatsApp) — site-wide, all routes */}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
