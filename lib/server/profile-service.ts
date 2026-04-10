import "server-only";

import { cookies } from "next/headers";
import { Types } from "mongoose";

import { AUTH_COOKIE_NAME, verifySessionCookie } from "@/lib/auth";
import { normalizeEmail } from "@/lib/server/auth-password";
import { toAuthUser } from "@/lib/server/auth-user";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/server/cloudinary-upload";
import { connectToDatabase } from "@/lib/server/db";
import { SessionModel } from "@/lib/server/models/session";
import { UserModel, type UserDocument } from "@/lib/server/models/user";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\-\d\s]{7,20}$/;
const MAX_PROFILE_PHOTO_BYTES = 5 * 1024 * 1024;
const ALLOWED_PROFILE_PHOTO_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

type ProfileUpdateInput = {
  fullName?: string;
  workEmail?: string;
  phone?: string;
  company?: string;
  gender?: string;
};

const buildRoleLabel = (role: UserDocument["role"], company: string, currentRoleLabel: string) =>
  role === "admin" ? currentRoleLabel : company ? `Customer, ${company}` : "Customer";

const getProfilePhotoPublicId = (user: { _id: Types.ObjectId; role: UserDocument["role"] }) =>
  `trackfleetio/profiles/${user.role === "admin" ? "admins" : "users"}/${user._id.toString()}`;

const getCurrentUserDocument = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const snapshot = await verifySessionCookie(sessionCookie);

  if (!snapshot) {
    return null;
  }

  await connectToDatabase();

  const session = await SessionModel.findOne({
    sessionId: snapshot.sid,
    userId: snapshot.uid,
    revokedAt: null,
    expiresAt: { $gt: new Date() },
  }).lean();

  if (!session) {
    return null;
  }

  return UserModel.findOne({
    _id: snapshot.uid,
    status: "active",
  });
};

export const updateCurrentUserProfile = async (input: ProfileUpdateInput) => {
  const user = await getCurrentUserDocument();

  if (!user) {
    return {
      ok: false as const,
      status: 401,
      message: "Unauthorized.",
    };
  }

  const fullName = input.fullName?.trim() ?? "";
  const workEmail = input.workEmail?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";
  const company = input.company?.trim() ?? "";
  const gender = input.gender === "female" ? "female" : "male";

  if (fullName.length < 2 || fullName.length > 120) {
    return {
      ok: false as const,
      status: 400,
      message: "Full name must be between 2 and 120 characters.",
    };
  }

  if (!workEmail || !emailPattern.test(workEmail)) {
    return {
      ok: false as const,
      status: 400,
      message: "Enter a valid email address.",
    };
  }

  if (phone && !phonePattern.test(phone)) {
    return {
      ok: false as const,
      status: 400,
      message: "Enter a valid phone number.",
    };
  }

  if (!company || company.length > 160) {
    return {
      ok: false as const,
      status: 400,
      message: "Company is required and must be under 160 characters.",
    };
  }

  const emailNormalized = normalizeEmail(workEmail);
  const emailOwner = await UserModel.findOne({
    emailNormalized,
    _id: { $ne: user._id },
  })
    .select({ _id: 1 })
    .lean();

  if (emailOwner) {
    return {
      ok: false as const,
      status: 409,
      message: "An account with this email already exists.",
    };
  }

  user.name = fullName;
  user.email = workEmail;
  user.emailNormalized = emailNormalized;
  user.phone = phone;
  user.company = company;
  user.gender = gender;
  user.roleLabel = buildRoleLabel(user.role, company, user.roleLabel);
  await user.save();

  return {
    ok: true as const,
    user: toAuthUser(user),
  };
};

export const uploadCurrentUserProfilePhoto = async (file: File) => {
  const user = await getCurrentUserDocument();

  if (!user) {
    return {
      ok: false as const,
      status: 401,
      message: "Unauthorized.",
    };
  }

  if (!ALLOWED_PROFILE_PHOTO_TYPES.has(file.type)) {
    return {
      ok: false as const,
      status: 400,
      message: "Use a PNG, JPG, or WEBP image.",
    };
  }

  if (file.size > MAX_PROFILE_PHOTO_BYTES) {
    return {
      ok: false as const,
      status: 400,
      message: "Profile photo must be 5 MB or smaller.",
    };
  }

  const targetPublicId = getProfilePhotoPublicId(user);

  if (user.profilePhoto?.publicId && user.profilePhoto.publicId !== targetPublicId) {
    await deleteFromCloudinary({
      publicId: user.profilePhoto.publicId,
      resourceType: "image",
    }).catch(() => undefined);
  }

  const uploaded = await uploadToCloudinary({
    file,
    resourceType: "image",
    folder: "trackfleetio/profiles",
    publicId: targetPublicId,
  });

  user.profilePhoto = {
    publicId: uploaded.publicId,
    secureUrl: uploaded.secureUrl,
    width: uploaded.width,
    height: uploaded.height,
    format: uploaded.format,
    bytes: uploaded.bytes,
    resourceType: uploaded.resourceType,
  };
  await user.save();

  return {
    ok: true as const,
    user: toAuthUser(user),
  };
};

export const removeCurrentUserProfilePhoto = async () => {
  const user = await getCurrentUserDocument();

  if (!user) {
    return {
      ok: false as const,
      status: 401,
      message: "Unauthorized.",
    };
  }

  if (user.profilePhoto?.publicId) {
    await deleteFromCloudinary({
      publicId: user.profilePhoto.publicId,
      resourceType: "image",
    }).catch(() => undefined);
  }

  user.profilePhoto = null;
  await user.save();

  return {
    ok: true as const,
    user: toAuthUser(user),
  };
};
