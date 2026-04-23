import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME, verifySessionCookie } from "@/lib/auth";
import { CSRF_COOKIE_NAME } from "@/lib/csrf";

const SIGNIN_PATH = "/signin";
const CSRF_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sessionUser = await verifySessionCookie(request.cookies.get(AUTH_COOKIE_NAME)?.value);
  const isAdmin = sessionUser?.role === "admin";
  const isAuthenticated = Boolean(sessionUser);
  let response: NextResponse;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      response = NextResponse.redirect(new URL(SIGNIN_PATH, request.url));
    } else if (!isAdmin) {
      const destination = isAuthenticated ? "/unauthorized" : SIGNIN_PATH;
      const redirectUrl = new URL(destination, request.url);

      if (!isAuthenticated) {
        redirectUrl.searchParams.set("next", `${pathname}${search}`);
      }

      response = NextResponse.redirect(redirectUrl);
    } else {
      response = NextResponse.next();
    }
  } else {
    response = NextResponse.next();
  }

  if (isAuthenticated && !request.cookies.get(CSRF_COOKIE_NAME)?.value) {
    response.cookies.set({
      name: CSRF_COOKIE_NAME,
      value: crypto.randomUUID().replace(/-/g, ""),
      httpOnly: false,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: CSRF_COOKIE_MAX_AGE,
    });
  }

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
