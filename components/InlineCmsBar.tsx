"use client";

import { usePathname } from "next/navigation";

import { useAppStore } from "@/store/store";

export function InlineCmsBar() {
  const pathname = usePathname();
  const authUser = useAppStore((state) => state.authUser);
  const cmsEditMode = useAppStore((state) => state.cmsEditMode);
  const cmsPreviewMode = useAppStore((state) => state.cmsPreviewMode);
  const cmsActiveSection = useAppStore((state) => state.cmsActiveSection);
  const setCmsEditMode = useAppStore((state) => state.setCmsEditMode);
  const saveCmsDraft = useAppStore((state) => state.saveCmsDraft);
  const enterCmsPreview = useAppStore((state) => state.enterCmsPreview);
  const publishCmsDraft = useAppStore((state) => state.publishCmsDraft);
  const isAdmin = authUser?.role === "admin";

  if (!isAdmin || !cmsEditMode || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="inline-cms-bar">
      <div className="container inline-cms-bar-shell">
        <div className="inline-cms-bar-copy">
          <span className="inline-cms-bar-kicker">Edit Mode</span>
          <strong>{cmsActiveSection ? cmsActiveSection : "Homepage content editing"}</strong>
          <span>{cmsPreviewMode ? "Preview mode is active." : "Draft changes are local until you publish."}</span>
        </div>
        <div className="inline-cms-bar-actions">
          <button className="button button-secondary" type="button" onClick={saveCmsDraft}>
            Save Draft
          </button>
          <button className="button button-secondary" type="button" onClick={enterCmsPreview}>
            Preview
          </button>
          <button className="button button-primary" type="button" onClick={publishCmsDraft}>
            Publish
          </button>
          <button className="button button-secondary" type="button" onClick={() => setCmsEditMode(false)}>
            Exit Edit Mode
          </button>
        </div>
      </div>
    </div>
  );
}
