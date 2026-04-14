import type { DocEntry } from "@/components/ui/doc-modal";

export const DOCS_CONTENT: DocEntry[] = [
  // Getting started
  {
    section: "Getting started",
    label: "Quick start guide",
    content: `
<p>This guide walks you through importing your first backlog and running a sprint simulation in under five minutes.</p>

<h2>Step 1 — Create your account</h2>
<p>Sign up at <strong>app.sprinthelm.com/signup</strong>. No credit card required for the Free plan. You'll receive a confirmation email — click the link to verify your address, then complete the onboarding form with your team name and sprint cadence.</p>

<h2>Step 2 — Set up your team</h2>
<p>On the main planner, configure your team:</p>
<ul>
  <li><strong>Team name:</strong> Label for this squad (e.g. "Core Squad", "Platform Team")</li>
  <li><strong>Members:</strong> Number of engineers working this sprint (1–50)</li>
  <li><strong>Points per dev:</strong> Average story points a single engineer can deliver in a sprint. Start with your team's historical velocity divided by headcount. Typical range: 8–15.</li>
</ul>
<p>You can add multiple teams to model a multi-squad sprint.</p>

<h2>Step 3 — Import your backlog</h2>
<p>SprintHelm accepts three input methods:</p>
<ul>
  <li><strong>Manual entry:</strong> Type tickets directly into the inline editor</li>
  <li><strong>CSV upload:</strong> Upload a CSV exported from Jira, Linear, or any project management tool</li>
  <li><strong>PRD upload:</strong> Upload a Product Requirements Document and SprintHelm will extract tickets automatically</li>
</ul>
<p>For a quick first run, use the manual entry mode and add 5–10 tickets with titles, effort points, and impact scores.</p>

<h2>Step 4 — Score your tickets</h2>
<p>Each ticket requires six impact scores (1–5):</p>
<ul>
  <li><strong>Revenue impact:</strong> How much does this affect revenue or growth?</li>
  <li><strong>Incident risk:</strong> What's the risk of ignoring this?</li>
  <li><strong>Tech debt severity:</strong> How much technical debt does this carry or resolve?</li>
  <li><strong>Customer experience impact:</strong> How visibly does this affect users?</li>
  <li><strong>Strategic alignment:</strong> How well does this support the product strategy?</li>
  <li><strong>Deadline sensitivity:</strong> Is there a hard deadline associated with this ticket?</li>
</ul>
<p>SprintHelm uses these scores to rank your backlog by priority.</p>

<h2>Step 5 — Run the simulation</h2>
<p>Click <strong>Run Sprint Plan</strong>. SprintHelm will run 1,000 Monte Carlo simulation iterations and return:</p>
<ul>
  <li>Completion probability for the sprint</li>
  <li>Pressure Index (green / yellow / red)</li>
  <li>Expected completion date range</li>
  <li>Prioritised ticket order with risk-adjusted effort</li>
</ul>
<p>Review the results and adjust your team configuration or sprint scope to optimise the plan.</p>
    `,
  },
  {
    section: "Getting started",
    label: "Backlog import formats (CSV, JSON)",
    content: `
<p>SprintHelm accepts backlogs in CSV format for bulk import. This document describes the required and optional fields.</p>

<h2>CSV format</h2>
<p>Your CSV file must include a header row. Column names are case-insensitive. The file must be UTF-8 encoded.</p>

<h2>Required columns</h2>
<table>
  <thead>
    <tr><th>Column</th><th>Type</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>title</code></td><td>string</td><td>Ticket title or summary. Required, non-empty.</td></tr>
    <tr><td><code>effort_points</code></td><td>integer</td><td>Story point estimate. Minimum 1.</td></tr>
    <tr><td><code>revenue_impact</code></td><td>integer (1–5)</td><td>Revenue or growth impact score.</td></tr>
    <tr><td><code>incident_risk_if_ignored</code></td><td>integer (1–5)</td><td>Risk of ignoring this ticket.</td></tr>
    <tr><td><code>tech_debt_severity</code></td><td>integer (1–5)</td><td>Technical debt relevance.</td></tr>
    <tr><td><code>cx_impact</code></td><td>integer (1–5)</td><td>Customer experience impact.</td></tr>
    <tr><td><code>strategic_alignment</code></td><td>integer (1–5)</td><td>Alignment with product strategy.</td></tr>
    <tr><td><code>deadline_sensitivity</code></td><td>integer (1–5)</td><td>Urgency due to a deadline.</td></tr>
  </tbody>
</table>

<h2>Optional columns</h2>
<table>
  <thead>
    <tr><th>Column</th><th>Type</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>id</code></td><td>string</td><td>Your internal ticket ID (e.g. PROJ-123). Displayed in results.</td></tr>
    <tr><td><code>description</code></td><td>string</td><td>Longer description. Not used in scoring but preserved in output.</td></tr>
    <tr><td><code>labels</code></td><td>string</td><td>Comma-separated labels. Display only.</td></tr>
  </tbody>
</table>

<h2>Example CSV</h2>
<pre>id,title,effort_points,revenue_impact,incident_risk_if_ignored,tech_debt_severity,cx_impact,strategic_alignment,deadline_sensitivity
PROJ-101,Redesign checkout flow,8,4,2,2,5,4,3
PROJ-102,Fix auth session timeout bug,3,2,5,3,4,3,5
PROJ-103,Add Slack notification webhook,5,3,1,1,3,4,2</pre>

<h2>Import limits</h2>
<ul>
  <li>Free plan: maximum 15 tickets per sprint</li>
  <li>Pro plan: maximum 200 tickets per sprint</li>
  <li>File size limit: 5 MB</li>
</ul>

<h2>Jira export instructions</h2>
<p>From Jira, go to your board → Backlog view → select all tickets → <strong>Export → Export to CSV (current fields)</strong>. You'll need to map Jira fields to SprintHelm fields. The Story Points field maps to <code>effort_points</code>. All impact score fields must be added manually — Jira does not have direct equivalents.</p>
    `,
  },
  {
    section: "Getting started",
    label: "Running a Monte Carlo simulation",
    content: `
<p>SprintHelm's simulation engine runs 1,000 Monte Carlo iterations across your sprint configuration to produce probabilistic delivery forecasts.</p>

<h2>What Monte Carlo simulation does</h2>
<p>A Monte Carlo simulation models uncertainty by running the same scenario thousands of times with slight variations. In sprint planning, the variation is in how long each ticket actually takes compared to its estimate. Each iteration draws from a probability distribution around your story point estimates, combining the results across all tickets to produce a sprint duration.</p>
<p>After 1,000 iterations, SprintHelm counts how many completed within your sprint length and divides by 1,000 — that's your completion probability.</p>

<h2>Inputs to the simulation</h2>
<ul>
  <li><strong>Team capacity:</strong> Number of engineers × points per dev × sprint length in weeks</li>
  <li><strong>Ticket estimates:</strong> Story point values with uncertainty factors applied based on tech debt severity and ticket size</li>
  <li><strong>Sprint length:</strong> 1 or 2 weeks (configurable)</li>
  <li><strong>Deadline:</strong> Optional target date for completion forecasting</li>
</ul>

<h2>Reading the output</h2>
<ul>
  <li><strong>Completion probability:</strong> The percentage of simulation runs where all sprint tickets were completed. Below 50% = overcommitted. 70–85% = healthy range.</li>
  <li><strong>P50 date:</strong> The date by which 50% of simulations completed. Your median expected delivery date.</li>
  <li><strong>P90 date:</strong> The date by which 90% of simulations completed. Use this for external commitments where you need high confidence.</li>
  <li><strong>Expected tickets completed:</strong> On average, how many tickets the team ships per simulation run.</li>
</ul>

<h2>Adjusting your plan</h2>
<p>If your completion probability is below 70%, consider:</p>
<ul>
  <li>Deferring the lowest-priority tickets until the probability improves</li>
  <li>Adding a team member (if capacity is genuinely available)</li>
  <li>Reducing effort estimates if you believe they're conservative</li>
  <li>Increasing the sprint length from 1 to 2 weeks</li>
</ul>
<p>The simulation re-runs automatically whenever you change any input — team configuration, ticket list, or sprint length.</p>
    `,
  },
  {
    section: "Getting started",
    label: "Reading the Pressure Index",
    content: `
<p>The Pressure Index is a single sprint health signal derived from your simulation results. It has three states: green, yellow, and red.</p>

<h2>What each state means</h2>
<h3>Green — Healthy sprint</h3>
<p>Your completion probability is above 70%, capacity is not exceeded, and risk is distributed across the backlog. The sprint plan is realistic. No immediate action required.</p>

<h3>Yellow — Elevated risk</h3>
<p>One or more of the following is true:</p>
<ul>
  <li>Completion probability is between 50–70%</li>
  <li>A small number of tickets carry a disproportionate share of the delivery risk</li>
  <li>Team capacity is being used at 90–100% with no slack</li>
</ul>
<p>Yellow means pay attention. Review the high-risk tickets and decide whether to defer, reassign, or accept the risk.</p>

<h3>Red — Intervention needed</h3>
<p>Completion probability is below 50%, or capacity is significantly exceeded. The sprint, as planned, has a worse-than-even chance of full completion. Red is not a failure signal — it's an information signal. Act on it before the sprint starts, not after it ends.</p>

<h2>What drives the Pressure Index</h2>
<p>Three simulation metrics combine to produce the Index:</p>
<ul>
  <li><strong>Completion probability:</strong> Primary driver. Below 50% → red.</li>
  <li><strong>Overload ratio:</strong> Committed points ÷ expected capacity. Above 1.0 at completion probability below 65% → yellow or red.</li>
  <li><strong>Risk concentration:</strong> If the top 2–3 tickets account for more than 60% of the sprint's total delivery risk, the Index moves toward yellow regardless of overall probability.</li>
</ul>

<h2>Using the Index in team communication</h2>
<p>The Pressure Index is designed to be legible without explanation. You can share a screenshot of a red or yellow Index in Slack, a planning doc, or a stakeholder update without needing to explain what a Monte Carlo simulation is. The signal is self-explanatory: something needs attention.</p>

<h2>Relationship to the AI Executive Summary</h2>
<p>When you generate an AI Executive Summary, the Pressure Index is included in the brief. The summary explains what's driving the Index state and what the recommended response is — making it easy to communicate sprint health to non-technical stakeholders.</p>
    `,
  },
  {
    section: "Getting started",
    label: "Understanding completion probability",
    content: `
<p>Completion probability is the core output of the Monte Carlo simulation. Here's how to interpret it and what to do with it.</p>

<h2>Definition</h2>
<p>Completion probability is the percentage of simulation runs in which all tickets in the sprint were completed within the sprint length. A probability of 72% means that in 720 out of 1,000 simulated sprints, the team finished everything it committed to.</p>

<h2>What it is not</h2>
<p>Completion probability is <em>not</em> a prediction of whether your team will succeed. It's a description of the uncertainty in your current plan, given the inputs provided. Teams with accurate velocity data and well-estimated backlogs will see probabilities that closely match their delivery rates. Teams with noisy data or novel work will see wider uncertainty bands.</p>

<h2>Target ranges by context</h2>
<table>
  <thead>
    <tr><th>Context</th><th>Target range</th><th>Rationale</th></tr>
  </thead>
  <tbody>
    <tr><td>Internal sprint (no external commitment)</td><td>60–80%</td><td>Ambitious but achievable. Some slip is acceptable.</td></tr>
    <tr><td>Sprint with stakeholder commitment</td><td>75–85%</td><td>Strong confidence with some resilience to disruptions.</td></tr>
    <tr><td>Sprint tied to a release or launch</td><td>85%+</td><td>Use the P90 date for all external communications.</td></tr>
    <tr><td>Exploratory / R&D sprint</td><td>50–65%</td><td>High uncertainty is expected. Focus on scoping risk.</td></tr>
  </tbody>
</table>

<h2>What changes the probability</h2>
<ul>
  <li><strong>Removing tickets:</strong> The most direct lever. Deferring a high-effort ticket can move probability 10–15 points.</li>
  <li><strong>Adding capacity:</strong> Adding an engineer increases total points capacity, which raises probability — but only if the team's velocity data supports the addition.</li>
  <li><strong>Reducing effort estimates:</strong> Use cautiously. If your estimates are accurate, reducing them introduces optimism bias without improving delivery.</li>
  <li><strong>Extending the sprint:</strong> Moving from a 1-week to a 2-week sprint significantly increases completion probability for the same backlog.</li>
</ul>
    `,
  },
  // Features
  {
    section: "Features",
    label: "Priority scoring — how tickets are ranked",
    content: `
<p>SprintHelm ranks backlog tickets using a six-factor weighted scoring model. Understanding how scoring works helps you calibrate your impact scores for more accurate prioritisation.</p>

<h2>The six scoring factors</h2>
<table>
  <thead>
    <tr><th>Factor</th><th>Default weight</th><th>What it measures</th></tr>
  </thead>
  <tbody>
    <tr><td>Revenue impact</td><td>25%</td><td>Direct effect on revenue generation or retention</td></tr>
    <tr><td>Incident risk if ignored</td><td>20%</td><td>Probability and severity of a production incident</td></tr>
    <tr><td>Tech debt severity</td><td>15%</td><td>Technical debt accumulated or resolved</td></tr>
    <tr><td>Customer experience impact</td><td>20%</td><td>Visibility and significance of the change to users</td></tr>
    <tr><td>Strategic alignment</td><td>10%</td><td>Fit with current product and business strategy</td></tr>
    <tr><td>Deadline sensitivity</td><td>10%</td><td>Urgency due to regulatory, contractual, or launch deadlines</td></tr>
  </tbody>
</table>

<h2>How scores are calculated</h2>
<p>Each impact score (1–5) is multiplied by its weight and summed to produce a weighted score. The priority rank orders tickets from highest to lowest weighted score. Effort points are factored in separately — SprintHelm surfaces both "highest priority" and "highest priority per effort point" (value density) views.</p>

<h2>Customising weights</h2>
<p>Enterprise plan users can adjust scoring weights to match their team's priorities. A team focused primarily on reliability will increase the weight of Incident Risk. A growth-stage startup may weight Revenue Impact and Strategic Alignment more heavily. Weight changes apply to the entire backlog and are saved per team workspace.</p>

<h2>Score interpretation guide</h2>
<ul>
  <li><strong>1 — Negligible:</strong> Minimal or no measurable impact. Could be deferred indefinitely.</li>
  <li><strong>2 — Low:</strong> Small impact. Nice to have, unlikely to cause issues if deferred.</li>
  <li><strong>3 — Medium:</strong> Moderate impact. Should be done this quarter.</li>
  <li><strong>4 — High:</strong> Significant impact. Should be in the current sprint.</li>
  <li><strong>5 — Critical:</strong> Severe impact if ignored. Must be addressed immediately.</li>
</ul>

<h2>Common scoring mistakes</h2>
<p><strong>Score inflation:</strong> Teams that rate everything 4–5 lose differentiation. If most tickets are rated 4 or 5 on revenue impact, the scoring model can't distinguish between them. Reserve 5 for genuinely critical items.</p>
<p><strong>Inconsistent baselines:</strong> Make sure the team aligns on what a "3" means for each factor before scoring. A calibration session with 5–10 reference tickets goes a long way.</p>
    `,
  },
  {
    section: "Features",
    label: "Estimation risk and complexity scoring",
    content: `
<p>Estimation risk scoring adjusts ticket effort estimates to account for factors that typically cause estimates to be wrong: tech debt, ticket size, and domain complexity.</p>

<h2>Why estimates are systematically wrong</h2>
<p>Story point estimates are usually made under optimistic conditions: the engineer who knows the codebase best estimates how long it would take them, on a good day, with no interruptions. Actual delivery involves engineers of varying seniority, unexpected dependencies, and codebases that are messier in practice than in memory.</p>
<p>Estimation risk scoring doesn't try to improve estimates. It adjusts them to reflect real-world delivery conditions.</p>

<h2>Risk adjustment factors</h2>
<h3>Tech debt severity</h3>
<p>A ticket scored 4–5 on tech debt severity touches areas of the codebase known to be fragile, poorly documented, or high-variance. SprintHelm applies a multiplier of 1.2–1.5x to the effort estimate for these tickets in the simulation.</p>

<h3>Ticket size</h3>
<p>Large tickets (8+ points in a standard velocity context) carry higher estimation uncertainty. The larger the ticket, the wider the distribution of possible completion times. SprintHelm applies an uncertainty expansion to the simulation distribution for large tickets.</p>

<h3>Seniority mismatch</h3>
<p>When your team's average seniority (pts/dev) is below a threshold for the ticket's complexity, the simulation models higher variance. This captures the real-world pattern where junior engineers working in unfamiliar areas take 2–3x longer than estimates based on senior engineer performance.</p>

<h2>Risk-adjusted effort in the results</h2>
<p>In the results panel, SprintHelm shows both the original effort estimate and the risk-adjusted effort. A ticket with an original estimate of 5 points and high tech debt severity may have a risk-adjusted effort of 6–7 points. This adjusted value is what the simulation uses — not the original estimate.</p>

<h2>Interpreting high-risk tickets</h2>
<p>If a ticket has a high estimation risk score, there are three reasonable responses:</p>
<ul>
  <li><strong>Accept the risk:</strong> The ticket is high priority and the risk is worth taking.</li>
  <li><strong>Mitigate the risk:</strong> Assign the ticket to the most experienced engineer in that domain, or schedule a spike to reduce uncertainty before committing.</li>
  <li><strong>Defer:</strong> If the ticket isn't high priority and carries high estimation risk, it's a strong candidate for the next sprint.</li>
</ul>
    `,
  },
  {
    section: "Features",
    label: "AI Executive Summary",
    content: `
<p>The AI Executive Summary generates a stakeholder-ready briefing from your sprint simulation results. It's written by Claude (Anthropic's AI) and calibrated for a C-level audience.</p>

<h2>What the summary includes</h2>
<ul>
  <li><strong>Sprint overview:</strong> Team configuration, sprint length, and scope summary</li>
  <li><strong>Delivery forecast:</strong> Completion probability, P50 and P90 dates, Pressure Index state</li>
  <li><strong>Top risks:</strong> The tickets or conditions driving the most simulation variance</li>
  <li><strong>Recommended actions:</strong> Concrete steps to improve the plan or manage stakeholder expectations</li>
  <li><strong>What to communicate:</strong> A draft sentence or two for a stakeholder update, formatted for non-technical readers</li>
</ul>

<h2>Plan availability</h2>
<ul>
  <li><strong>Free:</strong> Not available</li>
  <li><strong>Pro:</strong> 10 summaries per month</li>
  <li><strong>Team:</strong> 50 summaries per month (shared across team)</li>
  <li><strong>Enterprise:</strong> Unlimited, with custom prompting options</li>
</ul>

<h2>How to generate a summary</h2>
<p>After running a sprint simulation, click <strong>Generate AI Summary</strong> in the Results panel. The summary is generated in approximately 10–20 seconds. It can be copied to clipboard, shared via a link, or included in a PDF report.</p>

<h2>Editing the summary</h2>
<p>The generated summary is a starting point, not a final document. You can edit it directly in the output panel before sharing. Common edits include: adding context about specific tickets, adjusting the tone for your organisation, and replacing generic references with team-specific names.</p>

<h2>Privacy and data handling</h2>
<p>Ticket titles and impact scores are sent to Anthropic's API to generate the summary. Ticket descriptions and any custom labels are not included. Summaries are not stored by SprintHelm — they exist only in your current session unless you explicitly save or export them. See the Privacy Policy for full details.</p>
    `,
  },
  {
    section: "Features",
    label: "PRD upload and ticket extraction",
    content: `
<p>SprintHelm can extract sprint tickets directly from a Product Requirements Document (PRD). This reduces the time from "we have a spec" to "we have a scored, prioritised backlog" from hours to minutes.</p>

<h2>Supported file types</h2>
<ul>
  <li>PDF (.pdf)</li>
  <li>Plain text (.txt)</li>
  <li>Markdown (.md)</li>
  <li>Pasted text (direct input)</li>
</ul>

<h2>How extraction works</h2>
<p>SprintHelm passes the PRD content to Claude, which identifies discrete deliverable units of work — features, bug fixes, improvements — and converts them into structured tickets with:</p>
<ul>
  <li>A concise title</li>
  <li>An effort estimate (story points) based on described complexity</li>
  <li>Initial impact scores based on the language and context in the PRD</li>
</ul>
<p>Extraction typically produces 5–20 tickets per PRD, depending on scope. You can edit any extracted ticket before running the simulation.</p>

<h2>Quality of extracted tickets</h2>
<p>Extraction quality depends on PRD quality. A well-structured PRD with clear user stories and acceptance criteria produces accurate, actionable tickets. A loosely written strategy document produces broader, less well-scoped items that need more editing.</p>
<p>All impact scores assigned by extraction are initial estimates — review them before treating them as final for planning purposes.</p>

<h2>Generating a PRD from a description</h2>
<p>If you don't have a PRD, SprintHelm can generate one from a plain-language description of the feature or initiative. Enter a 2–5 sentence description of what you're building, click <strong>Generate PRD</strong>, and SprintHelm will produce a structured requirements document that you can then use for ticket extraction.</p>

<h2>Plan availability</h2>
<p>PRD upload and extraction is available on Pro, Team, and Enterprise plans. PRD generation from description is available on Team and Enterprise plans. Free plan users can use the inline manual entry path to add tickets directly.</p>
    `,
  },
  {
    section: "Features",
    label: "What-if team composition scenarios",
    content: `
<p>The What-If panel lets you model changes to your team composition or sprint scope and see the immediate impact on your delivery forecast.</p>

<h2>What you can model</h2>
<ul>
  <li><strong>Engineer count change:</strong> Add or remove engineers from the sprint to see capacity impact</li>
  <li><strong>Seniority change:</strong> Adjust the average points-per-dev to model a more or less experienced team</li>
  <li><strong>Sprint length change:</strong> Switch between 1-week and 2-week sprints</li>
  <li><strong>Scope change:</strong> Add or remove tickets and see the probability impact in real time</li>
</ul>

<h2>Using What-If for negotiation</h2>
<p>The most valuable use of What-If scenarios is preparing for planning conversations. Before a sprint planning meeting, model two or three scenarios:</p>
<ul>
  <li>Current plan: what the team can realistically deliver</li>
  <li>Stakeholder request: what the plan looks like with the additions requested</li>
  <li>Compromise: what you'd need to defer to absorb the additions while maintaining a healthy probability</li>
</ul>
<p>Going into the meeting with these three scenarios ready turns a negotiation about scope into a conversation about trade-offs — which is a much more productive frame for both engineering and product teams.</p>

<h2>Reading the comparison view</h2>
<p>The What-If panel shows a side-by-side comparison of your base scenario and the modified scenario, highlighting:</p>
<ul>
  <li>Probability delta (e.g. +8% or −13%)</li>
  <li>Expected completion date range change</li>
  <li>Pressure Index state change</li>
  <li>Tickets at risk in the modified scenario</li>
</ul>

<h2>Plan availability</h2>
<p>What-If scenarios are available on Pro, Team, and Enterprise plans. Free plan users can modify their team configuration and backlog, but the dedicated What-If comparison view is a paid feature.</p>
    `,
  },
  {
    section: "Features",
    label: "Project Completion Forecaster",
    content: `
<p>The Project Completion Forecaster models delivery timelines at the epic or project level — beyond a single sprint — giving you probabilistic completion dates for larger bodies of work.</p>

<h2>When to use the Forecaster</h2>
<p>Sprint-level simulation answers "can we finish this sprint?" The Project Completion Forecaster answers "when will this project be done?" — accounting for:</p>
<ul>
  <li>Multiple sprints required to complete the full scope</li>
  <li>Team velocity variability over time</li>
  <li>Scope growth (typically 15–25% for projects over 3 months)</li>
</ul>

<h2>Inputs</h2>
<ul>
  <li>Total estimated effort (story points) for the project or epic</li>
  <li>Team configuration (same as sprint planner)</li>
  <li>Sprint cadence (1 or 2 weeks)</li>
  <li>Velocity variance: your team's historical velocity standard deviation</li>
  <li>Scope growth factor: expected percentage increase in scope over the project</li>
</ul>

<h2>Output</h2>
<p>The Forecaster produces a probability distribution of completion dates, expressed as:</p>
<ul>
  <li>P50 date: 50% confidence completion date</li>
  <li>P70 date: 70% confidence completion date</li>
  <li>P90 date: 90% confidence completion date (recommended for external commitments)</li>
  <li>Expected number of sprints</li>
</ul>

<h2>Using the P90 date for commitments</h2>
<p>For any commitment made to stakeholders, customers, or leadership, use the P90 date — the date by which 90% of simulations completed. This builds in buffer for the unexpected without requiring you to manually add contingency. "We expect to ship by [P90 date]" is a defensible commitment backed by 1,000 simulation runs, not a gut-feel estimate.</p>
    `,
  },
  // Integrations
  {
    section: "Integrations",
    label: "Jira integration (Pro+)",
    content: `
<p>The Jira integration allows you to import your backlog directly from a Jira project and push priority scores back as custom fields. Available on Pro, Team, and Enterprise plans.</p>

<h2>Setup</h2>
<ol>
  <li>Go to <strong>Settings → Integrations → Jira</strong></li>
  <li>Click <strong>Connect to Jira</strong> and authorise via Atlassian OAuth</li>
  <li>Select the Jira project(s) you want to connect</li>
  <li>Map Jira fields to SprintHelm fields (story points, ticket type, labels)</li>
</ol>

<h2>Importing from Jira</h2>
<p>Once connected, select <strong>Import from Jira</strong> in the backlog entry panel. You can filter by sprint, epic, label, or assignee before importing. SprintHelm will pull the current sprint or a custom filter you define.</p>
<p>Note: impact scores (revenue impact, incident risk, etc.) are not available in Jira by default. You can either score imported tickets manually in SprintHelm, or create custom Jira fields and map them during setup.</p>

<h2>Pushing priority scores back to Jira</h2>
<p>After running a simulation, you can push SprintHelm's priority scores back to your Jira issues as a custom field. This allows your team to see SprintHelm's ranking directly in the Jira board view without switching tools.</p>

<h2>Sync frequency</h2>
<p>The Jira integration is pull-on-demand. SprintHelm does not continuously sync with Jira — you initiate a sync when you open the planner. Changes made in Jira after the initial import are not reflected in SprintHelm until you re-import.</p>
    `,
  },
  {
    section: "Integrations",
    label: "Slack notifications (Team+)",
    content: `
<p>SprintHelm can send Pressure Index alerts and sprint summary notifications to a Slack channel. Available on Team and Enterprise plans.</p>

<h2>Setup</h2>
<ol>
  <li>Go to <strong>Settings → Integrations → Slack</strong></li>
  <li>Click <strong>Add to Slack</strong> and select the workspace and channel</li>
  <li>Choose which notifications to enable</li>
</ol>

<h2>Available notifications</h2>
<ul>
  <li><strong>Pressure Index change:</strong> Notifies the channel when a sprint's Pressure Index transitions from green → yellow or yellow → red</li>
  <li><strong>Sprint simulation complete:</strong> Posts a summary when a new simulation is run, including completion probability and the top 3 at-risk tickets</li>
  <li><strong>Weekly digest:</strong> A Monday morning summary of all active sprints and their current Pressure Index states</li>
</ul>

<h2>Notification format</h2>
<p>Notifications include a link back to the relevant sprint in SprintHelm. Team members without a SprintHelm account can view shared simulation results via a read-only link.</p>

<h2>Channel permissions</h2>
<p>SprintHelm requires <code>chat:write</code> and <code>channels:read</code> Slack permissions. It does not read message history or have access to any other channels than the one you specify during setup.</p>
    `,
  },
  {
    section: "Integrations",
    label: "CSV export format reference",
    content: `
<p>After running a simulation, you can export the results as a CSV file. This document describes the export format.</p>

<h2>What's included in the export</h2>
<ul>
  <li>All input tickets with their original and risk-adjusted effort estimates</li>
  <li>Priority scores and priority rank</li>
  <li>Simulation results per ticket (completion probability contribution)</li>
  <li>Sprint-level summary row (completion probability, P50 and P90 dates)</li>
</ul>

<h2>Export columns</h2>
<table>
  <thead>
    <tr><th>Column</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td>id</td><td>Your internal ticket ID (if provided)</td></tr>
    <tr><td>title</td><td>Ticket title</td></tr>
    <tr><td>priority_rank</td><td>SprintHelm priority rank (1 = highest)</td></tr>
    <tr><td>weighted_score</td><td>Calculated priority score (0–100)</td></tr>
    <tr><td>effort_points</td><td>Original story point estimate</td></tr>
    <tr><td>adjusted_effort</td><td>Risk-adjusted effort used in simulation</td></tr>
    <tr><td>estimation_risk</td><td>Estimation risk level (low / medium / high)</td></tr>
    <tr><td>in_sprint</td><td>Whether the ticket was included in the sprint scope</td></tr>
  </tbody>
</table>

<h2>Accessing the export</h2>
<p>After running a simulation, click <strong>Export → CSV</strong> in the results panel. The file downloads immediately — no server-side processing required. The export is available on all plans.</p>
    `,
  },
  {
    section: "Integrations",
    label: "Shareable simulation links",
    content: `
<p>Every simulation run in SprintHelm can be shared as a read-only link. Recipients don't need a SprintHelm account to view the results.</p>

<h2>Generating a share link</h2>
<p>After running a simulation, click <strong>Share</strong> in the results panel. SprintHelm generates a unique URL that captures the current state of your simulation — team configuration, backlog, and all results. The link is valid for 30 days.</p>

<h2>What recipients can see</h2>
<ul>
  <li>Completion probability and Pressure Index</li>
  <li>Expected delivery dates (P50 and P90)</li>
  <li>Prioritised ticket list with effort estimates</li>
  <li>Simulation run metadata (date, sprint length)</li>
</ul>
<p>Recipients cannot see: original impact scores, scoring weight configuration, account information, or any other sprints in your workspace.</p>

<h2>Use cases</h2>
<ul>
  <li>Sharing sprint forecasts with stakeholders who don't have SprintHelm accounts</li>
  <li>Including in sprint planning documents or Confluence pages</li>
  <li>Sending to a manager or executive for async review before a planning meeting</li>
</ul>

<h2>Link expiry and access control</h2>
<p>Share links expire after 30 days. There is no way to password-protect a share link — treat it as a semi-public URL. If you share a link and later want to revoke access, you can invalidate it from <strong>Settings → Shared Links</strong>.</p>
    `,
  },
  // API reference
  {
    section: "API reference",
    label: "Authentication",
    content: `
<p>The SprintHelm API uses API key authentication. API access is available on Enterprise plans only.</p>

<h2>Obtaining an API key</h2>
<p>Go to <strong>Settings → API → Generate API Key</strong>. Each key is scoped to a single workspace. You can generate up to 5 keys per workspace and revoke them individually.</p>

<h2>Using your API key</h2>
<p>Include your API key in the <code>Authorization</code> header of every request:</p>
<pre>Authorization: Bearer sh_live_xxxxxxxxxxxxxxxxxxxx</pre>
<p>API keys beginning with <code>sh_live_</code> are production keys. Use <code>sh_test_</code> keys for development and testing — they run simulations against synthetic data and do not count against your usage quota.</p>

<h2>Rate limits</h2>
<table>
  <thead>
    <tr><th>Endpoint</th><th>Rate limit</th></tr>
  </thead>
  <tbody>
    <tr><td>POST /api/v1/sprints/plan</td><td>60 requests / minute</td></tr>
    <tr><td>POST /api/v1/sprints/whatif</td><td>60 requests / minute</td></tr>
    <tr><td>GET /api/v1/sprints/history</td><td>120 requests / minute</td></tr>
    <tr><td>Webhook delivery</td><td>No limit (outbound)</td></tr>
  </tbody>
</table>
<p>Rate limit headers are included in every response: <code>X-RateLimit-Limit</code>, <code>X-RateLimit-Remaining</code>, <code>X-RateLimit-Reset</code>.</p>

<h2>Error responses</h2>
<p>All errors return a JSON body with an <code>error</code> field and an HTTP status code:</p>
<pre>{ "error": "Invalid API key", "code": "AUTH_INVALID_KEY" }</pre>
<p>Common error codes: <code>AUTH_INVALID_KEY</code>, <code>AUTH_EXPIRED_KEY</code>, <code>RATE_LIMIT_EXCEEDED</code>, <code>VALIDATION_ERROR</code>, <code>PLAN_NOT_FOUND</code>.</p>
    `,
  },
  {
    section: "API reference",
    label: "POST /api/v1/sprints/plan",
    content: `
<p>Run a Monte Carlo sprint simulation and return the results.</p>

<h2>Request</h2>
<pre>POST https://api.sprinthelm.com/v1/sprints/plan
Authorization: Bearer sh_live_xxxx
Content-Type: application/json</pre>

<h2>Request body</h2>
<pre>{
  "team": {
    "name": "Core Squad",
    "members": 6,
    "pts_per_dev": 10
  },
  "sprint_length_weeks": 2,
  "tickets": [
    {
      "id": "PROJ-101",
      "title": "Redesign checkout flow",
      "effort_points": 8,
      "revenue_impact": 4,
      "incident_risk_if_ignored": 2,
      "tech_debt_severity": 2,
      "cx_impact": 5,
      "strategic_alignment": 4,
      "deadline_sensitivity": 3
    }
  ]
}</pre>

<h2>Response</h2>
<pre>{
  "simulation_id": "sim_abc123",
  "completion_probability": 0.72,
  "pressure_index": "yellow",
  "p50_date": "2026-04-28",
  "p90_date": "2026-05-03",
  "expected_tickets_completed": 7.4,
  "tickets": [
    {
      "id": "PROJ-101",
      "priority_rank": 1,
      "weighted_score": 84.2,
      "adjusted_effort": 9.6,
      "estimation_risk": "medium"
    }
  ]
}</pre>

<h2>Response fields</h2>
<table>
  <thead>
    <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td>simulation_id</td><td>string</td><td>Unique ID for this simulation run</td></tr>
    <tr><td>completion_probability</td><td>float (0–1)</td><td>Fraction of simulation runs completing all tickets</td></tr>
    <tr><td>pressure_index</td><td>"green" | "yellow" | "red"</td><td>Sprint health signal</td></tr>
    <tr><td>p50_date</td><td>ISO date</td><td>50th percentile completion date</td></tr>
    <tr><td>p90_date</td><td>ISO date</td><td>90th percentile completion date</td></tr>
  </tbody>
</table>
    `,
  },
  {
    section: "API reference",
    label: "POST /api/v1/sprints/whatif",
    content: `
<p>Model a modified sprint scenario and compare it to a base scenario. Returns the delta between two simulation runs.</p>

<h2>Request</h2>
<pre>POST https://api.sprinthelm.com/v1/sprints/whatif
Authorization: Bearer sh_live_xxxx
Content-Type: application/json</pre>

<h2>Request body</h2>
<pre>{
  "base_simulation_id": "sim_abc123",
  "modifications": {
    "team": {
      "members": 5
    },
    "add_tickets": [...],
    "remove_ticket_ids": ["PROJ-103"]
  }
}</pre>
<p>You can modify team composition, add tickets, or remove tickets from the base simulation. Any combination of modifications is supported.</p>

<h2>Response</h2>
<pre>{
  "base": {
    "completion_probability": 0.72,
    "pressure_index": "yellow",
    "p50_date": "2026-04-28"
  },
  "modified": {
    "completion_probability": 0.61,
    "pressure_index": "red",
    "p50_date": "2026-05-02"
  },
  "delta": {
    "completion_probability": -0.11,
    "p50_days": 4
  }
}</pre>
    `,
  },
  {
    section: "API reference",
    label: "GET /api/v1/sprints/history",
    content: `
<p>Retrieve the history of sprint simulations run in a workspace.</p>

<h2>Request</h2>
<pre>GET https://api.sprinthelm.com/v1/sprints/history?limit=20&offset=0
Authorization: Bearer sh_live_xxxx</pre>

<h2>Query parameters</h2>
<table>
  <thead>
    <tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td>limit</td><td>integer</td><td>20</td><td>Number of results to return (max 100)</td></tr>
    <tr><td>offset</td><td>integer</td><td>0</td><td>Pagination offset</td></tr>
    <tr><td>from_date</td><td>ISO date</td><td>—</td><td>Filter simulations from this date onwards</td></tr>
    <tr><td>to_date</td><td>ISO date</td><td>—</td><td>Filter simulations up to this date</td></tr>
  </tbody>
</table>

<h2>Response</h2>
<pre>{
  "total": 47,
  "simulations": [
    {
      "simulation_id": "sim_abc123",
      "created_at": "2026-04-14T10:30:00Z",
      "team_name": "Core Squad",
      "completion_probability": 0.72,
      "pressure_index": "yellow",
      "ticket_count": 8
    }
  ]
}</pre>
    `,
  },
  {
    section: "API reference",
    label: "Webhook events",
    content: `
<p>SprintHelm can send webhook notifications to your endpoint when sprint events occur. Webhooks are available on Enterprise plans.</p>

<h2>Setup</h2>
<p>Go to <strong>Settings → API → Webhooks → Add endpoint</strong>. Provide a URL and select the events to subscribe to. SprintHelm will send a verification request to the endpoint — respond with the challenge token to confirm ownership.</p>

<h2>Available events</h2>
<table>
  <thead>
    <tr><th>Event</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td>simulation.completed</td><td>A new simulation run has completed</td></tr>
    <tr><td>pressure_index.changed</td><td>A sprint's Pressure Index state has changed</td></tr>
    <tr><td>sprint.exported</td><td>A simulation result has been exported</td></tr>
    <tr><td>team.updated</td><td>A team configuration has been saved</td></tr>
  </tbody>
</table>

<h2>Webhook payload</h2>
<pre>{
  "event": "simulation.completed",
  "workspace_id": "ws_xxx",
  "timestamp": "2026-04-14T10:30:00Z",
  "data": {
    "simulation_id": "sim_abc123",
    "completion_probability": 0.72,
    "pressure_index": "yellow"
  }
}</pre>

<h2>Verification</h2>
<p>Each webhook delivery includes a <code>X-SprintHelm-Signature</code> header containing an HMAC-SHA256 signature of the payload, signed with your webhook secret. Verify this signature before processing the payload.</p>

<h2>Retry policy</h2>
<p>If your endpoint returns a non-2xx status code, SprintHelm will retry delivery up to 5 times with exponential backoff (10s, 30s, 2m, 10m, 30m). After 5 failures, the delivery is marked as failed and will not be retried.</p>
    `,
  },
];
