<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SRSM Group — project conventions

Marketing site for **SRSM Group**, a family-owned Hyderabad real estate group. Live at **srsmbuilders.com** (`srsmbuilders.in` 308-redirects to it). The flagship and near-total focus is **Nisarga** — a 17+ acre forestscape villa township in Kollur.

Most of what follows are **deliberate decisions that look like bugs**. Please don't "fix" them without asking.

## Deliberate decisions — do not undo

- **The hero video does not loop.** `components/cinematic/Hero.tsx` plays a ~3s night→dawn clip once and holds on the final frame. It's a *lighting transition*, so looping hard-cuts from dawn back to night every 3 seconds. Holding also keeps the hero type on a stable background. Adding `loop` is a regression.
- **There are no lead-capture forms, and no OTP.** Every CTA opens **WhatsApp**. Forms were removed on purpose: they were `+91`-only and blocked US NRI buyers, who are the campaign's target. Don't add a contact form, a phone-verification step, or a "quick enquiry" modal. Use `nisargaWhatsApp(message)` from `lib/contact.ts`, with a message pre-filled for that surface.
- **One phone number.** `WA_NUMBER` in `lib/contact.ts` (+91 99899 90256) — WhatsApp CTAs, the floating bubble and the "call us" line all point at it. One number, one inbox.
- **`/projects/nisarga` is retired.** The old green-themed page was deleted; **the cinematic homepage is the Nisarga experience**. `next.config.ts` redirects the old path to `/`. Don't recreate it. Components still on disk but unrendered (`NisargaPageContent`, `Navbar`, `Footer`, `NisargaHeroCarousel`, `NisargaLeadModal`, `VillaPricing`, `EnvelopeContactForm`, the old carousels/galleries) are dead code kept for reference — don't wire them back in.
- **Villa pricing shows the RATE, never a computed total.** ₹12,999/sq.ft base; **east-facing is ₹13,299** (+₹300/sq.ft). **₹ only — no $ conversion** (nothing should depend on an FX rate). Totals, specifications and payment plans are deliberately a WhatsApp conversation.
- **Villa built-up areas are NOT final** and could increase. Anything derived from them — pricing above all — needs an *"indicative / subject to final measurement"* qualifier. Never present them as fixed.
- **Palette is navy + gold + sand + ivory.** `#0c2340` navy, `#c8a45a` aurum, on sand/ivory grounds. There is deliberately **no light blue** — it fights the warm ground. Green belongs to the retired Nisarga theme only.

## Facts worth not re-deriving

- Leadership names, roles and **qualifications in `AboutContent.tsx` are user-verified** — three were previously fabricated and had to be corrected. **Never invent or "tidy" a person's degree, university, or title.** Vasu Raavi has no formal qualification by design; his line is experience (he built the group from the ground up).
- **RERA:** TS RERA P01100010902. Keep it visible; don't overstate amenity or acreage claims.

## Working on this repo

- Work happens on branch **`redesign/cinematic`**. Production is **`main`**.
- **Deploy:** `git push origin redesign/cinematic:main` — a ref-push. Do *not* `git checkout main && merge`; the tree is usually dirty and the checkout aborts.
- Always run `npm run build` before pushing. Prefer showing the user localhost (`npm run dev -- --port 3311`) before shipping anything visual.
- Assets are optimised before they land: images → WebP, video → h264 `faststart`, audio stripped (autoplay needs muted). Don't commit multi-MB PNGs.
- The **OG/social preview image must stay under ~300 KB** (`public/og/`). WhatsApp skips preview thumbnails above roughly that, and link-sharing is the main distribution channel. Use JPEG, not PNG, and **version the filename** when changing it — WhatsApp and Facebook cache previews aggressively.

## Known failure mode

**A production deploy fails with a Google Fonts 404** (e.g. `fonts.gstatic.com/.../cormorantgaramond/v21/...woff2`):

Google rotated the font files and the build reused a **stale build cache** pointing at the old version. Local and preview builds can still pass, which makes it look mysterious.

**Fix:** Vercel → Deployments → the failed one → **⋯ → Redeploy**, with **"Use existing Build Cache" unticked**.

Fonts are loaded via `next/font/google` in `app/layout.tsx`. If this becomes a repeat nuisance, the permanent fix is self-hosting them with `next/font/local` — considered and deliberately deferred as not yet worth the effort.
