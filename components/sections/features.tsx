"use client";

import { motion } from "framer-motion";
import { BarChart2, Cpu, Gauge, Sparkles, Calendar, TrendingUp, AlertTriangle, DollarSign, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  {
    icon: LayoutGrid,
    title: "Portfolio Simulator",
    headline: "With the team you have, what can you actually ship across every project?",
    body: "Run every project against one shared pool of developers and see what fits. Then price the cost of forcing the slate in anyway, in dollars, defects, and attrition, before the deadline is signed. Turn “we need more people” into a case a CFO can approve, with math that traces to your own numbers.",
    color: "#F59E0B",
    soon: false,
  },
  {
    icon: Calendar,
    title: "Quarterly View",
    headline: "See the quarter before it surprises you.",
    body: "Map epics across 90 days and surface delivery risks before they compound. Spot underscoped initiatives while there's still time to adjust.",
    color: "#66BB6A",
    soon: false,
  },
  {
    icon: BarChart2,
    title: "Priority Score",
    headline: "Know which tickets move the business before planning starts.",
    body: "Every ticket scored across six weighted factors: revenue impact, incident risk, tech debt, customer severity, strategic alignment, deadline sensitivity. Walk into planning with a defensible list stakeholders read in 30 seconds.",
    color: "#5C6BC0",
    soon: false,
  },
  {
    icon: Cpu,
    title: "Completion Probability",
    headline: "When the CEO asks to add the feature, you'll know what breaks.",
    body: "SprintHelm runs 1,000 simulated sprints before your team runs one. Add a ticket and watch the completion probability drop from 76% to 41% in real time.",
    color: "#26C6DA",
    soon: false,
  },
  {
    icon: Gauge,
    title: "Pressure Index",
    headline: "Green, Yellow, or Red, before a line of code is written.",
    body: "A single signal: this plan is healthy, stretched, or overloaded. Red means renegotiate scope now. Green means go with confidence.",
    color: "#FFA726",
    soon: false,
  },
  {
    icon: Sparkles,
    title: "Stakeholder Briefing",
    headline: "The update your stakeholders will actually read.",
    body: "Simulation results distilled into a 3-sentence C-level summary by Claude. Paste it into the planning deck or Slack. No editing required.",
    color: "#9B59B6",
    soon: false,
  },
  {
    icon: AlertTriangle,
    title: "Estimation Risk",
    headline: "See which tickets will blow their estimates, before the work starts.",
    body: "Every ticket scored for hidden complexity: tech debt severity, estimate size, ticket type. The simulation adjusts so your completion probability reflects real delivery risk.",
    color: "#FF7043",
    soon: false,
  },
  {
    icon: DollarSign,
    title: "Delivery ROI Calculator",
    headline: "Planning speaks in points. Stakeholders speak in money. Now you speak both.",
    body: "Enter your value per story point and instantly see total sprint value. Add your monthly team cost and SprintHelm calculates whether the sprint is profitable before a line of code is written. Don't know your value per point? SprintHelm shows you the cost floor (the break-even number) and lets you auto-fill it. Supports 8 currencies. All calculations stay in your browser.",
    color: "#4CAF50",
    soon: false,
  },
  {
    icon: TrendingUp,
    title: "Performance Benchmarks",
    headline: "Know what good looks like, not just what you did last quarter.",
    body: "Completion rates and delivery accuracy benchmarked against teams by size and vertical. Stop measuring yourself against your own floor.",
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
            Ship the right things. Finish what you start, across every project.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.07 }}
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
