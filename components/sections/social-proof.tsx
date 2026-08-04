"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Only list what connects today. Jira is the one shipped integration (one-way
// backlog import); CSV and JSON are real entry paths in the app. Linear,
// GitHub, Slack, Notion, Confluence and Azure DevOps were listed here as
// though they existed — removed in the 2026-08-04 truth pass. They live on
// /roadmap until they ship.
const INTEGRATIONS = ["Jira", "CSV", "JSON"];

const STATS = [
  { value: 78,    suffix: "%",  label: "of PMs say stakeholder alignment is their #1 challenge" },
  { value: 45,    suffix: "%",  label: "of product launches miss their target date" },
  { value: 20,    suffix: "%",  label: "miss revenue targets entirely" },
  { value: 60,    suffix: "s",  label: "for SprintHelm to surface the risk", prefix: "<" },
];

function CountUp({ to, suffix, prefix, decimal }: {
  to: number; suffix: string; prefix?: string; decimal?: boolean;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = 16;
    const increment = (to / duration) * step;
    const timer = setInterval(() => {
      start = Math.min(start + increment, to);
      setValue(start);
      if (start >= to) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, to]);

  const display = decimal
    ? value.toFixed(1)
    : Math.round(value).toLocaleString();

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}

export function SocialProof() {
  return (
    <section className="border-y border-border-subtle bg-bg-elevated py-14 overflow-hidden">
      <div className="mx-auto max-w-content px-6 space-y-10">
        {/* Integration logos — marquee */}
        <div className="text-center">
          <p className="text-sm font-semibold text-text-secondary mb-6 uppercase tracking-widest">
            Works with tools your team already uses
          </p>
          <div className="overflow-hidden">
            <div className="flex gap-16 animate-marquee whitespace-nowrap">
              {[...INTEGRATIONS, ...INTEGRATIONS].map((name, i) => (
                <span
                  key={i}
                  className="text-sm font-semibold text-text-secondary opacity-70 hover:opacity-100 transition-opacity duration-200 inline-block"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border-subtle pt-10">
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-h3 font-bold text-text-primary">
                <CountUp
                  to={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </p>
              <p className="text-caption text-text-secondary mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-caption text-text-disabled text-center pt-4">
          First three figures: PMI / State of Product Leadership, 2025
        </p>
      </div>
    </section>
  );
}
