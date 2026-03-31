import { AdminFieldGroup, AdminFormCard, AdminFormSection, AdminPageHeader, AdminTable, AdminTableCard, AdminTextInput, AdminTextarea } from "@/components/admin/AdminUi";
import { adminFooterGroups } from "@/lib/admin";
import styles from "@/components/admin/Admin.module.css";

export default function AdminContentFooterPage() {
  return (
    <>
      <AdminPageHeader title="Footer editor" description="Manage footer link groups, contact information, trust badges, social links, and legal content." />
      <AdminTableCard title="Footer groups" description="Structured shells for footer columns and operational content blocks.">
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
          <AdminFormSection title="Contact details" description="Sales and support-facing footer contact information.">
            <AdminFieldGroup label="Sales phone"><AdminTextInput type="text" defaultValue="+000 000 0520" /></AdminFieldGroup>
            <AdminFieldGroup label="Email"><AdminTextInput type="email" defaultValue="hello@trackfleetio.com" /></AdminFieldGroup>
          </AdminFormSection>
        </AdminFormCard>
        <AdminFormCard>
          <AdminFormSection title="Legal & trust" description="Manage trust badges and legal link sets.">
            <AdminFieldGroup label="Trust badges"><AdminTextarea defaultValue={"Hardware warranty\n24/7 support\nEnterprise security\nFast deployment\nGlobal shipping"} /></AdminFieldGroup>
            <AdminFieldGroup label="Legal links"><AdminTextarea defaultValue={"Privacy\nTerms\nCookies\nSecurity\nCompliance"} /></AdminFieldGroup>
          </AdminFormSection>
        </AdminFormCard>
      </section>
    </>
  );
}
