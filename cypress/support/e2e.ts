// Global support file — runs before every spec.
// Add custom commands or global before/after hooks here.

// Suppress uncaught exceptions from third-party scripts (Framer Motion hydration
// warnings in dev mode, etc.) so they don't fail tests unnecessarily.
Cypress.on("uncaught:exception", (err) => {
  // Allow real assertion failures to still fail the test
  if (err.message.includes("ResizeObserver") || err.message.includes("hydrat")) {
    return false;
  }
  return true;
});
