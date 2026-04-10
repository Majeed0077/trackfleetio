import "server-only";

import { randomUUID, createHash } from "node:crypto";
import { Types } from "mongoose";

import { createSessionCookieValue, getAuthCookieConfig, getLogoutCookieConfig, verifySessionCookie } from "@/lib/auth";
import { normalizeEmail, hashPassword, verifyPassword } from "@/lib/server/auth-password";
import { toAuthUser } from "@/lib/server/auth-user";
import { connectToDatabase } from "@/lib/server/db";
import { PasswordResetTokenModel } from "@/lib/server/models/password-reset-token";
import { SessionModel } from "@/lib/server/models/session";
import { UserModel, type UserDocument } from "@/lib/server/models/user";

export type LoginInput = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export type SignupInput = {
  name?: string;
  email?: string;
  password?: string;
  company?: string;
  phone?: string;
};

export type ForgotPasswordInput = {
  email?: string;
};

export type ResetPasswordInput = {
  token?: string;
  password?: string;
  confirmPassword?: string;
};

export type RequestMetadata = {
  userAgent?: string | null;
  ipAddress?: string | null;
};

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
const THIRTY_DAYS_IN_SECONDS = ONE_DAY_IN_SECONDS * 30;
const PASSWORD_RESET_TTL_MS = 1000 * 60 * 30;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\-\d\s]{7,20}$/;

const hashToken = (value: string) => createHash("sha256").update(value).digest("hex");

const getSessionDuration = (rememberMe?: boolean) => (rememberMe ? THIRTY_DAYS_IN_SECONDS : ONE_DAY_IN_SECONDS);

const createSession = async (
  user: { _id: Types.ObjectId; role: UserDocument["role"] },
  metadata: RequestMetadata,
  rememberMe?: boolean,
) => {
  const sessionDuration = getSessionDuration(rememberMe);
  const expiresAt = new Date(Date.now() + sessionDuration * 1000);
  const sessionId = randomUUID();

  await SessionModel.create({
    userId: user._id,
    sessionId,
    expiresAt,
    lastSeenAt: new Date(),
    revokedAt: null,
    userAgent: metadata.userAgent?.slice(0, 512) ?? "",
    ipAddress: metadata.ipAddress?.slice(0, 128) ?? "",
  });

  const token = await createSessionCookieValue({
    sid: sessionId,
    uid: String(user._id),
    role: user.role,
    exp: Math.floor(expiresAt.getTime() / 1000),
  });

  return {
    token,
    cookieConfig: getAuthCookieConfig(sessionDuration),
  };
};

const validatePassword = (password: string) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return "Password must include letters and numbers.";
  }

  return null;
};

const buildRoleLabel = (company: string) => (company ? `Customer, ${company}` : "Customer");

export const loginUser = async (input: LoginInput, metadata: RequestMetadata) => {
  const email = input.email?.trim() ?? "";
  const password = input.password ?? "";

  if (!email || !password) {
    return {
      ok: false as const,
      status: 400,
      message: "Email and password are required.",
    };
  }

  await connectToDatabase();

  const user = await UserModel.findOne({ emailNormalized: normalizeEmail(email) });

  if (!user || user.status !== "active") {
    return {
      ok: false as const,
      status: 401,
      message: "Invalid email or password.",
    };
  }

  const passwordMatches = await verifyPassword(password, user.passwordHash);

  if (!passwordMatches) {
    return {
      ok: false as const,
      status: 401,
      message: "Invalid email or password.",
    };
  }

  user.lastLoginAt = new Date();
  await user.save();

  const session = await createSession(user, metadata, input.rememberMe);

  return {
    ok: true as const,
    user: toAuthUser(user),
    token: session.token,
    cookieConfig: session.cookieConfig,
  };
};

export const signupUser = async (input: SignupInput, metadata: RequestMetadata) => {
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const company = input.company?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";
  const password = input.password ?? "";

  if (!name || !email || !company) {
    return {
      ok: false as const,
      status: 400,
      message: "Name, work email, and company are required.",
    };
  }

  if (!emailPattern.test(email)) {
    return {
      ok: false as const,
      status: 400,
      message: "Enter a valid email address.",
    };
  }

  const passwordError = validatePassword(password);

  if (passwordError) {
    return {
      ok: false as const,
      status: 400,
      message: passwordError,
    };
  }

  if (phone && !phonePattern.test(phone)) {
    return {
      ok: false as const,
      status: 400,
      message: "Enter a valid phone number.",
    };
  }

  await connectToDatabase();

  const emailNormalized = normalizeEmail(email);
  const existingUser = await UserModel.exists({ emailNormalized });

  if (existingUser) {
    return {
      ok: false as const,
      status: 409,
      message: "An account with this email already exists.",
    };
  }

  const user = await UserModel.create({
    name,
    email,
    emailNormalized,
    passwordHash: await hashPassword(password),
    role: "user",
    roleLabel: buildRoleLabel(company),
    company,
    phone,
    status: "active",
    emailVerifiedAt: null,
    passwordChangedAt: new Date(),
    lastLoginAt: new Date(),
  });

  const session = await createSession(user, metadata, true);

  return {
    ok: true as const,
    user: toAuthUser(user),
    token: session.token,
    cookieConfig: session.cookieConfig,
  };
};

