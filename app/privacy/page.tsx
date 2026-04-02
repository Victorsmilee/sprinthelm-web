import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy — SprintHelm",
  description: "SprintHelm Privacy Policy. How we collect, use, and protect your data.",
};

export const PRIVACY_EFFECTIVE_DATE = "2 April 2026";
export const PRIVACY_VERSION = "1.0";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen section-padding pt-24">
        <div className="mx-auto max-w-3xl w-full">
          <div className="mb-10">
            <h1 className="text-h1 font-bold text-text-primary mb-2">Privacy Policy</h1>
            <p className="text-sm text-text-disabled">
              Effective date: {PRIVACY_EFFECTIVE_DATE} &nbsp;·&nbsp; Version {PRIVACY_VERSION}
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">1. Who We Are</h2>
              <p>
                SprintHelm (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the sprint planning platform
                at <span className="text-accent">app.sprinthelm.com</span> and the marketing website at{" "}
                <span className="text-accent">sprinthelm.com</span>.
              </p>
              <p className="mt-3">
                For the purposes of the UK GDPR and EU GDPR, SprintHelm is the data controller for personal
                data collected through the Service. For questions or to exercise your rights, contact us at{" "}
                <a href="mailto:privacy@sprinthelm.com" className="text-accent hover:underline">
                  privacy@sprinthelm.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">2. Data We Collect</h2>

              <h3 className="font-semibold text-text-primary mt-4 mb-2">Account data</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Email address (required for all sign-up methods)</li>
                <li>Full name (collected during onboarding, optional)</li>
                <li>Organisation name (collected during onboarding)</li>
                <li>Sign-in method (email/password, magic link, or Google OAuth)</li>
              </ul>

              <h3 className="font-semibold text-text-primary mt-4 mb-2">Sprint planning data</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Ticket titles and identifiers you submit</li>
                <li>Ticket attributes: effort estimates, impact scores, type, and epic grouping</li>
                <li>Team configuration: team name, number of developers, seniority level</li>
                <li>Scoring weight preferences</li>
                <li>Sprint history (plans you save or export)</li>
              </ul>
              <p className="mt-3 text-sm bg-warning/5 border border-warning/20 rounded-lg px-4 py-3">
                <strong className="text-warning">Note:</strong> Please avoid including personal names, email addresses,
                or other personal information of your team members in ticket titles or descriptions.
                Sprint planning data should describe work items, not individuals.
              </p>

              <h3 className="font-semibold text-text-primary mt-4 mb-2">Technical data</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>IP address and approximate location (country/region)</li>
                <li>Browser type and version</li>
                <li>Session tokens and authentication cookies (managed by Supabase Auth)</li>
                <li>Basic usage logs (page visits, feature usage) for service improvement</li>
              </ul>

              <h3 className="font-semibold text-text-primary mt-4 mb-2">Google OAuth data (if used)</h3>
              <p>
                If you sign in with Google, we receive your email address, display name, and profile picture
                from Google. We use the email address for account identification and the display name for
                personalisation. We do not receive access to your Google Drive, Calendar, or other Google services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">3. How We Use Your Data</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border-subtle">
                      <th className="text-left py-2 pr-4 font-semibold text-text-primary">Purpose</th>
                      <th className="text-left py-2 font-semibold text-text-primary">Legal basis (GDPR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle/50">
                    <tr>
                      <td className="py-2 pr-4">Providing and operating the Service</td>
                      <td className="py-2">Contract performance (Art. 6(1)(b))</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Sending authentication emails (magic links, confirmation)</td>
                      <td className="py-2">Contract performance (Art. 6(1)(b))</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Generating AI executive summaries from sprint data</td>
                      <td className="py-2">Contract performance (Art. 6(1)(b))</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Improving the Service (aggregated analytics)</td>
                      <td className="py-2">Legitimate interests (Art. 6(1)(f))</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Sending product update emails (if opted in)</td>
                      <td className="py-2">Consent (Art. 6(1)(a))</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Complying with legal obligations</td>
                      <td className="py-2">Legal obligation (Art. 6(1)(c))</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">4. Third-Party Sub-Processors</h2>
              <p>
                We share your data with the following third-party services to operate the platform.
                Each is bound by appropriate data processing agreements.
              </p>

              <div className="mt-4 space-y-4">
                <div className="rounded-lg border border-border-subtle p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-text-primary">Supabase</p>
                      <p className="text-sm mt-1">Database, authentication, and file storage. Data is stored in EU (West Europe) region servers.</p>
                      <p className="text-sm mt-1 text-text-disabled">Data: account data, sprint planning data, session tokens</p>
                    </div>
                    <span className="shrink-0 text-xs text-text-disabled bg-bg-elevated px-2 py-1 rounded">EU hosted</span>
                  </div>
                </div>

                <div className="rounded-lg border border-border-subtle p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-text-primary">Anthropic (Claude API)</p>
                      <p className="text-sm mt-1">
                        AI language model used to generate executive summaries of your sprint plan.
                        When you request an AI summary, your sprint data (ticket titles, scores, team configuration,
                        and sprint statistics) is transmitted to Anthropic&apos;s API for processing.
                      </p>
                      <p className="text-sm mt-1 text-text-disabled">
                        Data transmitted: ticket titles, effort scores, priority scores, team name, team size,
                        capacity metrics, Monte Carlo results. Not transmitted: your email, name, or account details.
                      </p>
                      <p className="text-sm mt-1">
                        Anthropic&apos;s privacy policy applies to this processing:{" "}
                        <span className="text-accent">anthropic.com/privacy</span>
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-text-disabled bg-bg-elevated px-2 py-1 rounded">US</span>
                  </div>
                </div>

                <div className="rounded-lg border border-border-subtle p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-text-primary">Vercel</p>
                      <p className="text-sm mt-1">Hosting and edge network for the web application. May process request metadata (IP address, headers).</p>
                      <p className="text-sm mt-1 text-text-disabled">Data: request logs, IP addresses</p>
                    </div>
                    <span className="shrink-0 text-xs text-text-disabled bg-bg-elevated px-2 py-1 rounded">Global CDN</span>
                  </div>
                </div>

                <div className="rounded-lg border border-border-subtle p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-text-primary">Google (OAuth only)</p>
                      <p className="text-sm mt-1">If you choose &ldquo;Continue with Google&rdquo;, Google authenticates your identity and shares your email and name with us. Google&apos;s privacy policy governs that exchange.</p>
                      <p className="text-sm mt-1 text-text-disabled">Data: email address, display name (sign-in only)</p>
                    </div>
                    <span className="shrink-0 text-xs text-text-disabled bg-bg-elevated px-2 py-1 rounded">Optional</span>
                  </div>
                </div>
              </div>

              <p className="mt-4">
                We do not sell your data to any third party. We do not share your data with advertisers
                or data brokers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">5. International Data Transfers</h2>
              <p>
                Your account data and sprint data are stored on Supabase servers in the EU (West Europe region).
              </p>
              <p className="mt-3">
                When AI executive summaries are generated, sprint data is transmitted to Anthropic&apos;s API,
                which is operated from the United States. This constitutes an international transfer under GDPR.
                This transfer is covered by Anthropic&apos;s Standard Contractual Clauses (SCCs) with their
                EU customers. By using the AI summary feature, you consent to this transfer.
              </p>
              <p className="mt-3">
                Vercel&apos;s global CDN may process request data at edge locations worldwide. This is limited
                to technical routing data and does not include your account or sprint planning data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">6. Data Retention</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-text-primary">Active accounts:</strong> Data retained for as long as your account is active</li>
                <li><strong className="text-text-primary">Deleted accounts:</strong> Personal data permanently deleted within 30 days of account deletion</li>
                <li><strong className="text-text-primary">Anonymised aggregate data</strong> (e.g. usage statistics with no personally identifiable information) may be retained indefinitely for service improvement</li>
                <li><strong className="text-text-primary">Legal obligations:</strong> Some data may be retained longer where required by applicable law (e.g. financial records)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">7. Your Rights</h2>
              <p>Under UK GDPR and EU GDPR, you have the following rights:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li><strong className="text-text-primary">Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong className="text-text-primary">Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong className="text-text-primary">Erasure:</strong> Request deletion of your personal data (&ldquo;right to be forgotten&rdquo;)</li>
                <li><strong className="text-text-primary">Portability:</strong> Request your data in a machine-readable format</li>
                <li><strong className="text-text-primary">Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong className="text-text-primary">Restrict processing:</strong> Request that we limit how we use your data</li>
                <li><strong className="text-text-primary">Withdraw consent:</strong> Withdraw consent for any consent-based processing (e.g. marketing emails)</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, email{" "}
                <a href="mailto:privacy@sprinthelm.com" className="text-accent hover:underline">
                  privacy@sprinthelm.com
                </a>.
                We will respond within 30 days. If you are not satisfied with our response, you have the right
                to lodge a complaint with your local data protection authority (in the UK: the ICO at ico.org.uk).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">8. California Residents (CCPA)</h2>
              <p>
                If you are a California resident, you have additional rights under the California Consumer
                Privacy Act (CCPA):
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>The right to know what personal information is collected, used, shared, or sold</li>
                <li>The right to delete personal information</li>
                <li>The right to opt out of the sale of personal information</li>
                <li>The right to non-discrimination for exercising your CCPA rights</li>
              </ul>
              <p className="mt-3">
                <strong className="text-text-primary">We do not sell personal information.</strong> We do not
                share personal information for cross-context behavioural advertising.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">9. Cookies</h2>
              <p>
                SprintHelm uses the following cookies:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>
                  <strong className="text-text-primary">Authentication cookies</strong> (essential): Set by Supabase Auth
                  to maintain your signed-in session. These are HTTP-only, SameSite=Lax cookies and cannot be
                  accessed by JavaScript. Required for the Service to function.
                </li>
                <li>
                  <strong className="text-text-primary">Vercel analytics</strong> (if enabled): Aggregated, anonymised
                  page view data with no cross-site tracking. No cookie is set for analytics unless you consent.
                </li>
              </ul>
              <p className="mt-3">
                We do not use advertising cookies, third-party tracking pixels, or fingerprinting.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">10. Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your data:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>All data transmitted over HTTPS/TLS</li>
                <li>Authentication session tokens stored in HTTP-only cookies (not accessible to JavaScript)</li>
                <li>Passwords hashed using bcrypt (Supabase Auth)</li>
                <li>Database access restricted to authenticated service roles</li>
                <li>Regular dependency security reviews</li>
              </ul>
              <p className="mt-3">
                No system is completely secure. If you discover a security vulnerability, please disclose it
                responsibly to{" "}
                <a href="mailto:security@sprinthelm.com" className="text-accent hover:underline">
                  security@sprinthelm.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">11. Children</h2>
              <p>
                The Service is not directed at persons under 18 years of age. We do not knowingly collect
                personal data from anyone under 18. If you believe we have inadvertently collected data from
                a minor, contact us at{" "}
                <a href="mailto:privacy@sprinthelm.com" className="text-accent hover:underline">
                  privacy@sprinthelm.com
                </a>{" "}
                and we will delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of material changes
                by email and by posting a notice on the Service at least 14 days before changes take effect.
                The &ldquo;Effective date&rdquo; at the top of this page indicates when the policy was last updated.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">13. Contact</h2>
              <p>
                For privacy-related enquiries:{" "}
                <a href="mailto:privacy@sprinthelm.com" className="text-accent hover:underline">
                  privacy@sprinthelm.com
                </a>
              </p>
              <p className="mt-2">
                For general enquiries:{" "}
                <a href="mailto:hello@sprinthelm.com" className="text-accent hover:underline">
                  hello@sprinthelm.com
                </a>
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
