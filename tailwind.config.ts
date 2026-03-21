import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background
        bg: {
          primary:  "#0F1117",
          surface:  "#1A1D27",
          elevated: "#22263A",
        },
        // Border
        border: {
          subtle: "#2D3148",
          active: "#4A5280",
        },
        // Accent
        accent: {
          DEFAULT: "#5C6BC0",
          hover:   "#3F51B5",
        },
        // Secondary accent (simulation / data)
        cyan: {
          DEFAULT: "#26C6DA",
        },
        // Semantic
        success: "#66BB6A",
        warning: "#FFA726",
        danger:  "#EF5350",
        // Text
        text: {
          primary:   "#E8EAF6",
          secondary: "#9E9FBF",
          disabled:  "#4A4D6A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "display": ["56px", { lineHeight: "1.1", fontWeight: "700" }],
        "h2":      ["40px", { lineHeight: "1.2", fontWeight: "700" }],
        "h3":      ["28px", { lineHeight: "1.3", fontWeight: "700" }],
        "body":    ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "caption": ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        "label":   ["12px", { lineHeight: "1.4", fontWeight: "600" }],
      },
      spacing: {
        // 8px base grid
        "section-desktop": "96px",
        "section-tablet":  "64px",
        "section-mobile":  "48px",
      },
      maxWidth: {
        content: "1200px",
        prose:   "640px",
      },
      borderRadius: {
        DEFAULT: "6px",
        lg:      "10px",
        xl:      "16px",
      },
      boxShadow: {
        card:    "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
        elevated:"0 10px 40px rgba(0,0,0,0.5)",
        glow:    "0 0 40px rgba(92, 107, 192, 0.15)",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "marquee": {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-badge": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.5" },
        },
        "count-up": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
      animation: {
        "fade-up":     "fade-up 0.6s ease-out forwards",
        "marquee":     "marquee 30s linear infinite",
        "pulse-badge": "pulse-badge 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
