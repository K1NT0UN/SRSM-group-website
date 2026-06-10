'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeInView from '@/components/FadeInView'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import StatsCounter from '@/components/StatsCounter'
import ProjectsMarquee from '@/components/ProjectsMarquee'
import { entities } from '@/lib/entities'
import { contact } from '@/lib/contact'

const stats = [
  { value: 25, suffix: '+', label: 'Years of Legacy' },
  { value: 24, suffix: '+', label: 'Completed Projects' },
  { value: 4, suffix: '', label: 'Active Entities' },
  { value: 3, suffix: '', label: 'Cities' },
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
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section ref={heroRef} className="relative bg-forest min-h-screen flex flex-col justify-center overflow-hidden">
        {/* subtle grid texture — drifts on scroll */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            y: gridY,
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, var(--color-gold) 39px, var(--color-gold) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, var(--color-gold) 39px, var(--color-gold) 40px)`,
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
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
        </motion.div>

        {/* Stats bar — counts up on scroll */}
        <div className="relative border-t border-parchment/10">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-6 lg:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map(({ value, suffix, label }) => (
              <motion.div key={label} variants={item} className="text-center md:text-left">
                <p className="font-serif text-4xl md:text-5xl text-gold mb-1">
                  <StatsCounter value={value} suffix={suffix} />
                </p>
                <p className="text-xs tracking-widest uppercase text-parchment/50">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Completed projects marquee ───────────────────── */}
      <ProjectsMarquee />

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

      {/* ── Contact Strip ────────────────────────────────── */}
      <section className="bg-linen py-16 px-6">
        <FadeInView>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-3">Get in Touch</p>
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10">
              We&apos;d Love to Hear From You
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={contact.phoneHref}
                className="flex items-center gap-3 px-7 py-4 bg-forest text-parchment text-sm tracking-widest uppercase font-semibold hover:bg-forest-dark transition-colors duration-200"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {contact.phone}
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-7 py-4 bg-[#25D366] text-white text-sm tracking-widest uppercase font-semibold hover:bg-[#1ebe5d] transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 px-7 py-4 border-2 border-forest text-forest text-sm tracking-widest uppercase hover:bg-forest hover:text-parchment transition-colors duration-200"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </FadeInView>
      </section>
    </>
  )
}
