import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'

/**
 * Layout for the classic inner pages (About / Projects / Enquire).
 * The cinematic home experience at `app/page.tsx` renders its own
 * navigation and footer. FloatingWhatsApp is mounted site-wide in the
 * root layout (app/layout.tsx), so it is intentionally not repeated here.
 */
export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