export const forgotPassword = async (input: ForgotPasswordInput) => {
  const email = input.email?.trim() ?? "";

  if (!email || !emailPattern.test(email)) {
    return {
      ok: false as const,
      status: 400,
      message: "Enter a valid email address.",
    };
  }

  await connectToDatabase();

  const user = await UserModel.findOne({
    emailNormalized: normalizeEmail(email),
    status: { $in: ["active", "inactive"] },
  }).select({ _id: 1, email: 1 });

  if (!user) {
    return {
      ok: true as const,
      message: "If the account exists, a reset link has been prepared.",
    };
  }

  await PasswordResetTokenModel.updateMany(
    {
      userId: user._id,
      usedAt: null,
      expiresAt: { $gt: new Date() },
    },
    { $set: { usedAt: new Date() } },
  );

  const rawToken = randomUUID().replace(/-/g, "") + randomUUID().replace(/-/g, "");
  const expiresAt = new Date(Date.now() + PASSWORD_RESET_TTL_MS);

  await PasswordResetTokenModel.create({
    userId: user._id,
    tokenHash: hashToken(rawToken),
    expiresAt,
    usedAt: null,
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(rawToken)}`;

  return {
    ok: true as const,
    message: "If the account exists, a reset link has been prepared.",
    resetUrl: process.env.NODE_ENV !== "production" ? resetUrl : undefined,
  };
};

export const resetPassword = async (input: ResetPasswordInput, metadata: RequestMetadata) => {
  const token = input.token?.trim() ?? "";
  const password = input.password ?? "";
  const confirmPassword = input.confirmPassword ?? "";

  if (!token) {
    return {
      ok: false as const,
      status: 400,
      message: "Reset token is required.",
    };
  }

  const passwordError = validatePassword(password);

  if (passwordError) {
    return {
      ok: false as const,
      status: 400,
      message: passwordError,
    };
  }

  if (password !== confirmPassword) {
    return {
      ok: false as const,
      status: 400,
      message: "Passwords do not match.",
    };
  }

  await connectToDatabase();

  const resetRecord = await PasswordResetTokenModel.findOne({
    tokenHash: hashToken(token),
    usedAt: null,
    expiresAt: { $gt: new Date() },
  });

  if (!resetRecord) {
    return {
      ok: false as const,
      status: 400,
      message: "This reset link is invalid or expired.",
    };
  }

  const user = await UserModel.findOne({ _id: resetRecord.userId, status: { $in: ["active", "inactive"] } });

  if (!user) {
    return {
      ok: false as const,
      status: 400,
      message: "This reset link is invalid or expired.",
    };
  }

  user.passwordHash = await hashPassword(password);
  user.passwordChangedAt = new Date();
  user.lastLoginAt = new Date();
  await user.save();

  resetRecord.usedAt = new Date();
  await resetRecord.save();

  await SessionModel.updateMany(
    { userId: user._id, revokedAt: null },
    { $set: { revokedAt: new Date() } },
  );

  const session = await createSession(user, metadata, true);

  return {
    ok: true as const,
    message: "Password reset successful.",
    user: toAuthUser(user),
    token: session.token,
    cookieConfig: session.cookieConfig,
  };
};

export const getCurrentSession = async (token: string | undefined | null) => {
  const snapshot = await verifySessionCookie(token);

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

  const user = await UserModel.findOne({ _id: snapshot.uid, status: "active" })
    .select({ name: 1, email: 1, role: 1, roleLabel: 1, company: 1, phone: 1, gender: 1, profilePhoto: 1 })
    .lean();

  return user ? toAuthUser(user) : null;
};

export const revokeSession = async (token: string | undefined | null) => {
  const snapshot = await verifySessionCookie(token);

  if (!snapshot) {
    return getLogoutCookieConfig();
  }

  await connectToDatabase();
  await SessionModel.updateOne({ sessionId: snapshot.sid, userId: snapshot.uid }, { $set: { revokedAt: new Date() } });

  return getLogoutCookieConfig();
};
