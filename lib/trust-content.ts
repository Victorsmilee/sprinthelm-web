/**
 * Trust Center content — the single source of truth for /security and the
 * printable controls one-pager at /security/controls.
 *
 * WHY ONE MODULE: a security page and a downloadable summary that disagree is
 * worse than having neither, and a committed PDF goes stale the moment the
 * product changes. Both surfaces read this file, so they cannot drift.
 *
 * RULES FOR EDITING
 *  1. Every `in-place` control must be verifiable in the codebase today. If you
 *     cannot point at the file that implements it, it is `planned`.
 *  2. `planned` is not a soft yes. It renders as "Not yet available" with no
 *     date unless we can commit to one.
 *  3. Bump LAST_REVIEWED whenever you touch this file. A trust page nobody
 *     maintains is the failure mode this exists to prevent.
 *
 * Each control carries `evidence` — the file or mechanism that backs it. It is
 * not rendered to the public page; it is there so the next person editing this
 * file (or answering a security questionnaire) can check the claim in seconds.
 */

export const LAST_REVIEWED = "2026-08-04";

export type ControlStatus = "in-place" | "planned";

export interface Control {
  claim: string;
  status: ControlStatus;
  /** Where this is implemented, for internal verification. Not rendered. */
  evidence: string;
}

export interface ControlDomain {
  domain: string;
  /** One line a non-engineer can read. */
  summary: string;
  controls: Control[];
}

export const CONTROL_DOMAINS: ControlDomain[] = [
  {
    domain: "Encryption",
    summary: "Data is encrypted in transit and at rest, and integration credentials get a second layer.",
    controls: [
      {
        claim: "TLS 1.3 for all traffic between your browser and SprintHelm",
        status: "in-place",
        evidence: "Vercel edge network, enforced HTTPS",
      },
      {
        claim: "AES-256 encryption at rest for all stored data",
        status: "in-place",
        evidence: "Supabase managed Postgres, EU West region",
      },
      {
        claim:
          "Jira OAuth tokens are separately encrypted with AES-256-GCM under a per-environment master key before they are written to the database",
        status: "in-place",
        evidence: "lib/jira/encryption.ts, JIRA_TOKEN_MASTER_KEY, ADR-004 v1 envelope",
      },
      {
        claim: "Key custody moved to a managed KMS with automatic rotation",
        status: "planned",
        evidence: "ADR-004 target state; v1 uses a per-environment env-var key (alias v1-env-key)",
      },
    ],
  },
  {
    domain: "Access control",
    summary: "Every record in the database is scoped to the account that owns it, enforced by the database itself.",
    controls: [
      {
        claim:
          "Row-level security on every application table, scoping each record to its owning account. Enforced in Postgres, not only in application code",
        status: "in-place",
        evidence: "All 21 tables in supabase/migrations enable RLS with auth.uid() policies",
      },
      {
        claim: "Audit tables are readable by their owner and writable only by the service role",
        status: "in-place",
        evidence: "billing_audit_log, jira_audit_log — owner-read policy, no insert/update/delete policy",
      },
      {
        claim: "OAuth 2.0 sign-in (Google) and email/password, with short-lived session tokens rotated on sign-in",
        status: "in-place",
        evidence: "Supabase Auth; session refresh in middleware",
      },
      {
        claim: "Single sign-on (SSO / SAML 2.0)",
        status: "planned",
        evidence: "Not built",
      },
      {
        claim: "Role-based access control within a shared account (admin / member)",
        status: "planned",
        evidence: "Not built. Every account is single-user today",
      },
    ],
  },
  {
    domain: "Data handling",
    summary: "Your backlog is your roadmap. We hold as little of it as possible, in the EU, and never train on it.",
    controls: [
      {
        claim: "All customer data is stored and processed in the EU",
        status: "in-place",
        evidence: "Supabase EU West Europe region",
      },
      {
        claim:
          "On Free and Pro, backlog data is processed in memory and not persisted. It is cleared when your session ends",
        status: "in-place",
        evidence: "No server-side persistence on those paths",
      },
      {
        claim: "We never use your backlog, tickets or simulation inputs to train any AI model",
        status: "in-place",
        evidence: "Anthropic API used for inference only; no training opt-in",
      },
      {
        claim: "Customer data deleted from production within 30 days of account deletion or written request",
        status: "in-place",
        evidence: "DPA §7; cascade delete on auth.users",
      },
      {
        claim: "Alternative data residency regions (US or other)",
        status: "planned",
        evidence: "Not offered. Ask us and we will confirm feasibility in writing before committing",
      },
    ],
  },
  {
    domain: "Application security",
    summary: "Standard web hardening, applied by default rather than per-route.",
    controls: [
      {
        claim: "Content Security Policy with a per-request nonce in production",
        status: "in-place",
        evidence: "lib/csp.ts + middleware.ts nonce generation",
      },
      {
        claim: "Rate limiting on authenticated API routes",
        status: "in-place",
        evidence: "lib/rateLimitRoute.ts; distributed backend via Upstash when configured",
      },
      {
        claim: "Inbound payment webhooks verified by cryptographic signature before processing",
        status: "in-place",
        evidence: "Stripe constructEvent with STRIPE_WEBHOOK_SECRET",
      },
      {
        claim: "Independent penetration testing",
        status: "planned",
        evidence: "Not yet performed",
      },
    ],
  },
  {
    domain: "Payments",
    summary: "We never see your card details.",
    controls: [
      {
        claim: "All card data is handled by Stripe. SprintHelm never receives or stores card numbers",
        status: "in-place",
        evidence: "Stripe Checkout + Billing Portal; no card fields in our UI",
      },
      {
        claim: "PCI DSS compliance is carried by Stripe as the payment processor",
        status: "in-place",
        evidence: "Stripe is a PCI DSS Level 1 service provider",
      },
    ],
  },
  {
    domain: "Auditability",
    summary: "Billing and integration activity is recorded, with timestamps and outcomes.",
    controls: [
      {
        claim:
          "Every plan change, payment event and notification is written to an append-only billing audit log with actor, timestamp, before/after plan and result",
        status: "in-place",
        evidence: "billing_audit_log; lib/billing/billingEvents.ts",
      },
      {
        claim: "Jira connection and import activity is recorded per workspace connection",
        status: "in-place",
        evidence: "jira_audit_log",
      },
      {
        claim: "Customer-facing audit log export and search",
        status: "planned",
        evidence: "Records exist and are owner-readable; there is no UI or export endpoint yet",
      },
    ],
  },
  {
    domain: "Compliance",
    summary: "GDPR today. SOC 2 is not done, and we say so.",
    controls: [
      {
        claim: "GDPR-compliant processing for EU users, with a Data Processing Agreement available on request",
        status: "in-place",
        evidence: "sprinthelm.com/dpa",
      },
      {
        claim: "Published sub-processor list, with 30 days' notice of material changes",
        status: "in-place",
        evidence: "DPA §5 and Privacy Policy",
      },
      {
        claim: "72-hour breach notification to affected controllers",
        status: "in-place",
        evidence: "DPA §4 commitment",
      },
      {
        claim: "We complete customer security questionnaires on request",
        status: "in-place",
        evidence: "Manual process, enterprise@sprinthelm.com",
      },
      {
        claim: "SOC 2 Type II certification",
        status: "planned",
        evidence: "Not started. No audit window booked, no report exists",
      },
    ],
  },
];

