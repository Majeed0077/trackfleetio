"use client";

import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";

import { AuthHeader } from "@/components/AuthHeader";
import { Footer } from "@/components/Footer";
import { InlineCmsBar } from "@/components/InlineCmsBar";
import { InlineCmsPanel } from "@/components/InlineCmsPanel";
import { Navbar } from "@/components/Navbar";
import { ScrollToggle } from "@/components/ScrollToggle";
import type { AuthUser } from "@/store/store";

export function SiteFrame({
  children,
  initialAuthUser,
}: {
  children: ReactNode;
  initialAuthUser: AuthUser | null;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute =
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/verify-email" ||
    pathname === "/session-expired" ||
    pathname === "/unauthorized" ||
    pathname.startsWith("/invite/");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  if (isAuthRoute) {
    return (
      <div className="auth-page">
        <AuthHeader />
        {children}
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        <Navbar initialAuthUser={initialAuthUser} />
      </Suspense>
      <InlineCmsBar />
      {children}
      <ScrollToggle />
      <Footer />
      <InlineCmsPanel />
    </>
  );
}

