import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog — SprintHelm",
  description: "Thinking on sprint planning, delivery forecasting, and engineering leadership.",
};

const POSTS = [
  {
    date: "March 2026",
    category: "Engineering",
    title: "Why 45% of product launches still miss their date — and what the data actually says",
    excerpt:
      "We analysed delivery patterns across 12 simulated team archetypes. The failure mode is almost always the same: scope commitment without a simulation layer.",
    readTime: "6 min read",
    href: "#",
  },
  {
    date: "February 2026",
    category: "Product",
    title: "Monte Carlo in plain English: what a probability score actually means for your sprint",
    excerpt:
      "A 68% completion probability is not a prediction — it's a risk tolerance question. Here's how to use it in a planning conversation without losing the room.",
    readTime: "5 min read",
    href: "#",
  },
  {
    date: "February 2026",
    category: "Leadership",
    title: "The stakeholder briefing problem: why no one reads your sprint update",
    excerpt:
      "Most sprint updates are written for the people who already know what happened. Here's how to write one that actually changes a decision.",
    readTime: "4 min read",
    href: "#",
  },
  {
    date: "January 2026",
    category: "Engineering",
    title: "Estimation risk: the complexity signal your backlog is already hiding",
    excerpt:
      "Tech debt severity, ticket size, and team seniority are all present in your backlog. Most teams never surface them as a delivery risk until it's too late.",
    readTime: "7 min read",
    href: "#",
  },
  {
    date: "January 2026",
    category: "Product",
    title: "How to run a what-if analysis before your next planning session",
    excerpt:
      "Adding a high-priority ticket mid-sprint is a negotiation, not a decision. Here's how to model the trade-off in three minutes so you go in with numbers.",
    readTime: "4 min read",
    href: "#",
  },
  {
    date: "December 2025",
    category: "Engineering",
    title: "Pressure Index: a single sprint health signal that PMs and engineers agree on",
    excerpt:
      "Red, yellow, green — three states that encode everything the simulation found. How we designed a signal that collapses a 1,000-run simulation into one decision.",
    readTime: "5 min read",
    href: "#",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Engineering: "text-accent bg-accent/10 border-accent/20",
  Product: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  Leadership: "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg-primary">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 text-center border-b border-border-subtle">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-h1 font-bold text-text-primary mb-4 leading-tight">Blog</h1>
            <p className="text-lg text-text-secondary">
              Thinking on sprint planning, delivery forecasting, and the information problems that cost engineering teams the most.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-4xl space-y-6">
            {POSTS.map((post) => (
              <a
                key={post.title}
                href={post.href}
                className="block p-8 rounded-xl bg-bg-surface border border-border-subtle hover:border-border-active hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-label font-semibold px-2.5 py-0.5 rounded border ${CATEGORY_COLORS[post.category]}`}>
                    {post.category}
                  </span>
                  <span className="text-caption text-text-disabled">{post.date}</span>
                  <span className="text-caption text-text-disabled ml-auto">{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-text-primary mb-3 group-hover:text-accent transition-colors duration-200 text-balance">
                  {post.title}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Read post <ArrowRight size={14} />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="pb-20 px-6 border-t border-border-subtle pt-16 text-center">
          <div className="mx-auto max-w-xl">
            <h2 className="text-h3 font-bold text-text-primary mb-3">New posts in your inbox</h2>
            <p className="text-sm text-text-secondary mb-6">
              We publish roughly twice a month. No newsletters about newsletters.
            </p>
            <a
              href="mailto:hello@sprinthelm.com?subject=Blog updates"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
            >
              Subscribe via email
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
