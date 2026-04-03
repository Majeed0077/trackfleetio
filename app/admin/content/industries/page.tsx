import { AdminFieldGroup, AdminFormCard, AdminFormSection, AdminPageHeader, AdminTable, AdminTableCard, AdminTextarea, AdminTextInput } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { industriesList } from "@/lib/industries";

export default function AdminContentIndustriesPage() {
  return (
    <>
      <AdminPageHeader
        title="Industries directory"
        description="Coverage shell for industry landing cards and all industry detail pages currently shown in the storefront."
        actions={<button className="button button-primary" type="button">Add industry shell</button>}
      />

      <AdminTableCard
        title="Live industry coverage"
        description="Current industry records already used by the storefront. Keep slug, hardware recommendations, and use-case messaging aligned before API wiring."
      >
        <AdminTable
          headers={["Title", "Slug", "Hardware", "Use Cases", "CTA", "Action"]}
          rows={industriesList.map((industry) => (
            <tr key={industry.slug}>
              <td>
                <div className={styles.adminInlineStack}>
                  <span className={styles.adminTableTitle}>{industry.title}</span>
                  <small>{industry.description}</small>
                </div>
              </td>
              <td>{industry.slug}</td>
              <td>{industry.hardware.length}</td>
              <td>{industry.useCases.length}</td>
              <td>{industry.cta}</td>
              <td><button className={styles.adminTextLink} type="button">Edit shell</button></td>
            </tr>
          ))}
        />
      </AdminTableCard>

      <section className={styles.adminFormGrid}>
        <AdminFormCard>
          <AdminFormSection
            title="Directory card fields"
            description="Fields used by the `/industries` listing page and homepage industry stack."
          >
            <AdminFieldGroup label="Directory title">
              <AdminTextInput type="text" defaultValue={industriesList[0]?.title ?? ""} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Directory description">
              <AdminTextarea defaultValue={industriesList[0]?.description ?? ""} />
            </AdminFieldGroup>
          </AdminFormSection>

          <AdminFormSection
            title="Challenge and use-case blocks"
            description="Structured fields for industry detail page storytelling."
          >
            <AdminFieldGroup label="Challenges">
              <AdminTextarea defaultValue={industriesList[0]?.challenges.map((item) => `${item.title}: ${item.description}`).join("\n\n") ?? ""} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Use cases">
              <AdminTextarea defaultValue={industriesList[0]?.useCases.map((item) => `${item.title}: ${item.description}`).join("\n\n") ?? ""} />
            </AdminFieldGroup>
          </AdminFormSection>
        </AdminFormCard>

        <AdminFormCard>
          <AdminFormSection
            title="Hardware mapping"
            description="Recommended product relationships for each industry detail page."
          >
            <AdminFieldGroup label="Hardware rows">
              <AdminTextarea defaultValue={industriesList[0]?.hardware.map((item) => `${item.title} | ${item.productId ?? "no-product-id"} | ${item.specs}`).join("\n") ?? ""} />
            </AdminFieldGroup>
            <AdminFieldGroup label="CTA">
              <AdminTextInput type="text" defaultValue={industriesList[0]?.cta ?? ""} />
            </AdminFieldGroup>
          </AdminFormSection>
        </AdminFormCard>
      </section>
    </>
  );
}
