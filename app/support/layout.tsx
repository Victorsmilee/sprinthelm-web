import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — SprintHelm",
  description:
    "Get help with SprintHelm. SLAs by plan, documentation, contact options, and troubleshooting guides for sprint simulations and backlog scoring.",
  openGraph: {
    title: "Support — SprintHelm",
    description:
      "SLAs by plan, documentation, and contact options. We respond to enterprise queries within one business day.",
    url: "https://sprinthelm.com/support",
    type: "website",
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
