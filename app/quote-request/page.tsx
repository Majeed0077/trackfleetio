import type { Metadata } from "next";

import { QuoteRequestFlow } from "@/components/QuoteRequestFlow";
import { getProductById } from "@/data/products";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Request a Quote | Track Fleetio",
    description: "Share your industry, fleet size, and contact details so Track Fleetio can prepare the right hardware quote.",
    path: "/quote-request",
  });
}

export default async function QuoteRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const params = await searchParams;
  const selectedProduct = params.product ? getProductById(params.product) ?? null : null;

  return <QuoteRequestFlow selectedProduct={selectedProduct} />;
}
