import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IndustrySolutionPage } from "@/components/IndustrySolutionPage";
import { getIndustryBySlug, industriesList } from "@/lib/industries";
import { createPageMetadata } from "@/lib/metadata";

type IndustryRoutePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return industriesList.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: IndustryRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return createPageMetadata({
      title: "Industry Not Found | Track Fleetio",
      description: "The requested industry solution page could not be found.",
      path: "/industries",
    });
  }

  return createPageMetadata({
    title: industry.title,
    description: industry.description,
    path: `/industries/${slug}`,
  });
}

export default async function IndustryRoutePage({
  params,
}: IndustryRoutePageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  return <IndustrySolutionPage industry={industry} />;
}
