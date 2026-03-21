"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Users, TrendingDown } from "lucide-react";

const PROBLEMS = [
  {
    icon: TrendingDown,
    title: "Hidden tech debt compounds silently.",
    body: "You know debt exists. You do not know which tickets are sitting on a foundation of it. By the time a bug surfaces mid-sprint, the damage to your timeline is already done.",
  },
  {
    icon: Users,
    title: "Team instability is invisible until it is not.",
    body: "A new hire at 60% ramp, a senior engineer carrying three dependencies, a single point of failure on your most complex service. Your capacity model pretends none of this exists.",
  },
  {
    icon: AlertTriangle,
    title: "Stakeholder pressure overrides delivery reality.",
    body: "A deadline lands in Slack. The sprint fills up. No one does the maths on whether it is actually survivable. Three weeks later, you are writing a post-mortem instead of shipping.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="section-padding">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            The Velocity Trap is real.{" "}
            <span className="text-danger">
              And it is costing your organisation money.
            </span>
          </h2>
          <p className="text-text-secondary max-w-prose mx-auto">
            Most teams track velocity. Few teams understand what is actually destroying it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group p-6 rounded-xl bg-bg-surface border border-border-subtle hover:border-border-active transition-all duration-200 hover:-translate-y-1 overflow-hidden"
            >
              {/* Left border that grows on entrance */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                className="absolute left-0 top-0 w-0.5 bg-danger"
              />

              <div className="mb-4 inline-flex p-2.5 rounded-lg bg-danger/10 text-danger">
                <problem.icon size={20} />
              </div>

              <h3 className="text-lg font-semibold text-text-primary mb-3">
                {problem.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {problem.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
