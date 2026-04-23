import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SolutionDetailPage } from "@/components/SolutionDetailPage";
import { createPageMetadata } from "@/lib/metadata";
import { getSolutionBySlug, solutionsList } from "@/lib/solutions";

type SolutionRoutePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return solutionsList.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: SolutionRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return createPageMetadata({
      title: "Solution Not Found | Track Fleetio",
      description: "The requested solution page could not be found.",
      path: "/solutions",
    });
  }

  return createPageMetadata({
    title: `${solution.title} | Track Fleetio`,
    description: solution.description,
    path: `/solutions/${slug}`,
  });
}

export default async function SolutionRoutePage({
  params,
}: SolutionRoutePageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return <SolutionDetailPage solution={solution} />;
}
