import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFrame } from "@/components/SiteFrame";
import { SiteProviders } from "@/components/SiteProviders";
import { siteMetadataBase } from "@/lib/metadata";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
  title: "Track Fleetio",
  description: "Track Fleetio fleet hardware storefront built with Next.js.",
  openGraph: {
    title: "Track Fleetio",
    description: "Track Fleetio fleet hardware storefront built with Next.js.",
    siteName: "Track Fleetio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Track Fleetio",
    description: "Track Fleetio fleet hardware storefront built with Next.js.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <SiteProviders>
          <SiteFrame>{children}</SiteFrame>
        </SiteProviders>
      </body>
    </html>
  );
}

