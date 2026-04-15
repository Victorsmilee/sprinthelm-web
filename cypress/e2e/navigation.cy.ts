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

describe("Navigation — footer anchor links use absolute hash paths", () => {
  it("footer Backlog Scoring link uses /#features (absolute hash)", () => {
    cy.visit("/");
    cy.get("footer").find('a[href="/#features"]').first().should("exist");
  });

  it("footer Pricing link uses /#pricing (absolute hash)", () => {
    cy.visit("/");
    cy.get("footer").find('a[href="/#pricing"]').first().should("exist");
  });

  it("footer Pricing link from /roadmap navigates to homepage pricing section", () => {
    cy.visit("/roadmap");
    cy.get("footer").find('a[href="/#pricing"]').first().click();
    cy.url().should("match", /\/#pricing$|\/$/);
    cy.get("#pricing").should("exist");
  });

  it("footer product links from /blog navigate to homepage features section", () => {
    cy.visit("/blog");
    cy.get("footer").find('a[href="/#features"]').first().click();
    cy.url().should("match", /\/#features$|\/$/);
    cy.get("#features").should("exist");
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

  it("careers page speculative CTA uses training@victoribrahim.com", () => {
    cy.visit("/careers");
    cy.contains("Send a speculative application")
      .closest("a")
      .should("have.attr", "href")
      .and("include", "mailto:training@victoribrahim.com");
  });

  it("security page enterprise CTA has correct mailto (.com)", () => {
    cy.visit("/security");
    cy.get('a[href="mailto:enterprise@sprinthelm.com"]').should("exist");
  });

  it("dpa page request CTA has correct mailto (.com)", () => {
    cy.visit("/dpa");
    cy.contains("Request DPA")
      .closest("a")
      .should("have.attr", "href")
      .and("include", "mailto:enterprise@sprinthelm.com");
  });

  it("contact/enterprise page uses enterprise@sprinthelm.com (.com)", () => {
    cy.visit("/contact/enterprise");
    cy.get('a[href="mailto:enterprise@sprinthelm.com"]').should("exist");
  });

  it("support page enterprise contact uses enterprise@sprinthelm.com (.com)", () => {
    cy.visit("/support");
    cy.get('a[href="mailto:enterprise@sprinthelm.com"]').should("exist");
  });

  it("no .io email addresses exist anywhere on the site", () => {
    const PAGES = ["/", "/support", "/docs", "/contact/enterprise", "/security", "/dpa"];
    PAGES.forEach((page) => {
      cy.visit(page);
      cy.get("body").should("not.contain.text", "sprinthelm.io");
    });
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

describe("Navigation — Company dropdown in header", () => {
  it("header contains a Company nav item", () => {
    cy.visit("/");
    cy.get("header").contains("Company").should("exist");
  });

  it("Company dropdown contains all five company links", () => {
    cy.visit("/");
    cy.get("header").contains("Company").trigger("mouseover");
    cy.get("header").find('a[href="/about"]').should("exist");
    cy.get("header").find('a[href="/blog"]').should("exist");
    cy.get("header").find('a[href="/careers"]').should("exist");
    cy.get("header").find('a[href="/security"]').should("exist");
    cy.get("header").find('a[href="/contact"]').should("exist");
  });

  it("Company dropdown is present on non-homepage pages", () => {
    cy.visit("/blog");
    cy.get("header").contains("Company").should("exist");
    cy.visit("/docs");
    cy.get("header").contains("Company").should("exist");
  });
});

describe("Navigation — footer Company column", () => {
  it("footer has Company heading with all five links", () => {
    cy.visit("/");
    cy.get("footer").contains("Company").should("exist");
    cy.get("footer").find('a[href="/about"]').should("exist");
    cy.get("footer").find('a[href="/blog"]').should("exist");
    cy.get("footer").find('a[href="/careers"]').should("exist");
    cy.get("footer").find('a[href="/security"]').should("exist");
    cy.get("footer").find('a[href="/contact"]').should("exist");
  });
});
