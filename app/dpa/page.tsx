import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { FileText, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Data Processing Agreement — SprintHelm",
  description: "SprintHelm's Data Processing Agreement for Enterprise customers under GDPR.",
};

const SECTIONS = [
  {
    title: "1. Parties",
    body: "This Data Processing Agreement is entered into between SprintHelm Ltd (\"Data Processor\") and the Customer entity identified in the SprintHelm Enterprise order form (\"Data Controller\"). It supplements and forms part of the SprintHelm Enterprise Terms of Service.",
  },
  {
    title: "2. Scope of Processing",
    body: "SprintHelm processes Customer Data solely to provide the SprintHelm platform services as described in the Enterprise agreement. Processing includes: storing and analysing backlog ticket data, running Monte Carlo simulations against team capacity inputs, generating AI-powered summaries, and maintaining simulation history in Customer workspaces.",
  },
  {
    title: "3. Data Subject Categories",
    body: "The Customer Data processed may relate to: employees and contractors of the Customer (team capacity data, names, and roles used in simulation inputs); end users of the Customer's products (referenced indirectly in ticket descriptions and priority inputs). SprintHelm does not require or process sensitive personal data (as defined in GDPR Article 9) in the normal course of service delivery.",
  },
  {
    title: "4. Security Measures",
    body: "SprintHelm maintains the following technical and organisational measures: TLS 1.3 encryption in transit; AES-256 encryption at rest; access controls with role-based permissions; annual penetration testing; SOC 2 Type II certification (report available under NDA on request); incident response procedures with 72-hour breach notification to affected Controllers.",
  },
  {
    title: "5. Sub-processors",
    body: "SprintHelm uses the following categories of sub-processors in the delivery of its services: cloud infrastructure (AWS EU-West-1), authentication services, payment processing (Stripe), and AI inference (Anthropic). A full sub-processor list with entity names and processing locations is available to Enterprise customers on request. SprintHelm will provide 30 days' notice of material changes to sub-processors.",
  },
  {
    title: "6. Data Transfers",
    body: "Customer Data is stored and processed in the EU by default (AWS EU-West-1). If Customer requests processing in an alternative region, a separate addendum will be agreed. Where sub-processors are located outside the EEA, SprintHelm relies on Standard Contractual Clauses (SCCs) as the transfer mechanism.",
  },
  {
    title: "7. Data Retention & Deletion",
    body: "SprintHelm retains Customer Data for the duration of the Enterprise subscription plus 30 days. Upon termination or written request, Customer Data will be deleted from production systems within 30 days and from backup systems within 90 days. A deletion confirmation is available on request.",
  },
  {
    title: "8. Data Subject Rights",
    body: "SprintHelm will assist the Controller in responding to Data Subject rights requests (access, rectification, erasure, portability, restriction) within the timescales required by applicable law. Requests should be submitted to enterprise@sprinthelm.io.",
  },
];

export default function DpaPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg-primary">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 text-center border-b border-border-subtle">
          <div className="mx-auto max-w-2xl">
            <div className="inline-flex items-center gap-2 text-sm text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8">
              <FileText size={13} />
              Enterprise
            </div>
            <h1 className="text-h1 font-bold text-text-primary mb-4 leading-tight">
              Data Processing Agreement
            </h1>
            <p className="text-lg text-text-secondary">
              SprintHelm&apos;s DPA formalises our obligations as a data processor under GDPR and equivalent regulations.
              Available to Enterprise customers.
            </p>
          </div>
        </section>

        {/* Last updated */}
        <section className="py-6 px-6 border-b border-border-subtle">
          <div className="mx-auto max-w-3xl">
            <p className="text-caption text-text-disabled">Last updated: January 2026 · Effective for all Enterprise agreements signed after this date</p>
          </div>
        </section>

        {/* Sections */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="text-base font-bold text-text-primary mb-3">{section.title}</h2>
                <p className="text-sm text-text-secondary leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Execute DPA */}
        <section className="py-16 px-6 border-t border-border-subtle text-center">
          <div className="mx-auto max-w-xl">
            <h2 className="text-h3 font-bold text-text-primary mb-3">Ready to execute a DPA?</h2>
            <p className="text-sm text-text-secondary mb-6">
              Contact us with your legal entity name and billing email. We&apos;ll send a countersigned DPA within 5 business days.
            </p>
            <a
              href="mailto:enterprise@sprinthelm.io?subject=DPA Request"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
            >
              Request DPA — enterprise@sprinthelm.io
              <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
