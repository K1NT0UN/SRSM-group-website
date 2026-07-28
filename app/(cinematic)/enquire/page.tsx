import type { Metadata } from 'next'
import EnquireContent from '@/components/cinematic/EnquireContent'

export const metadata: Metadata = {
  title: 'Enquire | SRSM Group',
  description:
    'Get in touch with SRSM Group — send a quick enquiry or book a private site visit to Nisarga, our 17+ acre forestscape villa township in Kollur, Hyderabad.',
  alternates: { canonical: '/enquire' },
}

export default function EnquirePage() {
  return <EnquireContent />
}