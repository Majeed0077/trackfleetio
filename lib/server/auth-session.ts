import "server-only";

import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME, verifySessionCookie } from "@/lib/auth";
import { toAuthUser } from "@/lib/server/auth-user";
import { connectToDatabase } from "@/lib/server/db";
import { SessionModel } from "@/lib/server/models/session";
import { UserModel } from "@/lib/server/models/user";
import type { AuthUser } from "@/store/store";

const SESSION_TOUCH_WINDOW_MS = 1000 * 60 * 10;

export const getSessionUser = async (): Promise<AuthUser | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const snapshot = await verifySessionCookie(sessionCookie);

  if (!snapshot) {
    return null;
  }

  await connectToDatabase();

  const now = new Date();
  const session = await SessionModel.findOne({
    sessionId: snapshot.sid,
    userId: snapshot.uid,
    revokedAt: null,
    expiresAt: { $gt: now },
  }).lean();

  if (!session) {
    return null;
  }

  const user = await UserModel.findOne({
    _id: snapshot.uid,
    status: "active",
  })
    .select({ name: 1, email: 1, role: 1, roleLabel: 1, company: 1, phone: 1, gender: 1, profilePhoto: 1 })
    .lean();

  if (!user) {
    return null;
  }

  if (Date.now() - new Date(session.lastSeenAt).getTime() > SESSION_TOUCH_WINDOW_MS) {
    void SessionModel.updateOne(
      { _id: session._id, revokedAt: null },
      { $set: { lastSeenAt: now } },
    ).catch(() => undefined);
  }

  return toAuthUser(user);
};
