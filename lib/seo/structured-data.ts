/**
 * Schema.org JSON-LD builders for the marketing site.
 *
 * WHY: Google reads JSON-LD to understand what SprintHelm *is* (an entity, a
 * software product, an FAQ) rather than inferring it from prose. It powers
 * knowledge-graph eligibility (Organization), product understanding
 * (SoftwareApplication, with real pricing as offers) and FAQ rich results
 * (FAQPage). We had none of this before.
 *
 * HONESTY RULES, matching the site's own content standards:
 *   - No `aggregateRating` / `review` markup — we have no third-party ratings,
 *     and faking them is both a Google violation and a trust breach.
 *   - Prices mirror the visible pricing (planCatalog on the app side,
 *     components/sections/pricing.tsx here). If those change, change these.
 *
 * PURE: plain data builders, no React, no IO — safe to unit-test or render.
 */

import { SITE_URL, SITE_NAME, LEGAL_ENTITY, SOCIAL_LINKS } from "@/lib/site";
import { FAQS } from "@/lib/faq-content";

/** Stable @id for the Organization, so other nodes can reference one entity. */
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: LEGAL_ENTITY,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    sameAs: [...SOCIAL_LINKS],
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
  };
}

/**
 * The product itself. Offers mirror the live plan prices (EUR, monthly). Free
 * is a zero-price offer; Enterprise is contact-sales (no self-serve price) so
 * it is represented as an offer without a numeric price.
 */
export function softwareApplicationSchema(): Record<string, unknown> {
  const monthly = (price: string) => ({
    "@type": "UnitPriceSpecification",
    price,
    priceCurrency: "EUR",
    unitText: "MONTH",
  });

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Project Management",
    operatingSystem: "Web",
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    description:
      "SprintHelm forecasts software delivery before the work starts: score your backlog across six weighted factors, run a Monte Carlo simulation of the sprint, and model portfolio capacity across every project against one shared team — with an AI executive summary stakeholders read in under a minute.",
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "EUR",
        description: "Unlimited simulations, up to 15 tickets, no card required.",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "9",
        priceCurrency: "EUR",
        priceSpecification: monthly("9"),
        description: "Full Monte Carlo simulation, Jira import, AI summaries.",
      },
      {
        "@type": "Offer",
        name: "Team",
        price: "19.99",
        priceCurrency: "EUR",
        priceSpecification: monthly("19.99"),
        description: "Everything in Pro plus the Portfolio Simulator.",
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        priceCurrency: "EUR",
        description: "Custom annual contract with a named support contact and signed DPA.",
      },
    ],
  };
}

export function faqPageSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
