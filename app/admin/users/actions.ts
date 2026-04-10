"use server";

import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { adminUserStatusOptions } from "@/lib/server/admin-users";
import { connectToDatabase } from "@/lib/server/db";
import { UserModel } from "@/lib/server/models/user";

export const updateAdminUserQuickSettings = async (formData: FormData) => {
  const userId = String(formData.get("userId") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const userEmail = String(formData.get("userEmail") ?? "").trim();

  if (!Types.ObjectId.isValid(userId)) {
    return;
  }

  if (!adminUserStatusOptions.some((option) => option.value === status)) {
    return;
  }

  await connectToDatabase();

  await UserModel.updateOne(
    { _id: userId },
    {
      $set: {
        status,
        updatedAt: new Date(),
      },
    },
  );

  revalidatePath("/admin/users");

  if (userEmail) {
    revalidatePath("/admin/users/manage");
  }
};
