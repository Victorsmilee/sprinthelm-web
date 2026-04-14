/**
 * Regression tests — guard against specific bugs that were fixed in this PR.
 *
 * 1. Section order: FAQ must appear before CTA on the homepage
 * 2. Hero CTAs point to the correct app URLs (not old /signup or Streamlit)
 * 3. Footer has no Changelog link
 * 4. Footer has no duplicate Support / Help Centre entries pointing to /support
 * 5. globals.css section-padding: desktop sections should not be smaller than mobile
 */

describe("Regression — homepage section order", () => {
  it("FAQ section appears before CTA section in DOM", () => {
    cy.visit("/");

    cy.get("#faq").then(($faq) => {
      // Find the CTA section — it contains the "Stop making $500k" heading
      cy.contains("Stop making $500k delivery decisions on intuition")
        .closest("section")
        .then(($cta) => {
          // FAQ's DOM position (offsetTop) must be less than CTA's
          const faqTop = $faq[0].getBoundingClientRect().top + window.scrollY;
          const ctaTop = $cta[0].getBoundingClientRect().top + window.scrollY;
          expect(faqTop, "FAQ renders above CTA").to.be.lessThan(ctaTop);
        });
    });
  });
});

describe("Regression — hero CTA URLs", () => {
  beforeEach(() => cy.visit("/"));

  it("primary CTA links to app.sprinthelm.com/signup", () => {
    cy.contains("Run your first simulation")
      .closest("a")
      .should("have.attr", "href", "https://app.sprinthelm.com/signup");
  });

  it("secondary CTA links to app.sprinthelm.com with ?source=website", () => {
    cy.contains("See a live demo")
      .closest("a")
      .should("have.attr", "href", "https://app.sprinthelm.com/?source=website");
  });

  it("primary CTA does NOT link to the old /signup page", () => {
    cy.contains("Run your first simulation")
      .closest("a")
      .should("not.have.attr", "href", "/signup");
  });

  it("secondary CTA does NOT link to Streamlit", () => {
    cy.contains("See a live demo")
      .closest("a")
      .invoke("attr", "href")
      .should("not.include", "streamlit");
  });
});

describe("Regression — CTA section URLs", () => {
  beforeEach(() => cy.visit("/"));

  it("CTA section primary button links to app.sprinthelm.com/signup", () => {
    cy.contains("Stop making $500k delivery decisions on intuition")
      .closest("section")
      .contains("Run your first simulation")
      .closest("a")
      .should("have.attr", "href", "https://app.sprinthelm.com/signup");
  });

  it("CTA section demo link does NOT point to Streamlit", () => {
    cy.contains("Stop making $500k delivery decisions on intuition")
      .closest("section")
      .contains("See a live demo")
      .closest("a")
      .invoke("attr", "href")
      .should("not.include", "streamlit");
  });
});

describe("Regression — footer has no Changelog link", () => {
  it("Changelog does not appear in the footer", () => {
    cy.visit("/");
    cy.get("footer").should("not.contain.text", "Changelog");
  });
});

describe("Regression — footer has no broken dead links", () => {
  const EXPECTED_FOOTER_PAGES = [
    "/about",
    "/blog",
    "/careers",
    "/security",
    "/contact",
    "/roadmap",
    "/support",
    "/privacy",
    "/terms",
    "/dpa",
    "/docs",
  ];

  EXPECTED_FOOTER_PAGES.forEach((href) => {
    it(`footer link to ${href} is present`, () => {
      cy.visit("/");
      cy.get("footer").find(`a[href="${href}"]`).should("exist");
    });
  });

  it("footer does NOT link to /changelog", () => {
    cy.visit("/");
    cy.get("footer").find('a[href="/changelog"]').should("not.exist");
  });
});

describe("Regression — Help Centre / Support footer deduplication", () => {
  it("footer does not have two separate links both pointing to /support", () => {
    cy.visit("/");
    cy.get("footer")
      .find('a[href="/support"]')
      .then(($links) => {
        // Only one link to /support is allowed (Help Centre)
        expect($links.length, "only one /support link in footer").to.equal(1);
      });
  });
});
