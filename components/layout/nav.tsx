"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PRODUCT_LINKS = [
  { label: "Backlog Scoring",        href: "#features" },
  { label: "Monte Carlo Simulation", href: "#features" },
  { label: "Pressure Index",         href: "#features" },
  { label: "AI Executive Summary",   href: "#features" },
  { label: "Epic Forecasting",       href: "#features", soon: true },
  { label: "Team Benchmarking",      href: "#features", soon: true },
];

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing",      href: "#pricing" },
];

export function Nav() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [productOpen, setProductOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled ? "nav-frosted" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-content px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-text-primary font-bold text-lg">
          <div className="w-7 h-7 rounded bg-accent flex items-center justify-center">
            <Zap size={14} className="text-white" strokeWidth={2.5} />
          </div>
          SprintHelm
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Product dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              Product <ChevronDown size={14} className={cn("transition-transform duration-200", productOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {productOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-56 rounded-lg bg-bg-surface border border-border-subtle shadow-elevated py-2"
                  onMouseEnter={() => setProductOpen(true)}
                  onMouseLeave={() => setProductOpen(false)}
                >
                  {PRODUCT_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center justify-between px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors duration-150"
                    >
                      {link.label}
                      {link.soon && (
                        <span className="text-label text-text-disabled bg-bg-elevated px-1.5 py-0.5 rounded">
                          Soon
                        </span>
                      )}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://app.sprinthelm.com/login" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200">
            Sign in
          </a>
          <Button size="sm" asChild>
            <a href="https://app.sprinthelm.com/signup">Try for free</a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-bg-surface border-t border-border-subtle overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {PRODUCT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-150 flex items-center justify-between"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                  {link.soon && (
                    <span className="text-label text-text-disabled">Soon</span>
                  )}
                </a>
              ))}
              <div className="border-t border-border-subtle my-1" />
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-150"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-border-subtle my-1" />
              <a href="https://app.sprinthelm.com/login" className="text-text-secondary hover:text-text-primary transition-colors duration-150">
                Sign in
              </a>
              <Button size="lg" className="w-full" asChild>
                <a href="https://app.sprinthelm.com/signup">Try for free</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
