import Hero from '@/components/cinematic/Hero'
import StatsBand from '@/components/cinematic/StatsBand'
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

/**
 * The cinematic journey — one continuous story from arrival to invitation,
 * structured like the Nisarga page: info-rich hero → stats band → vision →
 * overview → configurations → amenities → journey → gallery → voices →
 * location → enquire.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
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
    </>
  )
}
