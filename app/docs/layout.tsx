import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation, SprintHelm",
  description:
    "Getting started, features, integrations, and FAQs. Import your backlog, run your first simulation, and understand your results.",
  openGraph: {
    title: "Documentation, SprintHelm",
    description:
      "Everything you need to run your first sprint simulation, from backlog import to reading the Pressure Index.",
    url: "https://sprinthelm.com/docs",
    type: "website",
  },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
