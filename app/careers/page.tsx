import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Careers at Track Fleetio",
    description:
      "Explore career opportunities at Track Fleetio as the team grows its connected fleet hardware platform.",
    path: "/careers",
  });
}

export default function CareersPage() {
  return (
    <main id="main-content" className="site-main">
      <section className="products-hero company-page-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Company</span>
            <h1>Careers at Track Fleetio</h1>
            <p>We are building connected fleet technology for modern operations.</p>
          </div>
        </div>
      </section>

      <section className="content-section company-page-section">
        <div className="container">
          <div className="company-page-stack">
            <article className="company-page-card company-page-card-wide">
              <p className="eyebrow">Opportunities</p>
              <h2>We are currently expanding our network.</h2>
              <p>
                Job openings will be posted soon as we continue building our hardware,
                deployment, and partner ecosystem for enterprise fleet operations.
              </p>
            </article>

            <article className="company-page-card company-page-card-compact">
              <p className="eyebrow">Contact</p>
              <p className="company-page-inline-copy">
                For opportunities contact:{" "}
                <a className="company-page-inline-link" href="mailto:careers@trackfleetio.com">
                  careers@trackfleetio.com
                </a>
              </p>
            </article>
          </div>
        </div>
      </section>

    </main>
  );
}
