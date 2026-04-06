import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

const SIGNIN_PATH = "/signin";
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const sessionUser = await verifySessionToken(request.cookies.get(AUTH_COOKIE_NAME)?.value);
  const isAdmin = sessionUser?.role === "admin";
  const isAuthenticated = Boolean(sessionUser);

  if (pathname === "/admin/login") {
    return NextResponse.redirect(new URL(SIGNIN_PATH, request.url));
  }

  if (!isAdmin) {
    const destination = isAuthenticated ? "/unauthorized" : SIGNIN_PATH;
    const redirectUrl = new URL(destination, request.url);

    if (!isAuthenticated) {
      redirectUrl.searchParams.set("next", `${pathname}${search}`);
    }

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
