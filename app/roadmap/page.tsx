import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CheckCircle, Clock, Lightbulb } from "lucide-react";

export const metadata = {
  title: "Roadmap — SprintHelm",
  description: "What's shipping, what's in progress, and what's coming to SprintHelm.",
};

const SHIPPED = [
  "Backlog priority scoring engine (6-factor weighted model)",
  "Monte Carlo simulation — 1,000-run sprint probability engine",
  "Pressure Index — sprint health signal (green / yellow / red)",
  "AI Executive Summary — Claude-written C-level briefing",
  "PRD upload and ticket extraction",
  "Sprint history and delivery trend tracking",
  "Project Completion Forecaster (epic-level)",
  "Estimation risk scoring — adjusted effort per ticket",
  "CSV and JSON backlog import",
  "Shareable simulation links",
  "What-if team composition scenarios",
];

const IN_PROGRESS = [
  "Jira bidirectional sync — push priority scores back as custom fields",
  "Multi-team portfolio view — delivery risk across all squads",
  "Board-ready PDF report — for standup and stakeholder decks",
  "Sprint roadmap tab — 90-day epic planning view",
  "ROI calculator — model the cost of a missed sprint",
];

const PLANNED = [
  "GitHub + Linear native integration",
  "AI Benchmarking — anonymised delivery benchmarks by team size and vertical",
  "Slack delivery alerts — Pressure Index webhook notifications",
  "Azure DevOps integration",
  "Custom scoring weight configuration (Enterprise)",
  "Team velocity history import from Jira",
  "Dependency mapping across epics",
];

type Item = { label: string; note?: string };
type Column = { title: string; icon: React.ElementType; color: string; bg: string; items: string[] | Item[] };

const COLUMNS: Column[] = [
  { title: "Shipped", icon: CheckCircle, color: "text-success", bg: "bg-success/10 border-success/20", items: SHIPPED },
  { title: "In Progress", icon: Clock, color: "text-accent", bg: "bg-accent/10 border-accent/20", items: IN_PROGRESS },
  { title: "Planned", icon: Lightbulb, color: "text-warning", bg: "bg-warning/10 border-warning/20", items: PLANNED },
];

export default function RoadmapPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg-primary">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 text-center border-b border-border-subtle">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-h1 font-bold text-text-primary mb-4 leading-tight">
              What&apos;s coming to SprintHelm.
            </h1>
            <p className="text-lg text-text-secondary">
              We build in public. Here&apos;s what&apos;s shipped, what we&apos;re working on,
              and what&apos;s on the horizon.
            </p>
          </div>
        </section>

        {/* Roadmap columns */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLUMNS.map((col) => (
              <div key={col.title} className="rounded-xl bg-bg-surface border border-border-subtle overflow-hidden">
                <div className={`flex items-center gap-2.5 px-6 py-4 border-b border-border-subtle ${col.bg} border`}>
                  <col.icon size={16} className={col.color} />
                  <span className={`text-sm font-bold ${col.color}`}>{col.title}</span>
                  <span className="ml-auto text-xs text-text-disabled">{col.items.length} items</span>
                </div>
                <ul className="p-4 space-y-2">
                  {(col.items as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-bg-elevated transition-colors duration-150">
                      <col.icon size={14} className={`${col.color} flex-shrink-0 mt-0.5 opacity-60`} />
                      <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback CTA */}
        <section className="pb-20 px-6 text-center border-t border-border-subtle pt-16">
          <div className="mx-auto max-w-xl">
            <h2 className="text-h3 font-bold text-text-primary mb-3">Want to influence the roadmap?</h2>
            <p className="text-text-secondary text-sm mb-6">
              We prioritise based on customer feedback. If there&apos;s a feature you need, tell us — it goes straight into the queue.
            </p>
            <a
              href="mailto:hello@sprinthelm.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
            >
              Send your request — hello@sprinthelm.com
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
