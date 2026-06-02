'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeInView from '@/components/FadeInView'
import { entities } from '@/lib/entities'

const coreStrengths = [
  '24+ completed projects across residential, commercial, and mixed-use segments',
  'Debt-free balance sheet — no existing loans or credit facilities',
  'In-house civil engineering team ensuring quality control and execution excellence',
  'Long-standing relationships with architects, contractors, and accountants',
  'Active RERA registration for the flagship Kollur project (PO22000007723)',
]

const leadership = [
  {
    initials: 'VR',
    role: 'Founder & Promoter',
    name: 'Mr. Vasu Raavi',
    tagline: 'Vision · Strategy · Legacy',
    qualifications: null,
    bio: 'Starting from humble beginnings in Nellore, Andhra Pradesh, Mr. Vasu Raavi built the SRSM Group from the ground up over more than two decades. His hands-on involvement — from land acquisition to project delivery — has shaped the Group\'s culture of quality and integrity.',
  },
  {
    initials: 'YR',
    role: 'Co-Director',
    name: 'Yashwanth Raavi',
    tagline: 'Projects · Development',
    qualifications: null,
    bio: ‘Yashwanth Raavi leads project development and on-ground execution across the Group\’s active sites, translating design intent into delivered homes while upholding the timelines and quality standards SRSM is known for.’,
  },
  {
    initials: ‘MR’,
    role: ‘In-house Architect & Design Head’,
    name: ‘Manaswitha Raavi’,
    tagline: ‘Design · Planning · Interiors’,
    qualifications: ‘B.Arch., Hyderabad · M.Des. Interior Design, Florence, Italy’,
    bio: ‘Manaswitha Raavi holds a Bachelor of Architecture from Hyderabad and a Master of Design in Interior Design from Florence, Italy — globally recognised as one of the foremost centres of design and architectural excellence. As the Group\’s in-house architect, she leads design direction, spatial planning, and interior specification across all active developments. Her internationally trained eye brings a refined design vocabulary to every SRSM project, ensuring each home is as considered in detail as it is in scale.’,
  },
  {
    initials: ‘RRC’,
    role: ‘Director — Strategy & Investments’,
    name: ‘Raavi Rishi Chowdary’,
    tagline: ‘Strategy · Investments · Growth’,
    qualifications: ‘BBA, Christ University, Bengaluru · MBA, London, United Kingdom’,
    bio: ‘Raavi Rishi Chowdary holds a Bachelor of Business Administration from Christ University, Bengaluru — one of India\’s leading deemed universities — and a Master of Business Administration from London, United Kingdom. He oversees the Group\’s strategic planning, investment decisions, and long-term portfolio direction. His internationally rounded business education enables him to evaluate opportunities with a global lens while remaining firmly grounded in the fundamentals of Indian real estate.’,
  },
  {
    initials: ‘RC’,
    role: ‘Director — Business Development’,
    name: ‘Raavi Chidvilas’,
    tagline: ‘Business Development · Expansion’,
    qualifications: ‘B.S. Civil Engineering, United States of America’,
    bio: ‘Raavi Chidvilas holds a Bachelor of Science in Civil Engineering from the United States of America, equipping him with a technically rigorous foundation that informs every aspect of his business development role. He is responsible for identifying new market opportunities, forging strategic partnerships, and driving the Group\’s geographic and operational expansion. His engineering background ensures that growth decisions are always evaluated through the lens of structural viability and project deliverability.’,
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-forest pt-36 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInView>
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">Who We Are</p>
            <h1 className="font-serif text-5xl md:text-7xl text-parchment leading-tight">
              About <span className="font-light text-gold">SRSM Group</span>
            </h1>
            <p className="text-parchment/50 mt-6 text-base max-w-xl mx-auto">
              A Hyderabad-based real estate and construction group with over 25 years of legacy,
              built on integrity, quality, and community.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-parchment py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInView>
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-6">Our Purpose</p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-snug mb-8">
              Built on Trust. <span className="font-light text-gold">Delivered with Excellence.</span>
            </h2>
            <p className="text-charcoal-light leading-relaxed text-base md:text-lg">
              For over 25 years, SRSM Group has built homes that stand as testaments to craftsmanship and integrity.
              Debt-free, in-house engineered, and community-focused — we don&apos;t just construct buildings;
              we shape neighbourhoods.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Legacy + Strengths */}
      <section className="bg-linen py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <FadeInView direction="left">
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">Our Legacy</p>
            <h2 className="font-serif text-4xl text-forest mb-6 leading-snug">
              25 Years of Building <span className="font-light">with Purpose</span>
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-5">
              SRSM Group is a Hyderabad-based real estate developer with over 25 years of legacy in construction
              and real estate development. Operating through three active legal entities, the Group has delivered
              24+ residential and commercial projects across Hyderabad, Vizag, and Bangalore.
            </p>
            <p className="text-charcoal-light leading-relaxed mb-5">
              Founded by Mr. Vasu Raavi, the Group has built its reputation on quality construction,
              timely delivery, and a customer-first philosophy. Every project we undertake reflects our commitment
              to lasting value.
            </p>
            <p className="text-charcoal-light leading-relaxed">
              With a strong pipeline of upcoming projects across Hyderabad, SRSM Group is poised for its next
              phase of significant growth — from integrated townships to premium commercial spaces.
            </p>
          </FadeInView>

          <FadeInView direction="right" delay={0.1}>
            <div className="bg-parchment p-8 border-l-4 border-gold">
              <p className="text-xs tracking-[0.5em] uppercase text-gold mb-6">Core Strengths</p>
              <ul className="space-y-4">
                {coreStrengths.map((s, i) => (
                  <li key={i} className="flex gap-3 text-charcoal-light text-sm leading-relaxed">
                    <span className="text-gold mt-0.5 shrink-0">◆</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Mission Quote */}
      <section className="bg-forest py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInView>
            <p className="text-xs tracking-[0.5em] uppercase text-gold/70 mb-6">Mission</p>
            <blockquote className="font-serif text-3xl md:text-4xl text-parchment leading-snug font-light mb-8">
              &ldquo;To deliver homes and spaces that enrich lives — built with integrity, crafted with precision,
              and rooted in the communities we serve.&rdquo;
            </blockquote>
            <p className="text-parchment/50 text-sm tracking-widest uppercase">
              — Mr. Vasu Raavi, Founder &amp; Promoter
            </p>
            <p className="text-parchment/40 text-xs mt-4">
              Cities of Operation: Hyderabad · Vizag · Bangalore
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Group Entities */}
      <section className="bg-parchment py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeInView>
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.5em] uppercase text-gold mb-3">Group Structure</p>
              <h2 className="font-serif text-4xl text-forest">Our Active Entities</h2>
            </div>
          </FadeInView>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-4"
          >
            {entities.map((entity, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(26,51,32,0.15)' }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className="p-7 border border-gold/30 bg-linen cursor-default group hover:border-gold transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-serif text-lg text-forest group-hover:text-gold transition-colors duration-200 leading-snug">
                    {entity.name}
                  </h3>
                  <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 shrink-0 bg-gold/10 text-gold">
                    Active
                  </span>
                </div>
                <p className="text-xs tracking-widest uppercase text-gold/60 mb-4">{entity.segment}</p>
                <p className="text-sm text-charcoal-light/70 leading-relaxed">{entity.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="bg-linen py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInView>
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.5em] uppercase text-gold mb-3">The People Behind</p>
              <h2 className="font-serif text-4xl text-forest">Leadership Team</h2>
            </div>
          </FadeInView>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {leadership.map((person, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(26,51,32,0.12)' }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className="bg-parchment border border-gold/20 p-8 flex flex-col h-full cursor-default group hover:border-gold/60 transition-colors duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-forest/10 border-2 border-gold/20 group-hover:border-gold/60 group-hover:bg-forest/20 flex items-center justify-center mb-5 self-start transition-all duration-300">
                  <span className="font-serif text-xl text-forest font-semibold">{person.initials}</span>
                </div>

                <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-1">{person.role}</p>
                <h3 className="font-serif text-2xl text-forest group-hover:text-gold transition-colors duration-300 mb-1">
                  {person.name}
                </h3>
                <p className="text-xs text-charcoal-light/50 uppercase tracking-wider mb-4">{person.tagline}</p>

                {person.qualifications !== null && (
                  <p className="text-xs text-gold/70 italic mb-4 border-l-2 border-gold/20 pl-3">
                    {person.qualifications}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-gold/10">
                  {person.bio ? (
                    <p className="text-charcoal-light text-sm leading-relaxed">{person.bio}</p>
                  ) : (
                    <p className="text-charcoal-light/30 text-sm italic">[Quote or brief bio to be added]</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest py-20 px-6">
        <FadeInView>
          <div className="max-w-xl mx-auto text-center">
            <p className="text-xs tracking-[0.5em] uppercase text-gold/70 mb-4">Our Work</p>
            <h2 className="font-serif text-3xl text-parchment mb-6">
              Explore 24+ Completed Projects
            </h2>
            <Link
              href="/projects"
              className="inline-block px-8 py-4 bg-gold text-forest text-sm tracking-widest uppercase font-semibold hover:bg-gold-dark transition-colors duration-200"
            >
              View All Projects
            </Link>
          </div>
        </FadeInView>
      </section>
    </>
  )
}
