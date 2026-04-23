import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "About Track Fleetio",
    description:
      "Learn about Track Fleetio, its mission, and the fleet hardware solutions built for connected operations.",
    path: "/about",
  });
}

export default function AboutPage() {
  return (
    <main id="main-content" className="site-main">
      <section className="products-hero company-page-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Company</span>
            <h1>About Track Fleetio</h1>
            <p>
              Track Fleetio builds enterprise fleet tracking hardware including GPS devices,
              video telematics, and industrial sensors designed for modern fleet operations.
            </p>
          </div>
        </div>
      </section>

      <section className="content-section company-page-section">
        <div className="container">
          <div className="company-page-grid">
            <article className="company-page-card">
              <p className="eyebrow">Our Mission</p>
              <h2>Reliable fleet hardware built for real operational visibility.</h2>
              <p>
                To provide reliable and scalable fleet hardware for real-time visibility
                and operational intelligence.
              </p>
            </article>

            <article className="company-page-card">
              <p className="eyebrow">What We Build</p>
              <ul className="company-page-list">
                <li>Fleet tracking devices</li>
                <li>AI dashcams</li>
                <li>Asset trackers</li>
                <li>Industrial sensors</li>
              </ul>
            </article>

            <article className="company-page-card">
              <p className="eyebrow">Industries We Serve</p>
              <ul className="company-page-list">
                <li>Transportation</li>
                <li>Logistics</li>
                <li>Construction</li>
                <li>Government fleets</li>
              </ul>
            </article>

            <article className="company-page-card">
              <p className="eyebrow">Why Track Fleetio</p>
              <ul className="company-page-list">
                <li>Reliable hardware</li>
                <li>Simple deployment</li>
                <li>Enterprise support</li>
                <li>Scalable platform</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

    </main>
  );
}
