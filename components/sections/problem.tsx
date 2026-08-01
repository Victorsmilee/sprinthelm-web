"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Users, TrendingDown } from "lucide-react";

const PROBLEMS = [
  {
    icon: TrendingDown,
    title: "You are making $500k roadmap decisions on spreadsheet intuition.",
    body: "Every commitment you make, from a single project to a whole quarter, is a bet on incomplete information. There is no simulation layer between the ask and the yes. Months later: missed dates, an incident, a conversation nobody wanted.",
  },
  {
    icon: Users,
    title: "Leadership adds projects faster than anyone can model the impact.",
    body: "The board asks for one more initiative. Nobody can say what slips, what it costs, or whether the team survives it. So everyone says yes. The portfolio says no.",
  },
  {
    icon: AlertTriangle,
    title: "45% of product launches miss their target date. 20% miss revenue targets.",
    body: "This is the default for every software company between seed and Series C, not an exceptional bad year. (PMI 2025)",
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
            These are not execution failures. They are information failures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: [0, 0, 0.2, 1] }}
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
