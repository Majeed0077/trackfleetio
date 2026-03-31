import { AdminMediaGrid, AdminPageHeader } from "@/components/admin/AdminUi";
import { adminMedia } from "@/lib/admin";

export default function AdminMediaPage() {
  return (
    <>
      <AdminPageHeader title="Media library" description="Manage storefront banners, product imagery, and structured alt-text placeholders." />
      <AdminMediaGrid items={adminMedia} />
    </>
  );
}
