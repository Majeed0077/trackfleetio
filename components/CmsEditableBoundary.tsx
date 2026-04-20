"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { useAppStore, type InlineCmsSectionId } from "@/store/store";

const InlineEditableSection = dynamic(() =>
  import("@/components/InlineEditableSection").then((mod) => mod.InlineEditableSection),
);
const adminSectionMap = {
  "homepage.hero": dynamic(() => import("@/components/HeroSection").then((mod) => mod.HeroSection)),
  "homepage.buying-priorities": dynamic(() =>
    import("@/components/ClientsSection").then((mod) => mod.ClientsSection),
  ),
  "homepage.story": dynamic(() =>
    import("@/components/FeatureStorytellingSection").then((mod) => mod.FeatureStorytellingSection),
  ),
  "homepage.architecture": dynamic(() =>
    import("@/components/FleetArchitectureSection").then((mod) => mod.FleetArchitectureSection),
  ),
  "homepage.industries": dynamic(() =>
    import("@/components/HomeIndustriesSection").then((mod) => mod.HomeIndustriesSection),
  ),
  "homepage.hardware": dynamic(() =>
    import("@/components/HardwareSection").then((mod) => mod.HardwareSection),
  ),
  "homepage.trust": dynamic(() =>
    import("@/components/TrustEvidenceSection").then((mod) => mod.TrustEvidenceSection),
  ),
  "homepage.results": dynamic(() =>
    import("@/components/ResultsSection").then((mod) => mod.ResultsSection),
  ),
  "homepage.support": dynamic(() =>
    import("@/components/HomeSupportSection").then((mod) => mod.HomeSupportSection),
  ),
} as const;

type AdminSectionKey = keyof typeof adminSectionMap;

type CmsEditableBoundaryProps = {
  sectionId: InlineCmsSectionId;
  title: string;
  description: string;
  draftKey?:
    | "homepageHero"
    | "homepageBuyingPriorities"
    | "homepageStory"
    | "homepageArchitecture"
    | "homepageIndustries"
    | "homepageHardware"
    | "homepageTrust"
    | "homepageResults"
    | "homepageSupport"
    | "footerEditorial"
    | "solutionsCatalog";
  adminSection?: AdminSectionKey;
  children: ReactNode;
};

export function CmsEditableBoundary({
  sectionId,
  title,
  description,
  draftKey,
  adminSection,
  children,
}: CmsEditableBoundaryProps) {
  const authUser = useAppStore((state) => state.authUser);
  const AdminSection = adminSection ? adminSectionMap[adminSection] : null;
  const content = AdminSection ? <AdminSection /> : children;

  if (authUser?.role !== "admin") {
    return <div className="inline-cms-section">{children}</div>;
  }

  return (
    <InlineEditableSection
      sectionId={sectionId}
      title={title}
      description={description}
      draftKey={draftKey}
    >
      {content}
    </InlineEditableSection>
  );
}
