"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const INTEGRATIONS = ["Jira", "Linear", "GitHub", "Slack", "Notion", "Confluence"];

const STATS = [
  { value: 10000, suffix: "+", label: "Tickets scored" },
  { value: 3.2,   suffix: "M+", label: "Simulations run", decimal: true },
  { value: 94,    suffix: "%",  label: "Adjust scope after first run" },
  { value: 60,    suffix: "s",  label: "Time to first insight", prefix: "<" },
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
    <section className="border-y border-border-subtle bg-bg-surface py-12">
      <div className="mx-auto max-w-content px-6 space-y-10">
        {/* Integration logos */}
        <div className="text-center">
          <p className="text-caption text-text-disabled mb-6 uppercase tracking-wider">
            Integrates with tools your team already uses
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {INTEGRATIONS.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold text-text-disabled opacity-40 hover:opacity-70 transition-opacity duration-200"
              >
                {name}
              </span>
            ))}
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
                  decimal={stat.decimal}
                />
              </p>
              <p className="text-caption text-text-secondary mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
