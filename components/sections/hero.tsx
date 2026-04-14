"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroDashboard } from "@/components/sections/hero-dashboard";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0, 0, 0.2, 1], delay },
});

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden bg-grid">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(92,107,192,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-content px-6 text-center pt-16 pb-24">
        {/* Badge */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <span className="inline-flex items-center gap-2 text-sm text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Delivery Decision Intelligence System, built on AI
          </span>
        </motion.div>

        {/* Headline — blur-in entrance */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.7, ease: [0, 0, 0.2, 1], delay: 0.1 }}
          className="text-display font-bold text-text-primary text-balance mb-6 leading-tight max-w-4xl mx-auto"
        >
          If we add this feature, do we ship on time?{" "}
          <span className="text-gradient-accent">
            Know before you commit.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p {...fadeUp(0.2)} className="text-lg text-text-secondary max-w-xl mx-auto mb-10 text-balance">
          SprintHelm runs 1,000 simulated sprints before your team runs one.
          Surface delivery risk in under 60 seconds. Ship with confidence.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <Button size="xl" asChild>
            <a href="https://app.sprinthelm.com/signup" className="flex items-center gap-2">
              Run your first simulation — it&apos;s free
              <ArrowRight size={18} />
            </a>
          </Button>
          <Button size="xl" variant="secondary" asChild>
            <a href="https://app.sprinthelm.com/?source=website" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Play size={16} />
              See a live demo
            </a>
          </Button>
        </motion.div>

        {/* Trust caption */}
        <motion.p {...fadeUp(0.35)} className="text-caption text-text-disabled mb-16">
          No credit card. No Jira connection required. Results in under 60 seconds.
        </motion.p>

        {/* Dashboard animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0, 0, 0.2, 1] }}
        >
          <HeroDashboard />
        </motion.div>
      </div>
    </section>
  );
}
