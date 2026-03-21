"use client";

import { motion } from "framer-motion";
import { BarChart2, Cpu, Gauge, Sparkles, Calendar, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  {
    icon: BarChart2,
    title: "Backlog Scoring Engine",
    headline: "Stop ranking tickets by gut feel.",
    body: "Six weighted factors, configurable scoring, objective priority rank that accounts for technical risk — not just business value.",
    color: "#5C6BC0",
    soon: false,
  },
  {
    icon: Cpu,
    title: "Monte Carlo Simulation",
    headline: "Know your completion odds before you commit.",
    body: "1,000 simulated sprints against real capacity, adjusted for ramp rates and rolling instability. A probability distribution, not a point estimate.",
    color: "#26C6DA",
    soon: false,
  },
  {
    icon: Gauge,
    title: "Pressure Index",
    headline: "One number that tells you how dangerous this sprint is.",
    body: "Effort load + incident risk + deadline sensitivity = a float value mapped to green/yellow/red. Surfaces structural unsafety before kickoff ends.",
    color: "#FFA726",
    soon: false,
  },
  {
    icon: Sparkles,
    title: "AI Executive Summary",
    headline: "The briefing your stakeholders will actually read.",
    body: "Simulation results → Claude → 3–4 sentence C-level summary. Paste into your planning deck, Slack update, or weekly report. No editing required.",
    color: "#9B59B6",
    soon: false,
  },
  {
    icon: Calendar,
    title: "Epic Forecasting",
    headline: "See the quarter before it surprises you.",
    body: "Map epics across 90 days, flag delivery risks before they compound, identify underscoped initiatives.",
    color: "#66BB6A",
    soon: true,
  },
  {
    icon: TrendingUp,
    title: "Team Benchmarking",
    headline: "Know how your team compares — and what good looks like.",
    body: "Benchmarks Pressure Index, completion rates, and scoring against anonymised industry data by team size and vertical.",
    color: "#EF5350",
    soon: true,
  },
];

export function Features() {
  return (
    <section id="features" className="section-padding">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            Every tool your delivery team has been missing.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`p-6 rounded-xl border transition-all duration-200 hover:-translate-y-1 ${
                feature.soon
                  ? "bg-bg-surface border-border-subtle opacity-70 hover:opacity-90"
                  : "bg-bg-surface border-border-subtle hover:border-border-active hover:shadow-card"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${feature.color}18`,
                    border: `1px solid ${feature.color}30`,
                    filter: feature.soon ? "grayscale(0.5)" : "none",
                  }}
                >
                  <feature.icon size={20} style={{ color: feature.color }} />
                </div>
                {feature.soon && (
                  <Badge variant="coming-soon">Coming soon</Badge>
                )}
              </div>

              <h3 className="text-base font-semibold text-text-primary mb-1">
                {feature.title}
              </h3>
              <p className="text-sm font-medium mb-2" style={{ color: feature.color }}>
                {feature.headline}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
