# SRSM Group — Agent Handoff README

*Last updated: 2026-06-02*

---

## What This Workspace Is

The **SRSM Group company website** — a Next.js 16 site for the parent real estate and construction group, which operates several active subsidiaries. Working directory: `~/Desktop/AntiGravity/srsm-group-website/`.

The SR Builders & Developers subsidiary site (flagship project Nisarga) lives separately at `~/Desktop/AntiGravity/construction-site/`.

---

## Live Status

| Item | Status |
|---|---|
| GitHub repo | github.com/K1NT0UN/SRSM-group-website |
| Vercel deployment | Live on Vercel default domain — auto-deploys on push to `main`. Custom GoDaddy domain not yet connected. |
| Supabase | Not used on this site — contact page is display-only (no form) |
| Working tree | Clean, synced to `origin/main` |

---

## Tech Stack

- **Next.js 16.2.6** — App Router, TypeScript
- **Tailwind CSS v4** — CSS-based config in `app/globals.css` (no `tailwind.config.ts`)
- **Framer Motion** — scroll reveals, tab transitions, hover lift, testimonial carousel, Ken Burns hero
- **No GSAP**, **no Supabase** on this site

---

## Brand / Design System

Defined in `app/globals.css` via `@theme`:

| Token | Value | Usage |
|---|---|---|
| `forest` | `#1a3320` | Hero bg, footer, full-bleed sections, nav links |
| `gold` | `#c8a951` | All CTAs, underlines, icon tints, hover, stars |
| `parchment` | `#faf7f0` | Navbar background, page background, content sections |
| `linen` | `#ede0c8` | Alternating sections, card backgrounds |
| `forest-dark` | `#112216` | Hover states, stats bar bg |
| `charcoal` | `#1c1c1c` | Body text |
| `charcoal-light` | `#3d3d3d` | Secondary text |

**Fonts:** Oswald (headings via `font-serif`) + Barlow (body via `font-sans`)
**Rule:** Never use cool grey. Brand is entirely warm-toned.

> Note: a Deep Burgundy & Ivory theme was trialled (commit 614b2de) then reverted to the forest-green theme (733e746). The Nisarga page pins the forest theme via a CSS variable override.

---

## Contact (single source of truth)

All contact details live in **`lib/contact.ts`** — edit there and every page updates:

- **Phone:** `+91 99899 90256`
- **Email:** `sr.sm.group.buildersanddevelopers@gmail.com`
- **WhatsApp:** `wa.me/919989990256` (floating button + inline contact strip)

---

## Logo Files

In `public/images/`:

| File | Usage |
|---|---|
| `srsm-logo.png` | Navbar (dark logo on parchment). Footer reuses it with `brightness-0 invert` to render white |
| `sr-builders-logo-light.png` | Available, not currently used |

---

## File Structure

```
srsm-group-website/
├── app/
│   ├── globals.css              ← Brand colors + fonts (Tailwind v4 @theme) + kenburns keyframe
│   ├── layout.tsx               ← Root layout, Oswald + Barlow, Navbar + Footer + FloatingWhatsApp
│   ├── page.tsx                 ← Homepage (Hero, Stats, Who We Are, Entities, Nisarga card, Testimonials, Mission, CTA, contact strip)
│   ├── about/page.tsx           ← About (Mission, Legacy, Strengths, Entities, Leadership)
│   ├── projects/
│   │   ├── page.tsx             ← Projects (stats strip + ProjectsTabs)
│   │   └── nisarga/page.tsx     ← Nisarga landing (full brochure content via NisargaPageContent)
│   └── enquire/page.tsx         ← Contact page (phone, email, office address — display only, no form)
├── components/
│   ├── Navbar.tsx               ← Parchment bg, forest links, SRSM logo
│   ├── Footer.tsx               ← Forest bg, inverted logo, entities, Nanakramguda address
│   ├── FloatingWhatsApp.tsx     ← Floating WhatsApp button (Framer Motion)
│   ├── FadeInView.tsx           ← Framer Motion scroll reveal
│   ├── ProjectsTabs.tsx         ← Tab switcher (Current & Pipeline / Completed), brochure buttons
│   ├── TestimonialsCarousel.tsx ← Auto-scroll carousel (pauses on hover) — PLACEHOLDER names
│   ├── NisargaHeroCarousel.tsx  ← Ken Burns hero carousel (4 slides, 5s)
│   ├── NisargaOverviewLightbox.tsx ← Aerial + masterplan, click-to-enlarge
│   ├── NisargaLandscapeGallery.tsx ← 11-view grid gallery, tab selector
│   └── NisargaPageContent.tsx   ← Full Nisarga page JSX (11 sections)
├── lib/
│   ├── contact.ts               ← Single source of truth for phone/email/WhatsApp
│   └── projects.ts              ← All project data (current / pipeline / completed)
└── public/images/
    ├── srsm-logo.png
    ├── sr-builders-logo-light.png
    └── nisarga/                 ← Brochure renders (WebP, resized to 2400px max)
```

