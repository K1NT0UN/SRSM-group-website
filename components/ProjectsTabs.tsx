'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project, ProjectType } from '@/lib/projects'

interface Props {
  current: Project[]
  pipeline: Project[]
  completed: Project[]
}

const typeColors: Partial<Record<ProjectType, string>> = {
  Residential: 'text-forest',
  Commercial: 'text-charcoal-light',
  'RE & Comm': 'text-gold-dark',
  'Integrated Township — Villas': 'text-gold',
}

export default function ProjectsTabs({ current, pipeline, completed }: Props) {
  const [tab, setTab] = useState<'current' | 'completed'>('current')

  return (
    <>
      {/* Tab switcher */}
      <div className="flex justify-center gap-0 mb-16">
        {(['current', 'completed'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-10 py-3 text-sm tracking-widest uppercase transition-colors duration-200 border ${
              tab === t
                ? 'bg-forest text-parchment border-forest'
                : 'bg-transparent text-charcoal-light border-charcoal/20 hover:border-forest hover:text-forest'
            }`}
          >
            {t === 'current' ? 'Current & Pipeline' : `Completed (${completed.length})`}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'current' && (
          <motion.div
            key="current"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* Ongoing */}
            <div className="mb-16">
              <h3 className="font-serif text-2xl text-forest mb-8 text-center">Ongoing</h3>
              <div className="max-w-3xl mx-auto space-y-6">
                {current.map((p, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3, boxShadow: '0 16px 48px rgba(26,51,32,0.14)' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    className="bg-parchment border border-gold/40 p-10 relative group cursor-default hover:border-gold transition-all duration-300"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                    <p className="text-[10px] tracking-[0.4em] uppercase text-forest font-bold mb-2">{p.company}</p>
                    <h3 className="font-serif text-4xl text-forest font-bold mb-2 group-hover:text-gold transition-colors duration-300">
                      {p.name}
                    </h3>
                    <p className="text-sm text-charcoal-light mb-4">{p.location} · {p.type}</p>
                    {p.description && (
                      <p className="text-charcoal-light leading-relaxed mb-6">{p.description}</p>
                    )}
                    <div className="flex flex-wrap gap-4 items-center pt-4 border-t border-gold/20">
                      <span className="px-4 py-1.5 border border-gold text-gold text-xs tracking-widest uppercase">
                        ONGOING
                      </span>
                      {p.targetCompletion && (
                        <p className="text-xs text-charcoal-light/60">Completion: {p.targetCompletion}</p>
                      )}
                      <div className="ml-auto flex flex-wrap gap-4 items-center">
                        {/* Brochure — hosted on the project's own website */}
                        {p.brochureExternal ? (
                          <a
                            href={p.brochureExternal}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-forest text-xs tracking-widest uppercase border border-gold/40 px-4 py-2 hover:bg-gold hover:text-forest hover:border-gold transition-colors duration-200 font-semibold"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Get Brochure ↗
                          </a>
                        ) : (
                          <span className="flex items-center gap-2 text-charcoal-light/30 text-xs tracking-widest uppercase border border-charcoal/10 px-4 py-2 cursor-not-allowed">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Brochure Coming Soon
                          </span>
                        )}
                        {p.slug && (
                          <Link
                            href={`/projects/${p.slug}`}
                            className="text-forest text-xs tracking-widest uppercase border-b border-forest/30 pb-0.5 hover:text-gold hover:border-gold transition-colors font-semibold"
                          >
                            View Project →
                          </Link>
                        )}
                        <Link
                          href="/enquire"
                          className="text-forest text-xs tracking-widest uppercase border-b border-gold pb-0.5 hover:text-gold transition-colors"
                        >
                          Enquire →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pipeline */}
            <div>
              <h3 className="font-serif text-2xl text-forest mb-3 text-center">Coming Soon</h3>
              <p className="text-center text-sm text-charcoal-light/60 mb-8 max-w-xl mx-auto">
                A growing pipeline of residential and commercial developments across Hyderabad.
              </p>
              <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
                {pipeline.map((p, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, boxShadow: '0 18px 44px rgba(200,169,81,0.16)' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    className="bg-parchment border border-gold/40 p-8 relative group cursor-default hover:border-gold overflow-hidden transition-all duration-300 flex flex-col"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                    {/* Faint index numeral fills the space where a render would go — no fake imagery */}
                    <span aria-hidden="true" className="pointer-events-none absolute -top-8 right-1 font-serif text-[7.5rem] leading-none text-gold/[0.07] select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="relative flex items-start justify-between gap-4 mb-4">
                      <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold pt-1">Coming Soon</span>
                      <span className="shrink-0 inline-block px-3 py-1 border border-gold text-gold text-[9px] tracking-widest uppercase">
                        {p.type}
                      </span>
                    </div>

                    <h4 className="relative font-serif text-2xl md:text-[26px] text-forest group-hover:text-gold transition-colors duration-300 font-bold leading-tight mb-1">
                      {p.name}
                    </h4>
                    <p className="relative text-[11px] tracking-widest uppercase text-charcoal-light/40 mb-3">{p.company}</p>
                    <p className="relative text-sm text-charcoal-light/80 mb-4">{p.location}</p>
                    {p.description && (
                      <p className="relative text-sm text-charcoal-light/70 leading-relaxed mb-6">{p.description}</p>
                    )}

                    <div className="relative mt-auto flex items-center justify-between pt-4 border-t border-gold/20">
                      <span className="text-[11px] tracking-widest uppercase text-charcoal-light/50">
                        {p.targetCompletion ? `Expected ${p.targetCompletion}` : 'In planning'}
                      </span>
                      <Link
                        href="/enquire"
                        className="text-forest text-xs tracking-widest uppercase border-b border-gold pb-0.5 hover:text-gold transition-colors"
                      >
                        Enquire →
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'completed' && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {completed.map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(26,51,32,0.1)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="bg-parchment border border-charcoal/10 group cursor-default hover:border-gold/40 transition-colors duration-200 overflow-hidden flex flex-col"
                >
                  {/* Photo slot */}
                  <div className="relative aspect-[4/3] bg-linen overflow-hidden">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-charcoal/20">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[9px] tracking-widest uppercase">Photo Coming Soon</span>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-[10px] tracking-widest uppercase text-charcoal-light/40 mb-2 group-hover:text-charcoal-light/60 transition-colors">
                      {p.company}
                    </p>
                    <h4 className="font-serif text-lg text-forest group-hover:text-gold transition-colors duration-200 leading-snug mb-1">
                      {p.name}
                    </h4>
                    <p className="text-xs text-charcoal-light/60 mb-3">{p.location}</p>
                    <span className={`text-[10px] tracking-widest uppercase mt-auto ${typeColors[p.type as ProjectType] ?? 'text-charcoal-light'}`}>
                      {p.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
