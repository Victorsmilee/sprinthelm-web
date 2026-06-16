/**
 * Careers & Company Nav tests
 *
 * Covers:
 *  1 — Nav "Company" dropdown (desktop hover)
 *  2 — Footer "Company" column links
 *  3 — Careers page intern roles + job description modal
 */

// ─── 1. Nav — Company dropdown ───────────────────────────────────────────────

describe("Nav — Company dropdown", () => {
  beforeEach(() => cy.visit("/"));

  it("Company button exists in the nav header", () => {
    cy.get("header").contains("Company").should("exist");
  });

  it("hovering Company reveals the dropdown", () => {
    cy.get("header").contains("Company").trigger("mouseover");
    cy.get("header").contains("About").should("be.visible");
    cy.get("header").contains("Blog").should("be.visible");
    cy.get("header").contains("Careers").should("be.visible");
    cy.get("header").contains("Security").should("be.visible");
    cy.get("header").contains("Contact").should("be.visible");
  });

  it("Company dropdown About link uses /about href", () => {
    cy.get("header").contains("Company").trigger("mouseover");
    cy.get("header").find('a[href="/about"]').should("exist");
  });

  it("Company dropdown Blog link uses /blog href", () => {
    cy.get("header").contains("Company").trigger("mouseover");
    cy.get("header").find('a[href="/blog"]').should("exist");
  });

  it("Company dropdown Careers link uses /careers href", () => {
    cy.get("header").contains("Company").trigger("mouseover");
    cy.get("header").find('a[href="/careers"]').should("exist");
  });

  it("Company dropdown Security link uses /security href", () => {
    cy.get("header").contains("Company").trigger("mouseover");
    cy.get("header").find('a[href="/security"]').should("exist");
  });

  it("Company dropdown Contact link uses /contact href", () => {
    cy.get("header").contains("Company").trigger("mouseover");
    cy.get("header").find('a[href="/contact"]').should("exist");
  });

  it("clicking About in Company dropdown navigates to /about", () => {
    cy.get("header").contains("Company").trigger("mouseover");
    cy.get("header").find('a[href="/about"]').first().click();
    cy.url().should("include", "/about");
    cy.contains("delivery intelligence layer").should("exist");
  });

  it("clicking Careers in Company dropdown navigates to /careers", () => {
    cy.get("header").contains("Company").trigger("mouseover");
    cy.get("header").find('a[href="/careers"]').first().click();
    cy.url().should("include", "/careers");
    cy.contains("Build the future of sprint planning").should("exist");
  });
});

// ─── 2. Footer — Company column ──────────────────────────────────────────────

describe("Footer — Company column links", () => {
  beforeEach(() => cy.visit("/"));

  it("footer has a Company section", () => {
    cy.get("footer").contains("Company").should("exist");
  });

  it("footer Company section has About link", () => {
    cy.get("footer").find('a[href="/about"]').should("exist");
  });

  it("footer Company section has Blog link", () => {
    cy.get("footer").find('a[href="/blog"]').should("exist");
  });

  it("footer Company section has Careers link", () => {
    cy.get("footer").find('a[href="/careers"]').should("exist");
  });

  it("footer Company section has Security link", () => {
    cy.get("footer").find('a[href="/security"]').should("exist");
  });

  it("footer Company section has Contact link", () => {
    cy.get("footer").find('a[href="/contact"]').should("exist");
  });

  it("footer Careers link navigates to /careers", () => {
    cy.get("footer").find('a[href="/careers"]').first().click();
    cy.url().should("include", "/careers");
    cy.contains("Build the future of sprint planning").should("be.visible");
  });

  it("nav and footer both have Company links — consistent across the site", () => {
    cy.get("header").contains("Company").should("exist");
    cy.get("footer").contains("Company").should("exist");
  });
});

// ─── 3. Careers page — intern roles + modal ──────────────────────────────────

describe("Careers — intern roles", () => {
  beforeEach(() => cy.visit("/careers"));

  it("renders the careers hero heading", () => {
    cy.contains("Build the future of sprint planning").should("be.visible");
  });

  it("renders the SprintHelm Build Team badge", () => {
    cy.contains("SprintHelm Build Team").should("exist");
  });

  it("renders all 3 intern role cards", () => {
    cy.contains("Product Designer Intern").should("exist");
    cy.contains("QA / Quality Assurance Intern").should("exist");
    cy.contains("Product Owner Intern").should("exist");
  });

  it("role cards are buttons (not anchor tags)", () => {
    cy.contains("button", "Product Designer Intern").should("exist");
    cy.contains("button", "QA / Quality Assurance Intern").should("exist");
    cy.contains("button", "Product Owner Intern").should("exist");
  });

  it("roles show Remote location and Part-time type", () => {
    cy.get("section").contains("Open roles").closest("section").within(() => {
      cy.contains("Remote").should("exist");
      cy.contains("Part-time").should("exist");
    });
  });

  it("speculative CTA uses hello@sprinthelm.com", () => {
    cy.get('a[href*="mailto:hello@sprinthelm.com"]').should("exist");
  });
});

