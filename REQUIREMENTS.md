# SprintHelm Web — Requirements

---

## Feature: Value Discovery Survey

**Status:** ✅ Implemented
**Route:** `/survey`
**Branch:** `feat/value-survey`

---

### Overview

A multi-section questionnaire at `sprinthelm.com/survey` that measures how much delivery pain a visitor experiences, whether SprintHelm solves it, and their willingness to pay. Responses are collected via Formspree and emailed to `hello@sprinthelm.com`. At the end, a tiered result message (no score number) directs high-fit respondents to the live demo app.

---

### Functional Requirements

1. **Five-section survey** — About You → The Pain → Current Tools → Willingness to Pay → Interest & Next Steps.
2. **Section navigation** — progress bar (1 of 5 → Complete), Back / Next buttons. Validate required fields before advancing.
3. **Question types** — single-select radio, multi-select checkbox (with optional cap), 1–5 Likert scale, textarea, email input.
4. **Required fields** — q1 (role), q2 (engineer count), q4 (sprint miss frequency), q5 (friction causes — at least one), q8 (tooling gap), q10 (value scale), q11 (pricing model), q12 (price point), q15 (demo likelihood). All others optional.
5. **New question — teams count** — "How many teams do you currently work with?" with options: 1 / 2 / 3+ / Not sure. Appears in Section 1, before the engineer count question. Optional.
6. **Tools list** — include "No tool" as an option in the multi-select tools question (Section 3).
7. **Pricing question (q11)** — "Which pricing model would work best?" Remove the "Per seat / per PM" option. Options: Per team — flat rate per team per month / Per organisation — annual contract unlimited seats / Free with paid upgrade for advanced features / I'd need to evaluate before committing to any model.
8. **Price point question (q12)** — Replace per-PM-seat GBP question with team-based USD pricing: Under $29/mo / $29–$59/mo / $60–$99/mo / $100–$199/mo / $200+/mo / Free only — I wouldn't pay.
9. **Score calculation (internal only, not shown to user)** — compute a 0–10 fit score from pain signals, tooling gap, value rating, price point, and demo likelihood. Score informs result tier selection only.
10. **Result screen (Section 6)** — show tier message only, no score number. Three tiers:
    - Score ≥ 7: "SprintHelm is built for you." — high-pain, gap-aware, willing to pay.
    - Score 4–6: "SprintHelm could make a real difference." — moderate friction, specific features will land.
    - Score < 4: "Good to meet you — we'd love your feedback." — low pain, but free demo still relevant.
11. **Pain pills** — show up to 6 labelled pill tags derived from q5 friction selections (Stakeholder alignment / Backlog prioritisation / Tech debt visibility / Capacity modelling / Epic forecasting / SPOF risk).
12. **Demo CTA** — primary button "Try the live demo →" links to `https://sprinthelm.streamlit.app/?demo=true&utm_source=survey&utm_medium=web`. Opens in new tab.
13. **No hosting box** — remove the internal "where to host" note from the result screen.
14. **Formspree submission** — on Submit, POST all answers to Formspree endpoint identified by env var `NEXT_PUBLIC_FORMSPREE_FORM_ID`. On success, advance to result screen. On error, show inline error message; do not block user from seeing results.
15. **One-submit-per-session guard** — check `localStorage` key `sh_survey_last_submit`. If a submission was made within the last 5 minutes, show a "You've already submitted — thank you!" message with the demo CTA instead of the form.
16. **Demo click tracking** — attach `data-survey-cta="demo"` to the demo button for analytics. Include a hidden form field `demo_clicked: true` if the user clicks demo before or after submission (bonus, best-effort).
17. **Navigation** — use the existing full `Nav` component. Anchor links (`#features`, `#how-it-works`, `#pricing`) will navigate to the home page — acceptable behaviour.
18. **Footer** — use a new minimal `SurveyFooter` component: SprintHelm logo + copyright line only. No links to non-existent pages.
19. **Framer Motion animations** — section entrance fade-up consistent with the `/signup` page pattern.
20. **No sensitive data in network** — Formspree submission contains only survey answers and optional email. No internal scoring logic, tier thresholds, or infrastructure details are sent or visible in the response payload.

---

### Non-Functional Requirements

- No `any` types. All functions have explicit return type annotations.
- No hardcoded colours outside Tailwind config.
- No hardcoded app URL strings — import from a shared constants file or define at the top of the component file.
- Vercel build must pass (`next build` zero errors).
- One component per file.
- `"use client"` directive required (form state, localStorage, Framer Motion).
- Accessible: labels, keyboard navigation, focus states on all interactive elements.

---

### Acceptance Criteria

- [ ] `sprinthelm.com/survey` renders the 5-section survey with progress bar.
- [ ] Section 1 includes the "How many teams?" question before engineer count.
- [ ] Section 3 tools list includes "No tool".
- [ ] Section 4 pricing question uses team-based USD options with no per-seat option.
- [ ] Required field validation blocks progression with inline error messages.
- [ ] Submitting the form POSTs to Formspree and shows the result screen.
- [ ] Result screen shows tier message and pain pills; no score number; no hosting box.
- [ ] Demo CTA includes UTM params `utm_source=survey&utm_medium=web`.
- [ ] Reloading within 5 minutes shows the already-submitted message with demo CTA.
- [ ] Full Nav renders; minimal SurveyFooter renders with no broken links.
- [ ] `next build` passes with zero TypeScript errors.
