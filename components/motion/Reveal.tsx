"use client";

/**
 * A restrained scroll reveal: content fades and rises a few pixels as it enters
 * the viewport, once. This is the ONE motion primitive the marketing sections
 * share — deliberately boring on its own, so the site reads as composed rather
 * than "every element springs in from a different direction."
 *
 * Taste rules baked in, not optional props:
 *   - small travel (16px), short duration, soft ease — a settle, not a slide;
 *   - fires once and stays put (no re-animating on scroll-up);
 *   - `prefers-reduced-motion` → rendered visible with no animation at all;
 *   - no SSR flash: hidden only after we know motion is allowed.
 *
 * Built on @gsap/react's useGSAP so the ScrollTrigger is cleaned up with the
 * component. Keep the surface tiny — a single optional stagger for lists.
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motionDisabled } from "./motionEnv";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
  children: React.ReactNode;
  /** Stagger direct children instead of revealing the block as one. */
  stagger?: boolean;
  /** Extra delay in seconds, for a deliberate sequence. Default 0. */
  delay?: number;
  className?: string;
}

export default function Reveal({
  children,
  stagger = false,
  delay = 0,
  className,
}: RevealProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Visible by default, no animation, when motion must stand down —
      // reduced-motion OR an automated browser (Cypress). The content is
      // already in the DOM; we simply never hide it. See motionEnv.ts.
      if (motionDisabled() || !ref.current) return;

      const targets = stagger ? Array.from(ref.current.children) : ref.current;

      gsap.from(targets, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        delay,
        ease: "power2.out",
        stagger: stagger ? 0.08 : 0,
        // Strip the inline opacity/transform GSAP leaves behind once the
        // entrance is done, so the element reverts to its natural CSS. Without
        // this, the residual inline `transform` overrides Tailwind hover
        // transforms (e.g. `hover:-translate-y-1` on cards) and silently kills
        // the lift. The end state is identical either way — this just hands
        // control back to the stylesheet.
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
