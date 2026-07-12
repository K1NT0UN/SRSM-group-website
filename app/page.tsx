import LenisProvider from '@/components/cinematic/LenisProvider'
import CineNav from '@/components/cinematic/CineNav'
import Hero from '@/components/cinematic/Hero'
import Legacy from '@/components/cinematic/Legacy'
import NisargaIntro from '@/components/cinematic/NisargaIntro'
import Lifestyle from '@/components/cinematic/Lifestyle'
import Masterplan from '@/components/cinematic/Masterplan'
import Villas from '@/components/cinematic/Villas'
import Amenities from '@/components/cinematic/Amenities'
import Progress from '@/components/cinematic/Progress'
import Gallery from '@/components/cinematic/Gallery'
import Testimonials from '@/components/cinematic/Testimonials'
import Location from '@/components/cinematic/Location'
import BookVisit from '@/components/cinematic/BookVisit'
import CineFooter from '@/components/cinematic/CineFooter'

/**
 * The cinematic journey — one continuous story from arrival to invitation.
 * Hero → Legacy → Nisarga → A day in the life → Masterplan → Villas →
 * Amenities → The journey → Gallery → Voices → Address → Private visit.
 */
export default function HomePage() {
  return (
    <LenisProvider>
      <div className="cinematic bg-midnight font-body text-ivory antialiased selection:bg-aurum selection:text-midnight">
        <CineNav />
        <main>
          <Hero />
          <Legacy />
          <NisargaIntro />
          <Lifestyle />
          <Masterplan />
          <Villas />
          <Amenities />
          <Progress />
          <Gallery />
          <Testimonials />
          <Location />
          <BookVisit />
        </main>
        <CineFooter />
      </div>
    </LenisProvider>
  )
}
