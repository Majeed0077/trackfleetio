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

export function HomePage() {
  return (
    <main id="main-content" className="site-main">
      <HomepageMotion />
      <HeroSection />
      <ClientsSection />
      <HardwareSection />
      <FeatureStorytellingSection />
      <ResultsSection />
      <FleetArchitectureSection />
      <HomeIndustriesSection />
      <WhySection />
      <CtaSection />
    </main>
  );
}
