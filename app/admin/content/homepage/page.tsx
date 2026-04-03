import {
  AdminFieldGroup,
  AdminFormCard,
  AdminFormSection,
  AdminPageHeader,
  AdminSectionList,
  AdminSectionRow,
  AdminTextarea,
  AdminTextInput,
  AdminUploadBox,
} from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminHomepageSections } from "@/lib/admin";
import {
  architectureContent,
  buyingPrioritiesContent,
  fieldUseCasesContent,
  hardwareEcosystemContent,
  heroContent,
  homeIndustriesContent,
  homepageMetrics,
  homepageSupportContent,
  resultsContent,
  whyTrackFleetioContent,
} from "@/lib/content/homepage";

export default function AdminContentHomepagePage() {
  return (
    <>
      <AdminPageHeader
        title="Homepage CMS"
        description="Full coverage shell for every section currently rendered on the public homepage. This does not change the storefront yet, but it gives you the exact admin surface to wire into an API later."
        actions={
          <>
            <button className="button button-secondary" type="button">Preview homepage</button>
            <button className="button button-primary" type="button">Publish changes</button>
          </>
        }
      />

      <AdminSectionList>
        {adminHomepageSections.map((section, index) => (
          <AdminSectionRow
            key={section.title}
            title={section.title}
            description={section.desc}
            status={section.status}
            footer={
              <div className={styles.adminToolbar}>
                <div className={styles.adminToolbarGroup}>
                  <span className={styles.adminChip}>Order {index + 1}</span>
                  <label className={styles.adminToggle}><input type="checkbox" defaultChecked={section.visible} /> Visible</label>
                </div>
                <div className={styles.adminToolbarGroup}>
                  <button className="button button-secondary" type="button">Edit fields</button>
                  <button className="button button-secondary" type="button">Reorder</button>
                </div>
              </div>
            }
          />
        ))}
      </AdminSectionList>

      <section className={styles.adminFormGrid}>
        <AdminFormCard>
          <AdminFormSection
            title="Hero and metrics"
            description="Headline, subtext, trust line, CTAs, hero media, and the four metrics shown above the fold."
          >
            <AdminFieldGroup label="Hero headline">
              <AdminTextarea defaultValue={heroContent.heading.join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Hero description">
              <AdminTextarea defaultValue={heroContent.description} />
            </AdminFieldGroup>
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Primary CTA">
                <AdminTextInput type="text" defaultValue={heroContent.primaryCta.label} />
              </AdminFieldGroup>
              <AdminFieldGroup label="Secondary CTA">
                <AdminTextInput type="text" defaultValue={heroContent.secondaryCta.label} />
              </AdminFieldGroup>
            </div>
            <AdminFieldGroup label="Hero trust line">
              <AdminTextInput type="text" defaultValue={heroContent.trustLine} />
            </AdminFieldGroup>
            <AdminUploadBox copy={`Hero collage image shell: ${heroContent.image.src}`} action={<button className="button button-secondary" type="button">Choose hero media</button>} />
            <AdminFieldGroup label="Metrics strip">
              <AdminTextarea defaultValue={homepageMetrics.map((metric) => `${metric.title} | ${metric.description}`).join("\n")} />
            </AdminFieldGroup>
          </AdminFormSection>

          <AdminFormSection
            title="Buying priorities and hardware ecosystem"
            description="Client-proof band plus the four hardware cards shown in the product ecosystem section."
          >
            <AdminFieldGroup label="Buying priorities intro">
              <AdminTextarea defaultValue={`${buyingPrioritiesContent.heading}\n${buyingPrioritiesContent.description}`} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Buying priority highlights">
              <AdminTextarea defaultValue={buyingPrioritiesContent.highlights.join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Hardware cards">
              <AdminTextarea defaultValue={hardwareEcosystemContent.cards.map((card) => `${card.title} | ${card.href} | ${card.specs}`).join("\n")} />
            </AdminFieldGroup>
          </AdminFormSection>
        </AdminFormCard>

        <AdminFormCard>
          <AdminFormSection
            title="Stories, outcomes, architecture, and support"
            description="Everything from the field-use-case videos through the homepage support cards."
          >
            <AdminFieldGroup label="Field use cases">
              <AdminTextarea defaultValue={fieldUseCasesContent.cards.map((card) => `${card.title} | ${card.ctaHref}`).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Results list">
              <AdminTextarea defaultValue={resultsContent.outcomes.map((item) => item.title).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Why Track Fleetio list">
              <AdminTextarea defaultValue={whyTrackFleetioContent.benefits.map((item) => item.title).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Architecture layers">
              <AdminTextarea defaultValue={architectureContent.layers.map((layer) => `${layer.label} | ${layer.title} | ${layer.connector ?? "no-connector"}`).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Industries showcase">
              <AdminTextarea defaultValue={`Primary: ${homeIndustriesContent.featured.title}\nStack cards: ${homeIndustriesContent.stackCards.map((card) => card.title).join(", ")}`} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Support cards">
              <AdminTextarea defaultValue={homepageSupportContent.cards.map((card) => `${card.title} | ${card.value} | ${card.href}`).join("\n")} />
            </AdminFieldGroup>
          </AdminFormSection>
        </AdminFormCard>
      </section>
    </>
  );
}
