// Design tokens as JavaScript constants.
// Import these wherever you need raw values (e.g. Framer Motion inline styles).
// All visual decisions come from WEBSITE_STRATEGY.md § 19.

export const colors = {
  bg: {
    primary:  "#0F1117",
    surface:  "#1A1D27",
    elevated: "#22263A",
  },
  border: {
    subtle: "#2D3148",
    active: "#4A5280",
  },
  accent:  "#5C6BC0",
  accentHover: "#3F51B5",
  cyan:    "#26C6DA",
  success: "#66BB6A",
  warning: "#FFA726",
  danger:  "#EF5350",
  text: {
    primary:   "#E8EAF6",
    secondary: "#9E9FBF",
    disabled:  "#4A4D6A",
  },
} as const;

export const spacing = {
  base: 8,
  section: { desktop: 96, tablet: 64, mobile: 48 },
  maxContent: 1200,
  maxProse: 640,
} as const;

export const duration = {
  fast:   200,
  normal: 400,
  slow:   600,
  slower: 900,
} as const;

export const easing = {
  out:    [0.0, 0.0, 0.2, 1.0] as const,
  spring: { type: "spring", stiffness: 300, damping: 24 } as const,
} as const;
