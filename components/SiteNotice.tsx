'use client'

import { useEffect, useState } from 'react'

/**
 * Small dismissible notice that the site was recently overhauled — reassures
 * returning visitors that the changed look is intentional. Dismissal is
 * remembered in localStorage so it shows at most once per visitor. Bump
 * STORAGE_KEY if a future change should re-surface it.
 */
const STORAGE_KEY = 'srsm-notice-2026-07-27'
const CHANGE_DATE = '27 July 2026'

export default function SiteNotice() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true)
    } catch {
      setShow(true)
    }
  }, [])

  function dismiss() {
    setShow(false)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  if (!show) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-[300px] border border-aurum/30 bg-midnight-deep/95 px-4 py-3 shadow-xl backdrop-blur-md">
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss notice"
        className="absolute right-2 top-2 text-ivory/40 transition-colors hover:text-ivory"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 2 L10 10 M10 2 L2 10" strokeLinecap="round" />
        </svg>
      </button>
      <p className="pr-4 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-aurum">
        Freshly Redesigned
      </p>
      <p className="mt-1.5 font-body text-xs font-light leading-relaxed text-ivory/70">
        This website underwent major changes on {CHANGE_DATE}. If it looks
        different from before, that&apos;s expected — nothing is wrong.
      </p>
    </div>
  )
}