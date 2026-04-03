import type { Metadata } from "next";

import { ProductCatalogPage } from "@/components/ProductCatalogPage";
import { createPageMetadata } from "@/lib/metadata";

type ProductsPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

const getSearchQueryValue = (value?: string | string[]) =>
  Array.isArray(value) ? (value[0] ?? "") : (value ?? "");

export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const query = getSearchQueryValue(resolvedSearchParams.q).trim();

  if (query) {
    return createPageMetadata({
      title: `${query} Products | Track Fleetio`,
      description: `Browse Track Fleetio hardware products matching "${query}".`,
      path: `/products?q=${encodeURIComponent(query)}`,
    });
  }

  return createPageMetadata({
    title: "Products | Track Fleetio",
    description:
      "Browse Track Fleetio hardware used across fleet tracking, monitoring, video telematics, and deployment-ready B2B solutions.",
    path: "/products",
  });
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = getSearchQueryValue(resolvedSearchParams.q);

  return <ProductCatalogPage key={query || "__products"} initialQuery={query} />;
}
