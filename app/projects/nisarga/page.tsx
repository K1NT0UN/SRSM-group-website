import type { Metadata } from 'next'
import NisargaPageContent from '@/components/NisargaPageContent'

export const metadata: Metadata = {
  title: 'Nisarga — 4 & 5 BHK Forestscape Villas in Kollur, Hyderabad | SRSM Group',
  description:
    'Nisarga by SR Builders and Developers — A landmark gated township on 17+ acres in Kollur. Premium 4 & 5 BHK forestscape villas with 50+ amenities, 2 exclusive clubhouses. RERA: PO22000007723.',
}

export default function NisargaPage() {
  return (
    <div className="nisarga-theme">
      <NisargaPageContent />
    </div>
  )
}
