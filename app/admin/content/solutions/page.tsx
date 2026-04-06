import { AdminFieldGroup, AdminFormCard, AdminFormSection, AdminPagination, AdminPageHeader, AdminTable, AdminTableCard, AdminTextarea, AdminTextInput } from "@/components/admin/AdminUi";
import { AdminCmsWorkflowPanel } from "@/components/AdminCmsWorkflowPanel";
import styles from "@/components/admin/Admin.module.css";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";
import { solutionsList } from "@/lib/solutions";

export default async function AdminContentSolutionsPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const solutionsPagination = getPagination(solutionsList, resolvedSearchParams, "solutionsPage");

  return (
    <>
      <AdminPageHeader
        title="Solutions directory"
        description="Coverage shell for every solutions page that currently appears in the public directory and detail routes."
        actions={<button className="button button-primary" type="button">Add solution shell</button>}
      />

      <AdminTableCard
        title="Live solution coverage"
        description="Current solution records already used by the storefront. Keep slug, CTA, hardware mapping, and use-case copy aligned before API wiring."
      >
        <AdminTable
          headers={["Title", "Slug", "Hardware", "Use Cases", "CTA", "Action"]}
          rows={solutionsPagination.items.map((solution) => (
            <tr key={solution.slug}>
              <td>
                <div className={styles.adminInlineStack}>
                  <span className={styles.adminTableTitle}>{solution.title}</span>
                  <small>{solution.description}</small>
                </div>
              </td>
              <td>{solution.slug}</td>
              <td>{solution.hardware.length}</td>
              <td>{solution.useCases.length}</td>
              <td>{solution.cta}</td>
              <td><button className={styles.adminTextLink} type="button">Edit shell</button></td>
            </tr>
          ))}
        />
        <AdminPagination {...solutionsPagination} pageKey="solutionsPage" searchParams={resolvedSearchParams} />
      </AdminTableCard>

      <AdminCmsWorkflowPanel title="Solutions CMS" searchParams={resolvedSearchParams} pageKey="solutionsRevisionsPage" />

      <section className={styles.adminFormGrid}>
        <AdminFormCard>
          <AdminFormSection
            title="Directory card fields"
            description="Fields used by the `/solutions` listing page."
          >
            <AdminFieldGroup label="Directory title">
              <AdminTextInput type="text" defaultValue={solutionsList[0]?.title ?? ""} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Directory description">
              <AdminTextarea defaultValue={solutionsList[0]?.description ?? ""} />
            </AdminFieldGroup>
          </AdminFormSection>

          <AdminFormSection
            title="Detail page blocks"
            description="Core solution page sections that should later map one-to-one to API payloads."
          >
            <AdminFieldGroup label="Challenges">
              <AdminTextarea defaultValue={solutionsList[0]?.challenges.map((item) => `${item.title}: ${item.description}`).join("\n\n") ?? ""} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Use cases">
              <AdminTextarea defaultValue={solutionsList[0]?.useCases.map((item) => `${item.title}: ${item.description}`).join("\n\n") ?? ""} />
            </AdminFieldGroup>
          </AdminFormSection>
        </AdminFormCard>

        <AdminFormCard>
          <AdminFormSection
            title="Hardware mapping"
            description="Products linked into solution detail pages. This needs to match actual product IDs later."
          >
            <AdminFieldGroup label="Hardware rows">
              <AdminTextarea defaultValue={solutionsList[0]?.hardware.map((item) => `${item.title} | ${item.productId ?? "no-product-id"} | ${item.specs}`).join("\n") ?? ""} />
            </AdminFieldGroup>
            <AdminFieldGroup label="CTA">
              <AdminTextInput type="text" defaultValue={solutionsList[0]?.cta ?? ""} />
            </AdminFieldGroup>
          </AdminFormSection>
        </AdminFormCard>
      </section>
    </>
  );
}
