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
          <span className="inline-flex items-center gap-2 text-label text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            AI-Powered Delivery Decision Intelligence System
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.1)} className="text-display font-bold text-text-primary text-balance mb-6 leading-tight max-w-4xl mx-auto">
          Your sprint plan looks fine.{" "}
          <span className="text-gradient-accent">
            Your deadline doesn&apos;t know that yet.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p {...fadeUp(0.2)} className="text-lg text-text-secondary max-w-prose mx-auto mb-10 text-balance">
          SprintHelm answers the question every PM fears: &ldquo;If we add this, what breaks?&rdquo;
          Simulate the trade-off before you make the commitment — and walk into planning
          with mathematical proof, not a gut feeling. Results in under 60 seconds.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <Button size="xl" asChild>
            <a href="/signup" className="flex items-center gap-2">
              Run your first simulation — it&apos;s free
              <ArrowRight size={18} />
            </a>
          </Button>
          <Button size="xl" variant="secondary" asChild>
            <a href="https://sprinthelm.streamlit.app/?demo=true" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
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
