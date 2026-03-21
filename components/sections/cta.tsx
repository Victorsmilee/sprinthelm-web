"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-border-active bg-bg-surface overflow-hidden p-12 md:p-16 text-center"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(92,107,192,0.1) 0%, transparent 70%), #1A1D27",
          }}
        >
          <h2 className="text-h2 font-bold text-text-primary mb-4 text-balance">
            Your next sprint starts with a simulation.
          </h2>
          <p className="text-text-secondary max-w-prose mx-auto mb-8">
            Join engineering teams who stopped guessing and started delivering.
            Free forever. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" asChild>
              <a href="/signup" className="flex items-center gap-2">
                Run your first simulation — it&apos;s free
                <ArrowRight size={18} />
              </a>
            </Button>
            <Button size="xl" variant="ghost" asChild>
              <a href="#demo">See a live demo</a>
            </Button>
          </div>
          <p className="text-caption text-text-disabled mt-6">
            No credit card. No Jira connection required. Results in under 60 seconds.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
