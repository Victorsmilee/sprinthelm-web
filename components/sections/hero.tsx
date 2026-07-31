"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroPortfolioAnimation } from "@/components/sections/hero-portfolio-animation";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0, 0, 0.2, 1], delay },
});

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-16 overflow-hidden bg-grid">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(92,107,192,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full mx-auto max-w-content px-6 pt-16 pb-16">

        {/* Badge — centered above split columns */}
        <motion.div {...fadeUp(0)} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 text-sm text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            AI Delivery &amp; Portfolio Intelligence
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.7, ease: [0, 0, 0.2, 1], delay: 0.1 }}
              className="text-display font-bold text-text-primary text-balance mb-6 leading-tight"
            >
              Can you deliver the roadmap?{" "}
              <span className="text-gradient-accent">
                Know before you commit to it.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p {...fadeUp(0.2)} className="text-lg text-text-secondary max-w-lg mb-10 text-balance">
              SprintHelm predicts delivery across every team and project before the work starts — which sprints slip, whether you can take on another project, and what it costs when leadership forces one more in. The portfolio answer your CTO needs, with math they can trace.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-4">
              <Button size="xl" asChild>
                <a href="https://app.sprinthelm.com/signup" className="flex items-center gap-2">
                  See your portfolio forecast — free
                  <ArrowRight size={18} />
                </a>
              </Button>
              <Button size="xl" variant="secondary" asChild>
                <a href="https://app.sprinthelm.com/portfolio?source=website" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Play size={16} />
                  Watch the portfolio demo
                </a>
              </Button>
            </motion.div>

            {/* Trust caption */}
            <motion.p {...fadeUp(0.35)} className="text-caption text-text-disabled">
              No credit card. No Jira connection required. Results in under 60 seconds.
            </motion.p>

          </div>

          {/* ── Right: ROI animation ── */}
          <div className="flex items-center justify-center lg:justify-end">
            <HeroPortfolioAnimation />
          </div>

        </div>
      </div>
    </section>
  );
}
