"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CONTACT_SALES_HREF = "mailto:hello@sprinthelm.com";
const SIGNUP_HREF = "https://app.sprinthelm.com/signup";

const TIERS = [
  {
    name: "Free",
    tagline: "Run unlimited simulations. See your delivery risk for free.",
    price: "$0",
    priceNote: "forever",
    popular: false,
    features: [
      "Backlog CSV — up to 15 tickets",
      "Priority scoring engine — full access",
      "Complexity risk badges — flag high-risk tickets",
      "Sprint capacity + overflow selection",
      "Sprint ROI Calculator — sprint value + team cost + net profit/loss",
      "Pressure Index — colour band only",
      "1 team workspace",
      "Community support",
    ],
  },
  {
    name: "Pro",
    tagline: "Full access. Ship more sprints on time, every sprint.",
    price: "$29",
    priceNote: "per month · $23/mo billed annually",
    popular: true,
    features: [
      "Unlimited backlog scoring",
      "Pressure Index — full score + history",
      "Monte Carlo simulation — full access",
      "Estimation risk scoring — adjusted effort + simulation impact",
      "Sprint Health Check",
      "Team Composition — up to 8 seats",
      "Team Composition Change Scenarios",
      "AI Executive Summary — 50 / month",
      "Project Completion Forecaster",
      "PRD Template Generator",
      "PRD Upload & Ticket Extraction — 20 / month",
      "PDF + TXT export",
      "Sprint ROI Calculator — ROI% with benchmark label",
      "Priority email support (24h response)",
    ],
  },
  {
    name: "Team",
    tagline: "Multi-squad visibility. One view of delivery risk across the org — including the Portfolio Simulator.",
    price: "$59",
    priceNote: "per month · $47/mo billed annually",
    popular: false,
    features: [
      "Everything in Pro",
      "Portfolio Simulator — capacity + consequence across every project",
      "Estimation risk across all teams in the Portfolio Simulator",
      "Up to 5 team workspaces (8 seats each)",
      "AI Executive Summary — 200 / month",
      "PRD Ticket Extraction — 100 / month",
      "Sprint ROI Calculator — multi-sprint ROI trend",
      "Board-ready PDF report",
      // Phase 1 ships one-way backlog import — do NOT claim "bidirectional
      // sync" until it exists (2026-07-05 audit M5; matches the in-app
      // planCatalog copy fixed in sprinthelm-app PR #290).
      "Jira integration — backlog import",
      "Slack notifications",
      "Role-based access (admin / member)",
      "Priority email + live chat support",
    ],
  },
  {
    name: "Enterprise",
    tagline: "Company-wide delivery intelligence with enterprise-grade security and a named contact.",
    price: "Custom",
    priceNote: "annual contract · volume pricing",
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

export function Pricing(): React.JSX.Element {
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
            Simple plans. Start free.
          </h2>
          <p className="text-text-secondary max-w-prose mx-auto">
            Every paid plan starts with a 7-day free trial — no credit card required.
            The Portfolio Simulator ships with Team and Enterprise.
          </p>
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
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold text-text-primary">{tier.price}</span>
                </div>
                <p className="text-caption text-text-disabled mt-1">{tier.priceNote}</p>
              </div>

              <Button
                variant={tier.popular ? "primary" : "secondary"}
                size="md"
                className="w-full mb-6"
                asChild
              >
                {tier.name === "Enterprise" ? (
                  <a href={CONTACT_SALES_HREF}>Contact sales</a>
                ) : (
                  <a href={SIGNUP_HREF}>
                    {tier.name === "Free" ? "Start free" : "Start 7-day free trial"}
                  </a>
                )}
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
          All plans include a 7-day free trial. No credit card required. Email us at{" "}
          <a href={CONTACT_SALES_HREF} className="underline hover:text-text-secondary transition-colors">
            hello@sprinthelm.com
          </a>
        </p>
      </div>
    </section>
  );
}
