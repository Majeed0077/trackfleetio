import {
  AdminActivityCard,
  AdminMetricGrid,
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableCard,
  AdminToolbar,
} from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminRecentActivity, adminReports, adminTrafficSources } from "@/lib/admin";

export default function AdminReportsPage() {
  return (
    <>
      <AdminPageHeader
        title="Reporting overview"
        description="Review high-level storefront performance, traffic quality, and operational conversion signals."
      />
      <AdminToolbar
        left={
          <>
            <span className={styles.adminFilter}>Window: Last 30 days</span>
            <span className={styles.adminFilter}>Channel: All</span>
            <span className={styles.adminFilter}>Region: Global</span>
          </>
        }
        right={
          <button className="button button-secondary" type="button">
            Export report
          </button>
        }
      />
      <AdminMetricGrid items={adminReports} />
      <section className={styles.adminGridTwo}>
        <AdminTableCard
          title="Traffic quality"
          description="Top acquisition channels and mock conversion metrics for the storefront."
        >
          <AdminTable
            headers={["Source", "Visits", "Conversion", "Trend"]}
            rows={adminTrafficSources.map((item) => (
              <tr key={item.source}>
                <td>
                  <span className={styles.adminTableTitle}>{item.source}</span>
                </td>
                <td>{item.visits}</td>
                <td>{item.conversion}</td>
                <td>
                  <AdminStatusBadge value={item.trend} />
                </td>
              </tr>
            ))}
          />
        </AdminTableCard>
        <AdminActivityCard
          title="Reporting notes"
          description="Recent mock analysis highlights prepared for stakeholders."
          items={adminRecentActivity}
        />
      </section>
    </>
  );
}
