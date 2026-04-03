import { buyingPrioritiesContent } from "@/lib/content/homepage";

export function ClientsSection() {
  return (
    <section className="content-section section-client" data-reveal>
      <div className="container">
        <div className="client-proof-band" data-reveal-group>
          <div className="client-proof-header" data-reveal-item>
            <p className="eyebrow">{buyingPrioritiesContent.eyebrow}</p>
            <h2>{buyingPrioritiesContent.heading}</h2>
            <p className="section-subtitle">{buyingPrioritiesContent.description}</p>
            <div className="client-proof-highlights" aria-label="Trust signals">
              {buyingPrioritiesContent.highlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          </div>

          <div className="client-proof-grid" aria-label="Fleet hardware evaluation areas" data-reveal-item>
            {buyingPrioritiesContent.proofAreas.map((area) => (
              <article className="client-proof-card" key={area.title}>
                <p className="client-proof-card-label">{area.label}</p>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
