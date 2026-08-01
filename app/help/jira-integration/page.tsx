import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Jira Integration FAQ, SprintHelm",
  description:
    "Frequently asked questions about connecting your Jira workspace to SprintHelm, per-user connections, Jira admin permissions, subscription requirements, multi-user logins, and what happens when you leave your company.",
};

const LAST_UPDATED = "8 June 2026";

interface FaqItem {
  q: string;
  a: React.ReactNode;
  id: string;
}

const FAQS: FaqItem[] = [
  {
    id: "shared-connection",
    q: "Does my whole team share one Jira connection?",
    a: (
      <>
        <p>
          No. Each SprintHelm user connects their own Jira workspace. If five teammates all want to import
          sprints from the same Jira site, each of them clicks <strong>Connect Jira Workspace</strong> on
          their own SprintHelm account.
        </p>
        <p>
          One shared organisation-level connection is a feature on our roadmap, see &ldquo;What if I want one
          shared connection for my whole team?&rdquo; below.
        </p>
      </>
    ),
  },
  {
    id: "why-per-user",
    q: "Why per-user instead of a single team connection?",
    a: (
      <>
        <p>Three reasons:</p>
        <ol className="list-decimal list-inside space-y-2 pl-2">
          <li>
            <strong>Jira permissions are per-user.</strong> Your OAuth tokens only grant SprintHelm access to
            projects <em>you</em> can see in Jira. A shared connection would either give everyone the
            connector&rsquo;s permissions (potentially over-privileged) or fail for anyone with narrower access.
          </li>
          <li>
            <strong>No password sharing.</strong> Each person authorises with their own Atlassian login.
            Nobody needs to know anyone else&rsquo;s Atlassian credentials.
          </li>
          <li>
            <strong>Independent control.</strong> If one teammate leaves the company, only their connection
            breaks. The rest of the team keeps importing without interruption.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "jira-admin",
    q: "Do I need to be a Jira admin to connect?",
    a: (
      <>
        <p>
          Only if your Atlassian organisation has set <em>&ldquo;Admin approval required&rdquo;</em> for
          third-party apps. Most small organisations don&rsquo;t, any Atlassian user can authorise SprintHelm
          directly.
        </p>
        <p>
          If your organisation requires admin approval, you&rsquo;ll see Atlassian&rsquo;s
          &ldquo;Approval required&rdquo; screen when you click Connect. Ask your Jira site admin to approve
          &ldquo;SprintHelm&rdquo; in the Connected apps list at <span className="text-accent">admin.atlassian.com</span>.
        </p>
      </>
    ),
  },
  {
    id: "subscription",
    q: "Does every team member need a Pro subscription?",
    a: (
      <p>
        Yes. Jira integration is a Pro+ feature, and the gate is per-user. If one teammate is on Pro and
        another is on Free, only the Pro teammate sees the Connect button, the Free teammate sees an
        upgrade prompt.
      </p>
    ),
  },
  {
    id: "shared-login",
    q: "Can multiple people log into one SprintHelm account to share a Jira connection?",
    a: (
      <>
        <p>
          Technically, yes, SprintHelm allows multiple concurrent sessions per account, and they&rsquo;d
          all share the same Jira connection.
        </p>
        <p>
          But this is against our Terms of Service (one account, one user) and we don&rsquo;t recommend it.
          Audit logs will all show the same actor, and there&rsquo;s no way to tell who did what. Each
          teammate should have their own account.
        </p>
      </>
    ),
  },
  {
    id: "leaving",
    q: "What happens if I leave the company?",
    a: (
      <p>
        Your Jira connection only affects your SprintHelm account. When you stop using SprintHelm, your
        encrypted Jira tokens stay in our database until either (a) you click <strong>Disconnect</strong>,
        or (b) your SprintHelm account is deleted (which cascades the deletion). Sprint data you&rsquo;ve
        already imported into SprintHelm stays in SprintHelm.
      </p>
    ),
  },
  {
    id: "shared-team-connection",
    q: "What if I want one shared connection for my whole team?",
    a: (
      <>
        <p>
          That&rsquo;s coming in a future release. We&rsquo;re tracking it as the
          &ldquo;organisation connection&rdquo; model, one designated admin connects on behalf of the
          organisation, and all team members share that connection without each needing to OAuth
          themselves.
        </p>
        <p>
          Until then, the per-user model is the only option. Each team member who needs Jira import
          authorises SprintHelm with their own Atlassian account.
        </p>
      </>
    ),
  },
  {
    id: "token-storage",
    q: "Where are my Jira tokens stored?",
    a: (
      <p>
        Encrypted in our database using AES-256-GCM (the industry-standard authenticated encryption
        algorithm). The encryption key is stored separately in our deployment environment variables, it
        never lives in the database, in code, or in logs. Inspecting the database directly shows only
        ciphertext, never your tokens.
      </p>
    ),
  },
  {
    id: "what-imports",
    q: "What gets imported when I click &ldquo;Import active sprint&rdquo;?",
    a: (
      <>
        <p>
          All issues in your chosen project&rsquo;s currently-active sprint are imported as SprintHelm
          tickets. We map the following Jira fields:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>
            <strong>Summary</strong> → SprintHelm ticket title
          </li>
          <li>
            <strong>Issue type</strong> → Story becomes <em>feature</em>, Bug stays Bug, Task becomes
            {" "}<em>tech_debt</em>, Incident stays Incident
          </li>
          <li>
            <strong>Story points</strong> (Jira&rsquo;s <code>customfield_10016</code> by default) → effort
            points; defaults to 3 if missing
          </li>
          <li>
            <strong>Epic parent</strong> → SprintHelm Epic grouping
          </li>
        </ul>
        <p>
          Epics and Subtasks are <strong>skipped</strong>, they&rsquo;re not ticket-level work in
          SprintHelm&rsquo;s model.
        </p>
        <p>
          SprintHelm&rsquo;s six scoring dimensions (revenue impact, incident risk, tech debt severity,
          customer impact, strategic alignment, deadline sensitivity) don&rsquo;t exist in Jira, so they
          default to a neutral 3 / 5 on import. Adjust them on the Enter tickets tab before running a
          simulation for accurate results.
        </p>
      </>
    ),
  },
];

export default function JiraIntegrationFaqPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen section-padding pt-24">
        <div className="mx-auto max-w-3xl w-full">
          <div className="mb-10">
            <p className="text-sm text-accent font-medium mb-2">Help · Integrations</p>
            <h1 className="text-h1 font-bold text-text-primary mb-2">Jira integration FAQ</h1>
            <p className="text-sm text-text-disabled">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="mb-10 rounded-[10px] border border-accent/20 bg-accent/5 p-5">
            <p className="text-sm text-text-primary">
              <strong>Quick summary:</strong> Each SprintHelm user connects their own Jira workspace.
              There&rsquo;s no shared organisation connection in the current release. Every team member who
              wants to import Jira sprints into SprintHelm authorises individually with Atlassian and gets
              their own encrypted token pair.
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              This is intentional, it&rsquo;s the simplest design that&rsquo;s both secure and respectful
              of Jira&rsquo;s own permission model.
            </p>
          </div>

          {/* Anchor list for quick nav */}
          <nav className="mb-10 rounded-[10px] border border-border-subtle bg-bg-elevated p-5">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
              On this page
            </p>
            <ul className="space-y-1.5">
              {FAQS.map((f) => (
                <li key={f.id}>
                  <a href={`#${f.id}`} className="text-sm text-accent hover:underline">
                    {f.q.replace(/&ldquo;|&rdquo;/g, '"')}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="prose prose-invert max-w-none space-y-10 text-text-secondary leading-relaxed">
            {FAQS.map((f) => (
              <section key={f.id} id={f.id} className="scroll-mt-24">
                <h2 className="text-lg font-semibold text-text-primary mb-3">{f.q}</h2>
                <div className="space-y-3">{f.a}</div>
              </section>
            ))}
          </div>

          <div className="mt-16 rounded-[10px] border border-border-subtle bg-bg-elevated p-6">
            <p className="text-sm font-semibold text-text-primary mb-2">Still have a question?</p>
            <p className="text-sm text-text-secondary mb-4">
              Reach out and we&rsquo;ll help you get your Jira workspace connected.
            </p>
            <a
              href="mailto:support@sprinthelm.com"
              className="inline-block rounded-[8px] bg-accent px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Contact support
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
