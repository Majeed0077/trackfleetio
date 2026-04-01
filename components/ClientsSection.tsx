const trustLabels = [
  "Regional Carrier",
  "Cold Chain Fleet",
  "Field Service",
  "Distribution Ops",
  "Public Transport",
  "Construction Fleet",
] as const;

export function ClientsSection() {
  return (
    <section className="content-section section-client" data-reveal>
      <div className="container">
        <div className="client-proof-band" data-reveal-group>
          <div className="client-proof-header" data-reveal-item>
            <p className="eyebrow">Selected Operators</p>
            <h2>Trusted by fleet teams</h2>
            <p className="section-subtitle">
              Used across logistics, field service, distribution, and mixed fleet operations
              that need visibility without extra complexity.
            </p>
            <div className="client-proof-highlights" aria-label="Trust signals">
              <span>Rollout-ready hardware</span>
              <span>Video and telematics support</span>
              <span>Built for day-to-day operations</span>
            </div>
          </div>

          <div className="client-strip-shell" data-client-rail data-reveal-item>
            <div className="client-strip-track">
              <div className="client-strip" aria-label="Teams using the system">
                {trustLabels.map((label, index) => {
                  const iconClassNames = [
                    "client-logo-enterprise",
                    "client-logo-sotspoint",
                    "client-logo-microsoft",
                    "client-logo-seero",
                  ];

                  return (
                    <span
                      key={label}
                      className={`client-logo ${iconClassNames[index % iconClassNames.length]}`}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
              <div className="client-strip" aria-hidden="true">
                {trustLabels.map((label, index) => {
                  const iconClassNames = [
                    "client-logo-enterprise",
                    "client-logo-sotspoint",
                    "client-logo-microsoft",
                    "client-logo-seero",
                  ];

                  return (
                    <span
                      key={`${label}-duplicate`}
                      className={`client-logo ${iconClassNames[index % iconClassNames.length]}`}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
