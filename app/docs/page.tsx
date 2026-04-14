import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, BookOpen, Code2, Zap, Settings } from "lucide-react";

export const metadata = {
  title: "Documentation — SprintHelm",
  description: "Everything you need to get the most out of SprintHelm.",
};

const SECTIONS = [
  {
    icon: Zap,
    title: "Getting started",
    description: "Import your backlog, run your first simulation, and understand your results.",
    links: [
      { label: "Quick start guide", href: "#" },
      { label: "Backlog import formats (CSV, JSON)", href: "#" },
      { label: "Running a Monte Carlo simulation", href: "#" },
      { label: "Reading the Pressure Index", href: "#" },
      { label: "Understanding completion probability", href: "#" },
    ],
  },
  {
    icon: BookOpen,
    title: "Features",
    description: "Deep dives into each SprintHelm capability.",
    links: [
      { label: "Priority scoring — how tickets are ranked", href: "#" },
      { label: "Estimation risk and complexity scoring", href: "#" },
      { label: "AI Executive Summary", href: "#" },
      { label: "PRD upload and ticket extraction", href: "#" },
      { label: "What-if team composition scenarios", href: "#" },
      { label: "Project Completion Forecaster", href: "#" },
    ],
  },
  {
    icon: Settings,
    title: "Integrations",
    description: "Connect SprintHelm to your existing tooling.",
    links: [
      { label: "Jira integration (Pro+)", href: "#" },
      { label: "Slack notifications (Team+)", href: "#" },
      { label: "CSV export format reference", href: "#" },
      { label: "Shareable simulation links", href: "#" },
    ],
  },
  {
    icon: Code2,
    title: "API reference",
    description: "Programmatic access to SprintHelm's simulation engine. Enterprise only.",
    links: [
      { label: "Authentication", href: "#" },
      { label: "POST /api/v1/sprints/plan", href: "#" },
      { label: "POST /api/v1/sprints/whatif", href: "#" },
      { label: "GET /api/v1/sprints/history", href: "#" },
      { label: "Webhook events", href: "#" },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg-primary">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 text-center border-b border-border-subtle">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-h1 font-bold text-text-primary mb-4 leading-tight">Documentation</h1>
            <p className="text-lg text-text-secondary">
              Everything you need to import your backlog, run simulations, and get results your stakeholders will trust.
            </p>
          </div>
        </section>

        {/* Search placeholder */}
        <section className="py-10 px-6 border-b border-border-subtle">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-bg-surface border border-border-subtle text-text-disabled">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <span className="text-sm">Search documentation…</span>
            </div>
          </div>
        </section>

        {/* Sections grid */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {SECTIONS.map((section) => (
              <div key={section.title} className="p-8 rounded-xl bg-bg-surface border border-border-subtle">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <section.icon size={18} className="text-accent" />
                  </div>
                  <h2 className="text-base font-bold text-text-primary">{section.title}</h2>
                </div>
                <p className="text-sm text-text-disabled mb-5 ml-12">{section.description}</p>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="flex items-center justify-between text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 group px-3 py-2 rounded-lg hover:bg-bg-elevated"
                      >
                        {link.label}
                        <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Support */}
        <section className="pb-20 px-6 border-t border-border-subtle pt-16 text-center">
          <div className="mx-auto max-w-xl">
            <h2 className="text-h3 font-bold text-text-primary mb-3">Can&apos;t find what you need?</h2>
            <p className="text-sm text-text-secondary mb-6">
              Our support team can walk you through anything not covered here.
            </p>
            <a
              href="/support"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
            >
              Go to Help Centre
              <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
