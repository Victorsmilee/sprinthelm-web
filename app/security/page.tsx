import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Lock, Shield, Database, CreditCard, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Security — SprintHelm",
  description: "Enterprise-grade security. Zero compromise on your backlog data.",
};

const PILLARS = [
  {
    icon: Lock,
    title: "Encryption",
    items: [
      "TLS 1.3 in transit — all data between your browser and SprintHelm servers is encrypted",
      "AES-256 at rest — stored simulation history and workspace data encrypted at the block level",
      "Keys managed via AWS KMS with automatic annual rotation",
    ],
  },
  {
    icon: Shield,
    title: "Authentication & Access",
    items: [
      "OAuth 2.0 — sign in with Google or email/password",
      "SSO / SAML 2.0 available on Enterprise",
      "Role-based access control (admin / member) on Team and Enterprise",
      "Session tokens are short-lived and rotated on every sign-in",
    ],
  },
  {
    icon: Database,
    title: "Data Handling",
    items: [
      "Free and Pro: backlog data is processed in-memory and not persisted — cleared when your session ends",
      "Team and Enterprise: simulation history stored in encrypted workspaces (EU-West-1 by default)",
      "Enterprise: alternative data residency regions available on request",
      "We never use your backlog or ticket data to train any AI model",
    ],
  },
  {
    icon: Shield,
    title: "Compliance",
    items: [
      "GDPR-compliant data processing for all EU users",
      "SOC 2 Type II report available to Enterprise customers under NDA",
      "Data Processing Agreement (DPA) available — contact enterprise@sprinthelm.io",
      "Audit logs available on Enterprise for compliance review",
    ],
  },
  {
    icon: CreditCard,
    title: "Payments",
    items: [
      "All payment processing handled by Stripe — we never store or handle card data",
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
                      <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" />
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
              Security questionnaires, DPAs, SOC 2 reports, and custom compliance reviews available for enterprise prospects.
            </p>
            <a
              href="mailto:enterprise@sprinthelm.io"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
            >
              Contact enterprise@sprinthelm.io
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
