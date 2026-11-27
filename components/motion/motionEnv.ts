/**
 * When motion must stand down.
 *
 * Two cases are treated identically — native scroll, no reveals, content
 * visible and static:
 *
 *  1. `prefers-reduced-motion: reduce` — an accessibility requirement.
 *  2. Automated browsers (Cypress) — Lenis rewrites global scroll behaviour
 *     and the reveal primitive hides content until it scrolls into view, both
 *     of which make E2E scroll/visibility assertions flake. These are pure
 *     progressive enhancements, so the honest thing under test is to run the
 *     page exactly as it rendered before motion was added, not to teach every
 *     spec about smooth scroll. Detected via `window.Cypress` (Cypress runs
 *     in-browser and does NOT set navigator.webdriver, so that check wouldn't
 *     fire) — and it is inert for real users, who never carry that global.
 *
 * Pure, client-only, SSR-safe (returns false on the server so the first paint
 * matches the client's pre-hydration state).
 */

export function isAutomatedBrowser(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "Cypress" in window ||
    (typeof navigator !== "undefined" && navigator.webdriver === true)
  );
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True when motion should be suppressed entirely (a11y or automation). */
export function motionDisabled(): boolean {
  return prefersReducedMotion() || isAutomatedBrowser();
}
