"use client";

import Reveal from "@/components/motion/Reveal";
import { BarChart2, Cpu, FileText } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: BarChart2,
    title: "Score",
    headline: "Score every ticket against what actually matters.",
    body: "Paste your backlog or connect Jira. SprintHelm scores every ticket against revenue impact, incident risk, and strategic alignment. A ranked priority list, in seconds.",
    color: "#5C6BC0",
    xOffset: -40,
  },
  {
    step: "02",
    icon: Cpu,
    title: "Simulate",
    headline: "Run a thousand futures before your team runs one.",
    body: "Our Monte Carlo engine simulates 1,000 runs against your actual team capacity, one team or every project in the portfolio at once. You get a probability, not a promise: what ships on time, and what slips.",
    color: "#26C6DA",
    xOffset: 0,
  },
  {
    step: "03",
    icon: FileText,
    title: "Decide",
    headline: "Walk into the boardroom with an answer, not a spreadsheet.",
    body: "SprintHelm turns simulation output into a C-level briefing, written by Claude: what fits, what it costs to force more in, and the recommendation. Share it before the commitment is made, not after it fails.",
    color: "#66BB6A",
    xOffset: 40,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-bg-surface border-y border-border-subtle">
      <div className="mx-auto max-w-content">
        <Reveal className="text-center mb-16">
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            From backlog to boardroom in three steps.
          </h2>
          <p className="text-text-secondary max-w-prose mx-auto">
            No configuration marathons. Score the work, simulate one team or the whole
            portfolio, and share the answer.
          </p>
        </Reveal>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px bg-border-subtle" />

          <Reveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div
              key={step.step}
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
            </div>
          ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
