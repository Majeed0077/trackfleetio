import { ClientsSection } from "@/components/ClientsSection";
import { FleetArchitectureSection } from "@/components/FleetArchitectureSection";
import { FeatureStorytellingSection } from "@/components/FeatureStorytellingSection";
import { HardwareSection } from "@/components/HardwareSection";
import { HeroSection } from "@/components/HeroSection";
import { HomepageMotion } from "@/components/HomepageMotion";
import { HomeIndustriesSection } from "@/components/HomeIndustriesSection";
import { HomeSupportSection } from "@/components/HomeSupportSection";
import { ResultsSection } from "@/components/ResultsSection";
import { TrustEvidenceSection } from "@/components/TrustEvidenceSection";

export function HomePage() {
  return (
    <main id="main-content" className="site-main">
      <HomepageMotion />
      <HeroSection />
      <ClientsSection />
      <FeatureStorytellingSection />
      <FleetArchitectureSection />
      <HomeIndustriesSection />
      <HardwareSection />
      <TrustEvidenceSection />
      <ResultsSection />
      <HomeSupportSection />
    </main>
  );
}
