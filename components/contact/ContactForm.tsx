"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

// Reuses the existing Formspree project. A separate form ID can be supplied via
// NEXT_PUBLIC_FORMSPREE_CONTACT_ID so contact submissions land in their own
// Formspree inbox; if unset, falls back to the shared survey form ID so the
// route still works even before the contact endpoint is provisioned.
const FORMSPREE_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID ??
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ??
  "";

type Status = "idle" | "submitting" | "ok" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Name is required.";
  if (!email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "That doesn’t look like a valid email.";
  if (!message.trim()) errors.message = "Message is required.";
  else if (message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return errors;
}

export function ContactForm(): React.JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot, bots tend to fill every field, including ones hidden from
  // humans. If this carries any value at submit time, drop the request.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (status === "submitting") return;
    if (website.trim().length > 0) return; // honeypot caught a bot

    const fieldErrors = validate(name, email, message);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    if (!FORMSPREE_ID) {
      setServerError(
        "Form submission isn’t configured yet, please email hello@sprinthelm.com instead.",
      );
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          message: message.trim(),
          source: "contact_page",
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Submission failed (${res.status}).`);
      }
      setStatus("ok");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch (err) {
      setServerError(
        err instanceof Error
          ? "Couldn’t reach the form service, please try again or email hello@sprinthelm.com."
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="p-8 rounded-xl bg-bg-surface border border-success/30 flex items-start gap-4">
        <CheckCircle2 size={20} className="text-success flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-base font-semibold text-text-primary mb-1">Message sent.</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Thanks, we’ll get back to you within 24 hours. Check your inbox (and spam) for a copy of your message.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-8 rounded-xl bg-bg-surface border border-border-subtle space-y-5"
      aria-labelledby="contact-form-heading"
    >
      <h3 id="contact-form-heading" className="text-base font-semibold text-text-primary">
        Send us a message
      </h3>

      {/* Honeypot, visually hidden, off the tab order */}
      <div className="absolute -left-[9999px] pointer-events-none" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-text-primary mb-1.5">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border-subtle text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          placeholder="Your name"
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-danger">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-text-primary mb-1.5">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border-subtle text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          placeholder="you@company.com"
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-danger">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-company" className="block text-sm font-medium text-text-primary mb-1.5">
          Company <span className="text-text-disabled font-normal">(optional)</span>
        </label>
        <input
          id="contact-company"
          type="text"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border-subtle text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          placeholder="Where you’re from"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-text-primary mb-1.5">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border-subtle text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent resize-y"
          placeholder="Tell us what’s on your mind, a question, some feedback, an idea, anything."
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-danger">
            {errors.message}
          </p>
        )}
      </div>

      {serverError && status === "error" && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-danger/10 border border-danger/30">
          <AlertCircle size={16} className="text-danger flex-shrink-0 mt-0.5" />
          <p className="text-sm text-danger leading-relaxed">{serverError}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight size={14} />
          </>
        )}
      </Button>

      <p className="text-xs text-text-disabled">
        By submitting, you agree to be contacted by the SprintHelm team. We’ll never share your details. See our{" "}
        <a href="/privacy" className="text-text-secondary hover:text-text-primary underline underline-offset-2">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
