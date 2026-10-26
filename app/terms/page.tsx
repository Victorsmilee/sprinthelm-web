import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service, SprintHelm",
  description: "SprintHelm Terms of Service. Read our terms before using the platform.",
};

const TERMS_EFFECTIVE_DATE = "12 October 2026";
const TERMS_VERSION = "1.1";

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen section-padding pt-24">
        <div className="mx-auto max-w-3xl w-full">
          <div className="mb-10">
            <h1 className="text-h1 font-bold text-text-primary mb-2">Terms of Service</h1>
            <p className="text-sm text-text-disabled">
              Effective date: {TERMS_EFFECTIVE_DATE} &nbsp;·&nbsp; Version {TERMS_VERSION}
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">1. Acceptance of Terms</h2>
              <p>
                By creating an account or using SprintHelm (the &ldquo;Service&rdquo;), developed and operated by
                Eben EIO Global O&Uuml; (&ldquo;Eben EIO Global&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                &ldquo;our&rdquo;), you agree to be bound by these Terms of Service
                (&ldquo;Terms&rdquo;). If you are accepting these Terms on behalf of an organisation, you warrant
                that you have authority to bind that organisation. If you do not agree, do not use the Service.
              </p>
              <p className="mt-3">
                You must be at least 18 years old to use the Service. The Service is intended for business use
                by engineering and product teams.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">Operating entity:</strong> Eben EIO Global O&Uuml; is the
                principal operating, contracting and invoicing entity for SprintHelm. Your contract for the
                Service is with Eben EIO Global O&Uuml;, and invoices for the Service are issued by it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">2. Description of Service</h2>
              <p>
                SprintHelm is an AI-powered sprint planning tool that helps engineering teams score backlogs,
                model team capacity, run Monte Carlo simulations, and generate executive summaries. The Service
                is provided as a web application at <span className="text-accent">app.sprinthelm.com</span>.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">Free Tier:</strong> Free accounts may submit up to 15 tickets per
                sprint plan. Certain features including completion probability scores and pressure index numeric
                values are restricted on the free tier.
              </p>
              <p className="mt-3">
                We reserve the right to modify, suspend, or discontinue any part of the Service at any time
                with reasonable notice. We will notify users of material changes by email or in-app notification.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">3. Account Registration</h2>
              <p>
                You must provide accurate and complete information when creating an account. You are responsible
                for maintaining the security of your account credentials and for all activity that occurs under
                your account. Notify us immediately at{" "}
                <a href="mailto:hello@sprinthelm.com" className="text-accent hover:underline">hello@sprinthelm.com</a>{" "}
                if you suspect unauthorised access.
              </p>
              <p className="mt-3">
                We support sign-in via email and password, magic link, and Google OAuth. You agree not to
                share your account credentials with third parties.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">4. Plans, Fees and Payment</h2>
              <p>
                The Service is offered on the plans published at{" "}
                <a href="/#pricing" className="text-accent hover:underline">sprinthelm.com</a>.
                All prices are stated and charged in euro (EUR) and{" "}
                <strong className="text-text-primary">exclude VAT and any other applicable tax</strong>,
                which is added at checkout as described in section 8.
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>
                  <strong className="text-text-primary">Free:</strong> &euro;0. No payment method required.
                  Limited to 15 tickets per sprint plan, with certain features restricted.
                </li>
                <li>
                  <strong className="text-text-primary">Pro:</strong> &euro;9.00 per month (Founding Member
                  price; list price &euro;19.00 per month).
                </li>
                <li>
                  <strong className="text-text-primary">Team:</strong> &euro;19.99 per month (Founding Member
                  price; list price &euro;49.00 per month).
                </li>
                <li>
                  <strong className="text-text-primary">Enterprise:</strong> custom annual contract from
                  &euro;12,000 per year, agreed and invoiced separately. The terms of a signed Enterprise
                  order form take precedence over this section where they conflict.
                </li>
              </ul>
              <p className="mt-3">
                <strong className="text-text-primary">Billing cycle.</strong> Pro and Team are billed monthly
                in advance. The first payment is taken when your free trial ends (section 5), and each
                subsequent payment on the same day of the following month.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">Payment processing.</strong> Card payments are processed
                by Stripe Payments Europe, Ltd. We never receive or store your full card details. By
                subscribing you authorise us, through Stripe, to charge your payment method for the recurring
                fee until you cancel.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">Founding Member pricing.</strong> The Founding Member
                price is available to the first 100 paying customers and is held for 12 months from the start
                of your first paid subscription. After that period your plan renews at the then current list
                price. We will give you at least 30 days&apos; notice by email before the first renewal at the
                new price, and you may cancel before it takes effect.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">Usage allowances.</strong> Pro and Team include monthly
                allowances for AI Executive Summaries and PRD ticket extraction, as published on the pricing
                page. Allowances reset at the start of each billing month and unused amounts do not carry over.
                Where you exceed an allowance, the feature is unavailable until the next reset; we do not
                charge overage fees.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">Price changes.</strong> We may change our prices. We will
                give at least 30 days&apos; notice by email, the change takes effect at your next renewal, and
                you may cancel at any time before then without charge.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">Failed payments.</strong> If a payment fails, Stripe will
                retry it and we will email you. If payment is still not received, we may suspend access to paid
                features until the balance is settled. Your data is not deleted because of a failed payment.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">5. Free Trial</h2>
              <p>
                Pro and Team subscriptions begin with a{" "}
                <strong className="text-text-primary">14-day free trial</strong>. Nothing is charged during the
                trial.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">A payment method is required to start a trial.</strong>{" "}
                We collect your card at the point you subscribe so that the subscription can continue without
                interruption if you decide to keep it. No amount is taken until the trial ends.
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>We email you 3 days before the trial ends.</li>
                <li>
                  Cancel at any point before the trial ends and you are not charged. Your account moves to the
                  Free plan and your data remains available within the Free plan limits.
                </li>
                <li>
                  If you do not cancel, the first monthly payment is taken automatically on the day the trial
                  ends and the subscription renews monthly from then on.
                </li>
                <li>
                  One trial per account. We may decline a trial where we reasonably believe accounts are being
                  created repeatedly to avoid payment.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">
                6. Renewal, Cancellation and Downgrades
              </h2>
              <p>
                <strong className="text-text-primary">Automatic renewal.</strong> Paid subscriptions renew
                automatically each month until you cancel. There is no minimum term and no cancellation fee.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">How to cancel.</strong> Cancel at any time from your
                Account page or the billing portal linked from it. Cancellation takes effect at the end of the
                period you have already paid for: you keep full access until that date, and no further payments
                are taken. We do not refund the unused part of a period you have already paid for, except as
                set out in section 7.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">Downgrades.</strong> Moving to a lower plan (Team to Pro,
                or either to Free) also takes effect at the end of the current paid period, so you keep what
                you paid for. We email you 30 days and 7 days before the change. At the effective date,
                features and allowances above your new plan are removed, and data that exceeds the new
                plan&apos;s limits may no longer be visible in the application.
              </p>
              <p className="mt-3">
                If you need a copy of data that exceeds your new plan&apos;s limits, email{" "}
                <a href="mailto:privacy@sprinthelm.com" className="text-accent hover:underline">
                  privacy@sprinthelm.com
                </a>{" "}
                within 14 days of the downgrade taking effect and we will provide it in a machine-readable
                format. Self-service export is not yet available in the application.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">Upgrades.</strong> Moving to a higher plan takes effect
                immediately. Stripe calculates a pro-rata adjustment for the remainder of the current period,
                which is shown to you before you confirm.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">
                7. Refunds and Your Right to Cancel
              </h2>
              <p>
                Every paid plan includes a 14-day free trial (section 5), so you can evaluate the Service in
                full before any money is taken.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">Business customers.</strong> Fees already charged are
                non-refundable, except where refund is required by law or where we agree otherwise in writing.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">Consumers in the UK and EU.</strong> If you are
                contracting as a consumer rather than on behalf of a business, you have a statutory right to
                cancel a distance contract within 14 days. In addition, and without affecting that right, we
                will refund your first monthly payment in full if you ask us within 14 days of it being taken.
                Email{" "}
                <a href="mailto:hello@sprinthelm.com" className="text-accent hover:underline">
                  hello@sprinthelm.com
                </a>{" "}
                from the address on the account.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">Billing errors.</strong> We refund duplicate charges and
                charges taken in error in full, as soon as we identify them or you tell us about them. Tell us
                at{" "}
                <a href="mailto:hello@sprinthelm.com" className="text-accent hover:underline">
                  hello@sprinthelm.com
                </a>.
              </p>
              <p className="mt-3">
                Approved refunds are returned to the original payment method. Stripe typically settles this
                within 5 to 10 business days, depending on your card issuer.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">8. Taxes</h2>
              <p>
                All published prices exclude VAT and any other sales or consumption tax. The applicable tax is
                calculated at checkout based on the billing country and tax details you provide, and is shown
                to you before you confirm payment. Your invoice itemises the tax charged and is available in
                the billing portal.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">EU business customers.</strong> You can enter a valid VAT
                identification number at checkout. Where the reverse charge applies, no VAT is added and you
                are responsible for accounting for it in your own jurisdiction.
              </p>
              <p className="mt-3">
                You are responsible for the accuracy of the billing address, country and tax identification
                number you give us. Where incorrect details lead to tax being charged incorrectly, you remain
                responsible for the amount properly due.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">9. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Reverse engineer, decompile, or attempt to extract source code from the Service</li>
                <li>Scrape, crawl, or systematically extract data from the Service</li>
                <li>Resell, sublicense, or commercially redistribute the Service or its outputs without our written consent</li>
                <li>Submit personally identifiable information of third parties (such as employee names or personal contact details) as ticket data without their consent</li>
                <li>Use the Service for any unlawful purpose or in violation of any applicable regulations</li>
                <li>Attempt to circumvent rate limits, tier restrictions, or security measures</li>
                <li>Introduce malicious code, viruses, or disruptive data into the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">10. Intellectual Property</h2>
              <p>
                <strong className="text-text-primary">Our property:</strong> SprintHelm is developed and
                operated by Eben EIO Global O&Uuml;. Intellectual property rights in the Service &mdash; including
                the platform, scoring algorithms, simulation models, AI prompts, design, and all generated outputs
                &mdash; are owned by Eben EIO Global O&Uuml; or its licensors. Nothing in these Terms transfers
                ownership of the platform to you.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">Your data:</strong> You retain ownership of all input data
                you submit to the Service, including ticket names, descriptions, effort estimates, and team
                configuration. By using the Service, you grant us a limited, non-exclusive, royalty-free licence
                to process your input data solely to provide and improve the Service.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">AI-generated outputs:</strong> Sprint scores, Monte Carlo
                results, pressure indices, and executive summaries generated by the Service are provided for
                informational and planning assistance purposes only. We make no claim of copyright over
                outputs derived from your input data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">11. AI Advisory Disclaimer</h2>
              <p>
                All scoring outputs, capacity models, completion probabilities, and AI-generated executive
                summaries produced by the Service are <strong className="text-text-primary">advisory and informational only</strong>.
                They are not professional engineering, management, financial, or legal advice.
              </p>
              <p className="mt-3">
                Sprint planning decisions, resource allocation, and delivery commitments remain entirely your
                responsibility. SprintHelm accepts no liability for decisions made in reliance on the Service&apos;s
                outputs. AI models can produce inaccurate, incomplete, or contextually inappropriate results.
                Always apply your own professional judgement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">12. Privacy and Data Processing</h2>
              <p>
                Your use of the Service is subject to our{" "}
                <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>,
                which is incorporated into these Terms by reference. By using the Service, you agree to the
                collection and processing of your data as described in the Privacy Policy.
              </p>
              <p className="mt-3">
                Sprint data you submit may be transmitted to third-party AI processing services (Anthropic) to
                generate executive summaries. This transmission is described in the Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">13. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, SprintHelm shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                loss of profits, loss of data, missed deadlines, or business interruption arising from your use
                of the Service.
              </p>
              <p className="mt-3">
                Our total liability for any claim arising out of or relating to these Terms or the Service shall
                not exceed the greater of (a) the total fees you paid to us in the 12 months preceding the claim,
                or (b) £100. For free tier users, the limit is £100.
              </p>
              <p className="mt-3">
                Nothing in these Terms excludes or limits liability for death or personal injury caused by
                negligence, fraud, or any other liability that cannot be excluded by law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">14. Termination</h2>
              <p>
                You may close your account at any time from{" "}
                <strong className="text-text-primary">Account settings &rarr; Close account</strong>. You will
                be asked to type a confirmation phrase, because the action is immediate and cannot be undone.
                Closing your account permanently deletes your sprint and backlog data, team configuration,
                portfolio projects and forecasts, and any connected Jira workspace along with its stored
                access tokens.
              </p>
              <p className="mt-3">
                If you would rather we did it for you, or you cannot sign in, email{" "}
                <a href="mailto:privacy@sprinthelm.com" className="text-accent hover:underline">
                  privacy@sprinthelm.com
                </a>{" "}
                from the address on the account. We action erasure requests within 30 days and usually far
                sooner, and we confirm in writing once it is done.
              </p>
              <p className="mt-3">
                <strong className="text-text-primary">Cancelling a subscription does not close your
                account.</strong> Cancelling moves you to the Free plan and your data is retained under that
                plan. Closing your account erases it.
              </p>
              <p className="mt-3">
                Any active subscription is cancelled before anything is deleted, so you are not charged
                again. We may retain billing, invoice and tax records for as long as applicable law requires,
                and de-identified security audit records that no longer identify you.
              </p>
              <p className="mt-3">
                We may suspend or terminate your access immediately if you breach these Terms, engage in
                fraudulent activity, or if required by law. We will provide reasonable notice where possible.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">15. Changes to Terms</h2>
              <p>
                We may update these Terms from time to time. We will notify you of material changes by email or
                prominent in-app notice at least 14 days before the changes take effect. Continued use of the
                Service after the effective date constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">16. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of England and Wales.
                Any disputes shall first be subject to good-faith resolution between the parties. If unresolved,
                disputes shall be submitted to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">17. Contact</h2>
              <p>
                For questions about these Terms, contact us at{" "}
                <a href="mailto:hello@sprinthelm.com" className="text-accent hover:underline">
                  hello@sprinthelm.com
                </a>.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
