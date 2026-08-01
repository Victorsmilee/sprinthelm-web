"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Gauge, Brain, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEMO_HIGHLIGHTS = [
  {
    icon: BarChart2,
    label: "Projects in flight",
    value: "4 projects",
    sub: "one shared team",
  },
  {
    icon: Gauge,
    label: "Team capacity",
    value: "91% Yellow",
    sub: "backend is the bottleneck",
  },
  {
    icon: TrendingUp,
    label: "On-time forecast",
    value: "3 ship · 1 slips",
    sub: "Monte Carlo · 1,000 runs",
  },
  {
    icon: Brain,
    label: "Cost of forcing +1",
    value: "$240k at risk",
    sub: "with a traceable why",
  },
];

const DEMO_URL = "https://app.sprinthelm.com/portfolio?source=website";
// TODO: set to the portfolio walkthrough video (Loom/YouTube). Falls back to the
// live demo link until provided.
const VIDEO_URL = "";

export function Demo() {
  return (
    <section id="demo" className="section-padding bg-bg-surface border-y border-border-subtle">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            See your whole portfolio, not just one sprint.
          </h2>
          <p className="text-text-secondary max-w-prose mx-auto">
            The live Portfolio Simulator, pre-loaded with a mid-sized SaaS org: every
            project against one team&apos;s capacity. No account, no Jira connection.
            See what ships on time, what slips, and what it costs when leadership forces
            one more project in.
          </p>
        </motion.div>

        {/* Preview card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-xl border border-border-subtle shadow-elevated overflow-hidden"
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-3 bg-bg-elevated border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-danger/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
            </div>
            <div className="flex-1 mx-4">
              <div className="mx-auto max-w-xs bg-bg-primary rounded px-3 py-1 text-caption text-text-disabled font-mono text-center">
                app.sprinthelm.com
              </div>
            </div>
          </div>

          {/* Metrics preview */}
          <div className="bg-bg-primary p-8 md:p-12">
            <p className="text-center text-sm text-text-disabled mb-8 font-mono">
              Portfolio forecast · Acme Platform · 4 projects, one team
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {DEMO_HIGHLIGHTS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-4 rounded-xl bg-bg-surface border border-border-subtle text-center"
                >
                  <div className="inline-flex p-2 rounded-lg bg-accent/10 text-accent mb-3">
                    <item.icon size={18} />
                  </div>
                  <p className="text-caption text-text-disabled mb-1">{item.label}</p>
                  <p className="text-base font-bold text-text-primary">{item.value}</p>
                  <p className="text-caption text-text-disabled mt-0.5">{item.sub}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Open the live portfolio demo
                  <ArrowRight size={16} />
                </a>
              </Button>
              {VIDEO_URL && (
                <Button size="lg" variant="secondary" asChild>
                  <a href={VIDEO_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Watch the 90-sec walkthrough
                  </a>
                </Button>
              )}
              <p className="text-caption text-text-disabled">
                Resets every session. Your data never touches it.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
