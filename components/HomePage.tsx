import { ClientsSection } from "@/components/ClientsSection";
import { FleetArchitectureSection } from "@/components/FleetArchitectureSection";
import { FeatureStorytellingSection } from "@/components/FeatureStorytellingSection";
import { HardwareSection } from "@/components/HardwareSection";
import { HeroSection } from "@/components/HeroSection";
import { HomepageMotion } from "@/components/HomepageMotion";
import { HomeIndustriesSection } from "@/components/HomeIndustriesSection";
import { HomeSupportSection } from "@/components/HomeSupportSection";
import { InlineEditableSection } from "@/components/InlineEditableSection";
import { ResultsSection } from "@/components/ResultsSection";
import { TrustEvidenceSection } from "@/components/TrustEvidenceSection";

export function HomePage() {
  return (
    <main
      id="main-content"
      className="site-main"
      data-homepage-motion-root
    >
      <HomepageMotion />
      <InlineEditableSection
        sectionId="homepage.hero"
        title="Homepage Hero"
        description="Main headline, trust line, and primary conversion actions."
        draftKey="homepageHero"
      >
        <HeroSection />
      </InlineEditableSection>
      <InlineEditableSection
        sectionId="homepage.buying-priorities"
        title="Buying Priorities"
        description="Proof band for operations, safety, deployment, and procurement."
        draftKey="homepageBuyingPriorities"
      >
        <ClientsSection />
      </InlineEditableSection>
      <InlineEditableSection
        sectionId="homepage.story"
        title="Field Stories"
        description="Video and image-driven content blocks for solution storytelling."
        draftKey="homepageStory"
      >
        <FeatureStorytellingSection />
      </InlineEditableSection>
      <InlineEditableSection
        sectionId="homepage.architecture"
        title="Architecture"
        description="Connected system layers and rollout architecture messaging."
        draftKey="homepageArchitecture"
      >
        <FleetArchitectureSection />
      </InlineEditableSection>
      <InlineEditableSection
        sectionId="homepage.industries"
        title="Industries"
        description="Industry-specific homepage showcase and supporting cards."
        draftKey="homepageIndustries"
      >
        <HomeIndustriesSection />
      </InlineEditableSection>
      <InlineEditableSection
        sectionId="homepage.hardware"
        title="Hardware Ecosystem"
        description="Homepage hardware stack and category CTA."
        draftKey="homepageHardware"
      >
        <HardwareSection />
      </InlineEditableSection>
      <InlineEditableSection
        sectionId="homepage.trust"
        title="Trust Evidence"
        description="Stats, reviews, and social proof."
        draftKey="homepageTrust"
      >
        <TrustEvidenceSection />
      </InlineEditableSection>
      <InlineEditableSection
        sectionId="homepage.results"
        title="Results"
        description="Outcome-driven content showing business value."
        draftKey="homepageResults"
      >
        <ResultsSection />
      </InlineEditableSection>
      <InlineEditableSection
        sectionId="homepage.support"
        title="Support"
        description="Contact and support cards for fast lead routing."
        draftKey="homepageSupport"
      >
        <HomeSupportSection />
      </InlineEditableSection>
    </main>
  );
}
