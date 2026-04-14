import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CheckCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Enterprise Sales — SprintHelm",
  description: "Talk to the SprintHelm team about an enterprise deployment.",
};

const WHAT_TO_EXPECT = [
  "Response within 24 hours — no automated qualification sequences",
  "A working demo tailored to your team size and sprint cadence",
  "Honest answers about fit — we won&apos;t oversell",
  "Pricing scoped to your org size with no hidden line items",
];

const ENTERPRISE_FEATURES = [
  "Unlimited team workspaces and members",
  "SSO / SAML 2.0 + full RBAC",
  "SOC 2 Type II compliance and audit logs",
  "BYOK — bring your own Anthropic API key",
  "Dedicated Customer Success Manager",
  "SLA-backed support (4h P1/P2)",
  "Custom scoring weight configuration",
  "All integrations: Jira, Linear, GitHub, Slack, Azure DevOps",
  "Data Processing Agreement (DPA)",
];

export default function EnterpriseContactPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg-primary">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 text-center border-b border-border-subtle">
          <div className="mx-auto max-w-2xl">
            <div className="inline-flex items-center gap-2 text-sm text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8">
              Enterprise
            </div>
            <h1 className="text-h1 font-bold text-text-primary mb-4 leading-tight">
              Let&apos;s talk about your delivery challenges.
            </h1>
            <p className="text-lg text-text-secondary">
              Tell us about your team size, stack, and how you currently plan sprints.
              We&apos;ll show you how SprintHelm fits — in under 30 minutes.
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left — contact */}
            <div>
              <h2 className="text-h3 font-bold text-text-primary mb-6">Get in touch</h2>
              <div className="p-8 rounded-xl bg-bg-surface border border-accent/30 mb-8">
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Email us directly with your team size, current tooling, and what&apos;s breaking in your sprint planning process.
                  We&apos;ll come back with a tailored response — not a sales deck.
                </p>
                <a
                  href="mailto:enterprise@sprinthelm.io"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
                >
                  enterprise@sprinthelm.io
                  <ArrowRight size={14} />
                </a>
              </div>

              <h3 className="text-base font-semibold text-text-primary mb-4">What to expect</h3>
              <ul className="space-y-3">
                {WHAT_TO_EXPECT.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — features */}
            <div>
              <h2 className="text-h3 font-bold text-text-primary mb-6">What&apos;s included</h2>
              <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle">
                <ul className="space-y-3">
                  {ENTERPRISE_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-border-subtle">
                  <p className="text-sm text-text-disabled">
                    Custom pricing scoped to org size. Annual contract. No surprise overages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
