import "server-only";

import { randomUUID, createHash } from "node:crypto";

import { cookies } from "next/headers";
import { Types } from "mongoose";

import { AUTH_COOKIE_NAME, verifySessionCookie } from "@/lib/auth";
import { normalizeEmail, verifyPassword } from "@/lib/server/auth-password";
import { toAuthUser } from "@/lib/server/auth-user";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/server/cloudinary-upload";
import { connectToDatabase } from "@/lib/server/db";
import { EmailChangeTokenModel } from "@/lib/server/models/email-change-token";
import { SessionModel } from "@/lib/server/models/session";
import { UserModel, type UserDocument } from "@/lib/server/models/user";
import { validateUploadedFile } from "@/lib/server/upload-security";
import { emailPattern, phonePattern } from "@/lib/server/validation";

const MAX_PROFILE_PHOTO_BYTES = 5 * 1024 * 1024;
const ALLOWED_PROFILE_PHOTO_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
const EMAIL_CHANGE_TTL_MS = 1000 * 60 * 30;

type ProfileUpdateInput = {
  fullName?: string;
  workEmail?: string;
  phone?: string;
  company?: string;
  gender?: string;
  currentPassword?: string;
};

const buildRoleLabel = (role: UserDocument["role"], company: string, currentRoleLabel: string) =>
  role === "admin" ? currentRoleLabel : company ? `Customer, ${company}` : "Customer";

const getProfilePhotoPublicId = (user: { _id: Types.ObjectId; role: UserDocument["role"] }) =>
  `trackfleetio/profiles/${user.role === "admin" ? "admins" : "users"}/${user._id.toString()}`;

const hashToken = (value: string) => createHash("sha256").update(value).digest("hex");

const notifyEmailChangeAttempt = ({
  currentEmail,
  pendingEmail,
  userId,
}: {
  currentEmail: string;
  pendingEmail: string;
  userId: string;
}) => {
  console.info(
    `[trackfleetio] Pending email change created for user ${userId}: ${currentEmail} -> ${pendingEmail}`,
  );
};

const createPendingEmailChange = async ({
  userId,
  currentEmail,
  pendingEmail,
}: {
  userId: string;
  currentEmail: string;
  pendingEmail: string;
}) => {
  await EmailChangeTokenModel.updateMany(
    {
      userId,
      usedAt: null,
      expiresAt: { $gt: new Date() },
    },
    { $set: { usedAt: new Date() } },
  );

  const rawToken = randomUUID().replace(/-/g, "") + randomUUID().replace(/-/g, "");
  const expiresAt = new Date(Date.now() + EMAIL_CHANGE_TTL_MS);

  await EmailChangeTokenModel.create({
    userId,
    currentEmail,
    pendingEmail,
    tokenHash: hashToken(rawToken),
    expiresAt,
    usedAt: null,
  });

  notifyEmailChangeAttempt({ currentEmail, pendingEmail, userId });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${baseUrl}/verify-email?token=${encodeURIComponent(rawToken)}`;
};

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
  const currentPassword = input.currentPassword ?? "";
  const nextEmailNormalized = normalizeEmail(workEmail);
  const currentEmailNormalized = normalizeEmail(user.email);
  const isEmailChangeRequested = nextEmailNormalized !== currentEmailNormalized;

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

  if (workEmail.length > 320) {
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

  const emailOwner = await UserModel.findOne({
    emailNormalized: nextEmailNormalized,
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

  if (isEmailChangeRequested) {
    if (!currentPassword) {
      return {
        ok: false as const,
        status: 400,
        message: "Enter your current password to change your email.",
      };
    }

    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.passwordHash);

    if (!isCurrentPasswordValid) {
      return {
        ok: false as const,
        status: 401,
        message: "Current password is incorrect.",
      };
    }
  }

  user.name = fullName;
  user.phone = phone;
  user.company = company;
  user.gender = gender;
  user.roleLabel = buildRoleLabel(user.role, company, user.roleLabel);
  await user.save();

  if (isEmailChangeRequested) {
    const verifyUrl = await createPendingEmailChange({
      userId: user._id.toString(),
      currentEmail: user.email,
      pendingEmail: workEmail,
    });

    return {
      ok: true as const,
      user: toAuthUser(user),
      pendingEmail: workEmail,
      message: "Confirm the verification link sent to your new email before the change takes effect.",
      verifyUrl: process.env.NODE_ENV !== "production" ? verifyUrl : undefined,
    };
  }

  return {
    ok: true as const,
    user: toAuthUser(user),
  };
};

export const verifyPendingEmailChange = async (token: string | undefined) => {
  const normalizedToken = token?.trim() ?? "";

  if (!normalizedToken) {
    return {
      ok: false as const,
      status: 400,
      message: "Verification token is required.",
    };
  }

  await connectToDatabase();

  const tokenRecord = await EmailChangeTokenModel.findOne({
    tokenHash: hashToken(normalizedToken),
    usedAt: null,
    expiresAt: { $gt: new Date() },
  });

  if (!tokenRecord) {
    return {
      ok: false as const,
      status: 400,
      message: "This verification link is invalid or expired.",
    };
  }

  const conflictingUser = await UserModel.findOne({
    emailNormalized: normalizeEmail(tokenRecord.pendingEmail),
    _id: { $ne: tokenRecord.userId },
  })
    .select({ _id: 1 })
    .lean();

  if (conflictingUser) {
    return {
      ok: false as const,
      status: 409,
      message: "That email address is no longer available.",
    };
  }

  const user = await UserModel.findOne({
    _id: tokenRecord.userId,
    emailNormalized: normalizeEmail(tokenRecord.currentEmail),
    status: "active",
  });

  if (!user) {
    return {
      ok: false as const,
      status: 400,
      message: "The account for this verification request could not be found.",
    };
  }

  user.email = tokenRecord.pendingEmail;
  user.emailNormalized = normalizeEmail(tokenRecord.pendingEmail);
  user.emailVerifiedAt = new Date();
  await user.save();

  tokenRecord.usedAt = new Date();
  await tokenRecord.save();

  return {
    ok: true as const,
    message: "Your email address has been verified and updated.",
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

  const fileValidationResult = await validateUploadedFile({
    file,
    resourceType: "image",
  });

  if (!fileValidationResult.ok) {
    return fileValidationResult;
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
    overwrite: true,
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
