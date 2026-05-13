"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const SPRINT_PTS    = 42;
const MONTHLY_COST  = 40_000;
const SPRINT_WEEKS  = 2;
const SPRINT_COST   = Math.round(MONTHLY_COST * (SPRINT_WEEKS / 4.33)); // 18,476

const VPP_PROFIT    = 500;
const VPP_LOSS      = 200;
const VALUE_PROFIT  = SPRINT_PTS * VPP_PROFIT; // 21,000
const VALUE_LOSS    = SPRINT_PTS * VPP_LOSS;   // 8,400
const NET_PROFIT    = VALUE_PROFIT - SPRINT_COST; // +2,524
const NET_LOSS      = VALUE_LOSS   - SPRINT_COST; // -10,076
const ROI_PROFIT    = (NET_PROFIT / SPRINT_COST) * 100;
const ROI_LOSS      = (NET_LOSS   / SPRINT_COST) * 100;

// ─── Formatters ───────────────────────────────────────────────────────────────

function fmtAbs(n: number): string {
  return "$" + Math.abs(n).toLocaleString("en-US");
}

function fmtSigned(n: number): string {
  return (n >= 0 ? "+" : "−") + "$" + Math.abs(n).toLocaleString("en-US");
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroROIAnimation() {
  const [vppTyped,  setVppTyped]  = useState("");
  const [showValue, setShowValue] = useState(false);
  const [costOpen,  setCostOpen]  = useState(false);
  const [costTyped, setCostTyped] = useState("");
  const [showCosts, setShowCosts] = useState(false);
  const [showNet,   setShowNet]   = useState(false);
  const [isLoss,    setIsLoss]    = useState(false);
  const [cycle,     setCycle]     = useState(0);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function at(fn: () => void, ms: number) {
    timers.current.push(setTimeout(fn, ms));
  }

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];

    setVppTyped(""); setShowValue(false); setCostOpen(false);
    setCostTyped(""); setShowCosts(false); setShowNet(false); setIsLoss(false);

    let t = 900;

    // ── Type value/pt "500" ──
    at(() => setVppTyped("5"),   t); t += 130;
    at(() => setVppTyped("50"),  t); t += 130;
    at(() => setVppTyped("500"), t); t += 130;

    // Sprint value fades in
    t += 380;
    at(() => setShowValue(true), t); t += 700;

    // Cost section expands
    at(() => setCostOpen(true), t); t += 550;

    // ── Type monthly cost "40000" ──
    at(() => setCostTyped("4"),     t); t += 150;
    at(() => setCostTyped("40"),    t); t += 150;
    at(() => setCostTyped("400"),   t); t += 150;
    at(() => setCostTyped("4000"),  t); t += 150;
    at(() => setCostTyped("40000"), t); t += 150;

    // Rows appear
    t += 350;
    at(() => setShowCosts(true), t); t += 500;
    at(() => setShowNet(true),   t); t += 2800;

    // ── Switch to loss scenario ──
    at(() => { setVppTyped("200"); setIsLoss(true); }, t); t += 2600;

    // ── Reset / loop ──
    at(() => setCycle(c => c + 1), t);

    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, [cycle]);

  const vppComplete  = vppTyped === "500" || vppTyped === "200";
  const costComplete = costTyped === "40000";
  const currentVpp   = vppTyped === "500" ? VPP_PROFIT : vppTyped === "200" ? VPP_LOSS : null;
  const sprintValue  = currentVpp !== null ? SPRINT_PTS * currentVpp : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0, 0, 0.2, 1] }}
      className="w-full max-w-sm rounded-xl border border-border-subtle bg-bg-surface shadow-elevated overflow-hidden"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-subtle bg-bg-elevated">
        <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
        <span className="ml-3 text-[11px] text-text-disabled font-mono tracking-tight">
          SprintHelm — ROI Calculator
        </span>
      </div>

      <div className="p-4 space-y-3">

        {/* Header row */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-text-primary">Sprint ROI Calculator</span>
          <span className="text-[11px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
            Free
          </span>
        </div>

        {/* Inputs grid */}
        <div className="grid grid-cols-3 gap-2">
          {/* Sprint scope */}
          <div className="rounded-lg border border-border-subtle bg-bg-elevated px-2.5 py-2">
            <p className="text-[9px] font-medium uppercase tracking-wider text-text-disabled mb-0.5">
              Sprint scope
            </p>
            <p className="font-mono text-base font-bold text-cyan">{SPRINT_PTS} pts</p>
          </div>

          {/* Currency */}
          <div className="rounded-lg border border-border-subtle bg-bg-elevated px-2.5 py-2">
            <p className="text-[9px] font-medium uppercase tracking-wider text-text-disabled mb-0.5">
              Currency
            </p>
            <p className="text-sm font-semibold text-text-primary">USD $</p>
          </div>

          {/* Value / pt */}
          <div className="rounded-lg border border-border-subtle bg-bg-elevated px-2.5 py-2">
            <p className="text-[9px] font-medium uppercase tracking-wider text-text-disabled mb-0.5">
              Value / pt
            </p>
            <div className="flex items-center gap-0.5 font-mono text-base font-bold text-text-primary">
              {vppTyped
                ? <>{vppTyped}</>
                : <span className="text-text-disabled font-normal text-xs">500</span>
              }
              {vppTyped && !vppComplete && (
                <span className="animate-pulse text-text-disabled text-sm">|</span>
              )}
            </div>
          </div>
        </div>

        {/* Total Sprint Value */}
        <div className={`rounded-lg border px-3 py-2.5 flex items-center justify-between transition-colors duration-500 ${
          showValue ? "border-accent/30 bg-accent/5" : "border-border-subtle bg-bg-elevated"
        }`}>
          <div>
            <p className="text-xs font-medium text-text-secondary">Total Sprint Value</p>
            <p className="text-[10px] text-text-disabled mt-0.5">
              {showValue && sprintValue !== null
                ? `${SPRINT_PTS} pts × $${currentVpp?.toLocaleString()}`
                : "Enter a value per story point"}
            </p>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={`val-${sprintValue ?? "empty"}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className={`font-mono text-xl font-bold ${
                showValue && sprintValue !== null ? "text-accent" : "text-text-disabled"
              }`}
            >
              {showValue && sprintValue !== null ? fmtAbs(sprintValue) : "—"}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Team Cost — collapsible */}
        <div className="rounded-lg border border-border-subtle bg-bg-elevated overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 cursor-default">
            <span className="text-xs font-medium text-text-secondary">Team Cost — optional</span>
            <span className="text-[10px] text-text-disabled">{costOpen ? "▲" : "▼"} expand</span>
          </div>

          <AnimatePresence>
            {costOpen && (
              <motion.div
                key="cost-body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t border-border-subtle px-3 pb-3 pt-2.5 space-y-2.5">

                  {/* Monthly cost */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-text-disabled">
                      Monthly team cost ($)
                    </span>
                    <div className="flex items-center font-mono text-sm font-semibold text-text-primary">
                      {costTyped
                        ? `$${Number(costTyped).toLocaleString()}`
                        : <span className="text-text-disabled font-normal text-xs">e.g. 10,000</span>
                      }
                      {costTyped && !costComplete && (
                        <span className="animate-pulse text-text-disabled ml-0.5">|</span>
                      )}
                    </div>
                  </div>

                  {/* Sprint duration + teams */}
                  <div className="flex items-center gap-2 text-[10px] text-text-disabled">
                    <span className="bg-accent text-white px-2 py-0.5 rounded font-medium">2w</span>
                    <span>1 team</span>
                    <span className="ml-auto text-[9px]">~4.33 wks/mo</span>
                  </div>

                  {/* Breakdown */}
                  <AnimatePresence>
                    {showCosts && (
                      <motion.div
                        key="breakdown"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="border-t border-border-subtle/50 pt-2.5 space-y-1.5"
                      >
                        {/* Sprint Value row */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-text-secondary">Sprint Value</span>
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={`sv-${sprintValue ?? "e"}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="font-mono text-text-primary"
                            >
                              {sprintValue !== null ? fmtAbs(sprintValue) : "—"}
                            </motion.span>
                          </AnimatePresence>
                        </div>

                        {/* Sprint Cost row */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-text-secondary">Sprint Cost</span>
                          <span className="font-mono text-text-primary">−{fmtAbs(SPRINT_COST)}</span>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-border-subtle/60 my-0.5" />

                        {/* Net row */}
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-text-primary">Net</span>
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={`net-${isLoss ? "loss" : "profit"}-${showNet}`}
                              initial={{ opacity: 0, scale: 0.88 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.88 }}
                              transition={{ duration: 0.35 }}
                              className={`font-mono font-bold ${
                                showNet
                                  ? isLoss ? "text-danger" : "text-success"
                                  : "text-text-disabled"
                              }`}
                            >
                              {showNet
                                ? `${fmtSigned(isLoss ? NET_LOSS : NET_PROFIT)} ${isLoss ? "🔴" : "🟢"}`
                                : "—"}
                            </motion.span>
                          </AnimatePresence>
                        </div>

                        {/* ROI% */}
                        <AnimatePresence>
                          {showNet && (
                            <motion.div
                              key={`roi-${isLoss}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3, delay: 0.15 }}
                              className="flex items-center justify-between text-xs"
                            >
                              <span className="text-text-disabled">ROI</span>
                              <span className={`font-mono font-semibold ${isLoss ? "text-danger" : "text-success"}`}>
                                {(isLoss ? ROI_LOSS : ROI_PROFIT).toFixed(1)}%
                                <span className="ml-1.5 text-text-disabled font-normal">
                                  {isLoss ? "below break-even" : "Typical: 200–500%"}
                                </span>
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
