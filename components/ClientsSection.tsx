"use client";

import { useAppStore } from "@/store/store";

export function ClientsSection() {
  const buyingPrioritiesDraft = useAppStore((state) => state.cmsDrafts.homepageBuyingPriorities);

  return (
    <section className="content-section section-client" data-reveal>
      <div className="container">
        <div className="client-proof-band" data-reveal-group>
          <div className="client-proof-header" data-reveal-item>
            <p className="eyebrow">{buyingPrioritiesDraft.eyebrow}</p>
            <h2>{buyingPrioritiesDraft.heading}</h2>
            <p className="section-subtitle">{buyingPrioritiesDraft.description}</p>
          </div>

          <div className="client-proof-grid" aria-label="Fleet hardware evaluation areas" data-reveal-item>
            {buyingPrioritiesDraft.proofAreas.map((area) => (
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
