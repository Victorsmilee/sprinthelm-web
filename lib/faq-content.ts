/**
 * Single source of truth for the homepage FAQ.
 *
 * Consumed by BOTH the visible accordion (components/sections/faq.tsx) and the
 * FAQPage JSON-LD on the homepage (lib/seo/structured-data.ts). Keeping them on
 * one array means the rich-result markup can never drift from what the page
 * actually says — a mismatch there is a Google structured-data violation, not
 * just a cosmetic bug.
 */

export interface FaqEntry {
  q: string;
  a: string;
}

export const FAQS: FaqEntry[] = [
  {
    q: "Does SprintHelm connect to Jira?",
    a: "Yes, on Pro tier and above. It is a one-way backlog import: we pull your issues in, score them, and simulate. We do not write anything back to Jira. Free tier users can paste backlogs manually as JSON or CSV.",
  },
  {
    q: "Where is my data stored?",
    a: "Backlog data is processed in-memory on Free/Pro, not persisted, cleared when your session ends. Team stores simulation and portfolio history in your account, encrypted at rest and in transit, hosted in the EU. We never use your data to train any model.",
  },
  {
    q: "Can my whole team use one account?",
    a: "Not yet. Every plan is single-user today, so each person signs in with their own account. Shared accounts with invites and roles are on the roadmap. Team tier is about seeing every project in one portfolio, not about seat count.",
  },
  {
    q: "Can I bring my own Anthropic API key?",
    a: "Not yet. Every tier currently uses SprintHelm's shared API access against your monthly allocation. Bring-your-own-key is on the roadmap for Enterprise, so talk to us if it is a requirement for you.",
  },
  {
    q: "What is the difference between Free and Pro?",
    a: "Free is fully functional for occasional solo use: up to 15 tickets, the full priority scoring engine, complexity risk badges and a Pressure Index colour band. It does not include AI summaries, Jira import, PRD extraction or the full Monte Carlo simulation. Pro adds all of those. Start free, run three simulations, and you will know quickly whether Pro earns its place.",
  },
  {
    q: "How does the free trial work?",
    a: "Paid plans start with a 7-day free trial. We do ask for a card up front, and we charge nothing until day 7. You get every feature of the plan from minute one. We email you 3 days before the trial ends so the first charge is never a surprise, and if you cancel before then you are not charged at all: your account simply returns to the Free plan with your data intact. Free itself needs no card and lasts forever. Seven days is enough because SprintHelm is judged on the plan, not on the sprint outcome: import a backlog and the pressure index, the forecast and the what-if are all there in the first session.",
  },
  {
    q: "How do I cancel? Is there a contract?",
    a: "No contract below Enterprise. Cancel any time from billing settings. Access continues until the end of your billing period. Contact support within 48 hours of an unintended renewal charge and we will handle it. Enterprise contracts are annual.",
  },
  {
    q: "How secure is SprintHelm?",
    a: "TLS 1.3 in transit, AES-256 at rest, Stripe for payments (we never handle card data), OAuth 2.0 for auth. We are not SOC 2 certified yet and will say so plainly rather than imply otherwise. We can complete security questionnaires and sign a DPA today: email enterprise@sprinthelm.com.",
  },
  {
    q: "What does Monte Carlo simulation mean in plain English?",
    a: "We run your delivery plan hundreds of times, each time introducing small random variations that reflect real-world uncertainty: a ticket taking longer, a team member pulled into incidents, a dependency arriving late. Instead of 'this sprint takes 12 days,' you get 'there is a 68% probability this completes on time given your current scope.' The output is a probability, not a prediction. That distinction forces the planning conversation to be about risk tolerance, not false precision.",
  },
];
