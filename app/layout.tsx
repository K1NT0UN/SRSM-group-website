import type { Metadata } from 'next'
import { Oswald, Barlow } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import ScrollProgress from '@/components/ScrollProgress'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://srsmbuilders.com'),
  alternates: { canonical: '/' },
  title: 'SRSM Group | 25 Years of Excellence in Real Estate',
  description:
    'SRSM Group — A Hyderabad-based real estate and construction group with 25+ years of legacy, 24+ completed projects, and a growing portfolio across residential and commercial segments.',
  openGraph: {
    title: 'SRSM Group | 25 Years of Excellence in Real Estate',
    description:
      'A Hyderabad-based real estate and construction group with 25+ years of legacy, 24+ completed projects, and a growing portfolio across residential and commercial segments.',
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
    title: 'SRSM Group | 25 Years of Excellence in Real Estate',
    description:
      'A Hyderabad-based real estate and construction group with 25+ years of legacy and 24+ completed projects.',
    images: ['/og/og-default.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${barlow.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
