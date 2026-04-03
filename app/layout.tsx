import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFrame } from "@/components/SiteFrame";
import { SiteProviders } from "@/components/SiteProviders";
import { siteMetadataBase } from "@/lib/metadata";
import { SITE_STORE_KEY, SSR_THEME_FALLBACK } from "@/lib/theme";

import "./globals.css";

const themeScript = `
(() => {
  const root = document.documentElement;
  const applyTheme = (resolvedTheme) => {
    root.dataset.themeMode = resolvedTheme;
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

    applyTheme(resolvedTheme);
  } catch {
    const fallbackTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    applyTheme(fallbackTheme);
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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={SSR_THEME_FALLBACK}
      data-theme-mode={SSR_THEME_FALLBACK}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>
        <SiteProviders>
          <SiteFrame>{children}</SiteFrame>
        </SiteProviders>
      </body>
    </html>
  );
}

