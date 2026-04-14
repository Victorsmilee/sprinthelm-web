"use client";

import { useState } from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { DocModal, type DocEntry } from "@/components/ui/doc-modal";
import { SUPPORT_CONTENT } from "@/lib/support-content";
import { MessageCircle, Mail, Clock, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const SLAS = [
  {
    plan: "Free",
    channel: "Community + email",
    response: "Best effort",
    color: "text-text-secondary",
  },
  {
    plan: "Pro",
    channel: "Priority email",
    response: "24 hours",
    color: "text-accent",
  },
  {
    plan: "Team",
    channel: "Priority email + live chat",
    response: "12 hours",
    color: "text-accent",
  },
  {
    plan: "Enterprise",
    channel: "Dedicated CSM + SLA",
    response: "4h P1/P2",
    color: "text-success",
  },
];

type TopicLink = { label: string; section: string };

const TOPICS: { title: string; links: TopicLink[] }[] = [
  {
    title: "Getting started",
    links: [
      { label: "How to import your backlog (CSV / JSON)", section: "Getting started" },
      { label: "Understanding priority scores", section: "Getting started" },
      { label: "Running your first simulation", section: "Getting started" },
      { label: "Reading the Pressure Index", section: "Getting started" },
    ],
  },
  {
    title: "Plans & billing",
    links: [
      { label: "What\u2019s included in Free vs Pro", section: "Plans & billing" },
      { label: "How to upgrade your plan", section: "Plans & billing" },
      { label: "Cancellation and refund policy", section: "Plans & billing" },
      { label: "Enterprise pricing", section: "Plans & billing" },
    ],
  },
  {
    title: "Integrations",
    links: [
      { label: "Connecting Jira (Pro+)", section: "Integrations" },
      { label: "Slack notifications setup (Team+)", section: "Integrations" },
      { label: "CSV export format", section: "Integrations" },
      { label: "API access (Enterprise)", section: "Integrations" },
    ],
  },
  {
    title: "Account & security",
    links: [
      { label: "Changing your email or password", section: "Account & security" },
      { label: "Team member roles explained", section: "Account & security" },
      { label: "Data retention and deletion", section: "Account & security" },
      { label: "Security overview", section: "Account & security" },
    ],
  },
];

function findEntry(label: string): DocEntry | undefined {
  return SUPPORT_CONTENT.find((e) => e.label === label);
}

export default function SupportPage(): React.JSX.Element {
  const [activeDoc, setActiveDoc] = useState<DocEntry | null>(null);

  const openDoc = (label: string) => {
    const entry = findEntry(label);
    if (entry) setActiveDoc(entry);
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg-primary">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 text-center border-b border-border-subtle">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-h1 font-bold text-text-primary mb-4 leading-tight">
              We&apos;re here to help.
            </h1>
            <p className="text-lg text-text-secondary">
              Browse common topics, check your support SLA, or reach out directly.
            </p>
          </div>
        </section>

        {/* Topics grid */}
        <section className="py-20 px-6 border-b border-border-subtle">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-h3 font-bold text-text-primary mb-10">Common topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TOPICS.map((topic) => (
                <div key={topic.title} className="p-6 rounded-xl bg-bg-surface border border-border-subtle">
                  <h3 className="text-base font-bold text-text-primary mb-4">{topic.title}</h3>
                  <ul className="space-y-2.5">
                    {topic.links.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => openDoc(link.label)}
                          className="w-full flex items-center justify-between text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 group text-left"
                        >
                          <span>{link.label}</span>
                          <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 ml-2" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-sm text-text-disabled mt-6 text-center">
              Full documentation at{" "}
              <a href="/docs" className="text-text-secondary hover:text-text-primary underline underline-offset-2 transition-colors duration-150">
                sprinthelm.com/docs
              </a>
            </p>
          </div>
        </section>

        {/* SLA table */}
        <section className="py-20 px-6 border-b border-border-subtle">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-h3 font-bold text-text-primary mb-8">Support response times</h2>
            <div className="rounded-xl bg-bg-surface border border-border-subtle overflow-hidden">
              <div className="grid grid-cols-3 px-6 py-3 border-b border-border-subtle">
                <span className="text-label text-text-disabled uppercase tracking-wider">Plan</span>
                <span className="text-label text-text-disabled uppercase tracking-wider">Channel</span>
                <span className="text-label text-text-disabled uppercase tracking-wider">Response</span>
              </div>
              {SLAS.map((row) => (
                <div key={row.plan} className="grid grid-cols-3 px-6 py-4 border-b border-border-subtle last:border-0 items-center">
                  <span className={`text-sm font-semibold ${row.color}`}>{row.plan}</span>
                  <span className="text-sm text-text-secondary">{row.channel}</span>
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-text-disabled" />
                    <span className="text-sm text-text-secondary">{row.response}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                <Mail size={20} className="text-accent" />
              </div>
              <h3 className="text-base font-bold text-text-primary mb-2">Email support</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                For billing questions, account issues, and general support.
              </p>
              <a href="mailto:support@sprinthelm.com" className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors duration-200">
                support@sprinthelm.com
              </a>
            </div>
            <div className="p-8 rounded-xl bg-bg-surface border border-accent/30">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                <MessageCircle size={20} className="text-accent" />
              </div>
              <h3 className="text-base font-bold text-text-primary mb-2">Enterprise support</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                SLA-backed support with a dedicated Customer Success Manager.
              </p>
              <a href="mailto:enterprise@sprinthelm.com" className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors duration-200">
                enterprise@sprinthelm.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <DocModal entry={activeDoc} onClose={() => setActiveDoc(null)} />
    </>
  );
}
