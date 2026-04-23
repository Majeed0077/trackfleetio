import { ProductCatalogPage } from "@/components/ProductCatalogPage";
import { createPageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
export const metadata = createPageMetadata({
  title: "Products | Track Fleetio",
  description:
    "Browse Track Fleetio hardware used across fleet tracking, monitoring, video telematics, and deployment-ready B2B solutions.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductCatalogPage />
    </Suspense>
  );
}
