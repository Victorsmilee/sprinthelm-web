"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Does SprintHelm connect to Jira?",
    a: "Yes — on Pro tier and above. Pro is read-only (import tickets). Team adds bidirectional sync (push priority scores and risk flags back to Jira as custom fields). Enterprise includes full API access. Free tier users can paste backlogs manually as JSON or CSV.",
  },
  {
    q: "Where is my data stored?",
    a: "Backlog data is processed in-memory on Free/Pro — not persisted, cleared when your session ends. Team and Enterprise store simulation history in your workspace (encrypted at rest and in transit, EU-West-1 by default). Enterprise can request alternative data residency. We never use your data to train any model.",
  },
  {
    q: "Can my whole team use one account?",
    a: "Free and Pro are single-user. Team gives up to 5 team workspaces and 10 members with admin/member roles. Enterprise is unlimited users and workspaces.",
  },
  {
    q: "Can I bring my own Anthropic API key?",
    a: "Enterprise tier only. BYOK routes AI generation through your own Anthropic account — direct control over costs, usage logging, and compliance. Lower tiers use SprintHelm's shared API access against your monthly allocation.",
  },
  {
    q: "What is the difference between Free and Pro?",
    a: "Free is fully functional for occasional solo use. Limits: 5 AI summaries/month, no Jira, no PRD extraction. Pro removes those limits and adds Jira read sync. If you are running weekly sprints for a single team, you will hit the AI cap within a month. Start free, run three simulations, you will know if Pro is worth $29.",
  },
  {
    q: "How do I cancel? Is there a contract?",
    a: "No contract below Enterprise. Cancel any time from billing settings — access continues until the end of your billing period. Contact support within 48 hours of an unintended renewal charge and we will handle it. Enterprise contracts are annual.",
  },
  {
    q: "How secure is SprintHelm?",
    a: "TLS 1.3 in transit, AES-256 at rest, Stripe for payments (we never handle card data), OAuth 2.0 for auth. SOC 2 Type II available on Enterprise. Security questionnaires and DPAs available for enterprise prospects at enterprise@sprinthelm.io.",
  },
  {
    q: "What does Monte Carlo simulation mean in plain English?",
    a: "We run your sprint plan hundreds of times, each time introducing small random variations that reflect real-world uncertainty — a ticket taking longer, a team member pulled into incidents, a dependency arriving late. Instead of 'this sprint takes 12 days,' you get 'there is a 68% probability this completes on time given your current scope.' The output is a probability, not a prediction. That distinction forces the planning conversation to be about risk tolerance, not false precision.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-subtle last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-text-primary group-hover:text-text-primary transition-colors duration-150">
          {q}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "text-text-disabled flex-shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-text-secondary leading-relaxed pb-5">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="section-padding">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            Frequently asked questions.
          </h2>
        </motion.div>

        <div className="mx-auto max-w-3xl bg-bg-surface rounded-xl border border-border-subtle px-6 md:px-10">
          {FAQS.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-3xl mt-10 p-8 rounded-xl border border-border-subtle bg-bg-surface text-center"
        >
          <p className="text-text-primary font-semibold mb-1">Still have questions?</p>
          <p className="text-sm text-text-secondary mb-6">
            Our team is happy to walk you through SprintHelm, discuss your use case, or help you evaluate the right plan.
          </p>
          <a
            href="mailto:hello@sprinthelm.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
          >
            Talk to us — hello@sprinthelm.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