---

## What's Been Built

### Pages
- ✅ **Homepage (`/`)** — Hero ("Building Legacies Since 1999"), stats bar, Who We Are + 4 core strengths, Four Entities grid, Nisarga flagship card, Testimonials carousel (placeholder names), Mission quote, CTA, inline contact strip
- ✅ **`/about`** — Mission, 25yr legacy + core strengths, mission quote, active entities, Leadership (5 people)
- ✅ **`/projects`** — Gold stats strip, tabs: Current & Pipeline / Completed (24 cards with photo placeholders)
- ✅ **`/projects/nisarga`** — Full Nisarga landing page (11 sections, all images wired)
- ✅ **`/enquire`** — Contact page (phone, email, Nanakramguda office address)
- ✅ **WhatsApp** — Floating button + inline contact strip, shipped

### Group Entities (4 active)
1. SR Builders and Developers — Residential & Villas
2. SM Builders — Residential & Commercial
3. SM Builders and Developers — Residential
4. SM Projects — Residential & Commercial

### Leadership (5 people)
1. Mr. Vasu Raavi — Founder & Promoter
2. Yashwanth Raavi — Co-Director, Projects & Development
3. Manaswitha Raavi — In-house Architect, Design & Planning
4. Raavi Rishi Chowdary — Director, Strategy & Investments
5. Raavi Chidvilas — Director, Business Development & Growth

### Projects Data (`lib/projects.ts`)
**Current (3):** Nisarga (SR Builders, Kollur, township villas, 2028) · Nagole Villas · Medchal Commercial
**Pipeline (5):** Highrise Apartments (Kollur, **name TBD**, 2030) · Borampet Villas · Bashirbag Commercial · Chandanagar Commercial · Lingampally Residences
**Completed:** 24 projects across SR Builders, SM Builders, SM Builders & Developers, SM Projects, SM Constructions, SM Infra Developers

---

## What Still Needs To Be Done

1. **Connect custom GoDaddy domain** — site is live on the Vercel default domain; point the purchased GoDaddy domain at it (add domain in Vercel dashboard, then A record + CNAME in GoDaddy DNS).
2. **Real testimonial names** — `components/TestimonialsCarousel.tsx` still uses placeholder names.
3. **Brochure downloads** — add `brochure: '/brochures/filename.pdf'` to ongoing projects in `lib/projects.ts`; drop PDFs in `public/brochures/`. Button is already wired.
4. **Completed-project photos** — add `image: '/images/completed/filename.jpg'` per project; drop files in `public/images/completed/`.
5. **Leadership photos** — `app/about/page.tsx` shows initials circles; add headshots to `public/images/team/`.
6. **Leadership qualifications & bios** — Yashwanth, Manaswitha, Rishi, Chidvilas still have `'[Qualifications to be added]'` and empty bios.
7. **Highrise dedicated page** — `/projects/highrise`, once the brand name is decided.
8. **Optional enquiry form** — `/enquire` is display-only; wire to Supabase later if a real form is wanted (see construction-site for reference).

---

## Office Address

Flat No. 109, First Floor, Aparna Green Homes Apartment
Opp. Golf View Apartments, Nanakramguda Rd
Financial District, Nanakramguda, Hyderabad 500032

---

## Key Content Files on Desktop

| Path | Contents |
|---|---|
| `~/Desktop/SRSM Profile/SR B & D Logo/` | Logo source files |
| `~/Desktop/SRSM Profile/Nisarga_Brochure_APRL_21_26_.pdf` | Full Nisarga brochure (31 pages) |
| `~/Desktop/Nisarga_Project_Website_Assets/` | All extracted brochure images |
| `~/Desktop/Nisarga_Project_Website_Assets/Website_Content_References/website_copy.md` | Verified Nisarga website copy |
| `~/Desktop/SRSM Profile/PROJECTS DATA CHIDVILAS.xlsx` | All project data spreadsheet |
