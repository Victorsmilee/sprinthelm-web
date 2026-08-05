"use client";

import { Printer } from "lucide-react";

/**
 * Triggers the browser's print dialog, from which the reader saves a PDF.
 *
 * Deliberately not a committed PDF file: a static asset goes stale the moment
 * the product changes, and a stale security document is worse than none. This
 * always prints whatever lib/trust-content.ts currently says.
 *
 * Hidden in print output via `print:hidden` so the button never appears in the
 * saved document.
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
    >
      <Printer size={15} aria-hidden />
      Save as PDF
    </button>
  );
}
