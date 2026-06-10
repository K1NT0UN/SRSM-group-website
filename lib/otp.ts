'use client'

// Provider-agnostic OTP client.
// - 'firebase' (current default): client-side Firebase Phone Auth + invisible reCAPTCHA.
// - 'msg91': server-side OTP via /api/otp/send + /api/otp/verify (MSG91).
// Switch with NEXT_PUBLIC_OTP_PROVIDER=msg91 once MSG91 keys are configured.
// The Firebase path can be deleted once MSG91 is fully set up.

import type { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth'
import { otpProvider } from './leadConfig'

// ── Firebase state ───────────────────────────────────────────────────────────
// firebase/auth is imported dynamically so it only loads when an OTP is
// actually requested — keeps it out of the initial page bundle.
let confirmation: ConfirmationResult | null = null
let verifier: RecaptchaVerifier | null = null

// ── MSG91 state ──────────────────────────────────────────────────────────────
let msg91Mobile: string | null = null

async function firebaseSend(e164Phone: string, recaptchaContainerId: string): Promise<void> {
  const [{ RecaptchaVerifier: Verifier, signInWithPhoneNumber }, { auth }] = await Promise.all([
    import('firebase/auth'),
    import('./firebase'),
  ])
  if (verifier) {
    verifier.clear()
    verifier = null
  }
  const container = document.getElementById(recaptchaContainerId)
  if (container) container.innerHTML = ''
  verifier = new Verifier(auth, recaptchaContainerId, { size: 'invisible' })
  confirmation = await signInWithPhoneNumber(auth, e164Phone, verifier)
}

async function msg91Send(e164Phone: string): Promise<void> {
  // MSG91 expects digits only, including country code (e.g. 919989990256)
  msg91Mobile = e164Phone.replace(/\D/g, '')
  const res = await fetch('/api/otp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile: msg91Mobile }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Could not send OTP.')
}

/** Send an SMS OTP to an E.164 phone number (e.g. +919989990256). */
export async function sendOtp(e164Phone: string, recaptchaContainerId = 'recaptcha-container'): Promise<void> {
  if (otpProvider === 'msg91') return msg91Send(e164Phone)
  return firebaseSend(e164Phone, recaptchaContainerId)
}

/** Confirm the OTP code the user typed. Throws if wrong/expired. */
export async function verifyOtp(code: string): Promise<boolean> {
  if (otpProvider === 'msg91') {
    if (!msg91Mobile) throw new Error('Please request an OTP first.')
    const res = await fetch('/api/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: msg91Mobile, otp: code }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Invalid or expired OTP.')
    return true
  }
  if (!confirmation) throw new Error('Please request an OTP first.')
  await confirmation.confirm(code)
  return true
}

/** Reset state (e.g. user wants to change number). */
export function resetOtp(): void {
  confirmation = null
  msg91Mobile = null
  if (verifier) {
    verifier.clear()
    verifier = null
  }
}
