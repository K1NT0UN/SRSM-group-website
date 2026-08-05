import { nisargaWhatsApp } from '@/lib/contact'
import WhatsAppGlyph from '@/components/WhatsAppGlyph'

/** Slim fixed strip at the very top — the brochure prompt. Whole bar opens a
 *  pre-filled WhatsApp chat. Sits above the (offset) nav (see CineNav top-9). */
export default function BrochureBar() {
  return (
    <a
      href={nisargaWhatsApp("Hi, I'd like to receive the Nisarga brochure.")}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed inset-x-0 top-0 z-[95] flex h-9 items-center justify-center gap-2.5 border-b border-aurum/25 bg-midnight-deep px-4 text-center font-body text-[10px] font-medium uppercase tracking-[0.25em] text-ivory/85 transition-colors duration-300 hover:text-aurum md:text-[11px] md:tracking-[0.3em]"
    >
      <WhatsAppGlyph className="h-3.5 w-3.5 shrink-0 text-aurum" />
      <span className="hidden sm:inline">Get the Nisarga brochure — message us on WhatsApp</span>
      <span className="sm:hidden">Nisarga brochure on WhatsApp</span>
      <span aria-hidden="true" className="text-aurum transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  )
}
