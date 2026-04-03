import type { Metadata } from "next";
import Link from "next/link";

import { SolutionsOverviewSection } from "@/components/SolutionsOverviewSection";
import { createPageMetadata } from "@/lib/metadata";
import { solutionDirectoryCards } from "@/lib/solutions";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Solutions | Track Fleetio",
    description:
      "Explore Track Fleetio monitoring systems, field operations solutions, public transport solutions, EV management, and connected fleet control workflows.",
    path: "/solutions",
  });
}

export default function SolutionsPage() {
  return (
    <main id="main-content" className="site-main">
      <section className="products-hero industry-directory-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Solutions</span>
            <h1>Fleet Solutions by Use Case</h1>
            <p>
              Explore connected monitoring, field operations, public transport, EV,
              and industry-specific solutions built on Track Fleetio hardware.
            </p>
          </div>
        </div>
      </section>

      <SolutionsOverviewSection />

      <section className="products-catalog industry-directory-section">
        <div className="container">
          <div className="section-heading industry-directory-heading">
            <p className="eyebrow">All Solutions</p>
            <h2>Explore the solution library</h2>
            <p className="section-subtitle">
              Browse connected workflows for monitoring, routing, field operations,
              public transport, and specialized fleet environments.
            </p>
          </div>

          <div className="industry-directory-grid">
            {solutionDirectoryCards.map((solution) => (
              <article className="industry-directory-card" key={solution.title}>
                <div className="industry-directory-card-copy">
                  <p className="solution-directory-label">Solution</p>
                  <h3>{solution.title}</h3>
                  <p className="catalog-description">{solution.description}</p>
                </div>
                <Link className="solution-directory-link" href={solution.href}>
                  View solution
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
