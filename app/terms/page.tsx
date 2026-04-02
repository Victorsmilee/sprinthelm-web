import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service — SprintHelm",
  description: "SprintHelm Terms of Service. Read our terms before using the platform.",
};

const TERMS_EFFECTIVE_DATE = "2 April 2026";
const TERMS_VERSION = "1.0";

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
                By creating an account or using SprintHelm (the &ldquo;Service&rdquo;), operated by SprintHelm
                (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you agree to be bound by these Terms of Service
                (&ldquo;Terms&rdquo;). If you are accepting these Terms on behalf of an organisation, you warrant
                that you have authority to bind that organisation. If you do not agree, do not use the Service.
              </p>
              <p className="mt-3">
                You must be at least 18 years old to use the Service. The Service is intended for business use
                by engineering and product teams.
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
              <h2 className="text-lg font-semibold text-text-primary mb-3">4. Acceptable Use</h2>
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
              <h2 className="text-lg font-semibold text-text-primary mb-3">5. Intellectual Property</h2>
              <p>
                <strong className="text-text-primary">Our property:</strong> SprintHelm, including the platform,
                scoring algorithms, simulation models, AI prompts, design, and all generated outputs, is owned by
                us or our licensors. Nothing in these Terms transfers ownership of the platform to you.
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
              <h2 className="text-lg font-semibold text-text-primary mb-3">6. AI Advisory Disclaimer</h2>
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
              <h2 className="text-lg font-semibold text-text-primary mb-3">7. Privacy and Data Processing</h2>
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
              <h2 className="text-lg font-semibold text-text-primary mb-3">8. Limitation of Liability</h2>
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
              <h2 className="text-lg font-semibold text-text-primary mb-3">9. Termination</h2>
              <p>
                You may delete your account at any time from your account settings. Upon deletion, we will
                permanently erase your personal data within 30 days, except where retention is required by law.
              </p>
              <p className="mt-3">
                We may suspend or terminate your access immediately if you breach these Terms, engage in
                fraudulent activity, or if required by law. We will provide reasonable notice where possible.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">10. Changes to Terms</h2>
              <p>
                We may update these Terms from time to time. We will notify you of material changes by email or
                prominent in-app notice at least 14 days before the changes take effect. Continued use of the
                Service after the effective date constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">11. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of England and Wales.
                Any disputes shall first be subject to good-faith resolution between the parties. If unresolved,
                disputes shall be submitted to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">12. Contact</h2>
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
