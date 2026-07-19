// Flat ESLint config. Next 16 removed the `next lint` command, so linting now
// runs through the ESLint CLI (`npm run lint`). eslint-config-next 16 ships
// native flat-config arrays, so no FlatCompat shim is needed.
//
// Note: eslint-config-next 16's bundled eslint-plugin-react is not yet
// compatible with ESLint 10 (uses the removed context.getFilename API), which
// is why the devDependency is pinned to ESLint 9.
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "cypress/**", "next-env.d.ts"] },
  ...coreWebVitals,
  ...typescript,
  {
    // These relax rules that fire only on PRE-EXISTING patterns unrelated to
    // the Next 16 upgrade — kept out of the security PR to avoid refactoring
    // app logic. Tighten in a dedicated lint-cleanup pass.
    rules: {
      // The site deliberately uses plain <a> for all navigation (no next/link
      // anywhere). Adopting <Link> sitewide is a separate decision.
      "@next/next/no-html-link-for-pages": "off",
      // New in the React 19 hooks plugin; flags valid lazy-init-from-localStorage
      // and animation-reset effects in SurveyForm / hero-roi-animation.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;
