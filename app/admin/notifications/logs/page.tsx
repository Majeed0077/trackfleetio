import {
  AdminPageHeader,
  AdminPagination,
  AdminTable,
  AdminTableCard,
} from "@/components/admin/AdminUi";
import { adminNotificationLogs } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";
import Link from "next/link";

export default async function AdminNotificationLogsPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const logsPagination = getPagination(adminNotificationLogs, resolvedSearchParams);

  return (
    <>
      <AdminPageHeader
        title="Notification delivery logs"
        description="Review sent, queued, and failed notification events before wiring real email and webhook providers."
        actions={<Link className="button button-secondary" href="/admin/notifications/templates">Templates</Link>}
      />
      <AdminTableCard title="Recent delivery history" description="This screen should eventually read from notification logs and retry jobs.">
        <AdminTable
          headers={["Type", "Recipient", "Channel", "Status", "Time", "Retry"]}
          rows={logsPagination.items.map((item) => (
            <tr key={`${item.type}-${item.recipient}-${item.time}`}>
              <td>{item.type}</td>
              <td>{item.recipient}</td>
              <td>{item.channel}</td>
              <td>{item.status}</td>
              <td>{item.time}</td>
              <td>{item.status === "Failed" ? <button className="button button-secondary" type="button">Retry</button> : "N/A"}</td>
            </tr>
          ))}
        />
        <AdminPagination {...logsPagination} searchParams={resolvedSearchParams} />
      </AdminTableCard>
    </>
  );
}
