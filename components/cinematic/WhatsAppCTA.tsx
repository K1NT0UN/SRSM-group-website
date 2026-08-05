import { NISARGA_TEL, NISARGA_TEL_HREF, nisargaWhatsApp } from '@/lib/contact'
import WhatsAppGlyph from '@/components/WhatsAppGlyph'

/** The single way to reach us — a glass panel that opens WhatsApp. Replaces the
 *  old form flow; used in the homepage contact section and the /enquire page. */
export default function WhatsAppCTA({
  message = "Hi, I'd like to know more about Nisarga.",
  blurb = 'For the brochure, pricing, plot availability or a private walkthrough — send us a message and our team replies straight away.',
}: {
  message?: string
  blurb?: string
}) {
  return (
    <div className="border border-white/12 bg-white/[0.05] p-8 backdrop-blur-2xl md:p-10">
      <div className="flex items-center gap-3">
        <WhatsAppGlyph className="h-7 w-7 text-aurum" />
        <p className="font-display text-2xl font-light italic text-aurum">Chat with our team</p>
      </div>

      <p className="mt-5 max-w-sm font-body text-sm font-light leading-relaxed text-ivory/65">{blurb}</p>

      <a
        href={nisargaWhatsApp(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-3 bg-aurum px-9 py-4 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-midnight transition-colors duration-300 hover:bg-ivory"
      >
        <WhatsAppGlyph className="h-4 w-4" />
        Message us on WhatsApp
      </a>

      <p className="mt-6 font-body text-sm font-light text-ivory/60">
        Prefer a call?{' '}
        <a
          href={NISARGA_TEL_HREF}
          className="text-ivory/85 underline-offset-4 transition-colors duration-300 hover:text-aurum"
        >
          {NISARGA_TEL}
        </a>
      </p>
    </div>
  )
}
