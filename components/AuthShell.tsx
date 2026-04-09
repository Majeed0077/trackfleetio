import Image from "next/image";
import type { ReactNode } from "react";

import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";

type AuthShellProps = {
  cardBadge: string;
  title: string;
  description: string;
  visualLabel: string;
  visualTitle: string;
  visualDescription: string;
  visualImageSrc: string;
  visualImageAlt: string;
  trustLine: string;
  children: ReactNode;
  footer: ReactNode;
  cardClassName?: string;
};

export function AuthShell({
  cardBadge,
  title,
  description,
  visualLabel,
  visualTitle,
  visualDescription,
  visualImageSrc,
  visualImageAlt,
  trustLine,
  children,
  footer,
  cardClassName = "",
}: AuthShellProps) {
  const resolvedVisualImageSrc = resolveCloudinaryAsset(visualImageSrc);

  return (
    <main className="auth-page-main auth-page-main-premium" id="main-content">
      <section className="auth-layout auth-layout-premium">
        <div className="container">
          <div className="auth-shell-premium">
            <aside className="auth-visual-panel" aria-label="Platform credibility">
              <div className="auth-visual-copy">
                <p className="auth-visual-eyebrow">{visualLabel}</p>
                <h2>{visualTitle}</h2>
                <p>{visualDescription}</p>
              </div>

              <div className="auth-visual-preview">
                <span className="auth-visual-chip auth-visual-chip-top">Live fleet hardware</span>
                <Image
                  className="auth-visual-image"
                  src={resolvedVisualImageSrc}
                  alt={visualImageAlt}
                  width={760}
                  height={560}
                  loading="eager"
                  sizes="(max-width: 991px) 100vw, 50vw"
                />
                <span className="auth-visual-chip auth-visual-chip-bottom">Trusted by operators</span>
              </div>

              <p className="auth-visual-trust">{trustLine}</p>
            </aside>

            <article className={`auth-card auth-card-premium${cardClassName ? ` ${cardClassName}` : ""}`}>
              <div className="auth-card-header auth-card-header-premium">
                <p className="auth-card-badge">{cardBadge}</p>
                <h1>{title}</h1>
                <p>{description}</p>
              </div>

              {children}

              <div className="auth-card-footer">{footer}</div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
