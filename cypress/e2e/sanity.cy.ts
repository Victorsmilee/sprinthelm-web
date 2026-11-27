/**
 * Sanity tests — the structure and the load-bearing claims of each page.
 *
 * WHY THIS FILE LOOKS THE WAY IT DOES (rewritten 2026-11-27)
 *
 * It previously pinned whole marketing sentences verbatim — "If we add this
 * feature, do we ship on time?", "From backlog to briefing in three steps",
 * "One late sprint costs more than a year of Pro". Every one of those has
 * since been rewritten, and because this repo had no CI, nothing noticed:
 * 11 of 42 assertions were failing on `main` against copy that no longer
 * existed anywhere in the codebase. A red suite that nobody runs is worse
 * than no suite, because a real regression is indistinguishable from the
 * standing noise.
 *
 * So the rules here are:
 *   1. Anchor on STRUCTURE — section ids (#hero, #problem, #portfolio,
 *      #how-it-works, #features, #demo, #pricing, #faq, #cta) and hrefs.
 *      Copy is rewritten often; a section id is a contract.
 *   2. Assert the SHORTEST distinctive fragment, not the sentence. "Velocity
 *      Trap" survives a rewrite of the sentence around it; the full sentence
 *      does not.
 *   3. Pin a full phrase ONLY where the exact wording is the point — a
 *      compliance claim or a price. Those SHOULD break the build when edited.
 *
 * Framer Motion note: `whileInView` sections start at opacity:0, so anything
 * below the fold uses scrollIntoView() + `exist`, never `be.visible`.
 */

describe("Sanity — homepage structure", () => {
  beforeEach(() => cy.visit("/"));

  // Every section that carries an id, in the order the page tells its story.
  const SECTIONS = [
    "#hero",
    "#problem",
    "#portfolio",
    "#how-it-works",
    "#features",
    "#demo",
    "#pricing",
    "#faq",
    "#cta",
  ];

  SECTIONS.forEach((id) => {
    it(`renders the ${id} section`, () => {
      cy.get(id).should("exist");
    });
  });

  it("renders the sections in narrative order", () => {
    // Problem → portfolio → how → features → demo → pricing → FAQ → CTA.
    // Guards the bug this file originally existed for (FAQ below CTA).
    cy.document().then((doc) => {
      const tops = SECTIONS.map((id) => {
        const el = doc.querySelector(id);
        expect(el, `${id} is in the DOM`).to.not.equal(null);
        return (el as HTMLElement).offsetTop;
      });
      const sorted = [...tops].sort((a, b) => a - b);
      expect(tops, "sections appear in the declared order").to.deep.equal(sorted);
    });
  });
});

describe("Sanity — homepage content", () => {
  beforeEach(() => cy.visit("/"));

  it("the hero asks the question the product answers", () => {
    cy.get("#hero").within(() => {
      cy.get("h1").should("contain.text", "deliver the product roadmap");
    });
  });

  it("the hero offers a free start and a demo", () => {
    cy.get("#hero").within(() => {
      cy.get('a[href*="/signup"]').should("exist");
      cy.get('a[href*="source=website"]').should("exist");
    });
  });

  it("names the Velocity Trap", () => {
    cy.get("#problem").scrollIntoView();
    cy.get("#problem").should("contain.text", "Velocity Trap");
  });

  it("explains the three steps", () => {
    cy.get("#how-it-works").scrollIntoView();
    cy.get("#how-it-works").should("contain.text", "three steps");
  });

  it("lists the three headline metrics", () => {
    cy.get("#features").scrollIntoView();
    cy.get("#features").within(() => {
      cy.contains("Priority Score").should("exist");
      cy.contains("Completion Probability").should("exist");
      cy.contains("Pressure Index").should("exist");
    });
  });

  it("shows all four plans", () => {
    cy.get("#pricing").scrollIntoView();
    cy.get("#pricing").within(() => {
      ["Free", "Pro", "Team", "Enterprise"].forEach((plan) => {
        cy.contains(plan).should("exist");
      });
    });
  });

  // PINNED ON PURPOSE — these are priced claims. If a price moves, this
  // SHOULD fail, so the Stripe catalog and the site cannot drift apart.
  it("prices Pro at €9 and Team at €19.99, in euros", () => {
    cy.get("#pricing").scrollIntoView();
    cy.get("#pricing").should("contain.text", "€9").and("contain.text", "€19.99");
    cy.get("#pricing").should("not.contain.text", "$");
  });

  it("states the trial length as 7 days", () => {
    cy.get("#pricing").scrollIntoView();
    cy.get("#pricing").should("contain.text", "7-day");
  });

  it("has an FAQ", () => {
    cy.get("#faq").scrollIntoView();
    cy.get("#faq").should("contain.text", "Frequently asked questions");
  });

  it("closes with a call to action in euros", () => {
    cy.get("#cta").scrollIntoView();
    cy.get("#cta").should("contain.text", "€500k").and("not.contain.text", "$");
  });
});

