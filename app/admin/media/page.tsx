import { AdminMediaGrid, AdminPageHeader, AdminPagination } from "@/components/admin/AdminUi";
import { adminMedia } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminMediaPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const mediaPagination = getPagination(adminMedia, resolvedSearchParams);

  return (
    <>
      <AdminPageHeader title="Media library" description="Manage storefront banners, product imagery, and structured alt-text placeholders." />
      <AdminMediaGrid items={mediaPagination.items} />
      <AdminPagination {...mediaPagination} searchParams={resolvedSearchParams} />
    </>
  );
}
