/**
 * Renders one or more Schema.org JSON-LD blocks as <script> tags.
 *
 * Server component (no "use client") — the markup is emitted in the initial
 * HTML so crawlers see it without running JS.
 *
 * SAFETY: `<` in the serialized JSON is escaped to its unicode form so a value
 * can never close the <script> element early (classic JSON-LD XSS vector).
 * Our data is first-party, but the escape is cheap insurance.
 */

export function JsonLd({ data }: { data: object | object[] }): React.JSX.Element {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
