"use client";

import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Demo() {
  const demoUrl = process.env.NEXT_PUBLIC_DEMO_URL ?? "https://sprinthelm.streamlit.app";

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
            See it working on a real backlog.
          </h2>
          <p className="text-text-secondary max-w-prose mx-auto">
            We have pre-loaded SprintHelm with a realistic 15-ticket backlog for a
            mid-sized SaaS engineering team. No account. No Jira connection. No
            configuration. Hit run and see what your sprint is actually carrying.
          </p>
        </motion.div>

        {/* Browser chrome + iframe */}
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
                sprinthelm.streamlit.app
              </div>
            </div>
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-disabled hover:text-text-secondary transition-colors duration-150"
            >
              <ExternalLink size={14} />
            </a>
          </div>

          {/* iframe (desktop only) */}
          <div className="hidden md:block relative">
            <iframe
              src={demoUrl}
              className="w-full h-[640px] border-0"
              title="SprintHelm Live Demo"
              loading="lazy"
            />
          </div>

          {/* Mobile fallback */}
          <div className="md:hidden flex flex-col items-center justify-center py-16 px-6 text-center gap-6 bg-bg-primary">
            <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
              <Play size={28} className="text-accent" />
            </div>
            <div>
              <p className="font-semibold text-text-primary mb-2">Open the live demo</p>
              <p className="text-sm text-text-secondary">
                Best experienced on desktop. Tap below to open in full screen.
              </p>
            </div>
            <Button size="lg" asChild>
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                Open live demo
              </a>
            </Button>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button size="lg" asChild>
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              Open the live demo
            </a>
          </Button>
          <p className="text-caption text-text-disabled">
            The demo resets every session. Your data never touches it.
          </p>
        </div>
      </div>
    </section>
  );
}
