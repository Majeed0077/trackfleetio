import type { Metadata } from "next";

const siteName = "Track Fleetio";

type MetadataConfig = {
  title: string;
  description: string;
  path: string;
};

export const createPageMetadata = ({
  title,
  description,
  path,
}: MetadataConfig): Metadata => ({
  title,
  description,
  alternates: {
    canonical: path,
  },
  openGraph: {
    title,
    description,
    url: path,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
});

export const siteMetadataBase = new URL("https://trackfleetio.com");
