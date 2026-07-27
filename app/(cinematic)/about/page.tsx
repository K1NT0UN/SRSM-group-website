import type { Metadata } from 'next'
import AboutContent from '@/components/cinematic/AboutContent'

export const metadata: Metadata = {
  title: 'About | SRSM Group',
  description:
    'Founded by Vasu Raavi in 1999, SRSM Group has delivered 24+ projects across Hyderabad, Vizag and Bangalore — debt-free, in-house engineered, and built on trust.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return <AboutContent />
}
