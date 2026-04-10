import type { AuthUser } from "@/store/store";

export const isSuperAdminUser = (user: AuthUser | null | undefined) =>
  user?.role === "admin" && user.roleLabel === "Super Admin";
