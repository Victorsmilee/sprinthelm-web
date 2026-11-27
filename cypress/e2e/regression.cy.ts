/**
 * Regression tests — specific bugs that were fixed, guarded so they stay fixed.
 *
 *   1. FAQ must appear before the CTA section on the homepage
 *   2. CTAs point at the live app, never the old /signup page or Streamlit
 *   3. Footer has no Changelog link
 *   4. Footer has no duplicate Support / Help Centre entries
 *   5. Footer links to every page it claims to
 *
 * REWRITTEN 2026-11-27. Three of these tests located their target by matching
 * the sentence "Run your first simulation", which no longer exists — the hero
 * was redesigned to lead on the portfolio, so its buttons are now "See your
 * portfolio forecast, free" / "Watch the portfolio demo", and "Run your first
 * forecast, free" moved to the closing CTA section. The tests were therefore
 * not just failing, they were pointed at the wrong section of the page.
 *
 * They also asserted `href === "https://app.sprinthelm.com/signup"` while the
 * real links carry a plan: `?plan=free`. Fixed to assert the prefix plus the
 * plan, so adding a tracking param does not break the build but dropping the
 * plan does.
 *
 * Targets are now section ids (#hero, #faq, #cta) rather than copy.
 */

const APP_SIGNUP = "https://app.sprinthelm.com/signup";

describe("Regression — homepage section order", () => {
  it("FAQ section appears before the CTA section in the DOM", () => {
    cy.visit("/");
    cy.document().then((doc) => {
      const faq = doc.querySelector("#faq") as HTMLElement | null;
      const cta = doc.querySelector("#cta") as HTMLElement | null;
      expect(faq, "#faq is in the DOM").to.not.equal(null);
      expect(cta, "#cta is in the DOM").to.not.equal(null);
      expect(faq!.offsetTop, "FAQ renders above CTA").to.be.lessThan(cta!.offsetTop);
    });
  });
});

describe("Regression — hero CTA URLs", () => {
  beforeEach(() => cy.visit("/"));

  it("the hero signup CTA points at the app, with a plan", () => {
    cy.get("#hero")
      .find('a[href*="/signup"]')
      .first()
      .invoke("attr", "href")
      .should((href) => {
        expect(href).to.contain(APP_SIGNUP);
        expect(href, "carries a plan so the funnel knows what was clicked").to.match(
          /[?&]plan=(free|pro|team)/,
        );
      });
  });

  it("the hero signup CTA does NOT point at the old relative /signup page", () => {
    cy.get("#hero")
      .find('a[href*="/signup"]')
      .each(($a) => {
        expect($a.attr("href"), "absolute app URL, not a relative path").to.not.match(
          /^\/signup/,
        );
      });
  });

  it("the hero demo CTA opens the app in website-demo mode", () => {
    cy.get("#hero")
      .find('a[href*="source=website"]')
      .first()
      .invoke("attr", "href")
      .should((href) => {
        expect(href).to.contain("app.sprinthelm.com");
        expect(href).to.contain("source=website");
      });
  });

  it("no CTA anywhere on the homepage points at Streamlit", () => {
    // The original bug: the demo links went to a Streamlit prototype.
    cy.get('a[href^="http"]').each(($a) => {
      expect($a.attr("href") ?? "", "no Streamlit links remain").to.not.include("streamlit");
    });
  });
});

describe("Regression — closing CTA section URLs", () => {
  beforeEach(() => cy.visit("/"));

  it("the CTA section signup button points at the app, with a plan", () => {
    cy.get("#cta").scrollIntoView();
    cy.get("#cta")
      .find('a[href*="/signup"]')
      .first()
      .invoke("attr", "href")
      .should((href) => {
        expect(href).to.contain(APP_SIGNUP);
        expect(href).to.match(/[?&]plan=(free|pro|team)/);
      });
  });

  it("the CTA section demo link does NOT point at Streamlit", () => {
    cy.get("#cta").scrollIntoView();
    cy.get("#cta")
      .find('a[href*="source=website"]')
      .first()
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
        expect($links.length, "only one /support link in footer").to.equal(1);
      });
  });
});
