"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, MapPin, Clock, X, Wifi, Globe, Link as LinkIcon, Check, FileText } from "lucide-react";

interface Role {
  /** URL slug — shown in `?role=<slug>` query param for deep linking. */
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  description: ReactNode;
  applyEmail: string;
  applySubject: string;
}

const APPLY_EMAIL = "hello@sprinthelm.com";

const OPEN_ROLES: Role[] = [
  {
    slug: "product-designer",
    title: "Product Designer Intern",
    team: "Design",
    location: "Remote",
    type: "Part-time",
    summary:
      "Design real flows across two products, learn how AI is reshaping the designer's workflow, and ship work users see in the same week.",
    applyEmail: APPLY_EMAIL,
    applySubject: "Product Designer Intern — SprintHelm Build Team",
    description: (
      <div className="space-y-6 text-sm leading-relaxed text-text-secondary">
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">About the role</h3>
          <p>
            You&apos;ll design across two products — SprintHelm itself and a new product the team is
            launching alongside it. That means you&apos;ll move between a mature, live product with real
            users and an earlier-stage product where you help shape the visual identity and core
            flows from scratch. You&apos;ll use AI tools every day as part of how you design, not as a
            novelty bolted on at the end.
          </p>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">What you&apos;ll do</h3>
          <ul className="list-disc list-inside space-y-1.5">
            <li>Design flows, screens, and components across two AI-native products</li>
            <li>Translate product requirements into clear, testable interaction designs</li>
            <li>Use AI tools to accelerate exploration, generate variants, and pressure-test ideas</li>
            <li>Contribute to a small but coherent design system used by both products</li>
            <li>Sit in on user feedback sessions and translate findings into design decisions</li>
            <li>Ship visible work to live users in your first few weeks, not your last</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">What you&apos;ll learn</h3>
          <ul className="list-disc list-inside space-y-1.5">
            <li>How AI tools change the modern designer&apos;s workflow — from ideation to handoff</li>
            <li>How to design across two products at once — one live, one early-stage</li>
            <li>How a small team takes a feature from rough idea to live in production</li>
            <li>Real exposure to designing AI-native products people pay for</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary mb-2">Who this is for</h3>
          <p>
            Product designers, UX designers, or UI-focused folks who want hands-on experience designing
            AI-native products. You should be opinionated about details, comfortable in Figma, and willing
            to learn by shipping. Prior internship or freelance experience is a plus, but a strong
            portfolio and curiosity matter more.
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
    slug: "qa",
    title: "QA / Quality Assurance Intern",
    team: "Quality",
    location: "Remote",
    type: "Part-time",
    summary:
      "Test live features across the SprintHelm platform, write test cases, and learn how AI changes the quality workflow in fast-moving product teams.",
    applyEmail: APPLY_EMAIL,
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
            <li>Build your intuition for delivery risk and what &ldquo;good quality&rdquo; looks like in a startup</li>
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
    slug: "product-owner",
    title: "Product Owner Intern",
    team: "Product",
    location: "Remote",
    type: "Part-time",
    summary:
      "Own and prioritise a real product backlog, write user stories, and learn how AI-powered delivery intelligence changes the way product owners make decisions.",
    applyEmail: APPLY_EMAIL,
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
  Design:   "text-pink-400 border-pink-400/30 bg-pink-400/10",
  Quality:  "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Product:  "text-blue-400 border-blue-400/30 bg-blue-400/10",
};

interface JobModalProps {
  role: Role | null;
  onClose: () => void;
}

function JobModal({ role, onClose }: JobModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (role) {
      el.showModal();
    } else {
      el.close();
    }
  }, [role]);

  // Reset the "Copied!" badge whenever we switch to a different role.
  useEffect(() => {
    setCopied(false);
  }, [role?.slug]);

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  const handleCopyLink = async () => {
    if (!role || typeof window === "undefined") return;
    const shareUrl = `${window.location.origin}/careers?role=${role.slug}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail in some browsers / contexts. Fall back to
      // selecting the URL via prompt so the user can copy manually.
      window.prompt("Copy link to this role:", shareUrl);
    }
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
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label={copied ? "Link copied" : "Copy direct link to this role"}
            title="Share this role"
            data-testid="copy-role-link"
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
              copied
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-border-subtle text-text-disabled hover:text-text-primary hover:bg-bg-elevated hover:border-border-active"
            }`}
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <LinkIcon size={14} />
                <span className="hidden sm:inline">Copy link</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close job description"
            className="rounded-lg p-1.5 text-text-disabled hover:text-text-primary hover:bg-bg-elevated transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="overflow-y-auto px-8 py-6" style={{ maxHeight: "calc(90vh - 240px)" }}>
        {role.description}

        {/* Shared commitment block — same for all roles */}
        <div className="mt-6 space-y-3 rounded-xl border border-border-subtle bg-bg-elevated p-5">
          <h3 className="text-sm font-bold text-text-primary">Commitment &amp; requirements</h3>
          <ul className="space-y-2.5 text-sm text-text-secondary">
            <li className="flex items-start gap-2.5">
              <Clock size={14} className="mt-0.5 shrink-0 text-accent" />
              <span>
                <span className="font-medium text-text-primary">Part-time</span> — minimum 2–3 hours per day,
                for a <span className="font-medium text-text-primary">3–6 month</span> engagement
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Globe size={14} className="mt-0.5 shrink-0 text-accent" />
              <span>
                Available within the <span className="font-medium text-text-primary">EU timezone</span> and able
                to join scheduled team meetings
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Wifi size={14} className="mt-0.5 shrink-0 text-accent" />
              <span>
                <span className="font-medium text-text-primary">Stable internet connection</span> required for
                meetings and async collaboration
              </span>
            </li>
          </ul>
        </div>

        {/* What to send — moved into the body so it's always visible and
            doesn't compete for space with the Apply CTA on mobile. */}
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4">
          <FileText size={16} className="mt-0.5 shrink-0 text-accent" />
          <p className="text-sm text-text-primary leading-relaxed">
            <span className="font-semibold">What to send:</span>{" "}
            <span className="text-text-secondary">
              attach your CV and a short note — why this role excites you, and what you want to learn.
            </span>
          </p>
        </div>
      </div>

      {/* Footer CTA — Apply button on the left, "Sends to" caption on the
          right so the row is visually balanced (Designer feedback: was empty
          on the right after the CV microcopy moved into the body). */}
      <div className="px-8 py-5 border-t border-border-subtle bg-bg-elevated flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            window.location.href = `mailto:${role.applyEmail}?subject=${encodeURIComponent(role.applySubject)}`;
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          Apply via email <ArrowRight size={14} />
        </button>
        <p className="text-xs text-text-disabled text-right">
          Sends to <span className="text-text-secondary">{role.applyEmail}</span>
        </p>
      </div>
    </dialog>
  );
}

