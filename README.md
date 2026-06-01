# AntiGravity — Agent Handoff README

*Last updated: 2026-06-01*

---

## What This Workspace Is

This is the **SRSM Group company website** — a Next.js 16 site for the parent real estate and construction group (SRSM Group), which operates three active subsidiaries. The working directory is `~/Desktop/AntiGravity/srsm-group/`.

The SR Builders & Developers subsidiary site (flagship project Nisarga) lives separately at `~/Desktop/AntiGravity/construction-site/` and is tracked at `github.com/K1NT0UN/srsm-group-website`.

---

## Live Status

| Item | Status |
|---|---|
| GitHub repo | github.com/K1NT0UN/srsm-group |
| Vercel deployment | Connect at vercel.com/new → import K1NT0UN/srsm-group |
| Supabase | Not yet set up for this project |

---

## Tech Stack

- **Next.js 16.2.6** — App Router, TypeScript
- **Tailwind CSS v4** — CSS-based config in `app/globals.css` (no `tailwind.config.ts`)
- **Framer Motion** — scroll reveals, tab transitions, hover lift animations, testimonial carousel
- **No GSAP** — not yet needed on this site

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
**Navbar:** Parchment background — uses `srsm-logo.png`. Mobile menu is forest-dark.

---

## Logo Files

Both are in `srsm-group/public/images/`:

| File | Usage |
|---|---|
| `srsm-logo.png` | Navbar (dark logo on parchment bg) |
| `sr-builders-logo-light.png` | Available but not currently used |

Footer uses `srsm-logo.png` with `brightness-0 invert` Tailwind classes to render white.

---

## File Structure

```
srsm-group/
├── app/
│   ├── globals.css              ← Brand colors + fonts (Tailwind v4 @theme) + kenburns keyframe
│   ├── layout.tsx               ← Root layout, Oswald + Barlow fonts, Navbar + Footer
│   ├── page.tsx                 ← Homepage (Hero, Stats, Who We Are, Entities, Nisarga card, Testimonials, Mission, CTA)
│   ├── about/page.tsx           ← About page (Mission, Legacy, Strengths, Entities, Leadership)
│   ├── projects/
│   │   ├── page.tsx             ← Projects page (stats strip, ProjectsTabs)
│   │   └── nisarga/page.tsx     ← Nisarga landing page (full brochure content via NisargaPageContent)
│   └── enquire/page.tsx         ← Contact page (phone, email, office address — no Supabase form yet)
├── components/
│   ├── Navbar.tsx               ← Parchment bg, forest links, SRSM logo, "Our Projects" CTA
│   ├── Footer.tsx               ← Forest bg, inverted logo, 4 entities, Nanakramguda address
│   ├── FadeInView.tsx           ← Framer Motion scroll reveal (up/left/right/none)
│   ├── ProjectsTabs.tsx         ← Tab switcher (Current & Pipeline / Completed), brochure buttons, photo placeholders
│   ├── TestimonialsCarousel.tsx ← Horizontal auto-scroll carousel (pauses on hover), placeholder names
│   ├── NisargaHeroCarousel.tsx  ← Ken Burns hero carousel (4 slides, 5s interval)
│   ├── NisargaOverviewLightbox.tsx ← Aerial + masterplan, click-to-enlarge lightbox
│   ├── NisargaLandscapeGallery.tsx ← 11-view grid gallery, click to expand, tab selector
│   └── NisargaPageContent.tsx  ← Full Nisarga page JSX (all 11 sections)
├── lib/
│   └── projects.ts             ← All project data (current, pipeline, completed) with Project interface
└── public/images/
    ├── srsm-logo.png
    ├── sr-builders-logo-light.png
    └── nisarga/                 ← 36 brochure renders (hero, villas, clubhouses, landscape, etc.)
```

---

## What's Been Built

### Pages

- ✅ **Homepage (`/`)** — Hero ("Building Legacies Since 1999"), stats bar (25+ yrs, 24+ projects, 4 entities, 3 cities), Who We Are + 4 core strengths, Three Entities grid (forest bg), Nisarga flagship card, Testimonials carousel (placeholder names), Mission quote, CTA
- ✅ **`/about`** — Mission, 25yr legacy + core strengths, mission quote, 4 active entities, Leadership (5 people)
- ✅ **`/projects`** — Gold stats strip (3/5/24+/3), tabs: Current & Pipeline / Completed (24 cards with photo placeholders)
- ✅ **`/projects/nisarga`** — Full Nisarga landing page (11 sections, all images wired)
- ✅ **`/enquire`** — Contact page with phone, email, Nanakramguda office address

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

