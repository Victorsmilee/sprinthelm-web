import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Mail, Building2, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact, SprintHelm",
  description: "Get in touch with the SprintHelm team.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg-primary">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 text-center border-b border-border-subtle">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-h1 font-bold text-text-primary mb-4 leading-tight">Get in touch.</h1>
            <p className="text-lg text-text-secondary">
              Questions, feedback, or just want to talk sprint planning, we&apos;re here.
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* General */}
            <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle flex flex-col">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
                <Mail size={20} className="text-accent" />
              </div>
              <h2 className="text-lg font-bold text-text-primary mb-2">General enquiries</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                Product questions, feedback, press, or anything else, drop us a line and we&apos;ll reply within 24 hours.
              </p>
              <a
                href="mailto:hello@sprinthelm.com"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors duration-200"
              >
                hello@sprinthelm.com
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-xl bg-bg-surface border border-accent/30 flex flex-col">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
                <Building2 size={20} className="text-accent" />
              </div>
              <h2 className="text-lg font-bold text-text-primary mb-2">Enterprise sales</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                Evaluating SprintHelm for your organisation? We&apos;ll walk you through a tailored demo in under 30 minutes.
              </p>
              <a
                href="/contact/enterprise"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors duration-200"
              >
                Talk to sales
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* Inline form, captures leads even when the visitor has no
            configured mail client. Submits to Formspree (see ContactForm).
            The mailto cards above remain as the explicit, no-friction path. */}
        <section className="pb-20 px-6">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm text-text-secondary leading-relaxed text-center mb-6">
              Prefer not to leave the page? Send us a note directly:
            </p>
            <ContactForm />
          </div>
        </section>

        {/* Support note */}
        <section className="pb-20 px-6 text-center">
          <div className="mx-auto max-w-xl">
            <p className="text-sm text-text-disabled">
              Existing customer?{" "}
              <a href="/support" className="text-text-secondary hover:text-text-primary transition-colors duration-150 underline underline-offset-2">
                Visit the Help Centre
              </a>{" "}
              for documentation and support SLAs.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
