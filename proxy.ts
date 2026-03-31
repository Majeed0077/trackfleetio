import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_DASHBOARD_PATH = "/admin/dashboard";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const sessionUser = await verifySessionToken(request.cookies.get(AUTH_COOKIE_NAME)?.value);
  const isAdmin = sessionUser?.role === "admin";

  if (pathname === ADMIN_LOGIN_PATH) {
    if (isAdmin) {
      return NextResponse.redirect(new URL(ADMIN_DASHBOARD_PATH, request.url));
    }

    return NextResponse.next();
  }

  if (!isAdmin) {
    const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
