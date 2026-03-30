import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailPage } from "@/components/ProductDetailPage";
import { getProductById, productOrder } from "@/data/products";
import { createPageMetadata } from "@/lib/metadata";

type ProductRoutePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return productOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) {
    return createPageMetadata({
      title: "Product Not Found | Track Fleetio",
      description: "The requested product could not be found.",
      path: "/products",
    });
  }

  return createPageMetadata({
    title: `${product.title} | Track Fleetio`,
    description: product.shortDescription,
    path: `/products/${slug}`,
  });
}

export default async function ProductRoutePage({
  params,
}: ProductRoutePageProps) {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
