"use client";

import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";

import { AuthHeader } from "@/components/AuthHeader";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute = pathname === "/signin" || pathname === "/signup";

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
        <Navbar key={pathname} />
      </Suspense>
      {children}
      <Footer />
    </>
  );
}

