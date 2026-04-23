import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import type { ReactNode } from "react";

import { SiteProviders } from "@/components/SiteProviders";
import { siteMetadataBase } from "@/lib/metadata";
import { SSR_THEME_FALLBACK } from "@/lib/theme";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const generalSans = localFont({
  src: [
    {
      path: "../public/General Font/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/General Font/GeneralSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/General Font/GeneralSans-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/General Font/GeneralSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-general-sans",
});

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
    <html
      lang="en"
      className={`${inter.variable} ${generalSans.variable}`}
      data-theme={SSR_THEME_FALLBACK}
      data-theme-mode="system"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
      </head>
      <body suppressHydrationWarning>
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}

