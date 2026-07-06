import Image from 'next/image'
import FadeInView from '@/components/FadeInView'

interface EditorialSplitProps {
  /** Stylised wordmark, e.g. pre="Impre" repeat="S" post="ion" -> ImpreSSSion */
  pre: string
  repeat: string
  post: string
  /** The three sub-words the repeated letter stands for */
  labels: [string, string, string]
  headline: string
  body: string
  image: { src: string; alt: string }
  /** Which side the photograph sits on (desktop). Panel takes the other side. */
  imageSide?: 'left' | 'right'
}

export default function EditorialSplit({
  pre,
  repeat,
  post,
  labels,
  headline,
  body,
  image,
  imageSide = 'right',
}: EditorialSplitProps) {
  const imageLeft = imageSide === 'left'

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
      {/* ---- Type panel ---- */}
      <FadeInView
        direction={imageLeft ? 'right' : 'left'}
        className={`bg-forest text-parchment px-8 py-16 lg:px-16 lg:py-24 flex flex-col justify-center ${
          imageLeft ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <Image
          src="/images/nisarga/nisarga-monogram.png"
          alt="Nisarga monogram"
          width={56}
          height={56}
          className="mb-8 opacity-90"
        />

        {/* Stylised wordmark */}
        <h2 className="font-serif leading-none text-6xl md:text-7xl text-parchment/95">
          {pre}
          <span className="text-gold">{repeat.repeat(3)}</span>
          {post}
        </h2>

        {/* Sub-words the repeated letter stands for */}
        <p className="mt-4 text-xs md:text-sm tracking-[0.4em] uppercase text-gold">
          {labels.join('  ·  ')}
        </p>

        <div className="mt-10 max-w-md">
          <h3 className="font-serif text-3xl md:text-4xl leading-tight text-parchment mb-5">
            {headline}
          </h3>
          <p className="text-parchment/70 leading-relaxed text-sm md:text-base">
            {body}
          </p>
        </div>
      </FadeInView>

      {/* ---- Clean render ---- */}
      <FadeInView
        direction={imageLeft ? 'left' : 'right'}
        className={`relative aspect-[3/2] lg:aspect-auto lg:min-h-[620px] ${
          imageLeft ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </FadeInView>
    </section>
  )
}
