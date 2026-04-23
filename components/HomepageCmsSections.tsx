"use client";

import type { ReactNode } from "react";

import { CmsEditableBoundary } from "@/components/CmsEditableBoundary";
import { useAppStore } from "@/store/store";

export function HomepageCmsSections({ children }: { children: ReactNode }) {
  const isAdmin = useAppStore((state) => state.authUser?.role === "admin");

  if (!isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <CmsEditableBoundary
        sectionId="homepage.hero"
        title="Homepage Hero"
        description="Main headline, trust line, and primary conversion actions."
        draftKey="homepageHero"
        adminSection="homepage.hero"
      >
        {null}
      </CmsEditableBoundary>
      <CmsEditableBoundary
        sectionId="homepage.buying-priorities"
        title="Buying Priorities"
        description="Proof band for operations, safety, deployment, and procurement."
        draftKey="homepageBuyingPriorities"
        adminSection="homepage.buying-priorities"
      >
        {null}
      </CmsEditableBoundary>
      <CmsEditableBoundary
        sectionId="homepage.story"
        title="Field Stories"
        description="Video and image-driven content blocks for solution storytelling."
        draftKey="homepageStory"
        adminSection="homepage.story"
      >
        {null}
      </CmsEditableBoundary>
      <CmsEditableBoundary
        sectionId="homepage.architecture"
        title="Architecture"
        description="Connected system layers and rollout architecture messaging."
        draftKey="homepageArchitecture"
        adminSection="homepage.architecture"
      >
        {null}
      </CmsEditableBoundary>
      <CmsEditableBoundary
        sectionId="homepage.industries"
        title="Industries"
        description="Industry-specific homepage showcase and supporting cards."
        draftKey="homepageIndustries"
        adminSection="homepage.industries"
      >
        {null}
      </CmsEditableBoundary>
      <CmsEditableBoundary
        sectionId="homepage.hardware"
        title="Hardware Ecosystem"
        description="Homepage hardware stack and category CTA."
        draftKey="homepageHardware"
        adminSection="homepage.hardware"
      >
        {null}
      </CmsEditableBoundary>
      <CmsEditableBoundary
        sectionId="homepage.trust"
        title="Trust Evidence"
        description="Stats, reviews, and social proof."
        draftKey="homepageTrust"
        adminSection="homepage.trust"
      >
        {null}
      </CmsEditableBoundary>
      <CmsEditableBoundary
        sectionId="homepage.results"
        title="Results"
        description="Outcome-driven content showing business value."
        draftKey="homepageResults"
        adminSection="homepage.results"
      >
        {null}
      </CmsEditableBoundary>
      <CmsEditableBoundary
        sectionId="homepage.support"
        title="Support"
        description="Contact and support cards for fast lead routing."
        draftKey="homepageSupport"
        adminSection="homepage.support"
      >
        {null}
      </CmsEditableBoundary>
    </>
  );
}
