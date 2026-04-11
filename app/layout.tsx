import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { SiteFrame } from "@/components/SiteFrame";
import { SiteProviders } from "@/components/SiteProviders";
import { siteMetadataBase } from "@/lib/metadata";
import { getSessionUser } from "@/lib/server/auth-session";
import { SITE_STORE_KEY, SSR_THEME_FALLBACK } from "@/lib/theme";

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

const themeScript = `
(() => {
  const root = document.documentElement;
  const applyTheme = (themeMode, resolvedTheme) => {
    root.dataset.themeMode = themeMode;
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;
  };

  try {
    const storageValue = localStorage.getItem("${SITE_STORE_KEY}");
    let themeMode = "system";

    const parsedValue = JSON.parse(storageValue ?? "null");
    const persistedState =
      parsedValue && typeof parsedValue === "object" && "state" in parsedValue
        ? parsedValue.state
        : parsedValue;

    if (persistedState && typeof persistedState === "object") {
      if (
        persistedState.themeMode === "light" ||
        persistedState.themeMode === "dark" ||
        persistedState.themeMode === "system"
      ) {
        themeMode = persistedState.themeMode;
      } else if (
        persistedState.theme === "light" ||
        persistedState.theme === "dark"
      ) {
        themeMode = persistedState.theme;
      }
    }

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const resolvedTheme = themeMode === "system" ? systemTheme : themeMode;

    applyTheme(themeMode, resolvedTheme);
  } catch {
    const fallbackTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    applyTheme("system", fallbackTheme);
  }
})();
`;

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const initialAuthUser = await getSessionUser();

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
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>
        <SiteProviders initialAuthUser={initialAuthUser}>
          <SiteFrame initialAuthUser={initialAuthUser}>{children}</SiteFrame>
        </SiteProviders>
      </body>
    </html>
  );
}

