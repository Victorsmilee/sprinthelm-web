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
- Currency: USD ($) for all outcome/cost language across the site.

---

## Coding Standards

### Constants and configuration
- **No hardcoded app URLs.** The Streamlit app URL (`https://sprinthelm.streamlit.app/`) must be defined as a single constant and imported wherever it is used. Never inline it across multiple components — a URL change should be a one-line edit.
- **No hardcoded strings used in multiple places.** Shared copy (taglines, CTAs, pricing tier names) must be defined as a named constant or in a data file, not copy-pasted across components.
- **No hardcoded colours outside Tailwind config.** All colours must use Tailwind utility classes or CSS variables defined in `globals.css` / `tailwind.config.ts`. Never inline hex values in component files.

### TypeScript
- **No `any` types.** Every prop, return type, and variable must be explicitly typed. If the type is unknown, use `unknown` and narrow it.
- **Explicit return types on all functions and components.** `function Hero(): JSX.Element`, not `function Hero()`.
- **Union types must be exhaustive.** If a prop can be `"primary" | "secondary"`, handle both in the component. No silent fallthrough.

### Component rules
- **One component per file.** Do not define multiple exported components in the same file.
- **No business logic in components.** Components render. Logic (data transformation, URL building, calculations) lives in `lib/` or `utils/` files.
- **No duplicate JSX blocks.** If the same UI structure appears in two places, extract it to a shared component. Three lines of similar JSX is a candidate for extraction; six lines is mandatory.

### Performance
- **Images must use `next/image`.** Never use a bare `<img>` tag.
- **No `useEffect` for data that can be static.** If content doesn't change at runtime, define it as a module-level constant, not in a hook.
- **Animations must respect `prefers-reduced-motion`.** Any Framer Motion or CSS animation must have a reduced-motion fallback.

### Testing and build
- **Vercel build must pass before a PR is merged.** TypeScript errors, unused imports, and missing props are build failures — fix them, do not suppress.
- **No `// @ts-ignore` or `// eslint-disable` comments** unless accompanied by a comment explaining exactly why the suppression is necessary and when it can be removed.
