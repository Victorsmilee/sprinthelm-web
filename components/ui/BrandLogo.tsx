/**
 * SprintHelm brand identity (2026-07 redesign, PO-approved).
 *
 * Mark: "Sprint Helm" — a gold/brass ship's helm mid-spin (4 handles in an X,
 * amber motion trail) on an indigo tile. 2.5D: top-lit tile gradient, dark
 * extrusion under the wheel, glass sheen. Replaces the generic layers icon.
 *
 * Wordmark: "Sprint" in text-primary + "Helm" in the brand metal. Two tiers:
 *   helm="amber"    — flat #fbbf24; product UI (headers, nav). Option A.
 *   helm="gradient" — brass gradient; brand moments (login, marketing, PDF
 *                     covers). Option C. Falls back poorly below ~14px bold —
 *                     use amber at small sizes.
 *
 * Master SVG asset lives at public/logo-sprinthelm.svg; the favicon is
 * app/icon.svg. Keep all three in sync if the mark changes.
 */

import { useId } from "react";

export function BrandMark({
  size = 32,
  className = "",
  spinning = false,
}: {
  size?: number;
  className?: string;
  /**
   * Continuous helm rotation — the "4D" loading affordance (e.g. while a
   * simulation runs). All marks also spin on hover. Both honour
   * prefers-reduced-motion.
   */
  spinning?: boolean;
}): React.JSX.Element {
  // Gradient IDs must be unique per instance — two marks on one page would
  // otherwise resolve url(#…) against whichever renders first.
  const uid = useId().replace(/[«»:]/g, "");
  const tile = `tile-${uid}`;
  const mark = `mark-${uid}`;
  const trail = `trail-${uid}`;
  const helm = `helm-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      role="img"
      aria-label="SprintHelm"
      className={className}
    >
      <defs>
        <linearGradient id={tile} x1="0" y1="0" x2="0.55" y2="1">
          <stop offset="0" stopColor="#8b93fb" />
          <stop offset="0.5" stopColor="#6366f1" />
          <stop offset="1" stopColor="#4338ca" />
        </linearGradient>
        <linearGradient id={mark} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id={trail} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0" stopColor="#fbbf24" stopOpacity="0" />
          <stop offset="1" stopColor="#fbbf24" stopOpacity="0.95" />
        </linearGradient>
        <g id={helm} fill="none">
          <g strokeWidth="16" strokeLinecap="round">
            <line x1="128" y1="38" x2="128" y2="64" transform="rotate(45 128 128)" />
            <line x1="128" y1="38" x2="128" y2="64" transform="rotate(135 128 128)" />
            <line x1="128" y1="38" x2="128" y2="64" transform="rotate(225 128 128)" />
            <line x1="128" y1="38" x2="128" y2="64" transform="rotate(315 128 128)" />
          </g>
          <circle cx="128" cy="128" r="58" strokeWidth="15" />
          <g strokeWidth="12">
            <line x1="128" y1="78" x2="128" y2="112" transform="rotate(45 128 128)" />
            <line x1="128" y1="78" x2="128" y2="112" transform="rotate(135 128 128)" />
            <line x1="128" y1="78" x2="128" y2="112" transform="rotate(225 128 128)" />
            <line x1="128" y1="78" x2="128" y2="112" transform="rotate(315 128 128)" />
          </g>
        </g>
      </defs>
      <style>{`
        @keyframes sh-helm-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .sh-helm-wheel { transform-box: view-box; transform-origin: 128px 128px; }
        svg:hover > .sh-helm-wheel, .sh-helm-wheel.sh-spinning {
          animation: sh-helm-spin 2.4s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          svg:hover > .sh-helm-wheel, .sh-helm-wheel.sh-spinning { animation: none; }
        }
      `}</style>
      <rect x="8" y="8" width="240" height="240" rx="56" fill={`url(#${tile})`} />
      {/* The wheel spins (hover / loading); the tile and motion trail stay fixed. */}
      <g className={`sh-helm-wheel${spinning ? " sh-spinning" : ""}`}>
        <use href={`#${helm}`} transform="translate(0 5)" stroke="#78350f" opacity="0.55" />
        <circle cx="128" cy="133" r="23" fill="#78350f" opacity="0.55" />
        <use href={`#${helm}`} stroke={`url(#${mark})`} />
        <circle cx="128" cy="128" r="23" fill={`url(#${mark})`} />
        <circle cx="128" cy="128" r="9" fill="#585ceb" />
      </g>
      <path
        d="M 113.4 45.3 A 84 84 0 0 1 206.9 99.3"
        fill="none"
        stroke={`url(#${trail})`}
        strokeWidth="11"
        strokeLinecap="round"
      />
    </svg>
  );
}

const GRADIENT_TEXT: React.CSSProperties = {
  backgroundImage: "linear-gradient(180deg, #fde68a, #f59e0b)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export function BrandWordmark({
  helm = "amber",
  className = "",
}: {
  /** amber = product UI (option A); gradient = brand moments (option C). */
  helm?: "amber" | "gradient";
  className?: string;
}): React.JSX.Element {
  return (
    <span className={className}>
      Sprint
      {helm === "gradient" ? (
        <span style={GRADIENT_TEXT}>Helm</span>
      ) : (
        <span className="text-amber-400">Helm</span>
      )}
    </span>
  );
}
