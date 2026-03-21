"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Gauge, Brain, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEMO_HIGHLIGHTS = [
  {
    icon: BarChart2,
    label: "Backlog scored",
    value: "15 tickets",
    sub: "ranked by priority",
  },
  {
    icon: Gauge,
    label: "Pressure Index",
    value: "1.18 — Yellow",
    sub: "capacity at 94%",
  },
  {
    icon: TrendingUp,
    label: "Completion odds",
    value: "68%",
    sub: "Monte Carlo · 100 runs",
  },
  {
    icon: Brain,
    label: "AI Summary",
    value: "Generated",
    sub: "C-level ready",
  },
];

const DEMO_URL = "https://sprinthelm.streamlit.app/?demo=true";

export function Demo() {
  return (
    <section id="demo" className="section-padding bg-bg-surface border-y border-border-subtle">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            See it working on a real backlog.
          </h2>
          <p className="text-text-secondary max-w-prose mx-auto">
            We have pre-loaded SprintHelm with a realistic 15-ticket backlog for a
            mid-sized SaaS engineering team. No account. No Jira connection. No
            configuration. Open the demo and see what your sprint is actually carrying.
          </p>
        </motion.div>

        {/* Preview card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-xl border border-border-subtle shadow-elevated overflow-hidden"
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-3 bg-bg-elevated border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-danger/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
            </div>
            <div className="flex-1 mx-4">
              <div className="mx-auto max-w-xs bg-bg-primary rounded px-3 py-1 text-caption text-text-disabled font-mono text-center">
                sprinthelm.streamlit.app
              </div>
            </div>
          </div>

          {/* Metrics preview */}
          <div className="bg-bg-primary p-8 md:p-12">
            <p className="text-center text-sm text-text-disabled mb-8 font-mono">
              — Demo simulation results — Acme Platform Team · Sprint 23 —
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {DEMO_HIGHLIGHTS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-4 rounded-xl bg-bg-surface border border-border-subtle text-center"
                >
                  <div className="inline-flex p-2 rounded-lg bg-accent/10 text-accent mb-3">
                    <item.icon size={18} />
                  </div>
                  <p className="text-caption text-text-disabled mb-1">{item.label}</p>
                  <p className="text-base font-bold text-text-primary">{item.value}</p>
                  <p className="text-caption text-text-disabled mt-0.5">{item.sub}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Open live demo — pre-loaded
                  <ArrowRight size={16} />
                </a>
              </Button>
              <p className="text-caption text-text-disabled">
                Resets every session. Your data never touches it.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
