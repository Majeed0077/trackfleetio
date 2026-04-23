import type { AuthUser } from "@/store/store";

export const isSuperAdminUser = (
  user: AuthUser | null | undefined,
): user is AuthUser & { role: "admin"; roleLabel: "Super Admin" } =>
  user?.role === "admin" && user.roleLabel === "Super Admin";
