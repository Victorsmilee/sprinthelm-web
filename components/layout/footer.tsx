import { Zap, Github, Linkedin, Twitter } from "lucide-react";

const PRODUCT_LINKS = [
  { label: "Backlog Scoring",        href: "#features" },
  { label: "Monte Carlo Simulation", href: "#features" },
  { label: "Pressure Index",         href: "#features" },
  { label: "AI Executive Summary",   href: "#features" },
  { label: "Epic Forecasting",       href: "#features", soon: true },
  { label: "Team Benchmarking",      href: "#features", soon: true },
  { label: "Changelog",              href: "/changelog" },
  { label: "Roadmap",                href: "/roadmap" },
];

const COMPANY_LINKS = [
  { label: "About",    href: "/about" },
  { label: "Blog",     href: "/blog" },
  { label: "Careers",  href: "/careers" },
  { label: "Security", href: "/security" },
  { label: "Status",   href: "https://status.sprinthelm.com" },
  { label: "Contact",  href: "/contact" },
];

const SUPPORT_LINKS = [
  { label: "Documentation",              href: "/docs" },
  { label: "Help Centre",               href: "/support" },
  { label: "Support",                   href: "/support" },
  { label: "Privacy Policy",            href: "/privacy" },
  { label: "Terms of Service",          href: "/terms" },
  { label: "Data Processing Agreement", href: "/dpa", enterprise: true },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-primary">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2 text-text-primary font-bold text-lg">
              <div className="w-7 h-7 rounded bg-accent flex items-center justify-center">
                <Zap size={14} className="text-white" strokeWidth={2.5} />
              </div>
              SprintHelm
            </a>
            <p className="text-caption text-text-secondary leading-relaxed">
              Built for engineering teams who refuse to plan blind.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a href="https://github.com/sprinthelm" target="_blank" rel="noopener noreferrer"
                className="text-text-disabled hover:text-text-secondary transition-colors duration-200">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/company/sprinthelm" target="_blank" rel="noopener noreferrer"
                className="text-text-disabled hover:text-text-secondary transition-colors duration-200">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com/sprinthelm" target="_blank" rel="noopener noreferrer"
                className="text-text-disabled hover:text-text-secondary transition-colors duration-200">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 — Product */}
          <div>
            <h4 className="text-label text-text-secondary uppercase tracking-wider mb-4">Product</h4>
            <ul className="flex flex-col gap-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 flex items-center gap-2"
                  >
                    {link.label}
                    {link.soon && (
                      <span className="text-label text-text-disabled bg-bg-elevated px-1.5 py-0.5 rounded">
                        Soon
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h4 className="text-label text-text-secondary uppercase tracking-wider mb-4">Company</h4>
            <ul className="flex flex-col gap-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Support & Legal */}
          <div>
            <h4 className="text-label text-text-secondary uppercase tracking-wider mb-4">Support &amp; Legal</h4>
            <ul className="flex flex-col gap-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 flex items-center gap-2"
                  >
                    {link.label}
                    {link.enterprise && (
                      <span className="text-label text-text-disabled bg-bg-elevated px-1.5 py-0.5 rounded">
                        Enterprise
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-subtle mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-caption text-text-disabled">
            © 2026 SprintHelm Ltd.
          </p>
          <p className="text-caption text-text-disabled">
            Built with{" "}
            <a
              href="https://anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-secondary transition-colors duration-150"
            >
              Claude by Anthropic
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
