import Link from "next/link";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Lock, CheckCircle, Clock, FileText, ArrowRight, Download } from "lucide-react";
import {
  CONTROL_DOMAINS,
  SUBPROCESSORS,
  CERTIFICATION_STATUS,
  LAST_REVIEWED,
  controlCounts,
} from "@/lib/trust-content";

export const metadata = {
  title: "Trust Center, SprintHelm",
  description:
    "What SprintHelm does to protect your data, what is in place today, and what is not. Controls inventory, sub-processors and certification status.",
};

function formatReviewed(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function SecurityPage() {
  const counts = controlCounts();

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg-primary">
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 text-center border-b border-border-subtle">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8">
              <Lock size={13} aria-hidden />
              Trust Center
            </div>
            <h1 className="text-h1 font-bold text-text-primary mb-6 text-balance leading-tight">
              Your backlog is your roadmap.{" "}
              <span className="text-gradient-accent">Here is exactly how we hold it.</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Every control below is either in place today or marked as not yet available. Nothing
              is implied. If you are running a vendor review, this page and the one-page summary
              should answer most of it.
            </p>
          </div>
        </section>

        {/* Certification status, stated before anything else */}
        <section className="py-12 px-6 border-b border-border-subtle">
          <div className="mx-auto max-w-3xl">
            <div className="p-8 rounded-xl bg-bg-surface border border-border-active">
              <h2 className="text-lg font-bold text-text-primary mb-3">
                {CERTIFICATION_STATUS.headline}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {CERTIFICATION_STATUS.detail}
              </p>
            </div>
          </div>
        </section>

        {/* Controls inventory */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-h3 font-bold text-text-primary mb-2">Controls inventory</h2>
                <p className="text-sm text-text-secondary">
                  {counts.inPlace} controls in place, {counts.planned} not yet available. Last
                  reviewed {formatReviewed(LAST_REVIEWED)}.
                </p>
              </div>
              <Link
                href="/security/controls"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-active text-sm font-semibold text-text-primary hover:border-accent transition-colors duration-200"
              >
                <Download size={15} aria-hidden />
                One-page summary
              </Link>
            </div>

            <div className="space-y-6">
              {CONTROL_DOMAINS.map((domain) => (
                <div
                  key={domain.domain}
                  className="p-8 rounded-xl bg-bg-surface border border-border-subtle"
                >
                  <h3 className="text-lg font-bold text-text-primary mb-1">{domain.domain}</h3>
                  <p className="text-sm text-text-secondary mb-6">{domain.summary}</p>
                  <ul className="space-y-3">
                    {domain.controls.map((control) => {
                      const planned = control.status === "planned";
                      return (
                        <li key={control.claim} className="flex items-start gap-3">
                          {planned ? (
                            <Clock
                              size={16}
                              className="text-text-disabled flex-shrink-0 mt-0.5"
                              aria-hidden
                            />
                          ) : (
                            <CheckCircle
                              size={16}
                              className="text-success flex-shrink-0 mt-0.5"
                              aria-hidden
                            />
                          )}
                          <span
                            className={
                              planned
                                ? "text-sm text-text-disabled leading-relaxed"
                                : "text-sm text-text-secondary leading-relaxed"
                            }
                          >
                            {control.claim}
                            {planned && (
                              <span className="ml-2 text-label uppercase tracking-wide text-text-disabled">
                                Not yet available
                              </span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sub-processors */}
        <section className="py-16 px-6 border-t border-border-subtle">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-h3 font-bold text-text-primary mb-2">Sub-processors</h2>
            <p className="text-sm text-text-secondary mb-8">
              Third parties that process customer data on our behalf. We give 30 days&apos; notice
              of material changes.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border-subtle">
              <table className="w-full text-sm min-w-[34rem]">
                <thead>
                  <tr className="bg-bg-surface border-b border-border-subtle">
                    <th className="text-left font-semibold text-text-primary px-5 py-3">Provider</th>
                    <th className="text-left font-semibold text-text-primary px-5 py-3">Purpose</th>
                    <th className="text-left font-semibold text-text-primary px-5 py-3">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {SUBPROCESSORS.map((sub) => (
                    <tr key={sub.name} className="border-b border-border-subtle last:border-0">
                      <td className="px-5 py-3 text-text-primary font-medium whitespace-nowrap">
                        {sub.name}
                      </td>
                      <td className="px-5 py-3 text-text-secondary">{sub.purpose}</td>
                      <td className="px-5 py-3 text-text-secondary whitespace-nowrap">
                        {sub.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Documents */}
        <section className="py-16 px-6 border-t border-border-subtle">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-h3 font-bold text-text-primary mb-8">Documents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { href: "/security/controls", label: "Controls one-pager", note: "Printable summary for your vendor review" },
                { href: "/dpa", label: "Data Processing Agreement", note: "GDPR Article 28 processor terms" },
                { href: "/privacy", label: "Privacy Policy", note: "What we collect and why" },
                { href: "/terms", label: "Terms of Service", note: "Commercial terms" },
              ].map((doc) => (
                <Link
                  key={doc.href}
                  href={doc.href}
                  className="group flex items-start gap-3 p-5 rounded-xl bg-bg-surface border border-border-subtle hover:border-accent transition-colors duration-200"
                >
                  <FileText size={18} className="text-accent flex-shrink-0 mt-0.5" aria-hidden />
                  <span>
                    <span className="block text-sm font-semibold text-text-primary mb-0.5">
                      {doc.label}
                      <ArrowRight
                        size={13}
                        className="inline ml-1.5 -translate-y-px opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        aria-hidden
                      />
                    </span>
                    <span className="block text-caption text-text-secondary">{doc.note}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-6 border-t border-border-subtle text-center">
          <div className="mx-auto max-w-xl">
            <h2 className="text-h3 font-bold text-text-primary mb-3">Running a vendor review?</h2>
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              Send us your security questionnaire and we will complete it. We will also sign a DPA
              and answer anything this page does not cover, including the things we have not built.
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
