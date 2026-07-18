import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Our Story — SprintHelm",
  description:
    "Why we built SprintHelm: the frustration of committing to plans we knew wouldn't hold, the idea of simulating a sprint before living it, the mistakes we made, and how we build.",
};

const APP_SIGNUP = "https://app.sprinthelm.com/signup?plan=free";

/**
 * Long-form founder narrative. Distinct from /about (positioning + values):
 * this is the story — the start, the problem, the idea, the solution, the
 * mistakes, the work, and what's next.
 */
export default function OurStoryPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg-primary">
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 text-center border-b border-border-subtle">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8">
              <BookOpen size={13} />
              Our Story
            </div>
            <h1 className="text-h1 font-bold text-text-primary mb-6 text-balance leading-tight">
              We were tired of committing to plans we secretly knew wouldn&apos;t hold.
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
              SprintHelm didn&apos;t start as a product. It started as a frustration — one that showed up
              in every planning meeting, in every team, at every size. This is how it became the thing
              we&apos;d wished existed.
            </p>
          </div>
        </section>

        {/* The chapters */}
        <article className="mx-auto max-w-3xl px-6">
          <Chapter n="01" title="The start">
            <p>
              Every sprint began the same way. A room full of capable people would look at a backlog,
              nod at a plan, and commit to it — and almost everyone in the room quietly knew the plan
              was optimistic. Two weeks later, half of it would slip. Not because anyone was bad at
              their job, but because the most important question in the room never got a real answer:
              <em> how much can we actually deliver?</em>
            </p>
            <p>
              That number was always a gut call dressed up as a commitment. I watched it happen enough
              times to stop blaming the team and start blaming the tools. Our software could track what
              we promised. Nothing could tell us whether the promise was real.
            </p>
          </Chapter>

          <Chapter n="02" title="The problem">
            <p>
              Planning is guesswork wearing a suit. Velocity is a lagging average that breaks the moment
              the team, the scope, or the complexity shifts. Capacity is invisible until it&apos;s already
              gone — you find out you over-committed when the sprint is on fire, not before.
            </p>
            <p>
              The pattern was identical in five-person startups and in orgs with hundreds of engineers.
              Everyone had velocity charts, backlogs, and estimates. Nobody had a way to ask the only
              question that mattered before saying yes: <em>&quot;If we add this, what actually
              breaks?&quot;</em>
            </p>
            <p>
              But the problem doesn&apos;t stop at the team. It climbs.
            </p>
            <p>
              Somewhere above the sprint board, a CEO stands in front of the board and commits to ship
              dates — and the people who actually have to deliver them were never in the room. The Head
              of Engineering already knows the slate won&apos;t fit. All they have to argue with is gut
              feel, and gut feel loses to a confident roadmap slide every single time.
            </p>
            <p>
              The real question at that level is bigger than one sprint: <em>with the team we have, over
              this horizon — what ships, what slips, and if leadership forces the whole slate in anyway,
              what does that decision actually cost?</em> Nobody could answer it, because the cost of an
              override is invisible. It gets paid later, and quietly — in burnout, in deferred tech debt,
              in incidents, in the senior engineer who starts taking recruiter calls — and none of it
              ever shows up on the slide that caused it.
            </p>
          </Chapter>

          <Chapter n="03" title="The idea">
            <p>
              What if you could <em>simulate</em> a sprint before you lived it? Not a single-point
              estimate — a probability. Run the plan through thousands of possible outcomes, factor in
              real complexity and the actual shape of the team, and get back an honest read: a
              completion likelihood, and a <span className="text-text-primary font-medium">Pressure
              Index</span> that tells you at a glance whether this sprint is calm or already underwater.
            </p>
            <p>
              Then let people ask &quot;what if?&quot; — add a developer, cut scope, move the deadline —
              and watch the odds move in real time. The helm became the metaphor: you&apos;re steering,
              and for the first time you can see the water ahead. It&apos;s why our mark spins while a
              simulation runs.
            </p>
          </Chapter>

          <Chapter n="04" title="The solution">
            <p>
              SprintHelm turned that idea into two views that share one engine.
            </p>
            <p>
              <span className="text-text-primary font-medium">The sprint planner</span> scores your
              backlog against what the business actually cares about, models your team as it really is,
              and runs a forecast that returns a completion probability, a Pressure Index,
              complexity-adjusted effort, instant what-if scenarios, and a summary a stakeholder can read
              in thirty seconds. Pull the work straight from your existing tools.
            </p>
            <p>
              <span className="text-text-primary font-medium">The portfolio simulator</span> lifts that
              same engine one level up — across every project competing for one shared pool of
              developers — and adds the part nobody else has: it <em>prices the decision</em>. Force the
              full slate in, and it shows the cost in dollars, in defects, and in the senior people who
              quietly start looking — before the deadline is ever signed.
            </p>
            <p>
              It turns &quot;we need more people&quot; into a case a CFO can approve: add three developers
              and these two projects land by the quarter — here&apos;s what that&apos;s worth. And every
              number traces back to either your own inputs or a cited industry benchmark, not an AI
              guess — so the person you&apos;re trying to convince is looking at their own reality, not a
              black box.
            </p>
          </Chapter>

          <Chapter n="05" title="The mistakes">
            <p>
              We&apos;d rather tell this part honestly than pretend it went in a straight line.
            </p>
            <p>
              A single invisible character, pasted into one settings field, once locked every customer
              out of their account until we traced it. A billing bug quietly charged people for an
              upgrade that never switched on — the exact kind of silent failure that erodes trust
              fastest. One week, half of our automated tests failed at once, and we lost days chasing
              symptoms before realising the cause was always somewhere upstream. And we once drafted an
              email telling customers to &quot;export your data before it&apos;s archived&quot; — for a
              feature we hadn&apos;t built yet. A review caught it before it shipped.
            </p>
            <p>
              Each mistake left a rule behind. Type, don&apos;t paste. Assume the silent path is the
              dangerous one. Find the single root cause, never loop on symptoms. And never promise, in
              copy or in code, something that isn&apos;t actually there.
            </p>
          </Chapter>

          <Chapter n="06" title="The work">
            <p>
              SprintHelm is built with a discipline that&apos;s almost paranoid on purpose — because
              it&apos;s software people make real commitments and real money decisions on.
            </p>
            <p>
              Every meaningful change is reviewed from seven angles before it&apos;s allowed near
              production — engineering, design, product, quality, operations, and security. Every feature
              ships with its tests or it doesn&apos;t ship. Nothing reaches customers without passing
              through a staged, verified release first. We commissioned a full security review and drove
              the findings down to nothing that&apos;s a real hole. And we&apos;re deliberate about what
              we <em>don&apos;t</em> build: unfinished ideas get deferred with a reason written down, not
              shipped as a promise.
            </p>
          </Chapter>

          <Chapter n="07" title="What's next" last>
            <p>
              The next chapter is turning <em>&quot;here&apos;s the consequence&quot;</em> into
              <em> &quot;here&apos;s what to do about it&quot;</em> — recommending the hire, the cut, or
              the timeline that gets the plan back to safe. Longer term, the goal is simple: SprintHelm
              becomes the layer every team runs their plan through before they commit to it.
            </p>
            <p className="text-text-primary font-medium">
              Because the best time to find out a plan won&apos;t hold is before you&apos;ve promised it.
            </p>
            <p className="pt-2 text-text-secondary">— The SprintHelm founding team</p>
          </Chapter>
        </article>

        {/* CTA */}
        <section className="py-20 px-6 text-center border-t border-border-subtle">
          <div className="mx-auto max-w-xl">
            <h2 className="text-h2 font-bold text-text-primary mb-4">See your first sprint before you live it.</h2>
            <p className="text-text-secondary mb-8">Free to start. No credit card. Results in under 60 seconds.</p>
            <a
              href={APP_SIGNUP}
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

function Chapter({
  n,
  title,
  children,
  last,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section className={`py-14 ${last ? "" : "border-b border-border-subtle"}`}>
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-sm font-mono font-semibold text-accent">{n}</span>
        <h2 className="text-h2 font-bold text-text-primary">{title}</h2>
      </div>
      <div className="space-y-5 text-text-secondary leading-relaxed text-lg">{children}</div>
    </section>
  );
}
