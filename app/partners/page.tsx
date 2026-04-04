import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Partners | Track Fleetio",
    description:
      "Explore Track Fleetio partnerships across technology, channel, installation, and deployment ecosystems.",
    path: "/partners",
  });
}

export default function PartnersPage() {
  return (
    <main id="main-content" className="site-main">
      <section className="products-hero company-page-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Company</span>
            <h1>Partners</h1>
            <p>We work with technology providers, installers, and solution partners.</p>
          </div>
        </div>
      </section>

      <section className="content-section company-page-section">
        <div className="container">
          <div className="company-page-grid company-page-grid-three">
            <article className="company-page-card">
              <p className="eyebrow">Technology Partners</p>
              <p>Integration partners and hardware ecosystem providers.</p>
            </article>

            <article className="company-page-card">
              <p className="eyebrow">Channel Partners</p>
              <p>Resellers and distribution partners.</p>
            </article>

            <article className="company-page-card">
              <p className="eyebrow">Installation Partners</p>
              <p>Deployment and field service providers.</p>
            </article>
          </div>

        </div>
      </section>
    </main>
  );
}
