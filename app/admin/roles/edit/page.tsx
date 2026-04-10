import { redirect } from "next/navigation";

import {
  AdminEmptyState,
  AdminFormCard,
  AdminPageHeader,
} from "@/components/admin/AdminUi";
import { isSuperAdminUser } from "@/lib/admin-access";
import { getSessionUser } from "@/lib/server/auth-session";

export default async function AdminEditRolePage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const currentUser = await getSessionUser();

  if (!isSuperAdminUser(currentUser)) {
    redirect("/unauthorized");
  }

  await searchParams;

  return (
    <>
      <AdminPageHeader
        title="Edit role"
        description="This screen stays empty until a real role record exists in Mongo."
      />
      <AdminFormCard>
        <AdminEmptyState
          title="No role selected"
          description="Dummy role data has been removed. Load a real role document here after the RBAC schema is implemented."
        />
      </AdminFormCard>
    </>
  );
}
