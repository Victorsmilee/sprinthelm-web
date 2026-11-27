"use client";

/**
 * A single hairline that fills left-to-right as you move through the page.
 *
 * WHY THIS, OF THE THREE OPTIONS: SprintHelm sells *delivery forecasting* —
 * "how far through the work are you, and will you finish?" A thin progress rail
 * is the physical echo of that idea: a precise, quiet instrument reading, not
 * decoration. It also happens to be the only one of the three candidates that
 * (a) is genuinely absent today, and (b) competes with nothing — the hero
 * already carries its grid + portfolio animation, and the stats row already
 * counts up. An aurora backdrop or a second counter would have been noise on
 * top of existing motion; this adds a new, orthogonal signal.
 *
 * TASTE RULES, baked in:
 *   - 2px tall, accent indigo, pinned to the very top edge above the nav. It is
 *     peripheral — you feel it, you don't watch it.
 *   - no colour #2, no gradient animation, no pulse. One line, one accent.
 *   - driven directly off scroll position via a plain gsap.set (no tween), so it
 *     never lags, overshoots, or "animates on its own." Under Lenis it inherits
 *     the smoothed scroll for free; with native scroll it tracks 1:1.
 *
 * ACCESSIBILITY: a progress readout reflects the user's *own* scrolling, which is
 * not the autonomous, vestibular-triggering motion `prefers-reduced-motion`
 * guards against — so it stays visible and useful in that mode. What we remove
 * for reduced motion is any interpolation: there is none here by construction
 * (no CSS transition, no tween), so the reduced-motion path and the default path
 * are the same instant mapping. It is also purely decorative to a screen reader
 * (`aria-hidden`) — the real progress cue is the content itself.
 *
 * Built on @gsap/react's useGSAP so the ScrollTrigger is torn down with the
 * component, matching Reveal/SmoothScroll. ScrollTrigger is a singleton already
 * synced to Lenis by SmoothScroll; we only add one trigger here.
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollProgress(): React.JSX.Element {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Transform-based fill: scaleX on a full-width bar is GPU-cheap and never
    // triggers layout, unlike animating `width`.
    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max", // bottom of the document
      // Direct set, no tween: the rail is a mirror of scroll position, so it is
      // correct on first paint and on every frame, in both motion modes.
      onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
      invalidateOnRefresh: true,
    });

    return () => trigger.kill();
  });

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-accent shadow-[0_0_8px_rgba(92,107,192,0.55)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
