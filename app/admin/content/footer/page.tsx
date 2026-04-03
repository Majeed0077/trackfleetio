import {
  AdminFieldGroup,
  AdminFormCard,
  AdminFormSection,
  AdminPageHeader,
  AdminTable,
  AdminTableCard,
  AdminTextarea,
  AdminTextInput,
} from "@/components/admin/AdminUi";
import { adminFooterGroups } from "@/lib/admin";
import styles from "@/components/admin/Admin.module.css";
import {
  footerBranding,
  footerEditorialContent,
  footerLegalLinks,
  footerLinkGroups,
  footerSocialLinks,
} from "@/lib/content/footer";

export default function AdminContentFooterPage() {
  return (
    <>
      <AdminPageHeader
        title="Footer editor"
        description="Coverage shell for footer editorial copy, CTAs, link columns, social URLs, legal labels, and support contact details."
      />

      <AdminTableCard title="Footer columns" description="Current link groups visible in the public footer.">
        <AdminTable
          headers={["Group", "Links / Content", "Action"]}
          rows={adminFooterGroups.map((group) => (
            <tr key={group.title}>
              <td><span className={styles.adminTableTitle}>{group.title}</span></td>
              <td>{group.links}</td>
              <td><button className={styles.adminTextLink} type="button">Edit</button></td>
            </tr>
          ))}
        />
      </AdminTableCard>

      <section className={styles.adminFormGrid}>
        <AdminFormCard>
          <AdminFormSection title="Editorial intro" description="Headline, supporting copy, contact CTA, and footer buttons.">
            <AdminFieldGroup label="Eyebrow">
              <AdminTextInput type="text" defaultValue={footerEditorialContent.eyebrow} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Headline">
              <AdminTextarea defaultValue={footerEditorialContent.headingLines.join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Description">
              <AdminTextarea defaultValue={footerEditorialContent.description} />
            </AdminFieldGroup>
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Editorial contact email">
                <AdminTextInput type="email" defaultValue={footerEditorialContent.contactEmail} />
              </AdminFieldGroup>
              <AdminFieldGroup label="Primary footer CTA">
                <AdminTextInput type="text" defaultValue={footerEditorialContent.primaryCta.label} />
              </AdminFieldGroup>
            </div>
          </AdminFormSection>

          <AdminFormSection title="Footer columns" description="Expandable public footer navigation groups.">
            <AdminFieldGroup label="Products links">
              <AdminTextarea defaultValue={footerLinkGroups[0].links.map((link) => link.label).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Solutions links">
              <AdminTextarea defaultValue={footerLinkGroups[1].links.map((link) => link.label).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Industries links">
              <AdminTextarea defaultValue={footerLinkGroups[2].links.map((link) => link.label).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Company links">
              <AdminTextarea defaultValue={footerLinkGroups[3].links.map((link) => link.label).join("\n")} />
            </AdminFieldGroup>
          </AdminFormSection>
        </AdminFormCard>

        <AdminFormCard>
          <AdminFormSection title="Social, legal, and branding" description="Everything in the footer legal row.">
            <AdminFieldGroup label="Social links">
              <AdminTextarea defaultValue={footerSocialLinks.map((link) => `${link.label} | ${link.href}`).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Legal labels">
              <AdminTextarea defaultValue={footerLegalLinks.join("\n")} />
            </AdminFieldGroup>
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Brand label">
                <AdminTextInput type="text" defaultValue={footerBranding.brandLabel} />
              </AdminFieldGroup>
              <AdminFieldGroup label="Copyright pattern">
                <AdminTextInput type="text" defaultValue={`(c) {year} ${footerBranding.copyrightLabel}`} />
              </AdminFieldGroup>
            </div>
          </AdminFormSection>
        </AdminFormCard>
      </section>
    </>
  );
}
