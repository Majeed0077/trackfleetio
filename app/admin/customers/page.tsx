import { AdminPageHeader, AdminPagination, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminCustomers } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminCustomersPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const customersPagination = getPagination(adminCustomers, resolvedSearchParams);

  return (
    <>
      <AdminPageHeader title="Customer operations" description="Monitor enterprise customer accounts, active orders, and review state." />
      <AdminTableCard title="Customer directory" description="Frontend-ready customer list for future CRM and account management integration.">
        <AdminTable
          headers={["Customer", "Email", "Company", "Orders", "Status", "Action"]}
          rows={customersPagination.items.map((customer) => (
            <tr key={customer.email}>
              <td><div className={styles.adminInlineStack}><span className={styles.adminTableTitle}>{customer.name}</span><small>{customer.company}</small></div></td>
              <td>{customer.email}</td>
              <td>{customer.company}</td>
              <td>{customer.orders}</td>
              <td><AdminStatusBadge value={customer.status} /></td>
              <td><button className={styles.adminTextLink} type="button">View</button></td>
            </tr>
          ))}
        />
        <AdminPagination {...customersPagination} searchParams={resolvedSearchParams} />
      </AdminTableCard>
    </>
  );
}
