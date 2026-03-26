# SprintHelm Website — Strategy

*Last updated: 2026-03-27*

---

## Stack

- **Framework:** Next.js 14 (App Router)
- **Hosting:** Vercel (free tier — marketing site only)
- **Styling:** Tailwind CSS with custom design tokens (see `tailwind.config.ts`)
- **Animations:** Framer Motion
- **Forms:** Formspree (zero-backend, responses → email)

---

## Domain Strategy

| Domain | What lives there |
|---|---|
| `sprinthelm.com` | Marketing site (this repo) |
| `app.sprinthelm.com` | Live app — currently `sprinthelm.streamlit.app` (Sprint 3 migration moves this to Railway) |

---

## Pricing (all USD)

| Tier | Monthly | Annual (20% off) | Team limit |
|---|---|---|---|
| Free | $0 | — | 1 team, 10 tickets |
| Pro | $29/mo | $23/mo | 1 team, unlimited |
| Team | $59/mo | $47/mo | Up to 5 teams |
| Enterprise | Custom | Custom | Unlimited |

---

## Pages

| Route | Status | Notes |
|---|---|---|
| `/` | ✅ Live | Marketing homepage with all sections |
| `/signup` | ✅ Live | Email capture → redirects to Streamlit app |
| `/survey` | ✅ Live | Value discovery questionnaire (PR feat/value-survey) |
| `/login` | ❌ Placeholder | Phase 2 (auth) |
| `/privacy`, `/terms` | ❌ Placeholder | Phase 2 |
| `/about`, `/blog`, `/changelog` | ❌ Placeholder | Phase 6+ |

---

## Value Discovery Survey — `/survey`

### Purpose

Qualify inbound interest, measure delivery pain, and direct high-fit respondents directly into the demo app. Responses collected via Formspree → `hello@sprinthelm.com`.

### Five sections

1. **About You** — Role, teams count, engineer count, sprint cadence
2. **The Pain** — Sprint miss frequency, friction causes (multi-select), confidence scale
3. **Current Tools** — Tools in use, tooling gap question, sprint derailment history
4. **Willingness to Pay** — Value rating, pricing model preference, monthly price point, enterprise interest
5. **Interest & Next Steps** — Feature ranking, demo likelihood, open feedback, email

### Result tiers (no score number shown to user)

| Tier | Message |
|---|---|
| High fit (internal score ≥ 7) | "SprintHelm is built for you." |
| Mid fit (score 4–6) | "SprintHelm could make a real difference." |
| Low fit (score < 4) | "Good to meet you — we'd love your feedback." |

### Demo CTA URL

```
https://sprinthelm.streamlit.app/?demo=true&utm_source=survey&utm_medium=web
```

### Environment variable

```
NEXT_PUBLIC_FORMSPREE_FORM_ID=<form_id_from_formspree_dashboard>
```

Set in Vercel project settings → Environment Variables.

### Conversion funnel

Survey → Result screen → Demo CTA → Live app (`?demo=true`) → Free signup

---

## Navigation

- **Full `Nav`** on all pages including `/survey`
- Product dropdown anchor links (`#features`, `#how-it-works`, `#pricing`) navigate home from sub-pages — acceptable Phase 1 behaviour
- `/login` CTA in Nav is a placeholder link until Phase 2 auth

## Footer

- **Full `Footer`** on homepage and `/signup`
- **Minimal `SurveyFooter`** on `/survey` — logo + copyright only, no links to non-existent pages

---

## SEO / Meta

Homepage title: "SprintHelm — AI-Powered Delivery Intelligence"
Survey page title: "Value Discovery — SprintHelm"

---

## GTM Milestones

| Milestone | Target |
|---|---|
| Product Hunt launch | After Sprint 3 production deploy |
| PM community seeding | Reddit r/projectmanagement, Lenny's Slack |
| First 500 free signups | Sprint 5 |
| First 30 paying Pro seats | Sprint 5 |
| 2 enterprise contracts | Sprint 6 |
