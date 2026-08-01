import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers, SprintHelm",
  description:
    "Join the team building delivery decision intelligence. Open internships and roles across engineering, design, and growth.",
  openGraph: {
    title: "Careers, SprintHelm",
    description:
      "Help us build the delivery intelligence layer engineering teams have been missing. See open roles.",
    url: "https://sprinthelm.com/careers",
    type: "website",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
