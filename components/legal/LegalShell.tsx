"use client";

/**
 * Shell for the long legal documents: Privacy, Terms, DPA, Security Controls.
 *
 * THE PROBLEM IT SOLVES. Every other route widened to max-w-content (1440px).
 * These four could not follow, because widening the TEXT is the one thing that
 * makes a legal document worse: measured on /privacy, a paragraph at 768px
 * already runs 95 characters per line, and at 1440px it would run 172. WCAG
 * 1.4.8 puts the limit at 80, and comfortable typographic measure is 45 to 75.
 * So they stayed narrow and looked inconsistent, with enormous empty gutters.
 *
 * The gutter was never space that wanted more text. /privacy is 9,400px tall
 * with 14 numbered sections and 11 sub-sections and had NO navigation at all,
 * which is a real usability problem in a document people open to find one
 * specific clause.
 *
 * So the page fills the width like every other route, the reclaimed column
 * carries a sticky table of contents, and the prose keeps its readable measure.
 *
 * WHY THE HEADINGS ARE READ FROM THE DOM rather than passed in as a prop: the
 * four documents already carry their section titles in their markup, and a
 * second hand-maintained list would drift the first time someone edits a
 * heading and forgets the array. The headings are the source of truth; this
 * derives ids from them and never asks a page to repeat itself.
 */

import { useEffect, useRef, useState } from "react";

interface Heading {
  id: string;
  text: string;
}

/** Stable, readable anchor from a heading's text. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&[a-z]+;/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export default function LegalShell({
  title,
  meta,
  children,
}: {
  /** Omit when the page already renders its own hero (see /dpa). */
  title?: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
}): React.JSX.Element {
  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const found: Heading[] = [];
    const seen = new Set<string>();
    root.querySelectorAll("h2").forEach((h) => {
      const text = (h.textContent ?? "").trim();
      if (!text) return;
      let id = h.id || slugify(text);
      // Two sections could slugify the same; keep anchors unique.
      let n = 2;
      while (seen.has(id)) id = `${slugify(text)}-${n++}`;
      seen.add(id);
      h.id = id;
      // Offset for the fixed nav, so a jumped-to heading is not hidden under it.
      h.style.scrollMarginTop = "6rem";
      found.push({ id, text });
    });
    setHeadings(found);

    if (found.length === 0) return;

    // Scrollspy. rootMargin pins the "current" section to the upper third of
    // the viewport, which is where the eye is while reading.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 },
    );
    found.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-content w-full">
      {(title || meta) && (
        <div className="mb-10">
          {title && <h1 className="text-h1 font-bold text-text-primary mb-2">{title}</h1>}
          {meta}
        </div>
      )}

      {/* Single column until lg: a table of contents stacked above 9,000px of
          text helps nobody, and the narrow breakpoints have no spare width.

          The content track is a fixed 48rem rather than 1fr, and the pair is
          centred. With 1fr the track absorbs the whole shell while the prose
          inside stays capped, so the text hugs the nav and leaves a ragged
          360px gap down the right. Centring the nav+text pair balances it. */}
      <div className="lg:grid lg:grid-cols-[260px_minmax(0,48rem)] lg:gap-12 lg:justify-center">
        <nav
          aria-label="On this page"
          className="hidden lg:block lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
        >
          {headings.length > 0 && (
            <>
              <p className="text-caption font-semibold uppercase tracking-wide text-text-disabled mb-3">
                On this page
              </p>
              <ul className="space-y-1 border-l border-border-subtle">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      aria-current={activeId === h.id ? "true" : undefined}
                      className={`block border-l -ml-px pl-3 py-1 text-sm transition-colors ${
                        activeId === h.id
                          ? "border-accent text-accent"
                          : "border-transparent text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </nav>

        {/* The prose keeps its own cap. The page is wide; the measure is not. */}
        <div ref={contentRef} className="min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
