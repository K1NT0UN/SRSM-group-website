# Setup — Lead Capture with Mobile OTP

This site collects enquiries, site-visit bookings, and gated brochure downloads.
Mobile numbers are verified with a real SMS OTP (Firebase Phone Auth, free tier),
and submissions land in **Google Forms → Google Sheets**, with email notifications
to your company inbox.

You only need to do this **once**. After it's done, everything works on every deploy.

---

## Part A — Firebase Phone Auth (the OTP)

1. Go to <https://console.firebase.google.com> → **Add project** (use any name, e.g. `srsm-leads`). Disable Google Analytics if asked — not needed.
2. In the project, click the **`</>` (Web)** icon to "Add app". Register it (nickname only, skip Hosting). You'll be shown a `firebaseConfig` block — keep it open.
3. Left sidebar → **Build → Authentication → Get started → Sign-in method → enable "Phone".**
4. Still in Authentication → **Settings → Authorized domains** → add your live domain(s):
   - your Vercel domain (e.g. `srsm-group-website.vercel.app`)
   - your custom GoDaddy domain once connected
   - `localhost` is already allowed for local testing.
5. Copy the keys from step 2 into **`.env.local`** (copy `.env.local.example` first):
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```
6. Add those same 4 variables in **Vercel → Project → Settings → Environment Variables** (Production + Preview), then redeploy.

> Free tier: ~10 free SMS verifications/day on the Spark plan, far more on Blaze
> (pay-as-you-go) but you won't be charged unless you exceed the free phone-auth
> allowance. No DLT registration needed — Firebase handles Indian SMS delivery.

If these keys are absent, the site still works — it just collects name + mobile
without the OTP step, so nothing breaks while you set this up.

---

## Part B — Google Forms (the data + notifications)

Create **two separate forms** (a third optional one for brochure logs).

For **each** form:

1. Go to <https://forms.google.com> → blank form. Name it (e.g. "SRSM — Enquiries").
2. Add 3 questions, all **Short answer**: `Name`, `Mobile`, `Email`.
3. **Responses tab → ⋮ (three dots) → "Get email notifications for new responses"** → turn ON. Notifications go to the Google account that owns the form — so create/own the forms with your **company email** (`sr.sm.group.buildersanddevelopers@gmail.com`). This is what emails you when someone books a site visit.
4. **Get the field IDs:** form ⋮ → **"Get pre-filled link"** → type dummy text in each field → **Get link** → copy it. The URL contains `entry.123456=Name&entry.789012=Mobile…`. Note each `entry.NUMBER`.
5. **Get the action URL:** open the live form (Send → link), copy the `…/viewform` URL, and change `viewform` → `formResponse`.

Then open **`lib/leadConfig.ts`** and paste them in:

```ts
export const enquiryForm = {
  actionUrl: 'https://docs.google.com/forms/d/e/XXXX/formResponse',
  fields: { name: 'entry.111', mobile: 'entry.222', email: 'entry.333' },
}
export const siteVisitForm = {  // <- the SECOND, separate form
  actionUrl: 'https://docs.google.com/forms/d/e/YYYY/formResponse',
  fields: { name: 'entry.444', mobile: 'entry.555', email: 'entry.666' },
}
```

(Optional) fill `brochureForm` the same way to log who downloads the brochure.

> Want a richer "New site visit booked" email (with the person's details in the
> body) instead of Google's generic one? In the Form → ⋮ → **Apps Script**, add an
> `onFormSubmit` trigger that calls `MailApp.sendEmail(...)`. Ask and I'll write it.

---

## Part C — Brochure download

The gated download appears wherever a project has a brochure file set.

1. Drop the PDF in **`public/brochures/`** (e.g. `public/brochures/nisarga.pdf`).
2. In **`lib/projects.ts`**, set the project's `brochure` field to `/brochures/nisarga.pdf`.

The "Download Brochure" button then opens the verify-then-download flow automatically.

---

## Part D — Install + run

```bash
npm install          # pulls in the firebase package
npm run dev          # test locally at http://localhost:3000/enquire
```

Test: submit an enquiry, check it lands in the Google Sheet; book a site visit,
check your company inbox gets the email; download a brochure and confirm the OTP
gate works.

When happy: `git add -A && git commit -m "Add OTP lead capture + Google Forms" && git push` — Vercel auto-deploys.
