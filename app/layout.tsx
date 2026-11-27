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
  title: "SprintHelm, Delivery Decision Intelligence",
  description:
    "Score your backlog across six weighted factors, run a Monte Carlo simulation, and generate a C-level summary, before the sprint begins. Stop guessing. Start delivering.",
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
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "SprintHelm, Delivery Decision Intelligence",
    description:
      "Your sprint plan looks fine. Your deadline doesn't know that yet.",
    url: "https://sprinthelm.com",
    siteName: "SprintHelm",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SprintHelm, Delivery Decision Intelligence",
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
        {/* Site-wide structured data: who we are (Organization) and the site
            itself (WebSite). Product + FAQ schema live on the homepage. */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
