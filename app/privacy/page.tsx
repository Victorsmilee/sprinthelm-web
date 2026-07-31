import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy, SprintHelm",
  description: "SprintHelm Privacy Policy. How we collect, use, and protect your data.",
};

const PRIVACY_EFFECTIVE_DATE = "2 April 2026";
const PRIVACY_VERSION = "1.0";

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

              <h3 className="font-semibold text-text-primary mt-4 mb-2">Jira (Atlassian) integration data (if used)</h3>
              <p>
                If you connect your Jira workspace to SprintHelm via{" "}
                <strong className="text-text-primary">Account &rarr; Connect Jira Workspace</strong>, we receive
                and store the following from Atlassian on your behalf:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong className="text-text-primary">Atlassian account identifier</strong> &mdash; the opaque
                  account ID Atlassian provides during OAuth authorisation. We do not receive your Atlassian name,
                  email, or profile photo through this flow.
                </li>
                <li>
                  <strong className="text-text-primary">OAuth access and refresh tokens</strong> &mdash; stored
                  encrypted at rest using AES-256-GCM envelope encryption. Encryption keys are managed per
                  environment and never leave our server-side infrastructure. The encrypted tokens are never sent
                  to your browser.
                </li>
                <li>
                  <strong className="text-text-primary">Connection audit log</strong> &mdash; we record an event
                  log entry for each connection-related action (connect, disconnect, token refresh, sprint import).
                  Each entry contains event type, timestamp, and a reference to your connection. We do not log the
                  contents of any Jira ticket or sprint in this audit table.
                </li>
                <li>
                  <strong className="text-text-primary">Jira ticket and sprint data you choose to import</strong>
                  {" "}&mdash; when you import a sprint, the ticket data you select is copied into your SprintHelm
                  account so the simulator can analyse it. This data is owned by your SprintHelm account and is
                  governed by the same retention and deletion rules as any other ticket data you enter into
                  SprintHelm.
                </li>
              </ul>
              <p className="mt-3">
                See section 4a below for the full Jira integration data lifecycle, lawful basis, and erasure
                pathway.
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
                      <p className="font-semibold text-text-primary">Atlassian (Jira)</p>
                      <p className="text-sm mt-1">
                        If you connect your Jira workspace, SprintHelm uses Atlassian&apos;s OAuth 2.0 API to read
                        sprint and ticket data on your behalf. We receive your Atlassian account identifier plus
                        the OAuth tokens needed to make those API calls; tokens are envelope-encrypted at rest.
                      </p>
                      <p className="text-sm mt-1 text-text-disabled">
                        Data: Atlassian account ID, encrypted OAuth access + refresh tokens, connection audit
                        log, Jira ticket/sprint data you choose to import. Not transmitted to Atlassian: your
                        SprintHelm email, name, or sprint analytics.
                      </p>
                      <p className="text-sm mt-1">
                        Atlassian&apos;s privacy policy applies to data processing on Atlassian&apos;s side:{" "}
                        <span className="text-accent">atlassian.com/legal/privacy-policy</span>
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-text-disabled bg-bg-elevated px-2 py-1 rounded">Optional</span>
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
              <h2 className="text-lg font-semibold text-text-primary mb-3">4a. Jira Integration &mdash; Data Lifecycle and Erasure</h2>
              <p>
                This section applies only if you have connected a Jira workspace to your SprintHelm account.
                It explains in full detail what we store on Atlassian&apos;s behalf, why we are permitted to
                store it under UK GDPR / EU GDPR, and how you can remove it.
              </p>

              <h3 className="font-semibold text-text-primary mt-4 mb-2">What we store</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong className="text-text-primary">Atlassian account identifier.</strong> The opaque account
                  ID Atlassian provides during OAuth authorisation. Atlassian considers this identifier personal
                  data even though it is not a name or email, because it identifies you within Atlassian&apos;s
                  systems. We store it solely to match incoming Jira events to your SprintHelm account.
                </li>
                <li>
                  <strong className="text-text-primary">OAuth access and refresh tokens</strong> issued by
                  Atlassian. We store these tokens encrypted at rest using AES-256-GCM envelope encryption.
                  Encryption keys are managed per environment (staging and production use different keys)
                  and never leave our server-side infrastructure. Encrypted tokens are never sent to your
                  browser and are not visible to other users.
                </li>
                <li>
                  <strong className="text-text-primary">Connection audit log entries.</strong> For each
                  connection-related action (connect, disconnect, token refresh, sprint import) we store an
                  event-type label, a timestamp, and a reference to your connection. The audit log does not
                  contain the contents of any Jira ticket, sprint, or user-identifying detail beyond your
                  internal SprintHelm user ID.
                </li>
                <li>
                  <strong className="text-text-primary">Jira ticket and sprint data you actively import.</strong>
                  When you choose to import a Jira sprint or backlog, the ticket data you select is copied into
                  your SprintHelm account. This data then lives under the same retention rules as any other
                  ticket data you enter into SprintHelm directly.
                </li>
              </ul>

              <h3 className="font-semibold text-text-primary mt-4 mb-2">Lawful basis</h3>
              <p>
                We process the data above on the basis of{" "}
                <strong className="text-text-primary">legitimate interest</strong>{" "}
                under UK GDPR / EU GDPR Article 6(1)(f). The Jira integration cannot function without these
                data items, and you actively choose to enable it by clicking{" "}
                <strong className="text-text-primary">Connect Jira Workspace</strong>. You may withdraw the
                processing at any time by disconnecting (see &ldquo;How to erase&rdquo; below).
              </p>

              <h3 className="font-semibold text-text-primary mt-4 mb-2">How to erase your Jira data</h3>
              <p>
                You can permanently remove all the data above without contacting us:
              </p>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Sign in to SprintHelm and open your{" "}
                  <a href="https://app.sprinthelm.com/account" className="text-accent hover:underline">Account page</a>.
                </li>
                <li>Find the &ldquo;Jira Integration&rdquo; section.</li>
                <li>Click <strong className="text-text-primary">Disconnect Jira Workspace</strong>.</li>
              </ol>
              <p className="mt-3">When you disconnect:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Your encrypted OAuth token rows are hard-deleted immediately.</li>
                <li>Your workspace connection row is marked as &ldquo;disconnected&rdquo; and is purged within 30 days.</li>
                <li>Connection audit log entries are retained for 12 months for security and incident-response purposes, then automatically purged. You can request expedited audit-log purge by emailing privacy@sprinthelm.com.</li>
                <li>Jira ticket and sprint data you imported is NOT automatically deleted; it remains in your SprintHelm account under the standard retention rules and is deleted on full account deletion or on request.</li>
              </ul>

              <h3 className="font-semibold text-text-primary mt-4 mb-2">Sub-processor relationship</h3>
              <p>
                Atlassian Pty Ltd (the operator of Jira) is a sub-processor for this feature under our Data
                Processing Addendum (DPA). Atlassian&apos;s own privacy policy governs any processing that
                occurs on Atlassian&apos;s side of the integration:{" "}
                <span className="text-accent">atlassian.com/legal/privacy-policy</span>.
              </p>

              <h3 className="font-semibold text-text-primary mt-4 mb-2">Personal data reporting</h3>
              <p>
                SprintHelm operates an internal endpoint that lets our support team look up which Atlassian
                account identifiers we hold data about, in order to fulfil right-to-erasure requests promptly.
                The endpoint requires a per-environment shared secret known only to authorised SprintHelm
                personnel and is not publicly callable. We use it to honour your requests, not to share data
                with third parties.
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
              <p className="mt-3">
                If you connect a Jira workspace, Atlassian&apos;s OAuth servers and Jira API may be operated
                from the United States or other regions depending on your Atlassian site location. This
                constitutes an international transfer under GDPR; you actively consent to it by clicking
                Connect Jira Workspace. Atlassian&apos;s own data-transfer disclosures apply at{" "}
                <span className="text-accent">atlassian.com/legal/privacy-policy</span>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">6. Data Retention</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-text-primary">Active accounts:</strong> Data retained for as long as your account is active</li>
                <li><strong className="text-text-primary">Deleted accounts:</strong> Personal data permanently deleted within 30 days of account deletion</li>
                <li>
                  <strong className="text-text-primary">Jira integration tokens:</strong> Hard-deleted immediately
                  when you click Disconnect Jira Workspace
                </li>
                <li>
                  <strong className="text-text-primary">Jira connection metadata:</strong> Marked disconnected
                  on Disconnect and purged within 30 days
                </li>
                <li>
                  <strong className="text-text-primary">Jira connection audit log:</strong> Retained 12 months
                  after disconnect for security and incident-response purposes, then automatically purged.
                  Expedited purge available on request to privacy@sprinthelm.com.
                </li>
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
