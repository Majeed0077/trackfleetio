import { AdminPagination, AdminSectionList, AdminSectionRow, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminCmsRevisions } from "@/lib/admin";
import { getPagination, type AdminResolvedSearchParams } from "@/lib/admin-pagination";
import styles from "@/components/admin/Admin.module.css";

export function AdminCmsWorkflowPanel({
  title,
  searchParams,
  pageKey = "revisionsPage",
}: {
  title: string;
  searchParams: AdminResolvedSearchParams;
  pageKey?: string;
}) {
  const revisionsPagination = getPagination(adminCmsRevisions, searchParams, pageKey);

  return (
    <>
      <AdminSectionList>
        <AdminSectionRow
          title={`${title} workflow`}
          description="Draft, preview, publish confirmation, and revision ownership should be explicit before schema wiring."
          status="Review"
          footer={
            <div className={styles.adminToolbar}>
              <div className={styles.adminToolbarGroup}>
                <button className="button button-secondary" type="button">Preview draft</button>
                <button className="button button-secondary" type="button">Revision history</button>
              </div>
              <div className={styles.adminToolbarGroup}>
                <button className="button button-secondary" type="button">Request review</button>
                <button className="button button-primary" type="button">Confirm publish</button>
              </div>
            </div>
          }
        />
      </AdminSectionList>

      <AdminTableCard title="Recent revisions" description="Who changed what, when, and in which review state.">
        <AdminTable
          headers={["Area", "Status", "Author", "Time", "Change note"]}
          rows={revisionsPagination.items.map((item) => (
            <tr key={`${item.area}-${item.time}`}>
              <td>{item.area}</td>
              <td>{item.status}</td>
              <td>{item.author}</td>
              <td>{item.time}</td>
              <td>{item.note}</td>
            </tr>
          ))}
        />
        <AdminPagination {...revisionsPagination} pageKey={pageKey} searchParams={searchParams} />
      </AdminTableCard>
    </>
  );
}
