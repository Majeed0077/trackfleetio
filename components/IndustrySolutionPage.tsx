import Link from "next/link";

import { type IndustrySolution } from "@/lib/industries";
import { getProductHref } from "@/data/products";

export function IndustrySolutionPage({ industry }: { industry: IndustrySolution }) {
  return (
    <main id="main-content" className="site-main industry-detail-page">
      <section className="products-hero industry-solution-hero industry-detail-hero">
        <div className="container">
          <div className="products-hero-shell industry-detail-hero-shell">
            <span className="products-badge">Industry Solution</span>
            <h1>{industry.title}</h1>
            <p>{industry.description}</p>
          </div>
        </div>
      </section>

      <section className="content-section industry-solution-section industry-detail-section">
        <div className="container">
          <div className="section-heading section-heading-centered industry-detail-heading">
            <p className="eyebrow">Challenges</p>
            <h2>Operational Challenges</h2>
          </div>
          <div className="results-grid industry-problems-grid industry-detail-problems-grid">
            {industry.challenges.map((challenge) => (
              <article className="result-card" key={`${industry.slug}-${challenge.title}`}>
                <h3>{challenge.title}</h3>
                <p>{challenge.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section industry-solution-section industry-detail-section">
        <div className="container">
          <div className="section-heading section-heading-centered industry-detail-heading">
            <p className="eyebrow">Hardware Used</p>
            <h2>Recommended Hardware</h2>
          </div>
          <div className="catalog-grid industry-hardware-grid industry-detail-hardware-grid">
            {industry.hardware.map((hardware) => (
              <article className="catalog-card" key={`${industry.slug}-${hardware.title}`}>
                <p className="product-category">{hardware.category}</p>
                <h3>{hardware.title}</h3>
                <p className="product-specs">{hardware.specs}</p>
                <p className="catalog-description">{hardware.description}</p>
                <Link
                  className="button button-outline"
                  href={hardware.productId ? getProductHref(hardware.productId) : "/products"}
                >
                  View Product
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section industry-solution-section industry-detail-section">
        <div className="container">
          <div className="section-heading section-heading-centered industry-detail-heading">
            <p className="eyebrow">Use Cases</p>
            <h2>{industry.title.replace("Hardware Solutions", "Use Cases")}</h2>
          </div>
          <div className="why-grid industry-use-cases-grid industry-detail-use-cases-grid">
            {industry.useCases.map((useCase) => (
              <article className="why-card" key={`${industry.slug}-${useCase.title}`}>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
