import "server-only";

import { connectToDatabase } from "@/lib/server/db";
import { UserModel, type UserDocument } from "@/lib/server/models/user";

export const adminUserStatusOptions = [
  { value: "active", label: "Active" },
  { value: "invited", label: "Invited" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
] as const;

export const adminUserRoleLabelPresets = [
  "Super Admin",
  "Admin",
  "Content Manager",
  "Store Ops",
  "Support",
  "Customer",
] as const;

export type AdminUserStatusValue = (typeof adminUserStatusOptions)[number]["value"];

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  role: UserDocument["role"];
  roleLabel: string;
  status: AdminUserStatusValue;
  statusLabel: string;
  company: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
};

const statusLabelMap: Record<AdminUserStatusValue, string> = {
  active: "Active",
  invited: "Invited",
  inactive: "Inactive",
  suspended: "Suspended",
};

const isAdminUserStatus = (value: string): value is AdminUserStatusValue =>
  adminUserStatusOptions.some((option) => option.value === value);

const sortUsers = (users: AdminUserRow[]) =>
  [...users].sort((left, right) => {
    if (left.role !== right.role) {
      return left.role === "admin" ? -1 : 1;
    }

    return right.createdAt.getTime() - left.createdAt.getTime();
  });

const mapUserRow = (user: {
  _id: { toString(): string };
  name: string;
  email: string;
  role: UserDocument["role"];
  roleLabel: string;
  status: string;
  company?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date | null;
}): AdminUserRow => {
  const status = isAdminUserStatus(user.status) ? user.status : "inactive";

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    roleLabel: user.roleLabel,
    status,
    statusLabel: statusLabelMap[status],
    company: user.company ?? "",
    phone: user.phone ?? "",
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLoginAt: user.lastLoginAt ?? null,
  };
};

export const getAdminRoleLabelOptions = (currentRoleLabel?: string) => {
  const labels = new Set<string>(adminUserRoleLabelPresets);
  labels.delete("Super Admin");

  if (currentRoleLabel?.trim()) {
    labels.add(currentRoleLabel.trim());
  }

  return Array.from(labels);
};

const isSuperAdminRow = (user: Pick<AdminUserRow, "role" | "roleLabel">) =>
  user.role === "admin" && user.roleLabel === "Super Admin";

export const getAdminUsers = async () => {
  await connectToDatabase();

  const users = await UserModel.find({})
    .select({
      name: 1,
      email: 1,
      role: 1,
      roleLabel: 1,
      status: 1,
      company: 1,
      phone: 1,
      createdAt: 1,
      updatedAt: 1,
      lastLoginAt: 1,
    })
    .lean();

  return sortUsers(users.map((user) => mapUserRow(user)).filter((user) => !isSuperAdminRow(user)));
};

export const getAdminUserByEmail = async (email?: string) => {
  const users = await getAdminUsers();

  if (!email) {
    return users[0] ?? null;
  }

  return users.find((user) => user.email === email) ?? users[0] ?? null;
};
