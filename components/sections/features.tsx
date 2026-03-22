"use client";

import { motion } from "framer-motion";
import { BarChart2, Cpu, Gauge, Sparkles, Calendar, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  {
    icon: BarChart2,
    title: "Backlog Scoring Engine",
    headline: "Stop ranking tickets by gut feel.",
    body: "Rank every ticket by revenue impact, technical risk, and customer severity — and walk into planning with a defensible, objective priority list your stakeholders can read in 30 seconds.",
    color: "#5C6BC0",
    soon: false,
  },
  {
    icon: Cpu,
    title: "Monte Carlo Simulation",
    headline: "Know your completion odds before you commit.",
    body: "Run 1,000 simulated sprints before your team runs one. Get a probability score — not a plan that falls apart on day three — so you only commit to what the team can actually finish.",
    color: "#26C6DA",
    soon: false,
  },
  {
    icon: Gauge,
    title: "Pressure Index",
    headline: "One number that tells you how dangerous this sprint is.",
    body: "Know if this sprint is structurally safe before a single line of code is written. Red means renegotiate scope. Yellow means watch closely. Green means go with confidence.",
    color: "#FFA726",
    soon: false,
  },
  {
    icon: Sparkles,
    title: "AI Executive Summary",
    headline: "The briefing your stakeholders will actually read.",
    body: "Simulation results distilled into a 3–4 sentence C-level briefing by Claude. Paste it into your planning deck, the stakeholder Slack channel, or the board update. No editing required.",
    color: "#9B59B6",
    soon: false,
  },
  {
    icon: Calendar,
    title: "Epic Forecasting",
    headline: "See the quarter before it surprises you.",
    body: "Map your epics across 90 days and spot delivery risks before they compound into missed milestones. Identify underscoped initiatives while there is still time to adjust.",
    color: "#66BB6A",
    soon: true,
  },
  {
    icon: TrendingUp,
    title: "Team Benchmarking",
    headline: "Know how your team compares — and what good looks like.",
    body: "See your Pressure Index, completion rates, and sprint scores against anonymised industry benchmarks by team size and vertical. Stop measuring yourself against last sprint.",
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
            Ship the right things. Finish what you start.
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
