import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/structured-data";
import { SITE_URL } from "@/lib/site";

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
  // Absolute base for OG/Twitter images and canonical URLs. Without it Next
  // can't resolve the opengraph-image or any `alternates.canonical` to an
  // absolute URL, and link previews / canonicals break.
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: "SprintHelm, Portfolio Delivery Forecasting Before You Commit",
  description:
    "Forecast delivery across every project against your real team capacity. Know what ships, what slips, and what one more project costs, before you commit to the product roadmap. Start for free, no payment card.",
  keywords: [
    "delivery forecasting",
    "engineering capacity planning",
    "portfolio delivery risk",
    "product roadmap planning",
    "Monte Carlo delivery simulation",
    "sprint capacity planning",
    "Jira delivery forecasting",
  ],
  authors: [{ name: "SprintHelm" }],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Can you deliver the product roadmap? Know before you commit.",
    description:
      "Portfolio delivery forecasting for engineering leaders. See what ships, what slips, and what one more project costs, before you commit. Start for free, no payment card.",
    url: "https://sprinthelm.com",
    siteName: "SprintHelm",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Can you deliver the product roadmap? Know before you commit.",
    description:
      "Portfolio delivery forecasting for engineering leaders. See what ships, what slips, and what one more project costs, before you commit. Start for free, no payment card.",
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
        {/* Site-wide structured data: who we are (Organization) and the site
            itself (WebSite). Product + FAQ schema live on the homepage. */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
