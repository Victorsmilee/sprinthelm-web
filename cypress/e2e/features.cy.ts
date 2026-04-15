/**
 * Feature tests — blog modal, docs search + modal, support modal.
 * Covers new functionality added in fix/blog-docs-nav-email-search.
 */

// ─── Blog modal ────────────────────────────────────────────────────────────

describe("Blog — post modal", () => {
  beforeEach(() => cy.visit("/blog"));

  it("blog page renders all 6 post cards", () => {
    cy.get("button").filter(":contains('Read post'), :contains('45% of product launches'), :contains('Monte Carlo in plain English'), :contains('stakeholder briefing'), :contains('Estimation risk'), :contains('what-if analysis'), :contains('Pressure Index')")
      .should("have.length.at.least", 6);
  });

  it("clicking a post card opens the modal", () => {
    cy.contains("Why 45% of product launches").closest("button").click();
    cy.get("dialog[open]").should("exist");
  });

  it("modal contains the post title", () => {
    cy.contains("Why 45% of product launches").closest("button").click();
    cy.get("dialog[open]").within(() => {
      cy.contains("Why 45% of product launches").should("be.visible");
    });
  });

  it("modal contains the full article body (not just excerpt)", () => {
    cy.contains("Why 45% of product launches").closest("button").click();
    cy.get("dialog[open]").within(() => {
      // The full article has headings — excerpt does not
      cy.get("h2").should("exist");
    });
  });

  it("modal has a close button", () => {
    cy.contains("Why 45% of product launches").closest("button").click();
    cy.get("dialog[open]").within(() => {
      cy.get("button[aria-label='Close article']").should("exist");
    });
  });

  it("close button dismisses the modal", () => {
    cy.contains("Why 45% of product launches").closest("button").click();
    cy.get("dialog[open]").should("exist");
    cy.get("button[aria-label='Close article']").click();
    cy.get("dialog[open]").should("not.exist");
  });

  it("modal body is scrollable (overflow-y-auto applied)", () => {
    cy.contains("Why 45% of product launches").closest("button").click();
    cy.get("dialog[open]").find(".overflow-y-auto").should("exist");
  });

  it("second post opens with its own content", () => {
    cy.contains("Monte Carlo in plain English").closest("button").click();
    cy.get("dialog[open]").within(() => {
      cy.contains("Monte Carlo in plain English").should("be.visible");
      cy.get("h2").first().should("exist");
    });
  });

  it("all 6 post cards are clickable buttons (not anchor tags)", () => {
    // Posts should be buttons that open modals, not href links to "#"
    cy.get("section").last().prev()
      .find("button")
      .should("have.length.at.least", 6);
  });
});

// ─── Docs search ───────────────────────────────────────────────────────────

describe("Docs — search functionality", () => {
  beforeEach(() => cy.visit("/docs"));

  it("search input is present and accepts text", () => {
    cy.get('input[type="search"]').should("exist").type("Monte Carlo");
    cy.get('input[type="search"]').should("have.value", "Monte Carlo");
  });

  it("typing a query filters visible doc links", () => {
    cy.get('input[type="search"]').type("Monte Carlo");
    cy.contains("Running a Monte Carlo simulation").should("be.visible");
    // Other unrelated links should not appear
    cy.contains("Jira integration").should("not.exist");
  });

  it("shows result count when searching", () => {
    cy.get('input[type="search"]').type("Monte Carlo");
    cy.contains(/\d+ result/).should("be.visible");
  });

  it("shows no-results message for an unmatched query", () => {
    cy.get('input[type="search"]').type("xyzzy_nonexistent_query_abc");
    cy.contains("No results found").should("be.visible");
  });

  it("clearing the search restores all sections", () => {
    cy.get('input[type="search"]').type("Monte Carlo");
    cy.contains("Jira integration").should("not.exist");
    cy.get('input[type="search"]').clear();
    cy.contains("Getting started").should("be.visible");
    cy.contains("Features").should("be.visible");
    cy.contains("Integrations").should("be.visible");
    cy.contains("API reference").should("be.visible");
  });

  it("search matches section names", () => {
    cy.get('input[type="search"]').type("API reference");
    cy.contains("API reference").should("be.visible");
  });

  it("search matches content inside doc articles", () => {
    // "bcrypt" appears inside the doc content but not in the label
    cy.get('input[type="search"]').type("bcrypt");
    cy.contains(/\d+ result/).should("be.visible");
  });
});

// ─── Docs modal ────────────────────────────────────────────────────────────

