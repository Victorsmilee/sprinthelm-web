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
    tagline: "For teams who want to see what they have been missing.",
    cta: "Get started free",
    ctaHref: "/signup",
    ctaVariant: "secondary" as const,
    popular: false,
    features: [
      "1 team workspace",
      "5 AI executive summaries / month",
      "Backlog scoring — full access",
      "Monte Carlo simulation — full access",
      "Pressure Index — full access",
      { label: "PRD ticket extraction", locked: true },
      "Community support",
    ],
  },
  {
    name: "Pro",
    monthly: 29,
    annual: 23,
    tagline: "For delivery managers who need a full weekly workflow.",
    cta: "Start Pro — 14 days free",
    ctaHref: "/signup?plan=pro",
    ctaVariant: "primary" as const,
    popular: true,
    features: [
      "1 team workspace",
      "50 AI executive summaries / month",
      "PRD ticket extraction — 20 / month",
      "Jira integration — read-only sync",
      "Priority email support (24h response)",
      "CSV export for all reports",
    ],
  },
  {
    name: "Team",
    monthly: 59,
    annual: 47,
    tagline: "For engineering orgs running multiple squads in parallel.",
    cta: "Start Team — 14 days free",
    ctaHref: "/signup?plan=team",
    ctaVariant: "secondary" as const,
    popular: false,
    features: [
      "Up to 5 team workspaces",
      "200 AI executive summaries / month",
      "PRD ticket extraction — 100 / month",
      "Jira integration — bidirectional sync",
      "Slack notifications (coming soon)",
      "Priority email + live chat support",
      "PDF and CSV export",
      "Role-based access (admin / member)",
    ],
  },
  {
    name: "Enterprise",
    monthly: null,
    annual: null,
    tagline: "For organisations that need security, scale, and a named contact.",
    cta: "Talk to sales",
    ctaHref: "/contact/enterprise",
    ctaVariant: "secondary" as const,
    popular: false,
    features: [
      "Unlimited team workspaces",
      "Unlimited AI summaries",
      "All integrations (Jira, Linear, GitHub, Slack, Azure DevOps)",
      "RBAC — full role configuration",
      "SOC 2 Type II compliance",
      "SSO / SAML support",
      "Dedicated customer success manager",
      "SLA-backed support (4h P1/P2)",
      "BYOK (bring your own Anthropic API key)",
      "Audit logs + data residency options",
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
            Pricing that scales with your team&apos;s ambition.
          </h2>
          <p className="text-text-secondary max-w-prose mx-auto mb-8">
            Start free. Upgrade when the simulation saves your first sprint.
            Cancel any time — no contracts, no sales calls required below Enterprise.
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
