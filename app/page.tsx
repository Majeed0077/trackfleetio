import type { Metadata } from "next";

import { ClientsSection } from "@/components/ClientsSection";
import { CtaSection } from "@/components/CtaSection";
import { FleetArchitectureSection } from "@/components/FleetArchitectureSection";
import { FeatureStorytellingSection } from "@/components/FeatureStorytellingSection";
import { HardwareSection } from "@/components/HardwareSection";
import { HeroSection } from "@/components/HeroSection";
import { HomepageMotion } from "@/components/HomepageMotion";
import { HomeIndustriesSection } from "@/components/HomeIndustriesSection";
import { ResultsSection } from "@/components/ResultsSection";
import { WhySection } from "@/components/WhySection";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Track Fleetio",
    description:
      "Track Fleetio provides fleet tracking devices, AI dashcams, asset trackers, and sensors for connected fleet operations.",
    path: "/",
  });
}

export default function HomePage() {
  return (
    <main id="main-content" className="site-main">
      <HomepageMotion />
      <HeroSection />
      <HardwareSection />
      <FleetArchitectureSection />
      <HomeIndustriesSection />
      <FeatureStorytellingSection />
      <WhySection />
      <ResultsSection />
      <ClientsSection />
      <CtaSection />
    </main>
  );
}
