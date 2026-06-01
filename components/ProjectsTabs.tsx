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
                    className="bg-forest/5 border border-gold/40 p-10 relative group cursor-default hover:border-gold transition-all duration-300"
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
                        {/* Brochure download — show only if brochure path exists */}
                        {p.brochure ? (
                          <a
                            href={p.brochure}
                            download
                            className="flex items-center gap-2 text-forest text-xs tracking-widest uppercase border border-gold/40 px-4 py-2 hover:bg-gold hover:text-forest hover:border-gold transition-colors duration-200 font-semibold"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download Brochure
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
              <h3 className="font-serif text-2xl text-forest mb-8 text-center">Coming Soon</h3>
              <div className="max-w-3xl mx-auto space-y-4">
                {pipeline.map((p, i) => (
                  i === 0 ? (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(200,169,81,0.18)' }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      className="border-2 border-gold bg-forest/[0.03] p-10 relative group cursor-default overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1">
                          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold mb-3 block">
                            Coming Soon · {p.company}
                          </span>
                          <h4 className="font-serif text-3xl text-forest group-hover:text-gold transition-colors duration-300 mb-1 font-bold">
                            {p.name}
                            <span className="ml-3 align-middle text-[10px] tracking-widest uppercase text-gold/60 font-sans font-normal border border-gold/40 px-2 py-0.5">
                              Name TBD
                            </span>
                          </h4>
                          <p className="text-sm text-charcoal-light mb-4">{p.location} · {p.type}</p>
                          {p.description && (
                            <p className="text-sm text-charcoal-light leading-relaxed max-w-lg">{p.description}</p>
                          )}
                          <div className="mt-5 flex flex-wrap gap-3 text-xs">
                            {['High-Rise Living', 'Nisarga Township', 'Kollur Corridor', 'Premium Apartments'].map(tag => (
                              <span key={tag} className="px-3 py-1 border border-gold/30 text-gold/80 tracking-wide uppercase">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="shrink-0 md:text-right">
                          <span className="inline-block px-4 py-1.5 border border-gold text-gold text-[10px] tracking-widest uppercase mb-3">
                            Pipeline
                          </span>
                          {p.targetCompletion && (
                            <p className="text-xs text-charcoal-light/60">{p.targetCompletion}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={i}
                      whileHover={{ y: -3, boxShadow: '0 12px 36px rgba(26,51,32,0.12)' }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      className="bg-transparent border border-forest/30 p-8 relative group cursor-default hover:border-gold/40 hover:bg-forest/[0.02] transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <span className="text-[10px] tracking-widest uppercase text-charcoal-light/40 mb-2 block">
                            Pipeline · {p.company}
                          </span>
                          <h4 className="font-serif text-2xl text-forest group-hover:text-gold transition-colors duration-300 mb-1">
                            {p.name}
                          </h4>
                          <p className="text-xs text-charcoal-light/60 mb-2">{p.location}</p>
                          {p.description && (
                            <p className="text-sm text-charcoal-light/70 leading-relaxed">{p.description}</p>
                          )}
                        </div>
                        <div className="shrink-0">
                          <span className="mt-2 inline-block text-[10px] tracking-widest uppercase px-3 py-1 border border-forest/20 text-forest/40">
                            {p.type}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
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
