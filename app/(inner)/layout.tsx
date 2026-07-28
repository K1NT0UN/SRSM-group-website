import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'

/**
 * Layout for Nisarga's own project page, which intentionally keeps its
 * distinct forest-green brand identity rather than the cinematic
 * midnight/aurum theme used everywhere else. FloatingWhatsApp is mounted
 * site-wide in the root layout (app/layout.tsx), so it is intentionally not
 * repeated here.
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
