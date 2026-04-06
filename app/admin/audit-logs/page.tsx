import { AdminPageHeader, AdminPagination, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminAuditLogs } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminAuditLogsPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const auditPagination = getPagination(adminAuditLogs, resolvedSearchParams);

  return (
    <>
      <AdminPageHeader
        title="Audit logs"
        description="Review who changed orders, inventory, users, and content before data persistence is connected."
      />
      <AdminTableCard title="Recent admin actions" description="This screen should eventually read from audit_logs.">
        <AdminTable
          headers={["Actor", "Action", "Entity", "Time"]}
          rows={auditPagination.items.map((log) => (
            <tr key={`${log.actor}-${log.time}`}>
              <td>{log.actor}</td>
              <td>{log.action}</td>
              <td>{log.entity}</td>
              <td>{log.time}</td>
            </tr>
          ))}
        />
        <AdminPagination {...auditPagination} searchParams={resolvedSearchParams} />
      </AdminTableCard>
    </>
  );
}
