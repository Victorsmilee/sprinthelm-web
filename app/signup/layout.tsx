import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up — SprintHelm",
  description:
    "Start using SprintHelm in 60 seconds. Score your backlog across six weighted factors, run a Monte Carlo simulation, and ship with confidence.",
  openGraph: {
    title: "Sign up — SprintHelm",
    description:
      "Score your backlog, run a Monte Carlo simulation, and generate a C-level summary — before the sprint begins.",
    url: "https://sprinthelm.com/signup",
    type: "website",
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
