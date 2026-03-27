"use client";

import React from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/layout/nav";
import { SurveyFooter } from "@/components/layout/survey-footer";
import { SurveyForm } from "@/components/survey/SurveyForm";

export default function SurveyPage(): React.ReactElement {
  return (
    <>
      <Nav />
      <main className="min-h-screen section-padding">
        <div className="mx-auto max-w-prose w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="block text-label font-semibold text-accent uppercase tracking-widest mb-2">
              Value Discovery Survey
            </span>
            <h1 className="text-h3 font-bold text-text-primary mb-4">
              Is SprintHelm the right fit for your team?
            </h1>

            {/* What SprintHelm is — plain language intro */}
            <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 mb-6">
              <h2 className="text-sm font-semibold text-text-primary mb-3">
                What is SprintHelm?
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                Every sprint, teams make commitments they can&apos;t keep — not because the
                team is bad, but because nobody could see the risk coming. Stakeholders push
                in extra work, one person is on holiday, and two tickets turn out to be three
                times harder than estimated. By the time anyone realises, the deadline has passed.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                SprintHelm solves that. Before your sprint starts, it scores every item in your
                backlog, runs hundreds of simulations of how the sprint could play out, and
                gives you a clear number: the probability your team ships on time. It also
                flags which items are hiding the most risk, where your team capacity is thin,
                and which trade-offs are worth making.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                The outcome: fewer missed deadlines, clearer conversations with stakeholders,
                and sprint plans your team can actually stand behind — in under 60 seconds.
              </p>
            </div>

            <p className="text-text-secondary text-sm leading-relaxed">
              Takes 3 minutes. Helps us understand what delivery challenges matter most to
              teams like yours — and whether SprintHelm solves them.
            </p>
          </motion.div>

          <SurveyForm />
        </div>
      </main>
      <SurveyFooter />
    </>
  );
}
