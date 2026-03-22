# sprinthelm-web — Project Context for Claude

## What is this repo?
The marketing and landing page for SprintHelm at sprinthelm.com / sprinthelm-web.vercel.app.
Built with Next.js, Tailwind CSS, and Framer Motion. No backend — static/SSG.

---

## Repo Structure

| Path | Responsibility |
|---|---|
| `components/sections/` | One file per page section (hero, problem, features, how-it-works, pricing, cta, etc.) |
| `components/ui/` | Shared UI primitives (Button, Badge, etc.) |
| `app/` | Next.js App Router pages |
| `public/` | Static assets (icons, images) |

---

## Git Workflow Rules

1. **Always create a new branch before making changes.** Never commit directly to `main`. Branch naming: `<type>/<short-description>` — e.g. `feat/signup-page`, `fix/hero-cta`, `copy/outcome-language`, `design/pricing-layout`.

2. **One PR per logical change.** Each branch = one coherent unit of work. Open a PR against `main` when ready.

3. **PRs are required.** Always confirm a PR is open and visible on GitHub before considering a task done.

---

## Copy Rules

- No technical jargon in user-facing copy. Replace feature names with outcomes.
- Technical terms that are brand concepts (e.g. "Pressure Index") are allowed.
- All copy changes should trace back to the positioning brief or an approved outcome statement.
- Currency: GBP (£) for outcome/cost language.
