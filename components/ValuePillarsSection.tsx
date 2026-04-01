import { BellRing, Cable, Truck, Waypoints } from "lucide-react";

export function ValuePillarsSection() {
  return (
    <section id="pillars" className="content-section section-pills" data-reveal>
      <div className="container">
        <div className="section-heading section-heading-centered">
          <h2>Value Pillars</h2>
        </div>

        <div className="pillars-grid" data-reveal-group>
          <article className="pillar-card" data-reveal-item>
            <span className="pillar-icon" aria-hidden="true">
              <Truck size={22} strokeWidth={1.9} />
            </span>
            <h3>Reliable Fleet Hardware</h3>
          </article>

          <article className="pillar-card" data-reveal-item>
            <span className="pillar-icon" aria-hidden="true">
              <Cable size={22} strokeWidth={1.9} />
            </span>
            <h3>Easy Installation</h3>
          </article>

          <article className="pillar-card" data-reveal-item>
            <span className="pillar-icon" aria-hidden="true">
              <BellRing size={22} strokeWidth={1.9} />
            </span>
            <h3>Real Time Device Alerts</h3>
          </article>

          <article className="pillar-card" data-reveal-item>
            <span className="pillar-icon" aria-hidden="true">
              <Waypoints size={22} strokeWidth={1.9} />
            </span>
            <h3>Scalable Deployment</h3>
          </article>
        </div>
      </div>
    </section>
  );
}
