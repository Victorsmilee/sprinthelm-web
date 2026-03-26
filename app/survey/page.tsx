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
            <h1 className="text-h3 font-bold text-text-primary mb-2">
              Is SprintHelm the right fit for your team?
            </h1>
            <p className="text-text-secondary text-sm leading-relaxed">
              Takes 3 minutes. Helps us understand what delivery challenges matter most to teams
              like yours — and whether SprintHelm solves them.
            </p>
          </motion.div>

          <SurveyForm />
        </div>
      </main>
      <SurveyFooter />
    </>
  );
}
