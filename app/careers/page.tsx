import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Careers — SprintHelm",
  description: "Join the team building delivery intelligence for engineering organisations.",
};

const OPEN_ROLES = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    location: "Remote (EU/UK)",
    type: "Full-time",
    description:
      "Own the simulation engine and the product surfaces that expose it. We write TypeScript (Next.js) on the frontend and Python (FastAPI) on the backend. You'll work directly with Claude to build AI-powered features that ship to production weekly.",
    href: "mailto:hello@sprinthelm.com?subject=Senior Full-Stack Engineer",
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Remote (EU/UK)",
    type: "Full-time",
    description:
      "Design the experience for delivery intelligence — data-dense, fast, trusted by engineering leads. You'll own end-to-end design from research to shipped components. We work in Figma; our design language is dark, precise, and technical.",
    href: "mailto:hello@sprinthelm.com?subject=Product Designer",
  },
  {
    title: "Growth Engineer",
    team: "Growth",
    location: "Remote",
    type: "Full-time",
    description:
      "Build the systems that take teams from first simulation to paid — activation flows, onboarding experiments, conversion analytics. You'll work across the full funnel with direct access to usage data and the ability to ship changes fast.",
    href: "mailto:hello@sprinthelm.com?subject=Growth Engineer",
  },
];

const VALUES = [
  {
    title: "Small team, real ownership.",
    body: "You'll work on things that matter from day one. No ticket queues for small improvements. If you see something broken, fix it.",
  },
  {
    title: "Remote-first, async by default.",
    body: "We have no required standups and no mandatory office hours. You own your calendar. We measure output, not presence.",
  },
  {
    title: "Ship weekly.",
    body: "We deploy multiple times a week. If you thrive in fast iteration cycles with short feedback loops from real users, you'll fit here.",
  },
  {
    title: "AI-native from the start.",
    body: "Claude is a core part of how we build features. We use it for generation, evaluation, and user-facing intelligence — not just as a coding assistant.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg-primary">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 text-center border-b border-border-subtle">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-h1 font-bold text-text-primary mb-4 leading-tight">
              Build the future of sprint planning.
            </h1>
            <p className="text-lg text-text-secondary">
              We&apos;re a small team solving a problem that affects every software company.
              If you want real ownership and fast iteration, read on.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6 border-b border-border-subtle">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-h2 font-bold text-text-primary mb-10">How we work.</h2>
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
            <h2 className="text-h2 font-bold text-text-primary mb-10">Open roles.</h2>
            <div className="space-y-5">
              {OPEN_ROLES.map((role) => (
                <a
                  key={role.title}
                  href={role.href}
                  className="block p-8 rounded-xl bg-bg-surface border border-border-subtle hover:border-border-active hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors duration-200 mb-1">
                        {role.title}
                      </h3>
                      <span className="text-sm text-accent font-medium">{role.team}</span>
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
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{role.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Apply via email <ArrowRight size={14} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Speculative */}
        <section className="py-20 px-6 text-center">
          <div className="mx-auto max-w-xl">
            <h2 className="text-h3 font-bold text-text-primary mb-3">Don&apos;t see your role?</h2>
            <p className="text-sm text-text-secondary mb-6">
              We hire for exceptional people before we write the job spec. If you&apos;re exceptional at something that helps engineering teams ship better, send us a note.
            </p>
            <a
              href="mailto:hello@sprinthelm.com?subject=Speculative application"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
            >
              Send a speculative application
              <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
