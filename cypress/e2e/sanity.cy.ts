/**
 * Sanity tests — key content is present on each page.
 * Catches copy regressions, wrong page rendering, and missing sections.
 *
 * Note: Framer Motion `whileInView` animations start at opacity:0 until
 * scrolled into view. We use scrollIntoView() + exist (not be.visible) for
 * animated sections to keep tests stable without fighting animation timing.
 */

describe("Sanity — homepage sections", () => {
  beforeEach(() => cy.visit("/"));

  it("renders the hero headline", () => {
    cy.contains("If we add this feature, do we ship on time?").should("be.visible");
  });

  it("renders the hero primary CTA", () => {
    cy.contains("Run your first simulation").should("be.visible");
  });

  it("renders the hero secondary CTA", () => {
    cy.contains("See a live demo").should("be.visible");
  });

  it("renders the Problem section", () => {
    cy.contains("The Velocity Trap is real").scrollIntoView();
    cy.contains("The Velocity Trap is real").should("exist");
  });

  it("renders the How It Works section", () => {
    cy.contains("From backlog to briefing in three steps").scrollIntoView();
    cy.contains("From backlog to briefing in three steps").should("exist");
  });

  it("renders the Features section", () => {
    cy.get("#features").scrollIntoView();
    cy.contains("Ship the right things").should("exist");
    cy.contains("Priority Score").should("exist");
    cy.contains("Completion Probability").should("exist");
    cy.contains("Pressure Index").should("exist");
  });

  it("renders the Pricing section", () => {
    cy.get("#pricing").scrollIntoView();
    cy.contains("One late sprint costs more than a year of Pro").should("exist");
    cy.contains("Free").should("exist");
    cy.contains("Pro").should("exist");
  });

  it("renders the FAQ section", () => {
    cy.get("#faq").scrollIntoView();
    cy.contains("Frequently asked questions").should("exist");
  });

  it("renders the CTA section", () => {
    cy.contains("Stop making $500k delivery decisions on intuition").scrollIntoView();
    cy.contains("Stop making $500k delivery decisions on intuition").should("exist");
  });
});

describe("Sanity — new pages content", () => {
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

  it("/careers has open roles", () => {
    cy.visit("/careers");
    cy.contains("Build the future of sprint planning").should("exist");
    cy.contains("Senior Full-Stack Engineer").should("exist");
    cy.contains("Product Designer").should("exist");
  });

  it("/security has security sections", () => {
    cy.visit("/security");
    cy.contains("Enterprise-grade security").should("exist");
    cy.contains("Encryption").should("exist");
    cy.contains("TLS 1.3").should("exist");
    cy.contains("SOC 2").should("exist");
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
    cy.contains("enterprise@sprinthelm.io").should("exist");
  });

  it("/roadmap has all three columns", () => {
    cy.visit("/roadmap");
    cy.contains("What's coming to SprintHelm").should("exist");
    cy.contains("Shipped").should("exist");
    cy.contains("In Progress").should("exist");
    cy.contains("Planned").should("exist");
    cy.contains("Monte Carlo simulation").should("exist");
  });

  it("/support has SLA table", () => {
    cy.visit("/support");
    cy.contains("We're here to help").should("exist");
    cy.contains("Support response times").should("exist");
    cy.contains("4h P1/P2").should("exist");
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
    cy.contains("enterprise@sprinthelm.io").should("exist");
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
});
