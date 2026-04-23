import dynamic from "next/dynamic";
import { Suspense } from "react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollToggle } from "@/components/ScrollToggle";

const CmsChrome = dynamic(() => import("@/components/CmsChrome").then((mod) => mod.CmsChrome));

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <CmsChrome />
      {children}
      <ScrollToggle />
      <Footer />
    </>
  );
}
