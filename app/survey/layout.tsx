import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founding User Survey — SprintHelm",
  description:
    "Three-minute survey to help shape SprintHelm. Tell us how your team plans sprints, and we'll tell you what we're building next.",
  openGraph: {
    title: "Founding User Survey — SprintHelm",
    description:
      "Three minutes. Tell us how your team plans sprints, and we'll tell you what we're building next.",
    url: "https://sprinthelm.com/survey",
    type: "website",
  },
};

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
