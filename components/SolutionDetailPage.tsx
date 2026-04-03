import Link from "next/link";

import { getProductHref } from "@/data/products";
import { type SolutionDetail } from "@/lib/solutions";

export function SolutionDetailPage({ solution }: { solution: SolutionDetail }) {
  return (
    <main id="main-content" className="site-main solution-detail-page">
      <section className="products-hero industry-solution-hero solution-detail-hero">
        <div className="container">
          <div className="products-hero-shell solution-detail-hero-shell">
            <span className="products-badge">Solution</span>
            <h1>{solution.title}</h1>
            <p>{solution.description}</p>
            <div className="products-hero-actions solution-detail-hero-actions">
              <Link className="button button-primary" href="/contact">
                Talk to Solutions Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section industry-solution-section solution-detail-section">
        <div className="container">
          <div className="section-heading section-heading-centered solution-detail-heading">
            <p className="eyebrow">Challenges</p>
            <h2>Operational Challenges</h2>
          </div>
          <div className="results-grid industry-problems-grid solution-problems-grid">
            {solution.challenges.map((challenge) => (
              <article className="result-card" key={`${solution.slug}-${challenge.title}`}>
                <h3>{challenge.title}</h3>
                <p>{challenge.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section industry-solution-section solution-detail-section">
        <div className="container">
          <div className="section-heading section-heading-centered solution-detail-heading">
            <p className="eyebrow">Hardware Stack</p>
            <h2>Hardware in This Solution</h2>
          </div>
          <div className="catalog-grid industry-hardware-grid solution-hardware-grid">
            {solution.hardware.map((hardware) => (
              <article className="catalog-card" key={`${solution.slug}-${hardware.title}`}>
                <p className="product-category">{hardware.category}</p>
                <h3>{hardware.title}</h3>
                <p className="product-specs">{hardware.specs}</p>
                <p className="catalog-description">{hardware.description}</p>
                <Link
                  className="button button-outline"
                  href={hardware.productId ? getProductHref(hardware.productId) : "/products"}
                >
                  View Hardware
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section industry-solution-section solution-detail-section">
        <div className="container">
          <div className="section-heading section-heading-centered solution-detail-heading">
            <p className="eyebrow">Use Cases</p>
            <h2>{solution.title}</h2>
          </div>
          <div className="why-grid industry-use-cases-grid solution-use-cases-grid">
            {solution.useCases.map((useCase) => (
              <article className="why-card" key={`${solution.slug}-${useCase.title}`}>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section section-cta">
        <div className="container">
          <div className="cta-panel">
            <h2>{solution.cta}</h2>
            <Link className="button button-primary" href="/contact">
              Request Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
