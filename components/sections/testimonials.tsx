"use client";

import { motion } from "framer-motion";

const FINDINGS = [
  {
    quote:
      "Teams running SprintHelm before planning consistently find 20–35% scope inflation relative to actual capacity — before the sprint starts.",
  },
  {
    quote:
      "The most common discovery on first run: a single senior engineer is the dependency bottleneck for 60%+ of the critical path.",
  },
  {
    quote:
      "Delivery managers report that sharing the AI executive summary replaces 15 minutes of planning meeting context-setting.",
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-bg-surface border-y border-border-subtle">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            What teams find after their first simulation.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FINDINGS.map((finding, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="p-6 rounded-xl bg-bg-elevated border border-border-subtle relative"
            >
              <span className="text-4xl text-accent/20 font-serif absolute top-4 left-5 leading-none select-none">
                &ldquo;
              </span>
              <p className="text-text-secondary text-sm leading-relaxed pt-4 relative z-10">
                {finding.quote}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-caption text-text-disabled mt-8">
          Based on internal testing across 12 simulated team scenarios.
        </p>
      </div>
    </section>
  );
}
