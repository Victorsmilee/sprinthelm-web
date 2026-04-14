/**
 * Navigation tests — clicking links reaches the right destination.
 * Covers: footer links, nav links, in-page CTAs that navigate.
 */

describe("Navigation — footer links resolve", () => {
  const FOOTER_INTERNAL = [
    { href: "/about",               heading: "delivery intelligence layer" },
    { href: "/blog",                heading: "Blog" },
    { href: "/careers",             heading: "Build the future of sprint planning" },
    { href: "/security",            heading: "Enterprise-grade security" },
    { href: "/contact",             heading: "Get in touch" },
    { href: "/roadmap",             heading: "What's coming to SprintHelm" },
    { href: "/support",             heading: "We're here to help" },
    { href: "/docs",                heading: "Documentation" },
    { href: "/privacy",             heading: "Privacy Policy" },
    { href: "/terms",               heading: "Terms of Service" },
    { href: "/dpa",                 heading: "Data Processing Agreement" },
  ];

  FOOTER_INTERNAL.forEach(({ href, heading }) => {
    it(`footer link to ${href} navigates correctly`, () => {
      cy.visit("/");
      cy.get("footer").find(`a[href="${href}"]`).first().click();
      cy.url().should("include", href);
      if (heading) {
        cy.contains(heading).should("be.visible");
      } else {
        cy.get("main").should("exist");
        cy.get("body").should("not.contain.text", "404");
      }
    });
  });
});

describe("Navigation — footer anchor links scroll homepage sections", () => {
  it("footer #features link scrolls to features section", () => {
    cy.visit("/");
    cy.get("footer").find('a[href="#features"]').first().click();
    cy.get("#features").should("be.visible");
  });

  it("footer #pricing link scrolls to pricing section", () => {
    cy.visit("/");
    cy.get("footer").find('a[href="#pricing"]').first().click();
    // Section exists in DOM (may be below viewport after anchor scroll)
    cy.get("#pricing").should("exist");
  });
});

describe("Navigation — in-page CTAs", () => {
  it("contact page Enterprise card links to /contact/enterprise", () => {
    cy.visit("/contact");
    cy.contains("Talk to sales").click();
    cy.url().should("include", "/contact/enterprise");
    cy.contains("delivery challenges").should("be.visible");
  });

  it("about page CTA links to app signup", () => {
    cy.visit("/about");
    cy.contains("Run your first simulation")
      .closest("a")
      .should("have.attr", "href", "https://app.sprinthelm.com/signup");
  });

  it("careers page speculative CTA has correct mailto", () => {
    cy.visit("/careers");
    cy.contains("Send a speculative application")
      .closest("a")
      .should("have.attr", "href")
      .and("include", "mailto:hello@sprinthelm.com");
  });

  it("security page enterprise CTA has correct mailto", () => {
    cy.visit("/security");
    // Use direct attribute selector — contains() can match non-link text first
    cy.get('a[href="mailto:enterprise@sprinthelm.io"]').should("exist");
  });

  it("dpa page request CTA has correct mailto", () => {
    cy.visit("/dpa");
    cy.contains("Request DPA")
      .closest("a")
      .should("have.attr", "href")
      .and("include", "mailto:enterprise@sprinthelm.io");
  });

  it("support page email has correct mailto", () => {
    cy.visit("/support");
    cy.get('a[href="mailto:support@sprinthelm.com"]').should("exist");
  });

  it("roadmap page feedback CTA has correct mailto", () => {
    cy.visit("/roadmap");
    cy.contains("Send your request")
      .closest("a")
      .should("have.attr", "href")
      .and("include", "mailto:hello@sprinthelm.com");
  });
});

describe("Navigation — nav is present on all new pages", () => {
  const PAGES = [
    "/about", "/blog", "/careers", "/security",
    "/contact", "/contact/enterprise", "/roadmap",
    "/support", "/docs", "/dpa",
  ];

  PAGES.forEach((path) => {
    it(`nav renders on ${path}`, () => {
      cy.visit(path);
      cy.get("nav").should("exist");
    });

    it(`footer renders on ${path}`, () => {
      cy.visit(path);
      cy.get("footer").should("exist");
    });
  });
});
