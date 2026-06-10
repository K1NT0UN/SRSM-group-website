'use client'

import { completedProjects } from '@/lib/projects'

/**
 * Infinite scrolling strip of completed project names — quiet proof of track
 * record. Uses the `scrollLeft` keyframe; content is duplicated for a seamless
 * loop and pauses on hover.
 */
export default function ProjectsMarquee() {
  const names = completedProjects.map(p => `${p.name} · ${p.location}`)

  return (
    <section aria-label="Completed projects" className="bg-forest-dark border-y border-gold/15 py-6 overflow-hidden">
      <div
        className="flex w-max gap-12 whitespace-nowrap [animation:scrollLeft_60s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation:none]"
      >
        {[...names, ...names].map((label, i) => (
          <span
            key={i}
            aria-hidden={i >= names.length}
            className="text-parchment/40 text-xs tracking-[0.3em] uppercase flex items-center gap-12"
          >
            {label}
            <span className="text-gold/50">◆</span>
          </span>
        ))}
      </div>
    </section>
  )
}
