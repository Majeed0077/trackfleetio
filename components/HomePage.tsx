import { HomepageMotion } from "@/components/HomepageMotion";
import { HomepageCmsSections } from "@/components/HomepageCmsSections";
import {
  PublicClientsSection,
  PublicFeatureStorytellingSection,
  PublicFleetArchitectureSection,
  PublicHardwareSection,
  PublicHeroSection,
  PublicHomeIndustriesSection,
  PublicHomeSupportSection,
  PublicResultsSection,
  PublicTrustEvidenceSection,
} from "@/components/PublicHomepageSections";

export function HomePage() {
  return (
    <main id="main-content" className="site-main" data-homepage-motion-root>
      <HomepageMotion />
      <HomepageCmsSections>
        <PublicHeroSection />
        <PublicClientsSection />
        <PublicFeatureStorytellingSection />
        <PublicFleetArchitectureSection />
        <PublicHomeIndustriesSection />
        <PublicHardwareSection />
        <PublicTrustEvidenceSection />
        <PublicResultsSection />
        <PublicHomeSupportSection />
      </HomepageCmsSections>
    </main>
  );
}
