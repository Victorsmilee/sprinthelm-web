import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, Zap } from "lucide-react";

export const metadata = {
  title: "About SprintHelm, Delivery Forecasting for Engineering Leaders",
  description:
    "Why we built SprintHelm: engineering leaders commit to product roadmaps they cannot yet see. We built the forecast that fixes that.",
};

const VALUES = [
  {
    title: "Clarity over comfort.",
    body: "We tell teams what their sprint data actually says, not what they hope it says. Honest numbers build trust faster than optimistic forecasts.",
  },
  {
    title: "Data over hierarchy.",
    body: "A simulation doesn't care about seniority. If the sprint is overloaded, the Pressure Index goes red, regardless of who made the plan.",
  },
  {
    title: "Ship what matters.",
    body: "Velocity is meaningless without direction. Every feature we build exists to help teams deliver the right things, finished, on time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg-primary">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 text-center border-b border-border-subtle">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8">
              <Zap size={13} />
              About SprintHelm
            </div>
            <h1 className="text-h1 font-bold text-text-primary mb-6 text-balance leading-tight">
              Engineering leaders commit to product roadmaps they cannot yet see. We built the forecast that fixes that.
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
              SprintHelm closes the gap between the roadmap leadership commits to and what the team can
              actually deliver. Not a project management tool. Not another dashboard. A simulation engine
              that turns that uncertainty into a number you can commit to.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 px-6 border-b border-border-subtle">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-h2 font-bold text-text-primary mb-8">The problem we kept hitting.</h2>
            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p>
                Every sprint, the same conversation: someone asks to add a feature, nobody does the maths
                on whether the sprint survives it, the team says yes, and two weeks later there&apos;s a
                spillover, an incident, or a conversation nobody wanted to have.
              </p>
              <p>
                It occurred to me last year, sitting in my own office, watching the same failure repeat
                across the organisations and dev teams I had worked with: capable people committing to
                roadmaps nobody had actually tested. This was not a people problem. It was a missing tool.
                I took the idea to several founders and engineering leaders, and every one of them
                recognised it instantly. (We will name them here as soon as they are ready to be named.)
              </p>
              <p>
                The root cause was always the same. Teams were making commitment decisions without a
                simulation layer. They had velocity data. They had backlogs. They had estimates. But they
                had no way to ask: <em>&quot;If we add this, what actually breaks?&quot;</em> And above the
                team the question only gets bigger: with the people we have, across every project, what
                ships, what slips, and what does forcing one more in actually cost?
              </p>
              <p>
                SprintHelm was founded in 2025 to answer that. We built a Monte Carlo engine on top of
                real delivery patterns, a priority scoring model that reflects business objectives rather
                than gut feel, a portfolio layer that prices the cost of over-commitment, and an AI layer
                that turns the output into something a stakeholder can read in 30 seconds.
              </p>
              <p>
                The result: leaders walk into the planning room with a delivery forecast they can stand
                behind. No guesswork. No surprises.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6 border-b border-border-subtle">
          <div className="mx-auto max-w-content">
            <h2 className="text-h2 font-bold text-text-primary mb-12">What we believe.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {VALUES.map((v) => (
                <div key={v.title} className="p-6 rounded-xl bg-bg-surface border border-border-subtle">
                  <h3 className="text-base font-bold text-text-primary mb-3">{v.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center">
          <div className="mx-auto max-w-xl">
            <h2 className="text-h2 font-bold text-text-primary mb-4">Ready to stop planning blind?</h2>
            <p className="text-text-secondary mb-8">Start for free, no payment cards required. Results in under 60 seconds.</p>
            <a
              href="https://app.sprinthelm.com/signup?plan=free"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold hover:bg-accent/90 transition-colors duration-200"
            >
              Run your first simulation
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
