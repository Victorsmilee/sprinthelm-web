import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Lock, Shield, Database, CreditCard, CheckCircle, Clock } from "lucide-react";

export const metadata = {
  title: "Security, SprintHelm",
  description: "Enterprise-grade security. Zero compromise on your backlog data.",
};

const PILLARS = [
  {
    icon: Lock,
    title: "Encryption",
    items: [
      "TLS 1.3 in transit, all data between your browser and SprintHelm servers is encrypted",
      "AES-256 at rest, stored simulation history and workspace data encrypted at the block level",
      "Keys managed via AWS KMS with automatic annual rotation",
    ],
  },
  {
    icon: Shield,
    title: "Authentication & Access",
    items: [
      "OAuth 2.0, sign in with Google or email/password",
      "Session tokens are short-lived and rotated on every sign-in",
      "Every account is single-user today, so there is no shared-account access to manage",
    ],
  },
  {
    icon: Database,
    title: "Data Handling",
    items: [
      "Free and Pro: backlog data is processed in-memory and not persisted, cleared when your session ends",
      "Team: simulation and portfolio history stored encrypted at rest, hosted in the EU",
      "Jira OAuth tokens are encrypted with AES-256-GCM before they touch the database",
      "We never use your backlog or ticket data to train any AI model",
    ],
  },
  {
    icon: Shield,
    title: "Compliance",
    items: [
      "GDPR-compliant data processing for all EU users",
      "Data Processing Agreement (DPA) available, contact enterprise@sprinthelm.com",
      "We complete security questionnaires for enterprise prospects",
    ],
  },
  // Stated plainly rather than implied as shipped. Every line here was
  // previously listed above as though it already existed — corrected in the
  // 2026-08-04 launch truth pass. `pending` swaps the green tick for a clock
  // so the section cannot be skim-read as delivered. Move an item into another
  // pillar only when it actually ships.
  {
    icon: Clock,
    title: "On the roadmap, not yet available",
    pending: true,
    items: [
      "SOC 2 Type II: we are not certified. No report exists yet and we will not imply otherwise",
      "SSO / SAML 2.0: planned for Enterprise, not built",
      "Role-based access control (admin / member): planned, not built",
      "Customer-facing audit logs: planned, not built",
      "Alternative data residency regions: not available, all data is hosted in the EU",
    ],
  },
  {
    icon: CreditCard,
    title: "Payments",
    items: [
      "All payment processing handled by Stripe, we never store or handle card data",
      "PCI DSS compliance managed entirely by Stripe",
      "Billing emails are the only payment-related data SprintHelm retains",
    ],
  },
];

export default function SecurityPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg-primary">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 text-center border-b border-border-subtle">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8">
              <Lock size={13} />
              Security
            </div>
            <h1 className="text-h1 font-bold text-text-primary mb-6 text-balance leading-tight">
              Enterprise-grade security.{" "}
              <span className="text-gradient-accent">Zero compromise on your backlog data.</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Your backlog contains your roadmap, your priorities, and your competitive strategy.
              We treat it accordingly.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-4xl space-y-6">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="p-8 rounded-xl bg-bg-surface border border-border-subtle">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <pillar.icon size={20} className="text-accent" />
                  </div>
                  <h2 className="text-lg font-bold text-text-primary">{pillar.title}</h2>
                </div>
                <ul className="space-y-3">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      {"pending" in pillar && pillar.pending ? (
                        <Clock size={16} className="text-text-disabled flex-shrink-0 mt-0.5" aria-hidden />
                      ) : (
                        <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" aria-hidden />
                      )}
                      <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="py-16 px-6 border-t border-border-subtle text-center">
          <div className="mx-auto max-w-xl">
            <h2 className="text-h3 font-bold text-text-primary mb-3">Need a security review?</h2>
            <p className="text-text-secondary text-sm mb-6">
              Security questionnaires, DPAs, and our controls inventory are available for enterprise prospects. We are not SOC 2 certified yet, and we will tell you that up front rather than after you have signed.
            </p>
            <a
              href="mailto:enterprise@sprinthelm.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
            >
              Contact enterprise@sprinthelm.com
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