describe("Sanity — company pages", () => {
  it("/about has mission content", () => {
    cy.visit("/about");
    cy.contains("delivery intelligence layer").should("exist");
    cy.contains("What we believe").should("exist");
    cy.contains("Clarity over comfort").should("exist");
  });

  it("/blog has posts", () => {
    cy.visit("/blog");
    cy.contains("Blog").should("exist");
    cy.contains("45% of product launches").should("exist");
  });

  it("/careers lists the open intern roles", () => {
    cy.visit("/careers");
    cy.contains("Build the future of sprint planning").should("exist");
    // The roles actually open. The old spec also demanded "Scrum Master /
    // Project Manager Intern" and "Product Manager Intern", which were
    // removed from the page; asserting a closed role is how this file rotted.
    ["Product Designer Intern", "QA / Quality Assurance Intern", "Product Owner Intern"].forEach(
      (role) => {
        cy.contains(role).should("exist");
      },
    );
  });

  it("/contact has both contact options", () => {
    cy.visit("/contact");
    cy.contains("Get in touch").should("exist");
    cy.contains("General enquiries").should("exist");
    cy.contains("Enterprise sales").should("exist");
  });

  it("/contact/enterprise has sales content", () => {
    cy.visit("/contact/enterprise");
    cy.contains("delivery challenges").should("exist");
    cy.contains("enterprise@sprinthelm.com").should("exist");
  });

  it("/roadmap has all three columns", () => {
    cy.visit("/roadmap");
    cy.contains("What's coming to SprintHelm").should("exist");
    cy.contains("Shipped").should("exist");
    cy.contains("In Progress").should("exist");
    cy.contains("Planned").should("exist");
    cy.contains("Monte Carlo simulation").should("exist");
  });

  it("/support publishes the response-time table", () => {
    cy.visit("/support");
    cy.contains("We're here to help").should("exist");
    cy.contains("Support response times").should("exist");
    // The real SLA rows. The old spec asserted "4h P1/P2", a commitment this
    // page has never made in this form — a test demanding a promise the
    // business had not given.
    cy.contains("Best effort").should("exist");
    cy.contains("24 hours").should("exist");
    cy.contains("1 business day").should("exist");
  });
});

describe("Sanity — legal and security pages", () => {
  // PINNED ON PURPOSE. /security was deliberately rewritten to stop claiming
  // a certification we do not hold; the old spec asserted "Enterprise-grade
  // security", so restoring that overclaim would have made the suite greener.
  // This asserts the honest version, and fails if the page starts overclaiming.
  it("/security says plainly that SOC 2 is not certified", () => {
    cy.visit("/security");
    cy.contains("We are not SOC 2 certified").should("exist");
    // The overclaims this page was rewritten to remove. Asserting their
    // ABSENCE is the point: a well-meaning copy edit that reinstates
    // "Enterprise-grade security" or claims the certification should fail CI,
    // because it is a compliance statement, not a tagline.
    cy.get("body").should("not.contain.text", "Enterprise-grade security");
    cy.get("body").should("not.contain.text", "We are SOC 2 certified");
    cy.get("body").should("not.contain.text", "SOC 2 compliant");
  });

  it("/security still documents the controls it does have", () => {
    cy.visit("/security");
    cy.contains("Encryption").should("exist");
    cy.contains("TLS 1.3").should("exist");
    cy.contains("Sub-processors").should("exist");
  });

  it("/docs has four documentation sections", () => {
    cy.visit("/docs");
    cy.contains("Documentation").should("exist");
    cy.contains("Getting started").should("exist");
    cy.contains("Features").should("exist");
    cy.contains("Integrations").should("exist");
    cy.contains("API reference").should("exist");
  });

  it("/dpa has DPA sections", () => {
    cy.visit("/dpa");
    cy.contains("Data Processing Agreement").should("exist");
    cy.contains("Parties").should("exist");
    cy.contains("Scope of Processing").should("exist");
    cy.contains("enterprise@sprinthelm.com").should("exist");
  });

  it("/privacy renders with content", () => {
    cy.visit("/privacy");
    cy.contains("Privacy Policy").should("exist");
    cy.title().should("not.match", /404/i);
  });

  it("/terms renders with content", () => {
    cy.visit("/terms");
    cy.contains("Terms of Service").should("exist");
    cy.title().should("not.match", /404/i);
  });

  it("the legal pages carry the operating entity", () => {
    // The entity on the contract. If this changes, every legal page must
    // change together, so it is worth one assertion per document.
    ["/terms", "/privacy", "/dpa"].forEach((path) => {
      cy.visit(path);
      cy.get("body").should("contain.text", "Eben EIO Global");
    });
  });
});
