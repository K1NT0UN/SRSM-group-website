import LenisProvider from '@/components/cinematic/LenisProvider'
import BrochureBar from '@/components/cinematic/BrochureBar'
import CineNav from '@/components/cinematic/CineNav'
import CineFooter from '@/components/cinematic/CineFooter'

/** Shell for the cinematic experience — home, about, projects. */
export default function CinematicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <div className="cinematic bg-midnight font-body text-ivory antialiased selection:bg-aurum selection:text-midnight">
        <BrochureBar />
        <CineNav />
        <main>{children}</main>
        <CineFooter />
      </div>
    </LenisProvider>
  )
}
