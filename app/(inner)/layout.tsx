import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import ScrollProgress from '@/components/ScrollProgress'

/**
 * Layout for the classic inner pages (About / Projects / Enquire).
 * The cinematic home experience at `app/page.tsx` renders its own
 * navigation and footer.
 */
export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
