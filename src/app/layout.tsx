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
    "Practical guides to prepare roles, find and select candidates, supervise recruiting work, and configure Speiros.",
  icons: {
    icon: [
      { url: "/speiros-mark.svg?v=1", type: "image/svg+xml" },
    ],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description:
      "Recruit with clear context, selected candidates, reviewed outreach, and visible next actions.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Speiros Help Center — One clear next step for your recruiting work.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "Recruit with clear context, selected candidates, reviewed outreach, and visible next actions.",
    images: ["/opengraph-image"],
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
