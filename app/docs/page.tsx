"use client";

import { useState, useMemo } from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { DocModal, type DocEntry } from "@/components/ui/doc-modal";
import { DOCS_CONTENT } from "@/lib/docs-content";
import { ArrowRight, BookOpen, Code2, Zap, Settings, Search } from "lucide-react";

const SECTION_META: Record<string, { icon: React.ElementType; description: string }> = {
  "Getting started": {
    icon: Zap,
    description: "Import your backlog, run your first simulation, and understand your results.",
  },
  Features: {
    icon: BookOpen,
    description: "Deep dives into each SprintHelm capability.",
  },
  Integrations: {
    icon: Settings,
    description: "Connect SprintHelm to your existing tooling.",
  },
  "API reference": {
    icon: Code2,
    description: "Programmatic access to SprintHelm's simulation engine. Enterprise only.",
  },
};

const SECTION_ORDER = ["Getting started", "Features", "Integrations", "API reference"];

function groupBySection(entries: DocEntry[]): Record<string, DocEntry[]> {
  return entries.reduce<Record<string, DocEntry[]>>((acc, entry) => {
    const key = entry.section ?? "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {});
}

export default function DocsPage(): React.JSX.Element {
  const [query, setQuery] = useState("");
  const [activeDoc, setActiveDoc] = useState<DocEntry | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DOCS_CONTENT;
    return DOCS_CONTENT.filter(
      (entry) =>
        entry.label.toLowerCase().includes(q) ||
        (entry.section?.toLowerCase().includes(q) ?? false) ||
        entry.content.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => groupBySection(filtered), [filtered]);

  const sectionsToShow = query.trim()
    ? Object.keys(grouped)
    : SECTION_ORDER.filter((s) => grouped[s]?.length);

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

        {/* Search */}
        <section className="py-10 px-6 border-b border-border-subtle">
          <div className="mx-auto max-w-2xl">
            <label htmlFor="docs-search" className="sr-only">Search documentation</label>
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-4 text-text-disabled pointer-events-none" />
              <input
                id="docs-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation…"
                className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-bg-surface border border-border-subtle text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-accent/60 transition-colors duration-150"
              />
            </div>
            {query.trim() && (
              <p className="text-xs text-text-disabled mt-2 ml-1">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query.trim()}&rdquo;
              </p>
            )}
          </div>
        </section>

        {/* Sections grid */}
        <section className="py-20 px-6">
          {sectionsToShow.length === 0 ? (
            <div className="mx-auto max-w-xl text-center py-16">
              <p className="text-text-disabled text-sm">No results found for &ldquo;{query}&rdquo;. Try a different search term.</p>
            </div>
          ) : (
            <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
              {sectionsToShow.map((sectionName) => {
                const meta = SECTION_META[sectionName];
                const Icon = meta?.icon ?? BookOpen;
                const entries = grouped[sectionName] ?? [];
                return (
                  <div key={sectionName} className="p-8 rounded-xl bg-bg-surface border border-border-subtle">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-accent" />
                      </div>
                      <h2 className="text-base font-bold text-text-primary">{sectionName}</h2>
                    </div>
                    {meta?.description && (
                      <p className="text-sm text-text-disabled mb-5 ml-12">{meta.description}</p>
                    )}
                    <ul className="space-y-2">
                      {entries.map((entry) => (
                        <li key={entry.label}>
                          <button
                            onClick={() => setActiveDoc(entry)}
                            className="w-full flex items-center justify-between text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 group px-3 py-2 rounded-lg hover:bg-bg-elevated text-left"
                          >
                            {entry.label}
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
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

      <DocModal entry={activeDoc} onClose={() => setActiveDoc(null)} />
    </>
  );
}
