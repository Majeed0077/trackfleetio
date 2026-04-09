"use client";

import type { ReactNode } from "react";

import { useAppStore, type InlineCmsSectionId } from "@/store/store";

export function InlineEditableSection({
  sectionId,
  title,
  description,
  draftKey,
  children,
}: {
  sectionId: InlineCmsSectionId;
  title: string;
  description: string;
  draftKey?:
    | "homepageHero"
    | "homepageBuyingPriorities"
    | "homepageStory"
    | "homepageArchitecture"
    | "homepageIndustries"
    | "homepageHardware"
    | "homepageTrust"
    | "homepageResults"
    | "homepageSupport"
    | "footerEditorial"
    | "solutionsCatalog";
  children: ReactNode;
}) {
  const authUser = useAppStore((state) => state.authUser);
  const cmsEditMode = useAppStore((state) => state.cmsEditMode);
  const cmsActiveSection = useAppStore((state) => state.cmsActiveSection);
  const cmsDrafts = useAppStore((state) => state.cmsDrafts);
  const openCmsSection = useAppStore((state) => state.openCmsSection);
  const updateCmsDraft = useAppStore((state) => state.updateCmsDraft);
  const isAdmin = authUser?.role === "admin";
  const isEditable = isAdmin && cmsEditMode;
  const isActive = cmsActiveSection === sectionId;
  const visible = draftKey ? cmsDrafts[draftKey].visible : true;
  const onToggleVisibility = draftKey
    ? () => updateCmsDraft(draftKey, { visible: !cmsDrafts[draftKey].visible })
    : undefined;

  if (!visible && !isEditable) {
    return null;
  }

  if (!visible && isEditable) {
    return (
      <div className="inline-cms-hidden-section">
        <div className="container">
          <div className={`inline-cms-hidden-card${isActive ? " is-active" : ""}`}>
            <div>
              <p className="inline-cms-hidden-kicker">Hidden Section</p>
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
            <div className="inline-cms-hidden-actions">
              {onToggleVisibility ? (
                <button className="button button-secondary" type="button" onClick={onToggleVisibility}>
                  Show Section
                </button>
              ) : null}
              <button className="button button-primary" type="button" onClick={() => openCmsSection(sectionId)}>
                Edit Section
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-cms-section${isActive ? " is-active" : ""}`}>
      {isEditable ? (
        <div className="container inline-cms-section-controls-shell">
          <div className="inline-cms-section-controls">
            <div className="inline-cms-section-meta">
              <span className="inline-cms-section-kicker">Inline CMS</span>
              <strong>{title}</strong>
              <span>{description}</span>
            </div>
            <div className="inline-cms-section-actions">
              {onToggleVisibility ? (
                <button className="button button-secondary" type="button" onClick={onToggleVisibility}>
                  Hide
                </button>
              ) : null}
              <button className="button button-primary" type="button" onClick={() => openCmsSection(sectionId)}>
                Edit
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
}
