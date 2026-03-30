export function ClientsSection() {
  return (
    <section className="content-section section-client">
      <div className="container">
        <div className="section-heading section-heading-centered">
          <h2>Client</h2>
        </div>

        <div className="client-strip-shell" data-client-rail>
          <div className="client-strip-track">
            <div className="client-strip" aria-label="Client logos">
              <span className="client-logo client-logo-enterprise">Enterprise</span>
              <span className="client-logo client-logo-sotspoint">Sotspoin</span>
              <span className="client-logo client-logo-microsoft">Microsoft</span>
              <span className="client-logo client-logo-seero">SeeroBNC</span>
            </div>
            <div className="client-strip" aria-hidden="true">
              <span className="client-logo client-logo-enterprise">Enterprise</span>
              <span className="client-logo client-logo-sotspoint">Sotspoin</span>
              <span className="client-logo client-logo-microsoft">Microsoft</span>
              <span className="client-logo client-logo-seero">SeeroBNC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
