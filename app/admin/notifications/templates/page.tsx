import Link from "next/link";

import { AdminPageHeader, AdminPagination, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminNotificationTemplates } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminNotificationTemplatesPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const templatesPagination = getPagination(adminNotificationTemplates, resolvedSearchParams);

  return (
    <>
      <AdminPageHeader
        title="Notification templates"
        description="Manage per-event message templates before wiring email, internal alerts, and WhatsApp delivery."
        actions={<Link className="button button-secondary" href="/admin/notifications/logs">Go to logs</Link>}
      />
      <AdminTableCard title="Template registry" description="Event-to-template mapping for auth, order, and payment workflows.">
        <AdminTable
          headers={["Key", "Subject", "Channel", "Status"]}
          rows={templatesPagination.items.map((template) => (
            <tr key={template.key}>
              <td>{template.key}</td>
              <td>{template.subject}</td>
              <td>{template.channel}</td>
              <td>{template.status}</td>
            </tr>
          ))}
        />
        <AdminPagination {...templatesPagination} searchParams={resolvedSearchParams} />
      </AdminTableCard>
    </>
  );
}
