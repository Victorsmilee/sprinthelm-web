"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CONTACT_SALES_HREF = "mailto:hello@sprinthelm.com";
/**
 * Signup URL for a given tier.
 *
 * The `?plan=` param is NOT decoration — app/signup/page.tsx reads it and
 * renders a plan-specific page (heading, trial badge, price line, the three
 * headline features). Without it the page falls back to `free`, so a customer
 * who clicked "Start 14-day free trial" on the Pro card landed on "Get started
 * free / Free forever / No credit card required" and had to work out for
 * themselves that they were in the wrong place. That was the state of the
 * live funnel until 2026-08-06.
 *
 * The app accepts exactly `pro` | `team`; anything else resolves to `free`.
 */
function signupHref(tier: string): string {
  const plan = tier.toLowerCase();
  const param = plan === "pro" || plan === "team" ? plan : "free";
  return `https://app.sprinthelm.com/signup?plan=${param}`;
}

const TIERS = [
  {
    name: "Free",
    tagline: "Run unlimited simulations. See your delivery risk for free.",
    price: "$0",
    priceNote: "forever",
    popular: false,
    features: [
      "Backlog CSV (up to 15 tickets)",
      "Priority scoring engine (full access)",
      "Complexity risk badges (flags high-risk tickets)",
      "Capacity + overflow selection",
      "ROI Calculator (value + team cost + net profit/loss)",
      "Pressure Index (colour band only)",
      "1 team workspace",
      "Community support",
    ],
  },
  {
    name: "Pro",
    tagline: "Full access. Ship on time, every cycle.",
    price: "$29",
    priceNote: "per month · $23/mo billed annually",
    popular: true,
    features: [
      "Unlimited backlog scoring",
      "Pressure Index (full score + history)",
      "Monte Carlo simulation (full access)",
      "Estimation risk scoring (adjusted effort + simulation impact)",
      "Sprint Health Check",
      // No seat model exists in the app (no org/invite/membership table).
      "Team Composition modelling by role and seniority",
      "Team Composition Change Scenarios",
      "AI Executive Summary (50 / month)",
      "Project Completion Forecaster",
      "PRD Template Generator",
      "PRD Upload & Ticket Extraction (20 / month)",
      "PDF + TXT export",
      // "benchmark label" dropped: no benchmarking exists in the product.
      "Sprint ROI Calculator",
      // Support promise reworded to something one team can actually staff.
      "Email support within one business day",
    ],
  },
  {
    name: "Team",
    tagline: "Every project's delivery risk on one screen, including the Portfolio Simulator.",
    price: "$59",
    priceNote: "per month · $47/mo billed annually",
    popular: false,
    features: [
      "Everything in Pro",
      "Portfolio Simulator (capacity + consequence across every project)",
      "AI Executive Summary (200 / month)",
      "PRD Ticket Extraction (100 / month)",
      "Board-ready PDF report",
      // Phase 1 ships one-way backlog import — do NOT claim "bidirectional
      // sync" until it exists (2026-07-05 audit M5; matches the in-app
      // planCatalog copy fixed in sprinthelm-app PR #290).
      "Jira integration (backlog import)",
      "Priority email support",
    ],
    // Removed 2026-08-04 (launch truth pass) — purchasable copy with nothing
    // behind it. Each returns only when the feature ships:
    //   "Estimation risk across all teams in the Portfolio Simulator" — the
    //     Portfolio is single-team by design.
    //   "Up to 5 team workspaces (8 seats each)" — no org/seat/workspace model
    //     exists anywhere in the app's schema.
    //   "ROI Calculator (multi-sprint trend)" — not implemented.
    //   "Slack notifications" — not implemented.
    //   "Role-based access (admin / member)" — G3-04, not started.
    //   "live chat support" — no live-chat channel exists.
  },
  {
    name: "Enterprise",
    tagline: "Company-wide delivery intelligence with a named contact and a direct line to us.",
    price: "Custom",
    priceNote: "annual contract · volume pricing",
    popular: false,
    features: [
      "Everything in Team",
      "Unlimited AI summaries + extractions",
      "Pressure Index webhook alerts",
      "Security questionnaires + signed DPA",
      "Dedicated support contact",
    ],
    // Removed 2026-08-04 (launch truth pass). This card sits next to a payment
    // decision, so it lists only what we can hand over today. Roadmap and
    // compliance commitments belong on /security with dates against them:
    //   "SOC 2 Type II compliance + audit logs" — not certified (G9-01 not
    //     started). Claiming a certification we do not hold is a legal
    //     exposure, not a copy nit.
    //   "SSO / SAML + full RBAC" — not built.
    //   "All integrations (Linear, GitHub, Azure DevOps)" — only Jira exists,
    //     and it is already a Team line.
    //   "AI Benchmarking & Intelligence" — does not exist.
    //   "BYOK" — not built.
    //   "Branded board-ready PDF report" / "Estimation risk breakdown in board
    //     PDF" — lib/boardPdf.ts has no branding and no such breakdown.
    //   "Custom scoring weight configuration" — real, but every plan already
    //     has it, so it was never an Enterprise differentiator.
    //   "Unlimited team workspaces" — no workspace model.
    //   "SLA-backed support (4h P1/P2)" — implies an on-call rota we do not
    //     staff. Softened to a named contact, which we can honour.
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
            Every paid plan starts with a 14-day free trial. Cancel any time before it
            ends and you won&apos;t be charged. The Portfolio Simulator ships with Team and Enterprise.
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
                  <a href={signupHref(tier.name)}>
                    {tier.name === "Free" ? "Start free" : "Start 14-day free trial"}
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
          Free is free forever, no card needed. Paid plans start with a 14-day trial: we take
          your card, charge nothing until day 14, and cancel is one click. Email us at{" "}
          <a href={CONTACT_SALES_HREF} className="underline hover:text-text-secondary transition-colors">
            hello@sprinthelm.com
          </a>
        </p>
      </div>
    </section>
  );
}
