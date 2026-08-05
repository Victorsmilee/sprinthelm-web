import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PrintButton } from "@/components/trust/PrintButton";
import {
  CONTROL_DOMAINS,
  SUBPROCESSORS,
  CERTIFICATION_STATUS,
  LAST_REVIEWED,
  controlCounts,
} from "@/lib/trust-content";

export const metadata = {
  title: "Security controls summary, SprintHelm",
  description:
    "One-page summary of SprintHelm's security controls, sub-processors and certification status, for vendor reviews.",
};

/**
 * Printable controls one-pager for a buyer's vendor review.
 *
 * Reads the SAME lib/trust-content.ts as /security, so the summary a customer
 * files away can never contradict the live page.
 *
 * Print behaviour: the screen view matches the site's dark theme; the print
 * view forces black-on-white (a dark background wastes toner and prints badly),
 * drops the site chrome, and shows the URL and review date in a footer so the
 * saved PDF is self-identifying.
 */
function formatReviewed(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function ControlsOnePagerPage() {
  const counts = controlCounts();

  return (
    <main className="min-h-screen bg-bg-primary print:bg-white">
      {/* @page margins + a print-only colour reset. Tailwind's print: variants
          cover layout; this handles the page box and forced colour, which
          utilities cannot express. */}
      <style>{`
        @media print {
          @page { size: A4; margin: 16mm 14mm; }
          html, body { background: #fff !important; }
          .print-doc, .print-doc * {
            color: #111 !important;
            background: transparent !important;
            border-color: #ccc !important;
          }
          .print-doc a { text-decoration: none !important; }
          .print-domain { break-inside: avoid; page-break-inside: avoid; }
          .print-foot { display: block !important; }
        }
      `}</style>

      <div className="print-doc mx-auto max-w-3xl px-6 py-16 print:px-0 print:py-0 print:max-w-none">
        {/* Back link + print action, both dropped from the printed page */}
        <div className="print:hidden flex items-center justify-between gap-4 mb-10">
          <Link
            href="/security"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <ArrowLeft size={15} aria-hidden />
            Back to Trust Center
          </Link>
          <PrintButton />
        </div>

        {/* Document header */}
        <header className="pb-6 mb-8 border-b border-border-subtle">
          <p className="text-caption uppercase tracking-wide text-text-secondary mb-2">
            SprintHelm — Security controls summary
          </p>
          <h1 className="text-h2 font-bold text-text-primary mb-3 leading-tight">
            Controls inventory
          </h1>
          <p className="text-sm text-text-secondary">
            {counts.inPlace} of {counts.total} controls in place · {counts.planned} not yet
            available · Last reviewed {formatReviewed(LAST_REVIEWED)}
          </p>
        </header>

        {/* Certification status first — it is the question they came to answer */}
        <section className="mb-10 p-5 rounded-lg border border-border-active print:rounded-none">
          <h2 className="text-base font-bold text-text-primary mb-2">
            Certification status: {CERTIFICATION_STATUS.headline}
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {CERTIFICATION_STATUS.detail}
          </p>
        </section>

        {/* Controls */}
        {CONTROL_DOMAINS.map((domain) => (
          <section key={domain.domain} className="print-domain mb-8">
            <h2 className="text-base font-bold text-text-primary mb-1">{domain.domain}</h2>
            <p className="text-caption text-text-secondary mb-3">{domain.summary}</p>
            <table className="w-full text-sm border-collapse">
              <tbody>
                {domain.controls.map((control) => (
                  <tr key={control.claim} className="border-b border-border-subtle last:border-0 align-top">
                    <td className="py-2 pr-4 text-text-secondary leading-relaxed">{control.claim}</td>
                    {/* Status wraps on narrow screens and only pins to a fixed
                        column from `sm` up. A nowrap "Not yet available" plus a
                        fixed w-36 pushed the document past the viewport on
                        mobile, which scrolled the whole page sideways. */}
                    <td className="py-2 text-right align-top w-24 sm:w-36 sm:whitespace-nowrap">
                      {control.status === "in-place" ? (
                        <span className="text-caption font-semibold text-success">In place</span>
                      ) : (
                        <span className="text-caption font-semibold text-text-disabled">
                          Not yet available
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}

        {/* Sub-processors */}
        <section className="print-domain mb-8">
          <h2 className="text-base font-bold text-text-primary mb-1">Sub-processors</h2>
          <p className="text-caption text-text-secondary mb-3">
            Third parties processing customer data on our behalf. 30 days&apos; notice of material
            changes.
          </p>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left font-semibold text-text-primary py-2 pr-4">Provider</th>
                <th className="text-left font-semibold text-text-primary py-2 pr-4">Purpose</th>
                <th className="text-left font-semibold text-text-primary py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {SUBPROCESSORS.map((sub) => (
                <tr key={sub.name} className="border-b border-border-subtle last:border-0 align-top">
                  <td className="py-2 pr-4 text-text-primary font-medium">{sub.name}</td>
                  <td className="py-2 pr-4 text-text-secondary">{sub.purpose}</td>
                  {/* No nowrap: three nowrap columns overflowed the viewport on
                      mobile. A4 print is wide enough that wrapping never fires. */}
                  <td className="py-2 text-text-secondary">{sub.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Contact + provenance. `print-foot` is display:none on screen (the
            page already has a contact section) and shown when printed so the
            saved PDF identifies itself. */}
        <footer className="pt-6 border-t border-border-subtle">
          <p className="text-caption text-text-secondary leading-relaxed">
            Security questionnaires and a Data Processing Agreement are available on request:{" "}
            <a href="mailto:enterprise@sprinthelm.com" className="text-accent">
              enterprise@sprinthelm.com
            </a>
          </p>
          <p className="print-foot hidden text-caption text-text-secondary mt-2">
            sprinthelm.com/security/controls · Reviewed {formatReviewed(LAST_REVIEWED)} · This
            summary is generated from the live Trust Center, so it reflects the state of the
            product on the date above.
          </p>
        </footer>
      </div>
    </main>
  );
}
