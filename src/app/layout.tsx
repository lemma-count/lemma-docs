import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { GrowthAnalyticsProvider } from "@/components/growth-analytics-provider";
import { siteName, siteUrl } from "@/lib/site";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/sometype-mono";
import "./global.css";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "Practical guidance for connecting a Sender, adding Leads, creating Missions, reviewing Sequences, and running controlled LinkedIn outreach with Lemma.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description:
      "Run outbound with clarity—from a connected Sender and the right Leads to reviewable work and visible next actions.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Lemma Help Center — One clear next step for every outbound job.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "Run outbound with clarity—from a connected Sender and the right Leads to reviewable work and visible next actions.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider
          theme={{
            enabled: false,
          }}
        >
          {children}
        </RootProvider>
        <GrowthAnalyticsProvider />
      </body>
    </html>
  );
}
