"use client";

/**
 * Site-wide smooth scrolling (Lenis) synced with GSAP ScrollTrigger.
 *
 * WHY THESE TWO TOGETHER: Lenis replaces the browser's native scroll with an
 * interpolated one (the "expensive" feel). GSAP's ScrollTrigger, which drives
 * every scroll-based reveal, reads scroll position — so it MUST be updated from
 * Lenis's scroll event, and Lenis's rAF loop MUST be driven by GSAP's ticker, or
 * the two run on different clocks and reveals fire at the wrong offsets.
 *
 * ACCESSIBILITY IS NOT OPTIONAL: anyone with `prefers-reduced-motion: reduce`
 * gets native scrolling and no hijack. This is honoured at runtime, so a change
 * in OS settings is respected without a reload. Automated browsers (Cypress)
 * also get native scroll — hijacked scroll makes E2E scroll assertions flake,
 * and smooth scroll is a pure enhancement a test should never have to fight.
 *
 * Mounted once in the root layout, around the whole app.
 */

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionDisabled } from "./motionEnv";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Keeps ScrollTrigger in lockstep with Lenis's interpolated scroll position. */
function LenisScrollTriggerBridge(): null {
  useLenis(() => ScrollTrigger.update());
  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  // Default to native scroll on the server and first paint; opt into smooth
  // only after we've confirmed motion is allowed (not reduced-motion, not an
  // automated browser). Starting "off" is the safe failure mode — a hydration
  // hiccup leaves native scroll, never a broken hijacked one.
  const [smooth, setSmooth] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // motionDisabled() folds in both the reduced-motion check and automation
    // detection; re-evaluated on OS setting change so no reload is needed.
    const apply = (): void => setSmooth(!motionDisabled());
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (!smooth) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        // Restraint over flash: a short lerp is barely-there smoothing, not the
        // slow, laggy "everything floats" scroll that signals a template.
        lerp: 0.1,
        smoothWheel: true,
        // Never smooth touch — it fights the OS and feels broken on phones.
        syncTouch: false,
      }}
    >
      <LenisScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
