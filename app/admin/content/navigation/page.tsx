import {
  AdminFieldGroup,
  AdminFormCard,
  AdminFormSection,
  AdminPagination,
  AdminPageHeader,
  AdminTable,
  AdminTableCard,
  AdminTextarea,
  AdminTextInput,
} from "@/components/admin/AdminUi";
import { adminNavigationItems } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";
import styles from "@/components/admin/Admin.module.css";
import {
  companyMenuLinks,
  industriesMenuLinks,
  navigationUtilityLabels,
  productMenuColumns,
  productsMenuFeaturedPanel,
  solutionsMenuColumns,
  solutionsMenuFeaturedPanel,
} from "@/lib/content/navigation";
import { AdminCmsWorkflowPanel } from "@/components/AdminCmsWorkflowPanel";

const navigationCoverage = [
  {
    area: "Products mega menu",
    source: "Tracking Devices, Video Telematics, Sensors & Accessories columns, featured panel, footer link",
  },
  {
    area: "Solutions mega menu",
    source: "Monitoring Systems, Fleet Operations, Advanced Mobility columns, featured panel, footer link",
  },
  {
    area: "Industries menu",
    source: "Transportation, Logistics, Construction, Manufacturing, Farming, Public Transport",
  },
  {
    area: "Company menu",
    source: "About, Careers, Partners, Contact",
  },
  {
    area: "Utilities",
    source: "Search, cart, theme toggle, sign in, create account, account menu",
  },
] as const;

export default async function AdminContentNavigationPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const navItemsPagination = getPagination(adminNavigationItems, resolvedSearchParams, "navItemsPage");
  const coveragePagination = getPagination(navigationCoverage, resolvedSearchParams, "coveragePage");

  return (
    <>
      <AdminPageHeader
        title="Navigation editor"
        description="Coverage shell for the full header: top-level nav, mega menus, utility actions, and auth CTAs."
        actions={<button className="button button-primary" type="button">Add nav item</button>}
      />

      <AdminTableCard title="Primary navigation items" description="Top-level header links already visible on the storefront.">
        <AdminTable
          headers={["Label", "Link", "Order", "Visibility", "Action"]}
          rows={navItemsPagination.items.map((item) => (
            <tr key={item.label}>
              <td><span className={styles.adminTableTitle}>{item.label}</span></td>
              <td>{item.link}</td>
              <td>{item.order}</td>
              <td>{item.visibility}</td>
              <td><button className={styles.adminTextLink} type="button">Edit</button></td>
            </tr>
          ))}
        />
        <AdminPagination {...navItemsPagination} pageKey="navItemsPage" searchParams={resolvedSearchParams} />
      </AdminTableCard>

      <AdminTableCard title="Navigation coverage map" description="What the admin must eventually own for the live navbar.">
        <AdminTable
          headers={["Area", "Current storefront surface"]}
          rows={coveragePagination.items.map((item) => (
            <tr key={item.area}>
              <td><span className={styles.adminTableTitle}>{item.area}</span></td>
              <td>{item.source}</td>
            </tr>
          ))}
        />
        <AdminPagination {...coveragePagination} pageKey="coveragePage" searchParams={resolvedSearchParams} />
      </AdminTableCard>

      <AdminCmsWorkflowPanel title="Navigation CMS" searchParams={resolvedSearchParams} pageKey="navigationRevisionsPage" />

      <section className={styles.adminFormGrid}>
        <AdminFormCard>
          <AdminFormSection title="Products mega menu" description="Columns, labels, featured panel, and footer CTA.">
            <AdminFieldGroup label="Tracking Devices column">
              <AdminTextarea defaultValue={productMenuColumns[0].links.map((link) => link.title).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Video Telematics column">
              <AdminTextarea defaultValue={productMenuColumns[1].links.map((link) => link.title).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Sensors & Accessories column">
              <AdminTextarea defaultValue={productMenuColumns[2].links.map((link) => link.title).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Featured panel">
              <AdminTextarea defaultValue={`${productsMenuFeaturedPanel.label}\n${productsMenuFeaturedPanel.title}\n${productsMenuFeaturedPanel.description}\n${productsMenuFeaturedPanel.ctaLabel}`} />
            </AdminFieldGroup>
          </AdminFormSection>

          <AdminFormSection title="Solutions mega menu" description="Solution columns and featured panel content.">
            <AdminFieldGroup label="Monitoring Systems column">
              <AdminTextarea defaultValue={solutionsMenuColumns[0].links.map((link) => link.title).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Fleet Operations column">
              <AdminTextarea defaultValue={solutionsMenuColumns[1].links.map((link) => link.title).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Advanced Mobility column">
              <AdminTextarea defaultValue={solutionsMenuColumns[2].links.map((link) => link.title).join("\n")} />
            </AdminFieldGroup>
          </AdminFormSection>
        </AdminFormCard>

        <AdminFormCard>
          <AdminFormSection title="Secondary menus and utilities" description="Industries, company, search, cart, theme, and auth utility labels.">
            <AdminFieldGroup label="Industries links">
              <AdminTextarea defaultValue={industriesMenuLinks.map((link) => link.title).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Company links">
              <AdminTextarea defaultValue={companyMenuLinks.map((link) => link.title).join("\n")} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Utility labels">
              <AdminTextarea defaultValue={`${navigationUtilityLabels.searchPlaceholder}\n${navigationUtilityLabels.cart}\n${navigationUtilityLabels.themeToggle}\n${navigationUtilityLabels.signIn}\n${navigationUtilityLabels.createAccount}`} />
            </AdminFieldGroup>
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Featured CTA label">
                <AdminTextInput type="text" defaultValue={solutionsMenuFeaturedPanel.ctaLabel} />
              </AdminFieldGroup>
              <AdminFieldGroup label="Account support link">
                <AdminTextInput type="text" defaultValue={navigationUtilityLabels.support} />
              </AdminFieldGroup>
            </div>
          </AdminFormSection>
        </AdminFormCard>
      </section>
    </>
  );
}
