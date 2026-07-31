"use client";

import { motion } from "framer-motion";
import { ArrowRight, Layers, Scale, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const PORTFOLIO_DEMO_URL = "https://app.sprinthelm.com/portfolio?source=website";

/**
 * Dedicated Portfolio section — the executive centerpiece of the homepage.
 * Sits between Problem (the pain) and HowItWorks (the sprint engine underneath):
 * the three questions every CTO gets asked, answered with traceable math.
 */

const QUESTIONS = [
  {
    icon: Layers,
    question: "“Can we take on one more project?”",
    answer:
      "Run every project against your one shared team. SprintHelm answers yes, no, or “yes — after Sprint 25,” with the capacity math to back it in front of anyone.",
  },
  {
    icon: Scale,
    question: "“What breaks if leadership forces it in anyway?”",
    answer:
      "Price the override before the deadline is signed: which projects slip, how far, and what it costs — in dollars, defects, and attrition risk. Not a feeling. A number.",
  },
  {
    icon: UserPlus,
    question: "“Do we need to hire — and when?”",
    answer:
      "Model headcount before the req is opened. Add an engineer from Sprint 3 and watch the forecast move — turning “we need more people” into a case a CFO can approve.",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="section-padding bg-bg-surface border-y border-border-subtle">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-label font-semibold text-accent uppercase tracking-wider mb-3">
            Portfolio Simulator
          </p>
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            One team. Every project.{" "}
            <span className="text-gradient-accent">The answer executives actually need.</span>
          </h2>
          <p className="text-text-secondary max-w-prose mx-auto">
            Sprint tools tell you what happened. SprintHelm simulates what happens next —
            across the whole portfolio — so the three hardest questions in engineering
            leadership get answers with math that traces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {QUESTIONS.map((item, i) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group p-6 rounded-xl bg-bg-primary border border-border-subtle hover:border-accent/50 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex p-2.5 rounded-lg bg-accent/10 text-accent">
                <item.icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                {item.question}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">{item.answer}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" asChild>
            <a
              href={PORTFOLIO_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Open the Portfolio Simulator
              <ArrowRight size={16} />
            </a>
          </Button>
          <p className="text-caption text-text-disabled">
            Available on Team and Enterprise plans. Pre-loaded demo — no account needed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
