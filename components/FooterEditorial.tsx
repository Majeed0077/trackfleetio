"use client";

import Link from "next/link";

import { CmsEditableBoundary } from "@/components/CmsEditableBoundary";
import { footerEditorialContent } from "@/lib/content/footer";
import { useAppStore } from "@/store/store";

export function FooterEditorial() {
  const footerDraft = useAppStore((state) => state.cmsDrafts.footerEditorial);

  return (
    <CmsEditableBoundary
      sectionId="footer.editorial"
      title="Footer Editorial"
      description="Footer intro copy, contact email, and footer CTAs."
      draftKey="footerEditorial"
    >
      <section className="footer-editorial-intro" aria-label="Footer overview">
        <div className="footer-editorial-copy">
          <p className="footer-editorial-eyebrow">{footerDraft.eyebrow}</p>
          <h2>{footerDraft.heading}</h2>
          <p>{footerDraft.description}</p>
        </div>

        <div className="footer-editorial-actions">
          <a className="footer-contact-link footer-editorial-contact" href={`mailto:${footerDraft.contactEmail}`}>
            {footerDraft.contactEmail}
          </a>
          <div className="footer-editorial-buttons">
            <Link className="button button-primary" href={footerEditorialContent.primaryCta.href}>
              {footerDraft.primaryCtaLabel}
            </Link>
            <Link className="button button-secondary" href={footerEditorialContent.secondaryCta.href}>
              {footerDraft.secondaryCtaLabel}
            </Link>
          </div>
        </div>
      </section>
    </CmsEditableBoundary>
  );
}
