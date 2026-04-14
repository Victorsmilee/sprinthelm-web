/**
 * Smoke tests — every page returns 200 and renders a non-empty body.
 * Fastest gate: catches missing exports, build-time errors, and broken routes.
 *
 * Note: We avoid checking body text for "404" because Next.js embeds the
 * not-found component definition inside <script> RSC payload tags on every
 * page. Instead we check the page <title> and that no visible error heading
 * appears.
 */

const PAGES = [
  { path: "/",                    label: "Homepage" },
  { path: "/about",               label: "About" },
  { path: "/blog",                label: "Blog" },
  { path: "/careers",             label: "Careers" },
  { path: "/security",            label: "Security" },
  { path: "/contact",             label: "Contact" },
  { path: "/contact/enterprise",  label: "Contact — Enterprise" },
  { path: "/roadmap",             label: "Roadmap" },
  { path: "/support",             label: "Support" },
  { path: "/docs",                label: "Docs" },
  { path: "/dpa",                 label: "DPA" },
  { path: "/privacy",             label: "Privacy" },
  { path: "/terms",               label: "Terms" },
];

describe("Smoke — all pages render", () => {
  PAGES.forEach(({ path, label }) => {
    it(`${label} (${path}) loads without error`, () => {
      cy.visit(path);
      // Body exists and has content
      cy.get("body").should("not.be.empty");
      // No Next.js error overlay text in visible DOM
      cy.get("body").should("not.contain.text", "Application error");
      cy.get("body").should("not.contain.text", "Internal Server Error");
      // Page title does not indicate a 404 — reliable proxy for "page not found"
      cy.title().should("not.match", /404/i);
    });
  });
});
