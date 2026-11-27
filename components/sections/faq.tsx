"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";
import { FAQS } from "@/lib/faq-content";

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
        <Reveal className="text-center mb-12">
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            Frequently asked questions.
          </h2>
        </Reveal>

        {/* The accordion card itself had no entrance (only the heading and the
            footer CTA did). Reveal it as one block — a single settle reads as
            more composed than 9 border-divided rows staggering in, and the rows
            keep their own click-to-expand motion. */}
        <Reveal className="mx-auto max-w-3xl bg-bg-surface rounded-xl border border-border-subtle px-6 md:px-10">
          {FAQS.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </Reveal>

        <Reveal className="mx-auto max-w-3xl mt-10 p-8 rounded-xl border border-border-subtle bg-bg-surface text-center">
          <p className="text-text-primary font-semibold mb-1">Still have questions?</p>
          <p className="text-sm text-text-secondary mb-6">
            Our team is happy to walk you through SprintHelm, discuss your use case, or help you evaluate the right plan.
          </p>
          <a
            href="mailto:hello@sprinthelm.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
          >
            Talk to us at hello@sprinthelm.com
          </a>
        </Reveal>
      </div>
    </section>
  );
}
