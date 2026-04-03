"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    tagline: "Run unlimited simulations. See your delivery risk for free.",
    cta: "Get started free",
    ctaHref: "https://app.sprinthelm.com/signup?plan=free",
    ctaVariant: "secondary" as const,
    popular: false,
    features: [
      "Backlog CSV — up to 15 tickets",
      "Priority scoring engine — full access",
      "Complexity risk badges — flag high-risk tickets",
      "Sprint capacity + overflow selection",
      "Pressure Index — colour band only",
      { label: "Adjusted effort + simulation impact", locked: true },
      { label: "Monte Carlo simulation", locked: true },
      "1 team workspace",
      { label: "Team Composition Change Scenarios", locked: true },
      { label: "AI Executive Summary", locked: true },
      { label: "Project Completion Forecaster", locked: true },
      { label: "PRD Template Generator", locked: true },
      { label: "PRD Upload & Ticket Extraction", locked: true },
      "Community support",
    ],
  },
  {
    name: "Pro",
    monthly: 29,
    annual: 23,
    tagline: "Full access. Ship more sprints on time, every sprint.",
    cta: "Start Pro — 14 days free",
    ctaHref: "https://app.sprinthelm.com/signup?plan=pro",
    ctaVariant: "primary" as const,
    popular: true,
    features: [
      "Unlimited backlog scoring",
      "Pressure Index — full score + history",
      "Monte Carlo simulation — full access",
      "Estimation risk scoring — adjusted effort + simulation impact",
      "Team Composition — up to 8 seats",
      "Team Composition Change Scenarios",
      "AI Executive Summary — 50 / month",
      "Project Completion Forecaster",
      "PRD Template Generator",
      "PRD Upload & Ticket Extraction — 20 / month",
      "PDF + TXT export",
      { label: "Board-ready PDF report", locked: true },
      "Priority email support (24h response)",
    ],
  },
  {
    name: "Team",
    monthly: 59,
    annual: 47,
    tagline: "Multi-squad visibility. One view of delivery risk across the org.",
    cta: "Start Team — 14 days free",
    ctaHref: "https://app.sprinthelm.com/signup?plan=team",
    ctaVariant: "secondary" as const,
    popular: false,
    features: [
      "Everything in Pro",
      "Up to 5 team workspaces (8 seats each)",
      "AI Executive Summary — 200 / month",
      "PRD Ticket Extraction — 100 / month",
      "Multi-team portfolio view",
      "Estimation risk across all teams in portfolio view",
      "Board-ready PDF report",
      "Jira integration — bidirectional sync",
      "Slack notifications",
      "Role-based access (admin / member)",
      { label: "AI Benchmarking & Intelligence", locked: true },
      { label: "SSO + custom scoring weights", locked: true },
      "Priority email + live chat support",
    ],
  },
  {
    name: "Enterprise",
    monthly: null,
    annual: null,
    tagline: "Company-wide delivery intelligence with enterprise-grade security and a named contact.",
    cta: "Talk to sales",
    ctaHref: "/contact/enterprise",
    ctaVariant: "secondary" as const,
    popular: false,
    features: [
      "Everything in Team",
      "Unlimited team workspaces",
      "Unlimited AI summaries + extractions",
      "AI Benchmarking & Intelligence",
      "Branded board-ready PDF report",
      "Estimation risk breakdown in board PDF report",
      "Pressure Index webhook alerts",
      "SSO / SAML + full RBAC",
      "Custom scoring weight configuration",
      "All integrations (Jira, Linear, GitHub, Slack, Azure DevOps)",
      "SOC 2 Type II compliance + audit logs",
      "BYOK (bring your own Anthropic API key)",
      "Dedicated CSM + SLA-backed support (4h P1/P2)",
    ],
  },
];

type Feature = string | { label: string; locked: boolean };

function FeatureRow({ feature }: { feature: Feature }) {
  const locked = typeof feature === "object" && feature.locked;
  const label  = typeof feature === "string" ? feature : feature.label;

  return (
    <li className="flex items-start gap-2.5 text-sm">
      {locked ? (
        <Minus size={16} className="text-text-disabled flex-shrink-0 mt-0.5" />
      ) : (
        <Check size={16} className="text-success flex-shrink-0 mt-0.5" />
      )}
      <span className={locked ? "text-text-disabled line-through" : "text-text-secondary"}>
        {label}
      </span>
    </li>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="section-padding">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            One late sprint costs more than a year of Pro.
          </h2>
          <p className="text-text-secondary max-w-prose mx-auto mb-8">
            Start free — no credit card, no Jira connection required. Upgrade when the
            simulation saves your first sprint. Cancel any time.
          </p>

          {/* Annual toggle */}
          <div className="inline-flex items-center gap-3 bg-bg-surface border border-border-subtle rounded-full px-4 py-2">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                !annual ? "text-text-primary" : "text-text-disabled"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(!annual)}
              className={cn(
                "relative w-10 h-5 rounded-full transition-colors duration-200",
                annual ? "bg-accent" : "bg-bg-elevated border border-border-active"
              )}
              aria-label="Toggle annual billing"
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200",
                  annual && "translate-x-5"
                )}
              />
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                annual ? "text-text-primary" : "text-text-disabled"
              )}
            >
              Annual
              <span className="ml-1.5 text-label text-success">save 20%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={cn(
                "relative flex flex-col p-6 rounded-xl border transition-all duration-200",
                tier.popular
                  ? "bg-bg-surface border-accent shadow-glow"
                  : "bg-bg-surface border-border-subtle hover:border-border-active"
              )}
            >
              {tier.popular && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                >
                  <span className="bg-accent text-white text-label font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                </motion.div>
              )}

              <div className="mb-6">
                <h3 className="text-base font-bold text-text-primary mb-1">{tier.name}</h3>
                <p className="text-caption text-text-secondary mb-4">{tier.tagline}</p>

                {tier.monthly !== null ? (
                  <div className="flex items-baseline gap-1">
                    <motion.span
                      key={`${tier.name}-${annual}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-h2 font-bold text-text-primary"
                    >
                      ${annual ? tier.annual : tier.monthly}
                    </motion.span>
                    <span className="text-sm text-text-disabled">/mo</span>
                  </div>
                ) : (
                  <p className="text-h3 font-bold text-text-primary">Custom</p>
                )}
              </div>

              <Button
                variant={tier.ctaVariant}
                size="md"
                className="w-full mb-6"
                asChild
              >
                <a href={tier.ctaHref}>{tier.cta}</a>
              </Button>

              <ul className="flex flex-col gap-3 flex-1">
                {tier.features.map((feature, j) => (
                  <FeatureRow key={j} feature={feature} />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-caption text-text-disabled mt-8">
          All paid plans include a 14-day free trial. No credit card required to start.
        </p>
      </div>
    </section>
  );
}
