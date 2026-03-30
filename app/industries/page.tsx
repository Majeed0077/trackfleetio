import type { Metadata } from "next";
import Link from "next/link";

import { industryDirectoryCards } from "@/lib/industries";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Industries | Track Fleetio",
    description:
      "Explore Track Fleetio fleet hardware solutions for transportation, logistics, construction, manufacturing, farming, and public transport.",
    path: "/industries",
  });
}

export default function IndustriesPage() {
  return (
    <main id="main-content" className="site-main">
      <section className="products-hero industry-directory-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Industry Solutions</span>
            <h1>Fleet Hardware Solutions by Industry</h1>
            <p>
              Explore how Track Fleetio hardware supports transportation, logistics,
              construction, manufacturing, farming, and public transport operations.
            </p>
          </div>
        </div>
      </section>

      <section className="products-catalog industry-directory-section">
        <div className="container">
          <div className="industry-directory-grid">
            {industryDirectoryCards.map((industry) => (
              <article className="industry-directory-card" key={industry.title}>
                <p className="product-category">Industry</p>
                <h3>{industry.title}</h3>
                <p className="catalog-description">{industry.description}</p>
                <Link className="button button-outline" href={industry.href}>
                  View Industry
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
