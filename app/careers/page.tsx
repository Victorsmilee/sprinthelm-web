"use client";

import { useState, useRef, useEffect } from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, MapPin, Clock, X } from "lucide-react";

export const metadata = undefined; // metadata moved to layout — page is now client

interface Role {
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  description: React.ReactNode;
  applyEmail: string;
  applySubject: string;
}

const OPEN_ROLES: Role[] = [
  {
    title: "QA / Quality Assurance Intern",
    team: "Quality",
    location: "Remote",
    type: "Internship",
    summary:
      "Test live features across the SprintHelm platform, write test cases, and learn how AI changes the quality workflow in fast-moving product teams.",
    applyEmail: "training@victoribrahim.com",
    applySubject: "QA / Quality Assurance Intern — SprintHelm Build Team",
    description: (
      <div className="space-y-6 text-sm leading-relaxed text-text-secondary">
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">About the role</h3>
          <p>
            You&apos;ll work directly on a live product that real teams use to plan their sprints. Your job is to
            make sure the features we ship actually work — and to catch the things that don&apos;t before users do.
            This is not a simulated QA project. You&apos;ll be testing real flows, filing real bugs, and seeing
            your work matter in the same week.
          </p>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">What you&apos;ll do</h3>
          <ul className="list-disc list-inside space-y-1.5">
            <li>Test new features end-to-end across web and app before they ship</li>
            <li>Write structured test cases and acceptance criteria alongside the product team</li>
            <li>Identify, document, and track bugs through to resolution</li>
            <li>Use AI tools to analyse test coverage and surface edge cases faster</li>
            <li>Collaborate with engineers to verify fixes and prevent regressions</li>
            <li>Build your intuition for delivery risk and what "good quality" looks like in a startup</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">What you&apos;ll learn</h3>
          <ul className="list-disc list-inside space-y-1.5">
            <li>How to use AI to improve test coverage and generate edge-case scenarios</li>
            <li>How modern product teams think about quality in fast iteration cycles</li>
            <li>Real exposure to testing a Next.js/TypeScript product in production</li>
            <li>How delivery intelligence tools help teams spot risk before it becomes an incident</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">Who this is for</h3>
          <p>
            QA engineers, testers, or quality-minded professionals who want to stay relevant in an AI-driven
            world. You don&apos;t need to be an expert — you need to be curious, structured, and willing to learn
            by doing on a real product.
          </p>
        </div>
        <div className="rounded-lg bg-bg-elevated border border-border-subtle p-4">
          <p className="text-text-secondary">
            <span className="font-semibold text-text-primary">Note:</span> This is an unpaid internship role
            offering hands-on AI product experience, a strong portfolio story, and direct mentorship from the
            founding team. Limited slots available.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Product Owner Intern",
    team: "Product",
    location: "Remote",
    type: "Internship",
    summary:
      "Own and prioritise a real product backlog, write user stories, and learn how AI-powered delivery intelligence changes the way product owners make decisions.",
    applyEmail: "training@victoribrahim.com",
    applySubject: "Product Owner Intern — SprintHelm Build Team",
    description: (
      <div className="space-y-6 text-sm leading-relaxed text-text-secondary">
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">About the role</h3>
          <p>
            You&apos;ll sit at the intersection of users and engineering — translating what teams need into
            clear, actionable work. You&apos;ll use SprintHelm itself to understand delivery risk, which means
            you&apos;re both a user of the product and a contributor to its direction. This is real product
            ownership, not a simulation.
          </p>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">What you&apos;ll do</h3>
          <ul className="list-disc list-inside space-y-1.5">
            <li>Maintain and prioritise the product backlog based on value and delivery risk</li>
            <li>Write user stories and acceptance criteria that engineers can work from immediately</li>
            <li>Define feature scope and make trade-off decisions in sprint planning</li>
            <li>Run sprint reviews and retrospectives with the team</li>
            <li>Use AI tools to generate insights from user feedback and usage data</li>
            <li>Collaborate closely with engineers and designers on feature delivery</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">What you&apos;ll learn</h3>
          <ul className="list-disc list-inside space-y-1.5">
            <li>How AI tools transform backlog prioritisation and product decision-making</li>
            <li>How delivery intelligence changes how you think about scope and risk</li>
            <li>How to run AI-assisted sprint ceremonies in a modern product team</li>
            <li>What real product ownership looks like in a fast-moving startup environment</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">Who this is for</h3>
          <p>
            Product owners, business analysts, or product-minded professionals who want to build
            AI-native product ownership skills. You should be organised, opinionated about priorities,
            and comfortable communicating decisions clearly.
          </p>
        </div>
        <div className="rounded-lg bg-bg-elevated border border-border-subtle p-4">
          <p className="text-text-secondary">
            <span className="font-semibold text-text-primary">Note:</span> This is an unpaid internship role
            offering hands-on AI product experience, a strong portfolio story, and direct mentorship from the
            founding team. Limited slots available.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Scrum Master / Project Manager Intern",
    team: "Delivery",
    location: "Remote",
    type: "Internship",
    summary:
      "Facilitate real sprint delivery, model completion probability with SprintHelm, and learn how AI delivery intelligence is replacing gut-feel project management.",
    applyEmail: "training@victoribrahim.com",
    applySubject: "Scrum Master / PM Intern — SprintHelm Build Team",
    description: (
      <div className="space-y-6 text-sm leading-relaxed text-text-secondary">
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">About the role</h3>
          <p>
            You&apos;ll help the team stay focused, unblocked, and on track — while learning how AI delivery
            intelligence changes every aspect of sprint management. You&apos;ll use SprintHelm to model
            completion probability before committing to scope, turning the tool into part of how you do
            your job, not just something you help build.
          </p>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">What you&apos;ll do</h3>
          <ul className="list-disc list-inside space-y-1.5">
            <li>Facilitate sprint planning, stand-ups, retrospectives, and reviews</li>
            <li>Use Monte Carlo simulation to model sprint completion probability before committing</li>
            <li>Identify delivery risks before they become blockers</li>
            <li>Build and maintain delivery dashboards and status reports</li>
            <li>Communicate progress and risk clearly to stakeholders</li>
            <li>Help the team remove impediments and stay in flow</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">What you&apos;ll learn</h3>
          <ul className="list-disc list-inside space-y-1.5">
            <li>How AI delivery intelligence is changing the Scrum Master and PM role</li>
            <li>How to use probabilistic simulation to predict sprint outcomes with data</li>
            <li>How modern teams are replacing estimation guesswork with delivery intelligence</li>
            <li>Real-world delivery management in a fast-moving, AI-native startup</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">Who this is for</h3>
          <p>
            Scrum Masters, project managers, or delivery leads who want to stay ahead in an AI-first delivery
            world. You should be comfortable facilitating conversations, tracking dependencies, and thinking
            about risk before it happens.
          </p>
        </div>
        <div className="rounded-lg bg-bg-elevated border border-border-subtle p-4">
          <p className="text-text-secondary">
            <span className="font-semibold text-text-primary">Note:</span> This is an unpaid internship role
            offering hands-on AI product experience, a strong portfolio story, and direct mentorship from the
            founding team. Limited slots available.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Product Manager Intern",
    team: "Product",
    location: "Remote",
    type: "Internship",
    summary:
      "Analyse user needs, shape the roadmap, and learn how AI is transforming the product management workflow — from insight generation to delivery decisions.",
    applyEmail: "training@victoribrahim.com",
    applySubject: "Product Manager Intern — SprintHelm Build Team",
    description: (
      <div className="space-y-6 text-sm leading-relaxed text-text-secondary">
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">About the role</h3>
          <p>
            You&apos;ll work on the strategic and analytical side of SprintHelm&apos;s product development —
            understanding users, synthesising feedback, shaping features, and measuring what ships. You&apos;ll
            use AI tools as part of your daily workflow, not as a novelty, but as a core capability for doing
            your job better and faster.
          </p>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">What you&apos;ll do</h3>
          <ul className="list-disc list-inside space-y-1.5">
            <li>Conduct user research and synthesise feedback into actionable insights</li>
            <li>Define features, write specs, and collaborate with engineering on requirements</li>
            <li>Shape the product roadmap based on user needs and delivery data</li>
            <li>Use AI to generate product insights from usage patterns and feedback</li>
            <li>Measure the impact of features post-launch and iterate based on results</li>
            <li>Make and communicate clear trade-off decisions under uncertainty</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">What you&apos;ll learn</h3>
          <ul className="list-disc list-inside space-y-1.5">
            <li>How AI is transforming the end-to-end product management workflow</li>
            <li>How to generate and act on insights from delivery and usage data</li>
            <li>How to make faster, better-informed product decisions with AI assistance</li>
            <li>Real PM experience on a live, growing product with actual users</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">Who this is for</h3>
          <p>
            Product managers or aspiring PMs who want hands-on, AI-first product experience. You should be
            analytical, user-focused, and comfortable working with ambiguity. Prior PM experience is a plus
            but not required — what matters is curiosity and a drive to build something real.
          </p>
        </div>
        <div className="rounded-lg bg-bg-elevated border border-border-subtle p-4">
          <p className="text-text-secondary">
            <span className="font-semibold text-text-primary">Note:</span> This is an unpaid internship role
            offering hands-on AI product experience, a strong portfolio story, and direct mentorship from the
            founding team. Limited slots available.
          </p>
        </div>
      </div>
    ),
  },
];

const VALUES = [
  {
    title: "Learn by doing.",
    body: "No theory, no slides. You'll work on a live product with real users and see your contributions matter in the same week.",
  },
  {
    title: "AI-native from day one.",
    body: "You'll use AI as part of your actual workflow — not as a topic to read about, but as a tool you apply to real decisions and real problems.",
  },
  {
    title: "A portfolio story that stands out.",
    body: "Hiring managers want to see AI-product experience. You'll leave with concrete examples of how you used AI to improve delivery, quality, and product decisions.",
  },
  {
    title: "Work like a modern team.",
    body: "Remote, async, and fast. We measure contribution, not time. You'll get real exposure to how high-performing product teams operate in 2026.",
  },
];

const TEAM_COLORS: Record<string, string> = {
  Quality:  "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Product:  "text-blue-400 border-blue-400/30 bg-blue-400/10",
  Delivery: "text-purple-400 border-purple-400/30 bg-purple-400/10",
};

interface JobModalProps {
  role: Role | null;
  onClose: () => void;
}

function JobModal({ role, onClose }: JobModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (role) {
      el.showModal();
    } else {
      el.close();
    }
  }, [role]);

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  if (!role) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdrop}
      className="fixed inset-0 m-auto w-full max-w-2xl max-h-[90vh] rounded-xl bg-bg-surface border border-border-subtle shadow-elevated backdrop:bg-black/60 p-0 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-8 py-6 border-b border-border-subtle">
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-1">{role.title}</h2>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${TEAM_COLORS[role.team] ?? "text-accent border-accent/30 bg-accent/10"}`}>
              {role.team}
            </span>
            <span className="text-xs text-text-disabled flex items-center gap-1">
              <MapPin size={11} /> {role.location}
            </span>
            <span className="text-xs text-text-disabled flex items-center gap-1">
              <Clock size={11} /> {role.type}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close job description"
          className="shrink-0 rounded-lg p-1.5 text-text-disabled hover:text-text-primary hover:bg-bg-elevated transition-colors duration-150"
        >
          <X size={18} />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="overflow-y-auto px-8 py-6" style={{ maxHeight: "calc(90vh - 180px)" }}>
        {role.description}
      </div>

      {/* Footer CTA */}
      <div className="px-8 py-5 border-t border-border-subtle bg-bg-elevated">
        <a
          href={`mailto:${role.applyEmail}?subject=${encodeURIComponent(role.applySubject)}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
        >
          Apply via email <ArrowRight size={14} />
        </a>
        <p className="mt-2 text-xs text-text-disabled">
          Send your CV to{" "}
          <span className="text-text-secondary">{role.applyEmail}</span>
        </p>
      </div>
    </dialog>
  );
}

export default function CareersPage() {
  const [activeRole, setActiveRole] = useState<Role | null>(null);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg-primary">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 text-center border-b border-border-subtle">
          <div className="mx-auto max-w-2xl">
            <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-accent">
              SprintHelm Build Team
            </span>
            <h1 className="text-h1 font-bold text-text-primary mb-4 leading-tight">
              Build the future of sprint planning.
            </h1>
            <p className="text-lg text-text-secondary mb-3">
              Join the final build phase of SprintHelm as an intern. Work on a live product, learn how
              modern teams build with AI, and leave with a portfolio story that sets you apart.
            </p>
            <p className="text-sm text-text-disabled">
              Open to Product Owners, Scrum Masters, Project Managers, QA, and Product Managers.
              Limited slots available.
            </p>
          </div>
        </section>

        {/* What you gain */}
        <section className="py-20 px-6 border-b border-border-subtle">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-h2 font-bold text-text-primary mb-10">Why join.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VALUES.map((v) => (
                <div key={v.title} className="p-6 rounded-xl bg-bg-surface border border-border-subtle">
                  <h3 className="text-base font-bold text-text-primary mb-2">{v.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open roles */}
        <section className="py-20 px-6 border-b border-border-subtle">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-h2 font-bold text-text-primary mb-3">Open roles.</h2>
            <p className="text-sm text-text-secondary mb-10">
              Click any role to read the full job description and apply.
            </p>
            <div className="space-y-5">
              {OPEN_ROLES.map((role) => (
                <button
                  key={role.title}
                  type="button"
                  onClick={() => setActiveRole(role)}
                  className="w-full text-left block p-8 rounded-xl bg-bg-surface border border-border-subtle hover:border-border-active hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors duration-200 mb-1.5">
                        {role.title}
                      </h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${TEAM_COLORS[role.team] ?? "text-accent border-accent/30 bg-accent/10"}`}>
                        {role.team}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="flex items-center gap-1.5 text-caption text-text-disabled">
                        <MapPin size={12} /> {role.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-caption text-text-disabled">
                        <Clock size={12} /> {role.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{role.summary}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View full description <ArrowRight size={14} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Speculative */}
        <section className="py-20 px-6 text-center">
          <div className="mx-auto max-w-xl">
            <h2 className="text-h3 font-bold text-text-primary mb-3">Not sure which role fits?</h2>
            <p className="text-sm text-text-secondary mb-6">
              Tell us about yourself and what you want to learn. We&apos;ll find the right fit or keep you in
              mind as new slots open up.
            </p>
            <a
              href="mailto:training@victoribrahim.com?subject=SprintHelm Build Team — Speculative application"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
            >
              Send a speculative application
              <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>

      <JobModal role={activeRole} onClose={() => setActiveRole(null)} />
      <Footer />
    </>
  );
}
