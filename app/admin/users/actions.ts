"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { Types } from "mongoose";

import { isSuperAdminUser } from "@/lib/admin-access";
import { getSessionUser } from "@/lib/server/auth-session";
import { adminUserRoleLabelPresets, adminUserStatusOptions } from "@/lib/server/admin-users";
import { connectToDatabase } from "@/lib/server/db";
import { AdminAuditLogModel } from "@/lib/server/models/admin-audit-log";
import { UserModel } from "@/lib/server/models/user";

export const updateAdminUserQuickSettings = async (formData: FormData) => {
  const currentUser = await getSessionUser();
  const userId = String(formData.get("userId") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const userEmail = String(formData.get("userEmail") ?? "").trim();
  const roleLabel = String(formData.get("roleLabel") ?? "").trim();

  if (!isSuperAdminUser(currentUser)) {
    return;
  }

  const actor = currentUser;

  if (!Types.ObjectId.isValid(userId)) {
    return;
  }

  if (!adminUserStatusOptions.some((option) => option.value === status)) {
    return;
  }

  if (roleLabel && (!adminUserRoleLabelPresets.includes(roleLabel as (typeof adminUserRoleLabelPresets)[number]) || roleLabel === "Super Admin")) {
    return;
  }

  await connectToDatabase();

  const targetUser = await UserModel.findById(userId)
    .select({ _id: 1, email: 1, role: 1, roleLabel: 1, status: 1 })
    .lean();

  if (!targetUser) {
    return;
  }

  const isTargetSuperAdmin = targetUser.role === "admin" && targetUser.roleLabel === "Super Admin";

  if (isTargetSuperAdmin) {
    return;
  }

  const isSelfTarget = String(targetUser._id) === actor.id;

  if (isSelfTarget && status !== "active") {
    return;
  }

  const nextRoleLabel = roleLabel || targetUser.roleLabel;

  if (isSelfTarget && nextRoleLabel !== targetUser.roleLabel) {
    return;
  }

  await UserModel.updateOne({ _id: userId }, { $set: { status, roleLabel: nextRoleLabel, updatedAt: new Date() } });

  const headerStore = await headers();
  const userAgent = headerStore.get("user-agent") ?? "";
  const ipAddress =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    headerStore.get("cf-connecting-ip") ??
    "";

  await AdminAuditLogModel.create({
    actor: {
      id: actor.id,
      email: actor.email,
      roleLabel: actor.roleLabel,
    },
    target: {
      id: String(targetUser._id),
      email: targetUser.email,
    },
    action: "admin.user.quick-settings.updated",
    details: {
      previousStatus: targetUser.status,
      nextStatus: status,
      previousRoleLabel: targetUser.roleLabel,
      nextRoleLabel,
    },
    ipAddress,
    userAgent,
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin/audit-logs");

  if (userEmail) {
    revalidatePath("/admin/users/manage");
  }
};