describe("Careers — job description modal", () => {
  beforeEach(() => cy.visit("/careers"));

  it("clicking a role card opens the job description modal", () => {
    cy.contains("button", "QA / Quality Assurance Intern").click();
    cy.get("dialog[open]").should("exist");
  });

  it("modal shows the role title", () => {
    cy.contains("button", "QA / Quality Assurance Intern").click();
    cy.get("dialog[open]").within(() => {
      cy.contains("QA / Quality Assurance Intern").should("be.visible");
    });
  });

  it("modal contains the full job description", () => {
    cy.contains("button", "QA / Quality Assurance Intern").click();
    cy.get("dialog[open]").within(() => {
      cy.contains("About the role").should("exist");
      cy.contains("What you'll do").should("exist");
      cy.contains("What you'll learn").should("exist");
    });
  });

  it("modal has an Apply via email CTA showing hello@sprinthelm.com", () => {
    cy.contains("button", "QA / Quality Assurance Intern").click();
    cy.get("dialog[open]").within(() => {
      cy.contains("button", "Apply via email").should("exist");
      cy.contains("hello@sprinthelm.com").should("exist");
    });
  });

  it("modal body is scrollable", () => {
    cy.contains("button", "Product Designer Intern").click();
    cy.get("dialog[open]").find(".overflow-y-auto").should("exist");
  });

  it("modal has a close button", () => {
    cy.contains("button", "QA / Quality Assurance Intern").click();
    cy.get("dialog[open]").within(() => {
      cy.get("button[aria-label='Close job description']").should("exist");
    });
  });

  it("close button dismisses the modal", () => {
    cy.contains("button", "QA / Quality Assurance Intern").click();
    cy.get("dialog[open]").should("exist");
    cy.get("button[aria-label='Close job description']").click();
    cy.get("dialog[open]").should("not.exist");
  });

  it("Product Owner Intern modal shows its own content", () => {
    cy.contains("button", "Product Owner Intern").click();
    cy.get("dialog[open]").within(() => {
      cy.contains("Product Owner Intern").should("be.visible");
    });
  });

  it("Product Designer Intern modal shows design-specific content", () => {
    cy.contains("button", "Product Designer Intern").click();
    cy.get("dialog[open]").within(() => {
      cy.contains("Product Designer Intern").should("be.visible");
      cy.contains("two products").should("exist");
    });
  });

  // ── Deep linking + Copy-link button (feat/careers-deeplink-email-cv) ──

  it("clicking a role card updates the URL with ?role=<slug>", () => {
    cy.get('[data-testid="role-card-product-designer"]').click();
    cy.location("search").should("eq", "?role=product-designer");
  });

  it("visiting /careers?role=qa auto-opens the QA modal", () => {
    cy.visit("/careers?role=qa");
    cy.get("dialog[open]")
      .should("exist")
      .within(() => {
        cy.contains("QA / Quality Assurance Intern").should("be.visible");
      });
  });

  it("modal has a Copy link button that confirms with 'Copied' on click", () => {
    cy.contains("button", "Product Owner Intern").click();
    cy.get('[data-testid="copy-role-link"]').click();
    cy.get('[data-testid="copy-role-link"]').should("contain.text", "Copied");
  });

  it("closing the modal clears the ?role= query param", () => {
    cy.visit("/careers?role=qa");
    cy.get("dialog[open]").should("exist");
    cy.get("button[aria-label='Close job description']").click();
    cy.location("search").should("eq", "");
  });

  it("modal shows the 'What to send' callout in the body (always visible, not hidden on mobile)", () => {
    cy.contains("button", "QA / Quality Assurance Intern").click();
    cy.get("dialog[open]").within(() => {
      // Callout lives at the bottom of the scrollable body. Scroll to it
      // before asserting visibility — its presence in the DOM proves it's
      // no longer behind the desktop-only `hidden sm:block` of the old
      // footer microcopy.
      cy.contains("What to send:").scrollIntoView().should("be.visible");
    });
  });
});