describe("Docs — doc viewer modal", () => {
  beforeEach(() => cy.visit("/docs"));

  it("clicking a doc link opens the modal", () => {
    cy.contains("Quick start guide").click();
    cy.get("dialog[open]").should("exist");
  });

  it("modal shows the doc title", () => {
    cy.contains("Quick start guide").click();
    cy.get("dialog[open]").within(() => {
      cy.contains("Quick start guide").should("be.visible");
    });
  });

  it("modal contains article content (headings)", () => {
    cy.contains("Quick start guide").click();
    cy.get("dialog[open]").within(() => {
      cy.get("h2").should("exist");
    });
  });

  it("modal has a close button", () => {
    cy.contains("Quick start guide").click();
    cy.get("dialog[open]").within(() => {
      cy.get("button[aria-label='Close document']").should("exist");
    });
  });

  it("close button dismisses the doc modal", () => {
    cy.contains("Quick start guide").click();
    cy.get("dialog[open]").should("exist");
    cy.get("button[aria-label='Close document']").click();
    cy.get("dialog[open]").should("not.exist");
  });

  it("modal shows section breadcrumb", () => {
    cy.contains("Quick start guide").click();
    cy.get("dialog[open]").within(() => {
      cy.contains("Getting started").should("be.visible");
    });
  });

  it("AI Executive Summary doc opens with correct content", () => {
    cy.contains("AI Executive Summary").click();
    cy.get("dialog[open]").within(() => {
      cy.contains("AI Executive Summary").should("be.visible");
      cy.get("h2").should("exist");
    });
  });

  it("doc modal body is scrollable", () => {
    cy.contains("Quick start guide").click();
    cy.get("dialog[open]").find(".overflow-y-auto").should("exist");
  });
});

// ─── Support modal ─────────────────────────────────────────────────────────

describe("Support — topic link modal", () => {
  beforeEach(() => cy.visit("/support"));

  it("clicking a topic link opens the modal", () => {
    cy.contains("How to import your backlog").click();
    cy.get("dialog[open]").should("exist");
  });

  it("modal shows the topic title", () => {
    cy.contains("How to import your backlog").click();
    cy.get("dialog[open]").within(() => {
      cy.contains("How to import your backlog").should("be.visible");
    });
  });

  it("modal contains article content", () => {
    cy.contains("How to import your backlog").click();
    cy.get("dialog[open]").within(() => {
      cy.get("h2").should("exist");
    });
  });

  it("close button dismisses the support modal", () => {
    cy.contains("How to import your backlog").click();
    cy.get("dialog[open]").should("exist");
    cy.get("button[aria-label='Close document']").click();
    cy.get("dialog[open]").should("not.exist");
  });

  it("Plans & billing topic opens the correct article", () => {
    cy.contains("What\u2019s included in Free vs Pro").click();
    cy.get("dialog[open]").within(() => {
      cy.contains("Free vs Pro").should("exist");
      cy.contains("Pro plan").should("exist");
    });
  });

  it("Account & security topic opens the correct article", () => {
    cy.contains("Security overview").click();
    cy.get("dialog[open]").within(() => {
      cy.contains("Security overview").should("be.visible");
      cy.get("h2").should("exist");
    });
  });

  it("all topic links are buttons (not dead # hrefs)", () => {
    // cy.contains(selector, text) finds the element matching the selector that contains the text.
    // Must use the two-arg form — cy.contains(text) returns the deepest match (a <span>), not the button.
    cy.contains("button", "How to import your backlog").should("exist");
  });
});

// ─── Email .com enforcement ────────────────────────────────────────────────

describe("Email addresses — .com enforcement", () => {
  const PAGES_WITH_ENTERPRISE_EMAIL = [
    "/support",
    "/contact/enterprise",
    "/security",
    "/dpa",
  ];

  PAGES_WITH_ENTERPRISE_EMAIL.forEach((page) => {
    it(`${page} uses enterprise@sprinthelm.com`, () => {
      cy.visit(page);
      cy.contains("enterprise@sprinthelm.com").should("exist");
      cy.get("body").should("not.contain.text", "enterprise@sprinthelm.io");
    });
  });
});

// ─── Nav anchor links ─────────────────────────────────────────────────────

describe("Nav anchor links — cross-page navigation", () => {
  it("nav 'Pricing' uses /#pricing absolute hash", () => {
    cy.visit("/blog");
    cy.get("header").find('a[href="/#pricing"]').should("exist");
  });

  it("nav 'How It Works' uses /#how-it-works absolute hash", () => {
    cy.visit("/roadmap");
    cy.get("header").find('a[href="/#how-it-works"]').should("exist");
  });

  it("nav product dropdown uses /#features absolute hash", () => {
    cy.visit("/docs");
    // Hover over Product to open dropdown
    cy.get("header").contains("Product").trigger("mouseover");
    cy.get("header").find('a[href="/#features"]').first().should("exist");
  });
});
