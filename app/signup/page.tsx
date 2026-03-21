"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

const STREAMLIT_URL = "https://sprinthelm.streamlit.app";

const PERKS = [
  "Backlog scoring across 6 weighted factors",
  "Monte Carlo simulation — probability, not guesswork",
  "Pressure Index — spot burnout risk before it hits",
  "AI executive summary in plain English",
  "No credit card. No Jira connection required.",
];

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate brief loading then redirect to the live app
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => {
        window.location.href = STREAMLIT_URL;
      }, 1500);
    }, 800);
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center justify-center section-padding">
        <div className="mx-auto max-w-content w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — value prop */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-label font-semibold text-accent uppercase tracking-widest mb-4">
                Free forever
              </span>
              <h1 className="text-h1 font-bold text-text-primary mb-4 text-balance">
                AI-powered delivery intelligence. Results in under 60 seconds.
              </h1>
              <p className="text-text-secondary mb-8 leading-relaxed">
                SprintHelm shows you exactly where your sprint will break —
                before it starts. No setup, no Jira connection required.
              </p>
              <ul className="flex flex-col gap-3">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm text-text-secondary">
                    <Check size={16} className="text-success flex-shrink-0 mt-0.5" />
                    {perk}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right — email form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-bg-surface border border-border-subtle rounded-2xl p-8 md:p-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                      <Check size={24} className="text-success" />
                    </div>
                    <h2 className="text-lg font-bold text-text-primary mb-2">You&apos;re in.</h2>
                    <p className="text-text-secondary text-sm">Redirecting you to SprintHelm…</p>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-text-primary mb-2">
                      Get started free
                    </h2>
                    <p className="text-text-secondary text-sm mb-6">
                      Enter your work email and we&apos;ll take you straight to the app.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">
                          Work email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-accent transition-colors duration-200"
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full" disabled={loading}>
                        {loading ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <>
                            Start for free
                            <ArrowRight size={16} className="ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                    <p className="text-caption text-text-disabled mt-4 text-center">
                      No credit card. No Jira required. Results in under 60 seconds.
                    </p>

                    <div className="mt-6 pt-6 border-t border-border-subtle">
                      <p className="text-xs text-text-disabled text-center mb-3">Or jump straight in</p>
                      <Button variant="secondary" size="md" className="w-full" asChild>
                        <a href={STREAMLIT_URL} target="_blank" rel="noopener noreferrer">
                          Open SprintHelm app
                        </a>
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <p className="text-center text-caption text-text-disabled mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-accent hover:underline">
                  Sign in
                </a>
              </p>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
