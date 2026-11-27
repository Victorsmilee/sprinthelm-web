/**
 * SEO — structured data, canonical, and Open Graph.
 *
 * Guards the technical-SEO foundation: JSON-LD schema emission, an absolute
 * canonical, and an absolute OG image (the latter two only resolve because
 * `metadataBase` is set). These are invisible in the UI, so without a test they
 * regress silently the next time metadata is touched.
 */

type LdBlock = { "@type"?: string; mainEntity?: unknown[] };

function parseLdBlocks(els: JQuery<HTMLElement>): LdBlock[] {
  return [...els]
    .map((el) => {
      try {
        return JSON.parse(el.textContent || "null") as LdBlock;
      } catch {
        return null;
      }
    })
    .filter((b): b is LdBlock => b !== null);
}

describe("SEO — homepage structured data & metadata", () => {
  beforeEach(() => cy.visit("/"));

  it("emits Organization, WebSite, SoftwareApplication and FAQPage JSON-LD", () => {
    cy.get('script[type="application/ld+json"]').then((els) => {
      const types = parseLdBlocks(els).map((b) => b["@type"]);
      expect(types).to.include.members([
        "Organization",
        "WebSite",
        "SoftwareApplication",
        "FAQPage",
      ]);
    });
  });

  it("FAQPage markup carries the real questions (not an empty stub)", () => {
    cy.get('script[type="application/ld+json"]').then((els) => {
      const faq = parseLdBlocks(els).find((b) => b["@type"] === "FAQPage");
      expect(faq, "FAQPage block exists").to.not.be.undefined;
      expect(faq?.mainEntity?.length ?? 0).to.be.greaterThan(6);
    });
  });

  it("has an absolute canonical on the marketing origin", () => {
    // Root canonical renders as the bare origin (no trailing slash), deeper
    // pages add a path — so match the origin without requiring a following "/".
    cy.get('link[rel="canonical"]')
      .should("have.attr", "href")
      .and("match", /^https:\/\/sprinthelm\.com(\/|$)/);
  });

  it("has an absolute Open Graph image", () => {
    cy.get('meta[property="og:image"]')
      .first()
      .should("have.attr", "content")
      .and("match", /^https:\/\/sprinthelm\.com\//);
  });
});
