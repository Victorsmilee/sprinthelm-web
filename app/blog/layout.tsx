import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog, SprintHelm",
  description:
    "Engineering and delivery essays from the SprintHelm team, sprint planning, Monte Carlo forecasting, and what the data actually says about why teams miss dates.",
  openGraph: {
    title: "Blog, SprintHelm",
    description:
      "Engineering and delivery essays, sprint planning, Monte Carlo forecasting, and the data behind missed deadlines.",
    url: "https://sprinthelm.com/blog",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
