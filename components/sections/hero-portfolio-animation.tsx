"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Hero visual — looping Portfolio Simulator vignette.
 *
 * Acts out the flagship story in ~11s: a healthy 4-project portfolio, leadership
 * forces a 5th project in, capacity breaks, one project slips, the dollar cost
 * appears, and SprintHelm answers with a recommendation. Then it resets.
 *
 * Sibling of hero-roi-animation.tsx (same timer/cycle pattern); pure display,
 * no data dependencies.
 */

interface Project {
  name: string;
  pts: number;
  confidence: number; // %
  slipped?: boolean;
}

const BASE_PROJECTS: Project[] = [
  { name: "CRM Refactor", pts: 120, confidence: 92 },
  { name: "Search 2.0", pts: 80, confidence: 88 },
  { name: "Payments", pts: 60, confidence: 95 },
  { name: "Mobile App", pts: 40, confidence: 90 },
];

const FORCED_PROJECT: Project = { name: "Loyalty 2.0", pts: 90, confidence: 41 };

export function HeroPortfolioAnimation() {
  // Phases: 0 idle · 1 forced project appears · 2 capacity breaks + slip · 3 recommendation
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function at(fn: () => void, ms: number) {
    timers.current.push(setTimeout(fn, ms));
  }

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase(0);

    at(() => setPhase(1), 2200); // leadership forces Loyalty 2.0 in
    at(() => setPhase(2), 3600); // capacity 91% → 118%, Search slips
    at(() => setPhase(3), 5200); // cost + recommendation
    at(() => setCycle((c) => c + 1), 11000); // loop

    return () => timers.current.forEach(clearTimeout);
  }, [cycle]);

  const forced = phase >= 1;
  const broken = phase >= 2;

  const projects: Project[] = [
    BASE_PROJECTS[0],
    { ...BASE_PROJECTS[1], confidence: broken ? 54 : BASE_PROJECTS[1].confidence, slipped: broken },
    BASE_PROJECTS[2],
    BASE_PROJECTS[3],
    ...(forced ? [FORCED_PROJECT] : []),
  ];

  return (
    <div className="w-full max-w-md rounded-xl border border-border-subtle bg-bg-surface shadow-elevated overflow-hidden text-left">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-elevated border-b border-border-subtle">
        <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
        <span className="ml-2 text-caption text-text-disabled font-mono truncate">
          app.sprinthelm.com/portfolio
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Header row: title + capacity */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-text-primary">Portfolio forecast</p>
          <motion.span
            key={broken ? "over" : "ok"}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-caption font-mono font-semibold px-2 py-0.5 rounded-full ${
              broken
                ? "text-danger bg-danger/10 border border-danger/20"
                : "text-warning bg-warning/10 border border-warning/20"
            }`}
          >
            Capacity {broken ? "118%" : "91%"}
          </motion.span>
        </div>

        {/* Project rows */}
        <div className="space-y-1.5">
          <AnimatePresence>
            {projects.map((p) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className={`flex items-center justify-between rounded-lg border px-3 py-1.5 ${
                  p.name === FORCED_PROJECT.name
                    ? "border-accent/40 bg-accent/5"
                    : "border-border-subtle bg-bg-primary"
                }`}
              >
                <span className="text-sm text-text-primary truncate">
                  {p.name}
                  {p.name === FORCED_PROJECT.name && (
                    <span className="ml-2 text-caption text-accent">forced in</span>
                  )}
                </span>
                <span className="flex items-center gap-2 font-mono text-caption">
                  <span className="text-text-disabled">{p.pts} pts</span>
                  <motion.span
                    key={`${p.name}-${p.confidence}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={
                      p.confidence >= 80
                        ? "text-success"
                        : p.confidence >= 50
                        ? "text-warning"
                        : "text-danger"
                    }
                  >
                    {p.confidence}%
                  </motion.span>
                  {p.slipped && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-danger"
                    >
                      slips +2 sprints
                    </motion.span>
                  )}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Consequence + recommendation */}
        <div className="min-h-[64px]">
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-lg border border-border-subtle bg-bg-primary px-3 py-2.5 space-y-1"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Cost of forcing Loyalty 2.0</span>
                  <span className="font-mono font-semibold text-danger">$240k at risk</span>
                </div>
                <p className="text-caption text-text-secondary">
                  <span className="text-accent font-semibold">Recommendation:</span>{" "}
                  delay Loyalty 2.0 one sprint and every project ships, $0 at risk.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
