"use client";

import { motion } from "framer-motion";
import { BarChart2, Cpu, FileText } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: BarChart2,
    title: "Score",
    headline: "Score every ticket against what actually matters.",
    body: "Paste your backlog or connect Jira. SprintHelm evaluates every ticket against what actually moves the business — revenue impact, incident risk, customer severity, and strategic alignment — and produces a ranked priority list in seconds. No more gut-feel debates in planning.",
    color: "#5C6BC0",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Simulate",
    headline: "Run a thousand sprints before your team runs one.",
    body: "Our Monte Carlo engine runs 1,000 simulated sprints against your actual team capacity — accounting for new joiners, leave, and past delivery patterns. You get a probability score: how likely is this sprint to complete on time? Ship it if the odds are good. Adjust scope if they are not.",
    color: "#26C6DA",
  },
  {
    step: "03",
    icon: FileText,
    title: "Decide",
    headline: "Walk into planning with a C-level summary, not a spreadsheet.",
    body: "SprintHelm turns the simulation output into a 3–4 sentence C-level briefing, written by Claude. Share it in planning, the stakeholder Slack channel, or the board update — before the sprint kicks off, not after it fails.",
    color: "#66BB6A",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-bg-surface border-y border-border-subtle">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            From backlog to briefing in three steps.
          </h2>
          <p className="text-text-secondary max-w-prose mx-auto">
            No configuration marathons. No new process to explain to the team. Paste your
            backlog, run the simulation, share the summary.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px bg-border-subtle" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-start"
            >
              {/* Step number + icon */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 z-10"
                  style={{ background: `${step.color}18`, border: `1px solid ${step.color}30` }}
                >
                  <step.icon size={20} style={{ color: step.color }} />
                </div>
                <span
                  className="text-label font-mono font-semibold"
                  style={{ color: step.color }}
                >
                  Step {step.step}
                </span>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3">
                {step.headline}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
