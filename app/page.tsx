'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeInView from '@/components/FadeInView'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import { entities } from '@/lib/entities'

const stats = [
  { value: '25+', label: 'Years of Legacy' },
  { value: '24+', label: 'Completed Projects' },
  { value: '4', label: 'Active Entities' },
  { value: '3', label: 'Cities' },
]

const strengths = [
  { icon: '◆', title: 'Debt-Free', desc: 'No existing loans or credit facilities — a self-funded, financially sound group.' },
  { icon: '◆', title: 'In-House Engineering', desc: 'A dedicated civil engineering team ensures quality control from foundation to finish.' },
  { icon: '◆', title: 'Proven Track Record', desc: '24+ completed projects across residential, commercial, and mixed-use segments.' },
  { icon: '◆', title: 'Trusted Relationships', desc: 'Long-standing ties with architects, contractors, and legal professionals.' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-forest min-h-screen flex flex-col justify-center overflow-hidden">
        {/* subtle grid texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, #c8a951 39px, #c8a951 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #c8a951 39px, #c8a951 40px)`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
          <FadeInView direction="none">
            <p className="text-xs tracking-[0.6em] uppercase text-gold/70 mb-6">
              Hyderabad · Vizag · Bangalore
            </p>
          </FadeInView>

          <FadeInView delay={0.1}>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[100px] text-parchment leading-none mb-8 max-w-4xl">
              Building<br />
              <span className="text-gold font-light">Legacies</span><br />
              Since 1999
            </h1>
          </FadeInView>

          <FadeInView delay={0.2}>
            <p className="text-parchment/60 text-lg max-w-xl leading-relaxed mb-12">
              SRSM Group is a Hyderabad-based real estate and construction group with over 25 years of legacy,
              24+ completed projects, and a robust pipeline of residential and commercial developments.
            </p>
          </FadeInView>

          <FadeInView delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="px-8 py-4 bg-gold text-forest text-sm tracking-widest uppercase font-semibold hover:bg-gold-dark transition-colors duration-200"
              >
                View Our Projects
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border border-parchment/30 text-parchment text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-200"
              >
                About the Group
              </Link>
            </div>
          </FadeInView>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-parchment/10">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-6 lg:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map(({ value, label }) => (
              <motion.div key={label} variants={item} className="text-center md:text-left">
                <p className="font-serif text-4xl md:text-5xl text-gold mb-1">{value}</p>
                <p className="text-xs tracking-widest uppercase text-parchment/50">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Who We Are ───────────────────────────────────── */}
      <section className="bg-parchment py-28 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeInView direction="left">
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">Who We Are</p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-snug mb-6">
              A Group Built on<br />
              <span className="font-light">Trust and Craft</span>
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-5">
              Founded by Mr. Vasu Raavi in Hyderabad, SRSM Group has grown from humble beginnings in Nellore,
              Andhra Pradesh, to become one of the region&apos;s most respected real estate groups.
              Operating through three active entities, the Group has delivered 24+ residential and commercial
              projects across Hyderabad, Vizag, and Bangalore.
            </p>
            <p className="text-charcoal-light leading-relaxed mb-8">
              Debt-free, in-house engineered, and community-focused — we don&apos;t just construct buildings.
              We shape neighbourhoods and create lasting value for our customers.
            </p>
            <Link
              href="/about"
              className="inline-block text-forest text-sm tracking-widest uppercase font-semibold border-b-2 border-gold pb-0.5 hover:text-gold transition-colors duration-200"
            >
              Our Story →
            </Link>
          </FadeInView>

          <FadeInView direction="right" delay={0.1}>
            <div className="space-y-5">
              {strengths.map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-5 bg-linen border-l-4 border-gold/30 hover:border-gold transition-colors duration-300 group">
                  <span className="text-gold mt-0.5 shrink-0">{icon}</span>
                  <div>
                    <p className="font-serif text-lg text-forest group-hover:text-gold transition-colors duration-200 mb-1">{title}</p>
                    <p className="text-sm text-charcoal-light/70 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ── Group Entities ────────────────────────────────── */}
      <section className="bg-forest py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInView>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.5em] uppercase text-gold/70 mb-3">Our Companies</p>
              <h2 className="font-serif text-4xl md:text-5xl text-parchment">
                Three Entities. <span className="font-light text-gold">One Vision.</span>
              </h2>
            </div>
          </FadeInView>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {entities.map((entity, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(0,0,0,0.3)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="bg-forest-dark border border-gold/20 p-8 group hover:border-gold/60 cursor-default flex flex-col"
              >
                <div className="mb-2">
                  <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 border border-gold/30 text-gold/70">
                    Active
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-parchment group-hover:text-gold transition-colors duration-300 mt-4 mb-2 leading-snug">
                  {entity.name}
                </h3>
                <p className="text-xs tracking-widest uppercase text-gold/60 mb-5">{entity.segment}</p>
                <p className="text-parchment/50 text-sm leading-relaxed mt-auto">{entity.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Flagship Project ──────────────────────────────── */}
      <section className="bg-linen py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInView>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.5em] uppercase text-gold mb-3">Flagship Project</p>
              <h2 className="font-serif text-4xl md:text-5xl text-forest">Currently Developing</h2>
            </div>
          </FadeInView>

          <FadeInView delay={0.1}>
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 24px 60px rgba(26,51,32,0.18)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="bg-parchment border-2 border-gold/40 hover:border-gold p-10 md:p-14 relative group cursor-default transition-colors duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gold" />

              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-forest font-bold mb-3">
                    SR Builders and Developers
                  </p>
                  <h3 className="font-serif text-5xl md:text-6xl text-forest group-hover:text-gold transition-colors duration-300 mb-2 font-bold">
                    Nisarga
                  </h3>
                  <p className="text-sm text-charcoal-light mb-6">Kollur, Hyderabad · Integrated Township — Villas</p>
                  <p className="text-charcoal-light leading-relaxed mb-8">
                    A landmark gated township offering premium 4 &amp; 5 BHK forestscape villas on 17+ acres in
                    Kollur — one of Hyderabad&apos;s fastest-growing corridors. Where green meets grandeur.
                  </p>
                  <Link
                    href="/projects/nisarga"
                    className="inline-block px-8 py-4 bg-forest text-parchment text-sm tracking-widest uppercase font-semibold hover:bg-forest-dark transition-colors duration-200"
                  >
                    Explore Project →
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '17+', label: 'Acres' },
                    { value: '50+', label: 'Amenities' },
                    { value: '2', label: 'Clubhouses' },
                    { value: '2028', label: 'Completion' },
                  ].map(({ value, label }) => (
                    <div key={label} className="bg-linen p-6 text-center border border-gold/20">
                      <p className="font-serif text-3xl text-forest mb-1">{value}</p>
                      <p className="text-xs tracking-widest uppercase text-charcoal-light/60">{label}</p>
                    </div>
                  ))}
                  <div className="col-span-2 bg-forest/5 border border-gold/20 px-5 py-3 flex items-center justify-between">
                    <span className="text-xs text-charcoal-light/60">RERA Registration</span>
                    <span className="font-mono text-xs text-forest">PO22000007723</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </FadeInView>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <TestimonialsCarousel />

      {/* ── Mission Quote ─────────────────────────────────── */}
      <section className="bg-forest py-24 px-6">
        <FadeInView>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-[0.5em] uppercase text-gold/60 mb-8">Our Mission</p>
            <blockquote className="font-serif text-3xl md:text-4xl text-parchment leading-snug font-light mb-8">
              &ldquo;To deliver homes and spaces that enrich lives — built with integrity, crafted with precision,
              and rooted in the communities we serve.&rdquo;
            </blockquote>
            <p className="text-parchment/40 text-sm tracking-widest uppercase">
              — Mr. Vasu Raavi, Founder &amp; Promoter
            </p>
          </div>
        </FadeInView>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-parchment py-24 px-6">
        <FadeInView>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <p className="text-xs tracking-[0.5em] uppercase text-gold mb-3">Our Portfolio</p>
              <h2 className="font-serif text-4xl text-forest">
                24+ Projects Delivered.<br />
                <span className="font-light">A Pipeline That Keeps Growing.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href="/projects"
                className="px-8 py-4 bg-forest text-parchment text-sm tracking-widest uppercase font-semibold hover:bg-forest-dark transition-colors duration-200 text-center"
              >
                View All Projects
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border-2 border-forest text-forest text-sm tracking-widest uppercase hover:bg-forest hover:text-parchment transition-colors duration-200 text-center"
              >
                About Us
              </Link>
            </div>
          </div>
        </FadeInView>
      </section>
    </>
  )
}