export default function CareersPage() {
  const [activeRole, setActiveRole] = useState<Role | null>(null);

  // Auto-open a role's modal when the URL carries `?role=<slug>`. Lets us
  // share a direct link to a specific job from anywhere — copying the URL
  // (or clicking "Copy link" in the modal) gives a deep link that opens
  // the same role for the next visitor.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("role");
    if (!slug) return;
    const match = OPEN_ROLES.find((r) => r.slug === slug);
    if (match) setActiveRole(match);
  }, []);

  // Keep the URL in sync with which modal is open. Updating via
  // history.replaceState avoids polluting browser back-stack — closing the
  // modal returns to /careers without leaving an extra history entry.
  const openRole = (role: Role) => {
    setActiveRole(role);
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", `/careers?role=${role.slug}`);
    }
  };

  const closeRole = () => {
    setActiveRole(null);
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", "/careers");
    }
  };

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
              Open to Product Designers, Product Owners, and QA. Limited slots available.
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
              Three open roles. Click any to read the full description and apply.
            </p>
            <div className="space-y-5">
              {OPEN_ROLES.map((role) => (
                <button
                  key={role.slug}
                  type="button"
                  data-testid={`role-card-${role.slug}`}
                  onClick={() => openRole(role)}
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
            <h2 className="text-h3 font-bold text-text-primary mb-3">Don&apos;t see your role?</h2>
            <p className="text-sm text-text-secondary mb-6">
              Tell us what you do and what you want to learn. We&apos;ll keep you in mind as new slots open up.
            </p>
            <a
              href={`mailto:${APPLY_EMAIL}?subject=SprintHelm Build Team — Speculative application`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
            >
              Send a speculative application
              <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>

      <JobModal role={activeRole} onClose={closeRole} />
      <Footer />
    </>
  );
}