/** Mirrors DPA §5. Keep the two in step — a customer will compare them. */
export interface SubProcessor {
  name: string;
  purpose: string;
  location: string;
}

export const SUBPROCESSORS: SubProcessor[] = [
  { name: "Supabase", purpose: "Database, authentication and file storage", location: "EU (West Europe)" },
  { name: "Vercel", purpose: "Application hosting and edge network", location: "Global CDN" },
  { name: "Stripe", purpose: "Payment processing and subscription billing", location: "US / EU" },
  { name: "Anthropic", purpose: "AI summary and PRD extraction inference", location: "United States" },
  { name: "Resend", purpose: "Transactional email delivery", location: "United States" },
  {
    name: "Atlassian",
    purpose: "Jira backlog import, only when you connect a Jira site",
    location: "Per your Atlassian site region",
  },
];

/**
 * Stated up front rather than buried. A buyer's security team checks this
 * first, and an honest "no" is worth more than a vague implication of "yes" —
 * they will find out either way, and only one order of events keeps the deal.
 */
export const CERTIFICATION_STATUS = {
  headline: "We are not SOC 2 certified.",
  detail:
    "No audit window is booked and no report exists. We would rather you learn that here than after you have signed. What we can do today: complete your security questionnaire, sign a DPA, and walk you through the controls inventory below, which lists exactly what is in place and what is not.",
} as const;

/** Counts for the summary line. Derived, so it cannot fall out of step. */
export function controlCounts() {
  const all = CONTROL_DOMAINS.flatMap((d) => d.controls);
  return {
    inPlace: all.filter((c) => c.status === "in-place").length,
    planned: all.filter((c) => c.status === "planned").length,
    total: all.length,
  };
}
