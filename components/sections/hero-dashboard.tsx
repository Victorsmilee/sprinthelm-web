"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Simulated backlog tickets for the hero animation
const TICKETS = [
  { id: "T-001", title: "Fix Checkout Timeout",    score: 4.7, band: "High",   type: "incident",  pts: 8  },
  { id: "T-002", title: "Remove Hardcoded Pricing", score: 3.9, band: "High",   type: "tech_debt", pts: 5  },
  { id: "T-003", title: "User Auth Refresh Flow",   score: 3.4, band: "Medium", type: "feature",   pts: 8  },
  { id: "T-004", title: "Analytics Dashboard v2",   score: 2.8, band: "Medium", type: "feature",   pts: 13 },
  { id: "T-005", title: "API Rate Limiting",        score: 2.1, band: "Medium", type: "tech_debt", pts: 5  },
];

const BAND_COLOR: Record<string, string> = {
  High:   "#66BB6A",
  Medium: "#FFA726",
  Low:    "#EF5350",
};

const TYPE_COLOR: Record<string, string> = {
  incident:  "#9B59B6",
  tech_debt: "#FFA726",
  feature:   "#5C6BC0",
};

// 4 phases: backlog → gauge → probability → ai summary
type Phase = 0 | 1 | 2 | 3;

export function HeroDashboard() {
  const [phase, setPhase]       = useState<Phase>(0);
  const [gauge, setGauge]       = useState(0);
  const [prob, setProb]         = useState(0);
  const [aiText, setAiText]     = useState("");

  const AI_SUMMARY =
    "The team is carrying 34% more scope than capacity supports. Three high-pressure tickets share a single dependency. Recommend descoping T-004 to reduce Pressure Index from Red to Yellow.";

  // Cycle through phases
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const advance = (nextPhase: Phase, delay: number) =>
      timers.push(setTimeout(() => setPhase(nextPhase), delay));

    // Reset & start cycle
    setGauge(0); setProb(0); setAiText("");
    advance(1, 1200);  // backlog visible → animate gauge
    advance(2, 3000);  // gauge done → show probability
    advance(3, 5000);  // prob done → type AI summary
    // Loop every 8s
    timers.push(setTimeout(() => {
      setPhase(0); setGauge(0); setProb(0); setAiText("");
    }, 8000));

    return () => timers.forEach(clearTimeout);
  }, [phase === 0 ? 0 : undefined]); // eslint-disable-line

  // Animate gauge value
  useEffect(() => {
    if (phase !== 1) return;
    let v = 0;
    const interval = setInterval(() => {
      v = Math.min(v + 2, 73);
      setGauge(v);
      if (v >= 73) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [phase]);

  // Animate probability
  useEffect(() => {
    if (phase !== 2) return;
    let v = 0;
    const interval = setInterval(() => {
      v = Math.min(v + 1.5, 68);
      setProb(v);
      if (v >= 68) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [phase]);

  // Typewriter AI summary
  useEffect(() => {
    if (phase !== 3) return;
    let i = 0;
    const interval = setInterval(() => {
      setAiText(AI_SUMMARY.slice(0, i));
      i++;
      if (i > AI_SUMMARY.length) clearInterval(interval);
    }, 22);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-border-subtle bg-bg-surface shadow-elevated overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-bg-elevated">
        <div className="w-3 h-3 rounded-full bg-danger/60" />
        <div className="w-3 h-3 rounded-full bg-warning/60" />
        <div className="w-3 h-3 rounded-full bg-success/60" />
        <span className="ml-3 text-caption text-text-disabled font-mono">
          SprintHelm — Sprint Planning
        </span>
      </div>

      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left: Backlog */}
        <div className="md:col-span-2 space-y-2">
          <p className="text-label text-text-secondary mb-3">Scored Backlog</p>
          {TICKETS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
              className="flex items-center gap-3 p-2.5 rounded bg-bg-elevated border border-border-subtle"
            >
              <span
                className="w-1 h-8 rounded-full flex-shrink-0"
                style={{ background: BAND_COLOR[t.band] }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate">{t.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="text-label px-1.5 py-0.5 rounded"
                    style={{
                      color: TYPE_COLOR[t.type],
                      background: `${TYPE_COLOR[t.type]}18`,
                    }}
                  >
                    {t.type}
                  </span>
                  <span className="text-label text-text-disabled">{t.pts} pts</span>
                </div>
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="text-sm font-semibold flex-shrink-0"
                style={{ color: BAND_COLOR[t.band] }}
              >
                {t.score.toFixed(1)}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Right: Metrics */}
        <div className="space-y-4">
          {/* Pressure gauge */}
          <div className="p-3 rounded bg-bg-elevated border border-border-subtle">
            <p className="text-label text-text-secondary mb-2">Pressure Index</p>
            <div className="relative h-2 bg-bg-primary rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  width: `${gauge}%`,
                  background: gauge > 60 ? "#FFA726" : "#66BB6A",
                }}
                transition={{ duration: 0.05 }}
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span
                className="text-h3 font-bold"
                style={{ color: gauge > 60 ? "#FFA726" : "#66BB6A" }}
              >
                {gauge.toFixed(0)}
              </span>
              <span
                className="text-caption px-2 py-0.5 rounded-full"
                style={{
                  color: gauge > 60 ? "#FFA726" : "#66BB6A",
                  background: gauge > 60 ? "#FFA72618" : "#66BB6A18",
                }}
              >
                {gauge > 60 ? "🟡 Watch" : "🟢 Safe"}
              </span>
            </div>
          </div>

          {/* Completion probability */}
          <div className="p-3 rounded bg-bg-elevated border border-border-subtle">
            <p className="text-label text-text-secondary mb-2">Completion Odds</p>
            <p className="text-h3 font-bold" style={{ color: "#26C6DA" }}>
              {prob.toFixed(0)}%
            </p>
            <p className="text-caption text-text-disabled mt-1">
              {prob >= 68 ? "Sprint at Risk" : "Running simulation..."}
            </p>
          </div>

          {/* AI Summary */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-3 rounded bg-accent/8 border border-accent/20"
              >
                <p className="text-label text-accent mb-1.5">AI Summary</p>
                <p className="text-caption text-text-secondary leading-relaxed">
                  {aiText}
                  <span className="animate-pulse">|</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
