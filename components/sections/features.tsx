"use client";

import { motion } from "framer-motion";
import { BarChart2, Cpu, Gauge, Sparkles, Calendar, TrendingUp, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  {
    icon: BarChart2,
    title: "Priority Score",
    headline: "Know which tickets move the business before planning starts.",
    body: "Every ticket scored across six weighted factors — revenue impact, incident risk, technical debt, customer severity, strategic alignment, and deadline sensitivity. Walk into planning with a defensible priority list your stakeholders can read in 30 seconds.",
    color: "#5C6BC0",
    soon: false,
  },
  {
    icon: Cpu,
    title: "Completion Probability",
    headline: "When the CEO asks to add the feature, you'll know what breaks.",
    body: "SprintHelm runs 1,000 simulated sprints before your team runs one. Add a ticket and watch the completion probability drop from 76% to 41% in real time. The PM no longer argues from intuition. The numbers speak.",
    color: "#26C6DA",
    soon: false,
  },
  {
    icon: Gauge,
    title: "Pressure Index",
    headline: "Green, Yellow, or Red — before a line of code is written.",
    body: "A single signal that tells you whether this sprint is healthy, stretched, or overloaded. Red means renegotiate scope now. Yellow means watch closely. Green means go with confidence.",
    color: "#FFA726",
    soon: false,
  },
  {
    icon: Sparkles,
    title: "Stakeholder Briefing",
    headline: "The update your stakeholders will actually read.",
    body: "Simulation results distilled into a 3–4 sentence C-level summary, written by Claude. Paste it into the planning deck, the Slack channel, or the board update — no editing required.",
    color: "#9B59B6",
    soon: false,
  },
  {
    icon: AlertTriangle,
    title: "Estimation Risk",
    headline: "See which tickets will blow their estimates — before the sprint starts.",
    body: "Every ticket is scored for hidden complexity using tech debt severity, estimate size, and ticket type. Junior teams get wider risk buffers automatically. The simulation adjusts — so your completion probability reflects real delivery risk, not just the plan.",
    color: "#FF7043",
    soon: false,
  },
  {
    icon: Calendar,
    title: "Quarterly View",
    headline: "See the quarter before it surprises you.",
    body: "Map every epic across 90 days and surface delivery risks before they compound into missed milestones. Spot underscoped initiatives while there is still time to adjust.",
    color: "#66BB6A",
    soon: false,
  },
  {
    icon: TrendingUp,
    title: "Performance Benchmarks",
    headline: "Know what good looks like — not just what you did last sprint.",
    body: "See your completion rates, sprint health scores, and delivery accuracy against anonymised benchmarks by team size and vertical. Stop measuring yourself against your own floor.",
    color: "#EF5350",
    soon: false,
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
