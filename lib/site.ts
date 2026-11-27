/**
 * Canonical site-level constants. One source of truth for the marketing
 * domain, brand name, operating entity and social profiles, so metadata,
 * sitemap, robots and JSON-LD can never disagree about who we are or where we
 * live.
 */

/** The marketing site origin — NOT app.sprinthelm.com (the product lives there). */
export const SITE_URL = "https://sprinthelm.com";

export const SITE_NAME = "SprintHelm";

/** The operating/contracting entity — matches the DPA, Privacy Policy and emails. */
export const LEGAL_ENTITY = "Eben EIO Global OÜ";

/** Public profiles, used for Organization `sameAs` (helps entity/knowledge-graph SEO). */
export const SOCIAL_LINKS = [
  "https://github.com/sprinthelm",
  "https://linkedin.com/company/sprinthelm",
  "https://twitter.com/sprinthelm",
] as const;
