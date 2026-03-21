import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SprintHelm — AI-Powered Delivery Intelligence",
  description:
    "Score your backlog across six weighted factors, run a Monte Carlo simulation, and generate a C-level summary — before the sprint begins. Stop guessing. Start delivering.",
  keywords: [
    "sprint planning",
    "backlog scoring",
    "Monte Carlo simulation",
    "delivery intelligence",
    "engineering team",
    "Jira",
    "agile",
  ],
  authors: [{ name: "SprintHelm" }],
  openGraph: {
    title: "SprintHelm — AI-Powered Delivery Intelligence",
    description:
      "Your sprint plan looks fine. Your deadline doesn't know that yet.",
    url: "https://sprinthelm.com",
    siteName: "SprintHelm",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SprintHelm — AI-Powered Delivery Intelligence",
    description:
      "Your sprint plan looks fine. Your deadline doesn't know that yet.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
