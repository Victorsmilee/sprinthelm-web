/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next emits inline streaming/RSC payloads whose content varies per
      // request — same constraint as the app repo's CSP. Removing
      // 'unsafe-inline' here cleanly would require nonce-based CSP via
      // middleware (separate work).
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      // Hero/blog cards reference remote images (Unsplash, etc.); data: covers
      // inline SVGs.
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      // formspree.io is the survey backend (see components/survey/SurveyForm.tsx).
      "connect-src 'self' https://formspree.io",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://formspree.io",
    ].join("; "),
  },
];

const nextConfig = {
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
