export function WhySection() {
  return (
    <section className="content-section section-why">
      <div className="container">
        <div className="section-heading section-heading-centered">
          <h2>Why Track Fleetio</h2>
        </div>

        <div className="why-grid">
          <article className="why-card">
            <span className="why-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3Z" />
                <path d="M9 11.5 11 13.5l4-4" />
              </svg>
            </span>
            <h3>
              Hardware
              <br />
              Reliability
            </h3>
            <p>Engineered for uptime with fleet hardware that performs in real field conditions.</p>
          </article>

          <article className="why-card">
            <span className="why-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 12h 16" />
                <path d="M12 4v16" />
                <path d="M7 7h10v10H7z" />
              </svg>
            </span>
            <h3>
              Simple
              <br />
              Integration
            </h3>
            <p>Integrate hardware quickly across existing fleet workflows and operator systems.</p>
          </article>

          <article className="why-card">
            <span className="why-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 6h14v12H5z" />
                <path d="M8 3v6" />
                <path d="M16 3v6" />
                <path d="M5 10h14" />
              </svg>
            </span>
            <h3>
              Industry
              <br />
              Experience
            </h3>
            <p>Built around operational realities from logistics, delivery, and commercial fleets.</p>
          </article>

          <article className="why-card">
            <span className="why-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 8a8 8 0 0 1 16 0v5l-2 3H6l-2-3V8Z" />
                <path d="M9 19a3 3 0 0 0 6 0" />
              </svg>
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
