import { ShieldCheck, Blocks, CalendarRange, Headset } from "lucide-react";

export function WhySection() {
  return (
    <section className="content-section section-why" data-reveal>
      <div className="container">
        <div className="section-heading section-heading-centered">
          <h2>Why Track Fleetio</h2>
        </div>

        <div className="why-grid" data-reveal-group>
          <article className="why-card" data-reveal-item>
            <span className="why-icon" aria-hidden="true">
              <ShieldCheck size={22} strokeWidth={1.9} />
            </span>
            <h3>
              Hardware
              <br />
              Reliability
            </h3>
            <p>Engineered for uptime with fleet hardware that performs in real field conditions.</p>
          </article>

          <article className="why-card" data-reveal-item>
            <span className="why-icon" aria-hidden="true">
              <Blocks size={22} strokeWidth={1.9} />
            </span>
            <h3>
              Simple
              <br />
              Integration
            </h3>
            <p>Integrate hardware quickly across existing fleet workflows and operator systems.</p>
          </article>

          <article className="why-card" data-reveal-item>
            <span className="why-icon" aria-hidden="true">
              <CalendarRange size={22} strokeWidth={1.9} />
            </span>
            <h3>
              Industry
              <br />
              Experience
            </h3>
            <p>Built around operational realities from logistics, delivery, and commercial fleets.</p>
          </article>

          <article className="why-card" data-reveal-item>
            <span className="why-icon" aria-hidden="true">
              <Headset size={22} strokeWidth={1.9} />
            </span>
            <h3>
              24/7 Technical
              <br />
              Support
            </h3>
            <p>Support teams help with deployment, troubleshooting, and fleet continuity.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
