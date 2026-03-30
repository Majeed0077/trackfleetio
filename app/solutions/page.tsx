import type { Metadata } from "next";
import Link from "next/link";

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

      <section className="products-catalog industry-directory-section">
        <div className="container">
          <div className="industry-directory-grid">
            {solutionDirectoryCards.map((solution) => (
              <article className="industry-directory-card" key={solution.title}>
                <p className="product-category">Solution</p>
                <h3>{solution.title}</h3>
                <p className="catalog-description">{solution.description}</p>
                <Link className="button button-outline" href={solution.href}>
                  View Solution
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