**Current (3 ongoing):**
1. Nisarga — SR Builders, Kollur, Integrated Township Villas, 2028, slug: `nisarga`
2. Nagole Villas — SRSM Group, Nagole, ~10 acres residential
3. Medchal Commercial — SRSM Group, Medchal, ~1+ acre commercial

**Pipeline (5 total):**
1. Highrise Apartments — SR Builders, Kollur, **Name TBD**, 2030
2. Borampet Villas — SRSM Group, ~30 acres
3. Bashirbag Commercial — 60k sqft on 0.5 acres
4. Chandanagar Commercial — 30k sqft on 1,200 sq yards
5. Lingampally Residences — 120 flats opp. Railway Station

**Completed:** 24 projects across SR Builders, SM Builders, SM Builders & Developers, SM Projects, SM Constructions, SM Infra Developers

### Nisarga Page Sections (`NisargaPageContent.tsx`)
1. Hero carousel — 4 slides, Ken Burns, 5s auto-advance, dot indicators
2. Stats bar — 17+ Acres, 50+ Amenities, 4,000 Acres Greenery, 2 Clubhouses, 800m Frontage, G+2
3. Vision — vision-forest image + "Wood Morning" copy
4. Architecture — arch-streetscape full-bleed with forest overlay
5. Overview + Master Plan — aerial left, masterplan right (click to enlarge lightbox)
6. Villa Types — 200 / 239 / 300 sq yd cards with per-floor area tables
7. Streetscape full-bleed (rain render) with forest overlay
8. Clubhouses — Club N'Spire (forest bg) + Club N'finity (charcoal bg) with amenity lists
9. Landscape Gallery — Play Courts featured (col-span-2 row-span-2 aspect-square), 10 other views, tab selector
10. Location — location-map + 5 highlight categories on forest bg
11. CTA — gold section, RERA, phone, email, two buttons → `/enquire`

---

## What Still Needs To Be Done

### 1. Vercel Deployment
Not yet connected. Go to vercel.com/new → import `K1NT0UN/srsm-group` → Deploy. Auto-deploys on push to `main` once connected.

### 2. Customer Testimonials — Real Names
`components/TestimonialsCarousel.tsx` — all 8 entries use `'Placeholder Name N'`. Replace with real customer names once provided. Each entry: `{ name, rating (4.3–5.0), review (one sentence) }`.

### 3. Brochure Downloads
`lib/projects.ts` — add `brochure: '/brochures/filename.pdf'` to each ongoing project once PDFs are provided. Drop PDFs in `public/brochures/`. The download button is already wired — it activates automatically when `brochure` field is set.

### 4. Completed Project Photos
`lib/projects.ts` — add `image: '/images/completed/filename.jpg'` to each completed project once photos are provided. Drop images in `public/images/completed/`. The photo slot is already in the card — placeholder shows until image is set.

### 5. Leadership Photos
`app/about/page.tsx` — all 5 leadership cards show initials circles. Upload real headshots to `public/images/team/`, add `<Image>` in place of the initials `<div>`.

### 6. Leadership Qualifications & Bios
`app/about/page.tsx` — Yashwanth, Manaswitha, Rishi, Chidvilas all have `'[Qualifications to be added]'` and empty bios.

### 7. Contact Details
Phone (`+1800-4123-3970`) and email (`sales@srbuilders.com`) are placeholder values from the Nisarga project. Update with actual SRSM Group contact details in:
- `components/Footer.tsx`
- `app/enquire/page.tsx`
- `components/NisargaPageContent.tsx` (CTA section)

### 8. Nisarga Apartments Dedicated Page
`/projects/highrise` — once the brand name for the high-rise is decided, build a page similar to `/projects/nisarga`.

### 9. Supabase Enquiry Form
`app/enquire/page.tsx` — currently shows phone/email only (no form submission). Wire up Supabase `enquiries` table when ready (see `construction-site/` for reference implementation).

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
| `~/Desktop/Nisarga_Project_Website_Assets/Website_Content_References/website_copy.md` | Full verified Nisarga website copy |
| `~/Desktop/SRSM Profile/PROJECTS DATA CHIDVILAS.xlsx` | All project data spreadsheet |
