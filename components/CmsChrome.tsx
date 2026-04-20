"use client";

import dynamic from "next/dynamic";

import { useAppStore } from "@/store/store";

const InlineCmsBar = dynamic(() => import("@/components/InlineCmsBar").then((mod) => mod.InlineCmsBar));
const InlineCmsPanel = dynamic(() => import("@/components/InlineCmsPanel").then((mod) => mod.InlineCmsPanel));

export function CmsChrome() {
  const authUser = useAppStore((state) => state.authUser);

  if (authUser?.role !== "admin") {
    return null;
  }

  return (
    <>
      <InlineCmsBar />
      <InlineCmsPanel />
    </>
  );
}
