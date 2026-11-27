"use client";

import Reveal from "@/components/motion/Reveal";
import { Lock, MapPin, FileCheck, Database } from "lucide-react";

/**
 * Trust section. Replaces the old anonymous "internal findings" testimonials,
 * which read as weak for an exec buyer. Three honest signals instead:
 *
 *  1. Founder credibility (a real quote from the founder, not yet named by
 *     choice) with a monogram avatar, NOT a stock or AI-generated face passed
 *     off as a real person, which would quietly break the exact trust it is
 *     meant to build.
 *  2. Security/compliance the way a CTO reads it, and only claims we can
 *     stand behind (every line here traces to the DPA / Privacy Policy).
 *  3. The honest "not SOC 2 yet, and we say so" line, which on this site builds
 *     more trust than hiding it.
 */

// Each claim maps to a line in the DPA / Privacy Policy. Do not inflate these.
const SIGNALS = [
  { icon: Lock, label: "Encrypted in transit (TLS 1.3) and at rest (AES-256)" },
  { icon: MapPin, label: "Your account data is stored in the EU" },
  { icon: FileCheck, label: "DPA ready to sign, built GDPR-aligned" },
  { icon: Database, label: "Never used to train any model" },
];

export function Trust() {
  return (
    <section className="section-padding bg-bg-surface border-y border-border-subtle">
      <div className="mx-auto max-w-content">
        <Reveal className="text-center mb-12">
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            Built by people who lived the problem.
          </h2>
          <p className="text-text-secondary max-w-prose mx-auto">
            Honest numbers, on infrastructure a CTO can sign off.
          </p>
        </Reveal>

        {/* Founder note */}
        <Reveal className="mx-auto max-w-3xl p-8 rounded-xl bg-bg-primary border border-border-subtle mb-8">
          <blockquote className="text-lg text-text-primary leading-relaxed">
            &ldquo;I kept watching capable teams commit to roadmaps nobody had tested, at every
            company I worked with. Last year I decided to build the tool that tests them first.
            Several founders and engineering leaders validated the idea before we wrote a line of
            code.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div
              aria-hidden="true"
              className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent font-semibold text-sm"
            >
              SH
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Founder, SprintHelm</p>
              <p className="text-caption text-text-disabled">Named design partners coming soon</p>
            </div>
          </div>
        </Reveal>

        {/* Security signals */}
        <Reveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SIGNALS.map((s) => (
            <div
              key={s.label}
              className="flex items-start gap-3 p-4 rounded-xl bg-bg-primary border border-border-subtle"
            >
              <s.icon size={18} className="text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-text-secondary leading-relaxed">{s.label}</span>
            </div>
          ))}
        </Reveal>

        <p className="text-center text-caption text-text-disabled mt-8">
          We are not SOC 2 certified yet, and we say so plainly. See our{" "}
          <a href="/security" className="underline hover:text-text-secondary transition-colors">
            security overview
          </a>
          .
        </p>
      </div>
    </section>
  );
}
