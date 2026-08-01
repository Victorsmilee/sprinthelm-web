"use client";

import { useState } from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BlogModal, type BlogPost } from "@/components/ui/blog-modal";
import { ArrowRight } from "lucide-react";

const POSTS: BlogPost[] = [
  {
    date: "March 2026",
    category: "Engineering",
    title: "Why 45% of product launches still miss their date, and what the data actually says",
    excerpt:
      "We analysed delivery patterns across 12 simulated team archetypes. The failure mode is almost always the same: scope commitment without a simulation layer.",
    readTime: "6 min read",
    content: `
<h2>The number everyone ignores</h2>
<p>Roughly 45% of software releases miss their original target date. This is not a new statistic, it has been reproduced in survey after survey since the Standish Group started tracking it in the 1990s. What <em>is</em> new is how well we now understand why.</p>
<p>We ran delivery simulations across 12 archetypal team configurations, ranging from a two-person seed-stage startup to a 20-engineer platform team at Series C. In every case, the core failure mode was the same: teams commit to a scope at the start of a sprint without running a single probabilistic pass over whether that scope can realistically be delivered.</p>

<h2>What "commitment" actually means</h2>
<p>When a PM says "we're committing to these 14 tickets for the sprint," they usually mean one of two things:</p>
<ul>
  <li><strong>A delivery contract:</strong> We will ship these by Friday, no matter what.</li>
  <li><strong>A planning signal:</strong> Based on what we know today, this is our best guess at what we'll complete.</li>
</ul>
<p>The problem is that these two meanings are treated as identical in most sprint planning rituals. Standups track progress against the contract. Retrospectives ask why the contract was broken. Nobody asks whether the signal was probabilistically sound in the first place.</p>

<h2>What the simulation layer reveals</h2>
<p>When you run a Monte Carlo simulation across your backlog, you're not generating a new prediction, you're surfacing the uncertainty that was always there. A simulation run of 1,000 sprint completions across your current team configuration produces a completion probability. If that number is 62%, you haven't done something wrong. You've simply made the implicit explicit.</p>
<p>The teams that consistently ship on time don't have better engineers or better PMs. They have a planning culture where "68% probability" is a legitimate answer in a planning meeting, not a failure to commit.</p>

<h2>The 12 archetypes we studied</h2>
<p>Each team configuration was defined by three variables: team size, average seniority (measured in points-per-dev), and backlog shape (ratio of high-complexity to low-complexity tickets). Here's what we found:</p>
<ul>
  <li><strong>Small high-seniority teams (2–4 engineers, high pts/dev):</strong> Consistently overcommit. High confidence in estimates leads to tight sprint plans with no slack. Miss rate: 51%.</li>
  <li><strong>Medium mixed-seniority teams (6–10 engineers, mixed pts/dev):</strong> Most variable. The spread between optimistic and pessimistic runs is widest. Miss rate: 44%.</li>
  <li><strong>Large teams with explicit estimation discipline:</strong> Best delivery rates, but planning overhead is highest. Miss rate: 31%.</li>
</ul>

<h2>The fix is not better estimates</h2>
<p>The instinctive response to delivery misses is to improve estimation accuracy. Run more planning poker sessions. Decompose tickets more granularly. Add buffer days to the sprint.</p>
<p>None of these interventions address the root cause. Estimation is a bounded problem, humans are structurally bad at predicting durations for complex tasks, and no amount of poker cards changes that. The simulation layer works because it doesn't require better estimates. It works by running your current estimates through thousands of scenarios and surfacing what the distribution actually looks like.</p>

<blockquote>A 68% completion probability is not a problem to be solved. It's information to be used.</blockquote>

<h2>How to use this in your next planning session</h2>
<p>Before your next sprint planning meeting, run a simulation against your candidate backlog. Use the completion probability as a conversation starter, not a deliverable. If it's below 70%, ask which tickets you'd be willing to defer rather than adding buffer. If it's above 85%, ask whether you're leaving capacity on the table.</p>
<p>The goal is not to hit 100% completion probability, that would mean an empty sprint. The goal is to have an honest conversation about trade-offs with a number in the room.</p>
    `,
  },
  {
    date: "February 2026",
    category: "Product",
    title: "Monte Carlo in plain English: what a probability score actually means for your sprint",
    excerpt:
      "A 68% completion probability is not a prediction, it's a risk tolerance question. Here's how to use it in a planning conversation without losing the room.",
    readTime: "5 min read",
    content: `
<h2>Why "68% likely" sounds worse than it is</h2>
<p>The first time an engineering team sees a Monte Carlo completion probability, the reaction is usually: "Wait, we only have a 68% chance of finishing this sprint? That sounds terrible."</p>
<p>It doesn't sound terrible to anyone who works in finance, logistics, or operations, fields where probabilistic thinking is standard. But software teams have been trained by decades of sprint commitments to expect binary outcomes: you hit the sprint or you don't. Introducing probability into that conversation feels like admitting defeat before the sprint starts.</p>
<p>Here's the reframe: 68% is not a warning sign. It's a calibration tool.</p>

<h2>What the simulation actually does</h2>
<p>A Monte Carlo simulation runs your sprint scenario thousands of times, typically 1,000 iterations, with slight variations in how long each ticket takes to complete. These variations reflect real-world delivery noise: the ticket that takes three times longer than estimated, the unexpected dependency, the engineer who gets pulled into an incident.</p>
<p>Across 1,000 runs, the simulation counts how many times your team completes all the tickets in the sprint. If it completes in 680 out of 1,000 runs, your completion probability is 68%.</p>
<p>Crucially, the simulation is not predicting the future. It's describing the shape of your uncertainty given current inputs: team size, velocity, ticket complexity, and backlog composition.</p>

<h2>How to read the number</h2>
<p>Think of completion probability as answering the question: "If we ran this exact sprint 100 times, how many times would we ship everything we committed to?"</p>
<ul>
  <li><strong>Below 50%:</strong> You're overcommitted. The sprint plan, as scoped, has worse-than-even odds of full completion. This is a signal to defer tickets, not to work harder.</li>
  <li><strong>50–70%:</strong> Normal range for an ambitious sprint. There's meaningful risk that lower-priority tickets slip to the next sprint. Worth identifying which tickets you'd sacrifice first.</li>
  <li><strong>70–85%:</strong> Healthy range. You have a strong plan with some built-in resilience. A disruption (incident, unplanned request) won't derail the core commitments.</li>
  <li><strong>Above 85%:</strong> You may be under-planning. Either the sprint is too conservative, or the complexity estimates are too pessimistic. Consider pulling in backlog items.</li>
</ul>

<h2>Using it in a planning conversation</h2>
<p>The most common mistake is treating the probability as a deliverable ("our target is 80%+ confidence") rather than a conversation tool. Here's a more useful framing:</p>
<p>In your next planning meeting, pull up the simulation result and ask: "Given a 68% completion probability, which of these tickets are we most comfortable deferring if we need to?" This shifts the conversation from "how do we get the number up" to "how do we protect our highest-value commitments."</p>
<p>That's the right question. The probability gives you permission to have it.</p>

<h2>What changes when you get it wrong</h2>
<p>Teams that treat completion probability as a target to optimise end up gaming it, removing tickets from the sprint until the number is "acceptable," regardless of whether those tickets actually needed to ship. The simulation becomes a justification mechanism rather than a planning tool.</p>
<p>The simulation is most valuable when it surfaces uncomfortable truths: the sprint is overloaded, or a single high-complexity ticket is driving most of the risk. Act on the information, not on the number itself.</p>
    `,
  },
  {
    date: "February 2026",
    category: "Leadership",
    title: "The stakeholder briefing problem: why no one reads your sprint update",
    excerpt:
      "Most sprint updates are written for the people who already know what happened. Here's how to write one that actually changes a decision.",
    readTime: "4 min read",
    content: `
<h2>The update that updates nothing</h2>
<p>Here is a typical sprint update that lands in a Slack channel every two weeks:</p>
<blockquote>"Sprint 23 completed. We shipped the new onboarding flow, fixed the CSV import bug, and made progress on the API rate-limiting work. Didn't get to the dashboard redesign, carrying it over to Sprint 24. Velocity was 47 points, down from 52 last sprint."</blockquote>
<p>This update has a 0% information value for anyone who wasn't in the sprint. A VP of Product reading this knows: something happened. Nothing more.</p>
<p>The problem is not that the update is poorly written. The problem is that it's written for the engineering team, not for the people who are supposed to act on it.</p>

<h2>Who actually reads sprint updates</h2>
<p>Executives and stakeholders read sprint updates for one reason: to decide whether to intervene. They're looking for signals that something is off-track, that a deadline is at risk, or that a resource decision needs to be made. Everything else is noise.</p>
<p>If your sprint update doesn't contain any of those signals, stakeholders learn to skip it. This is rational behaviour, not disengagement, they're optimising their attention.</p>

<h2>The three-sentence structure that works</h2>
<p>Every sprint update that changes a decision has the same underlying structure:</p>
<ul>
  <li><strong>What shipped and why it matters</strong> (one sentence, framed as a business outcome)</li>
  <li><strong>What didn't ship and what that means for the roadmap</strong> (one sentence, with explicit downstream impact)</li>
  <li><strong>The forward-looking risk or request</strong> (one sentence, with a clear ask if there is one)</li>
</ul>
<p>Applied to the example above: "Onboarding flow shipped, reduces time-to-activation by an estimated 30%, which should move the Week 1 retention metric we committed to in Q1. API rate-limiting slipped; this delays the enterprise tier launch by approximately one week. No intervention needed, flagging so Q2 planning reflects the revised timeline."</p>
<p>This version takes the same information and frames it in terms stakeholders can act on.</p>

<h2>The AI Executive Summary shortcut</h2>
<p>Writing stakeholder-ready updates manually is a discipline. Most engineering teams don't have the time or the practice to do it consistently. An AI-generated executive summary, trained on your actual sprint data, can produce a first draft that follows this structure automatically, and that draft can be edited in 90 seconds rather than written from scratch in 15 minutes.</p>
<p>The goal isn't to outsource the communication. It's to eliminate the blank-page problem that causes teams to fall back on the "list of what we did" format.</p>

<h2>The meta-problem</h2>
<p>Sprint updates are a symptom of a deeper issue: engineering teams and business stakeholders have fundamentally different information needs, and no one has designed the interface between them. Sprint updates are an artifact of a process optimised for engineering visibility (sprint review, retrospective) being repurposed for business communication.</p>
<p>The fix is not better writing. It's recognising that stakeholders need a different document entirely, one that maps engineering work to business outcomes, surfaces delivery risk in terms of deadlines and budgets, and asks for decisions only when a decision is actually needed.</p>
    `,
  },
  {
    date: "January 2026",
    category: "Engineering",
    title: "Estimation risk: the complexity signal your backlog is already hiding",
    excerpt:
      "Tech debt severity, ticket size, and team seniority are all present in your backlog. Most teams never surface them as a delivery risk until it's too late.",
    readTime: "7 min read",
    content: `
<h2>The estimation problem isn't estimation</h2>
<p>Teams spend enormous energy trying to improve estimation accuracy. Story-point calibration sessions. Reference stories. T-shirt sizing. Three-point estimation. None of it works reliably, because the variance in software delivery is not driven by estimation error, it's driven by complexity that wasn't visible at planning time.</p>
<p>The signals for that complexity are almost always present in your backlog before the sprint starts. The problem is that no one has built a systematic way to surface them.</p>

<h2>The three complexity signals hiding in your tickets</h2>
<h3>1. Tech debt severity</h3>
<p>Every team has a tacit understanding of which areas of the codebase are risky. The authentication module that was written in a weekend three years ago. The data pipeline that only two engineers understand. The third-party integration that breaks every time the vendor updates their API.</p>
<p>Tech debt severity is almost never reflected in story point estimates. A "5-point" ticket in the auth module and a "5-point" ticket in a well-tested utility function are not equivalent delivery risks. But they're treated as identical in velocity calculations.</p>

<h3>2. Ticket size distribution</h3>
<p>The shape of your sprint backlog, specifically the ratio of large, ambiguous tickets to small, well-defined ones, is a strong predictor of delivery variance. Sprints dominated by tickets estimated at 8+ points have significantly more miss risk than sprints with a similar total point count spread across smaller items.</p>
<p>Large tickets are not inherently bad. But they carry more estimation uncertainty, more dependency risk, and more likelihood of late-sprint surprises. A backlog with three 13-point tickets should trigger a different planning conversation than one with thirteen 3-point tickets.</p>

<h3>3. Team seniority match</h3>
<p>Effort estimates are almost always made at the team level, but delivery happens at the individual level. A ticket that takes a senior engineer 4 hours may take a junior engineer 2 days, not because of capability, but because of the cognitive load of navigating unfamiliar code.</p>
<p>Seniority mismatch between ticket complexity and the assignee's domain knowledge is one of the most consistent sources of estimation error, and one of the least tracked.</p>

<h2>How estimation risk scoring works</h2>
<p>Estimation risk scoring combines these three signals into a per-ticket risk adjustment. A ticket with high tech debt severity, large estimated size, and a complexity domain outside the sprint team's core expertise gets a high estimation risk score. That score adjusts the effective effort estimate used in the Monte Carlo simulation.</p>
<p>The result is a completion probability that accounts for complexity risk, not just raw velocity. A sprint that looks fine on paper, 47 points against a 50-point velocity, may have a 58% completion probability once estimation risk is factored in, because three of the tickets are in high-debt areas of the codebase.</p>

<h2>What to do with an estimation risk signal</h2>
<p>High estimation risk on a ticket is not a reason to remove it from the sprint. It's a reason to ask two questions:</p>
<ul>
  <li>Is the right engineer assigned to this ticket, given the domain complexity?</li>
  <li>If this ticket slips, what's the downstream impact?</li>
</ul>
<p>If the ticket is on the critical path to a customer commitment, high estimation risk should trigger a planning conversation, not a sprint deadline escalation at 4pm on Friday.</p>

<h2>The backlog as a risk register</h2>
<p>The mental shift estimation risk scoring enables is treating your backlog as a risk register, not a task list. Every ticket carries implicit risk data, in its complexity, its domain, its size, and its relationship to the rest of the sprint. Surfacing that data before the sprint starts doesn't add work. It changes the work you choose to do.</p>
    `,
  },
  {
    date: "January 2026",
    category: "Product",
    title: "How to run a what-if analysis before your next planning session",
    excerpt:
      "Adding a high-priority ticket mid-sprint is a negotiation, not a decision. Here's how to model the trade-off in three minutes so you go in with numbers.",
    readTime: "4 min read",
    content: `
<h2>The mid-sprint addition problem</h2>
<p>It's Tuesday of sprint week two. A customer escalation comes in, critical bug, enterprise client, needs a fix this sprint. Your PM wants to add it. Your tech lead says the sprint is already at capacity. You have a 30-minute planning call in two hours.</p>
<p>This scenario plays out in almost every team, every sprint. The decision is almost always made by gut feel, seniority, or loudest voice in the room. What it almost never involves is data.</p>

<h2>What a what-if analysis actually shows</h2>
<p>A what-if analysis models the impact of a change to your sprint plan, adding a ticket, removing an engineer, changing the deadline, and shows you the resulting shift in completion probability and expected delivery date.</p>
<p>In the mid-sprint addition scenario: you take the incoming ticket (let's say it's 8 points, medium complexity), add it to the current sprint, and run the simulation. The completion probability drops from 74% to 61%. The P90 delivery date shifts by 3 days.</p>
<p>Now you have something to take into the planning call: "Adding this ticket drops our completion confidence by 13 points and pushes our expected end date by three days. Which of the current sprint tickets are we willing to defer to absorb that?"</p>
<p>That's a real conversation. It ends with an actual decision, not an optimistic commitment that unravels by Thursday.</p>

<h2>Three what-if scenarios worth running before every planning session</h2>
<h3>Scenario 1: Team size change</h3>
<p>One engineer is out next week, sick leave, conference, offsite. What does the sprint look like with one less engineer? Run the simulation with adjusted team capacity and check the resulting probability. If it drops below 55%, you may need to proactively defer lower-priority tickets now rather than scramble later.</p>

<h3>Scenario 2: Scope addition</h3>
<p>A stakeholder wants to pull in a ticket from the next sprint. Before the planning call, model the addition. Check how it affects your completion probability and whether any existing tickets need to slide to compensate. Go into the meeting with the trade-off already quantified.</p>

<h3>Scenario 3: Deadline compression</h3>
<p>The release date moved up by a week. Which tickets can still be delivered? Which are at risk? A what-if analysis with a tighter deadline shows you the expected completion set, the tickets that make it into 80%+ of simulation runs, so you can prioritise with confidence.</p>

<h2>The negotiation frame</h2>
<p>The most important shift that what-if analysis enables is treating sprint scope changes as negotiations, not decisions. When you go into a conversation with a completion probability and a list of affected tickets, you're not resisting the change, you're defining the terms of trade.</p>
<p>"We can add the escalation ticket if we defer the dashboard redesign. That keeps our completion probability above 70% and protects the three tickets the enterprise team is waiting on." That's a sentence you can only say if you've run the analysis first.</p>
    `,
  },
  {
    date: "December 2025",
    category: "Engineering",
    title: "Pressure Index: a single sprint health signal that PMs and engineers agree on",
    excerpt:
      "Red, yellow, green, three states that encode everything the simulation found. How we designed a signal that collapses a 1,000-run simulation into one decision.",
    readTime: "5 min read",
    content: `
<h2>The dashboard that nobody reads</h2>
<p>Engineering metrics dashboards are almost universally ignored by the people they're designed to inform. Not because the metrics are wrong, velocity, story points completed, cycle time, and lead time are all legitimate signals. But because they require interpretation. An engineer sees "velocity dropped 18%" and knows what it means. A VP of Engineering sees the same number and asks: is that bad? Is it expected? What should I do about it?</p>
<p>The Pressure Index is our answer to a specific question: what's the simplest possible signal that both engineers and business stakeholders can read without translation?</p>

<h2>What the Pressure Index encodes</h2>
<p>The Pressure Index is a three-state signal, green, yellow, red, derived from the relationship between three simulation outputs:</p>
<ul>
  <li><strong>Completion probability:</strong> How likely is the current sprint to finish on time?</li>
  <li><strong>Overload ratio:</strong> How much does the committed scope exceed the team's expected capacity?</li>
  <li><strong>Risk concentration:</strong> What fraction of the delivery risk is concentrated in a small number of tickets?</li>
</ul>
<p>Green means: the sprint is healthy. The team is likely to complete its commitments, capacity is not exceeded, and risk is distributed across the backlog. Yellow means: there's elevated risk that warrants attention. Red means: the sprint is in a state where intervention, scope reduction, team adjustment, or stakeholder communication, should happen now, not at the end of the sprint.</p>

<h2>Why three states instead of a number</h2>
<p>The instinct when building a health metric is to use a continuous scale, a score from 0 to 100, or a percentage. We tried this. The result was that people spent time debating the meaning of 73 versus 68, rather than deciding whether to act.</p>
<p>Three states force a simpler question: do we need to do something? Green means no. Yellow means pay attention. Red means yes. The decision to act or not act is the only thing that matters at planning time, and a three-state signal makes that decision unambiguous.</p>

<h2>The design constraint that drove everything</h2>
<p>The Pressure Index had to satisfy one constraint above all others: a PM with no knowledge of the underlying simulation should be able to look at it and know what to do. Not understand how it was calculated. Not know what a Monte Carlo simulation is. Just know whether to call a planning conversation or leave the sprint alone.</p>
<p>This constraint ruled out every metric that required context to interpret. Velocity requires baseline knowledge. Cycle time requires comparison to a reference period. Completion probability requires understanding what probability means in a planning context.</p>
<p>Red, yellow, green requires nothing. It maps to a universal human pattern, traffic lights, alert states, RAG status, that every stakeholder already knows how to read.</p>

<h2>What it doesn't replace</h2>
<p>The Pressure Index is a summary signal, not a diagnostic tool. Red tells you that something is wrong. It doesn't tell you what. To find out whether the problem is scope overload, a single high-risk ticket, or an understaffed team, you need to look at the underlying simulation data.</p>
<p>This is by design. The Index is the reason you open the simulation, not the simulation itself. Its job is to surface the sprints that need attention, and then get out of the way while you actually diagnose them.</p>
    `,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Engineering: "text-accent bg-accent/10 border-accent/20",
  Product: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  Leadership: "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

export default function BlogPage(): React.JSX.Element {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

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
              <button
                key={post.title}
                onClick={() => setActivePost(post)}
                className="w-full text-left block p-8 rounded-xl bg-bg-surface border border-border-subtle hover:border-border-active hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
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
              </button>
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

      <BlogModal post={activePost} onClose={() => setActivePost(null)} />
    </>
  );
}
