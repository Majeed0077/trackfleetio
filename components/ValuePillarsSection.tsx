export function ValuePillarsSection() {
  return (
    <section id="pillars" className="content-section section-pills">
      <div className="container">
        <div className="section-heading section-heading-centered">
          <h2>Value Pillars</h2>
        </div>

        <div className="pillars-grid">
          <article className="pillar-card">
            <span className="pillar-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M2.5 15.5h11l3-5.5h2l3 5.5h-2" />
                <path d="M6 18.5a1.75 1.75 0 1 0 0 .01" />
                <path d="M18 18.5a1.75 1.75 0 1 0 0 .01" />
                <path d="M3.5 11.5h8.5" />
                <path d="M6 7.5h5.5" />
              </svg>
            </span>
            <h3>Reliable Fleet Hardware</h3>
          </article>

          <article className="pillar-card">
            <span className="pillar-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 18l5-5" />
                <path d="M15 9l5-5" />
                <path d="M14 4l6 6" />
                <path d="M4 4l6 6" />
                <path d="M9 9L4 14" />
                <path d="M20 20l-6-6" />
              </svg>
            </span>
            <h3>Easy Installation</h3>
          </article>

          <article className="pillar-card">
            <span className="pillar-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 4a6 6 0 0 1 6 6v3l2 3H4l2-3v-3a6 6 0 0 1 6-6Z" />
                <path d="M10 20a2 2 0 0 0 4 0" />
                <path d="M12 7.5v3.5" />
              </svg>
            </span>
            <h3>Real Time Device Alerts</h3>
          </article>

          <article className="pillar-card">
            <span className="pillar-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M6 17V9" />
                <path d="M12 17V5" />
                <path d="M18 17v-6" />
                <path d="M4 20h16" />
                <path d="M15 4h5v5" />
                <path d="M20 4l-6 6" />
              </svg>
            </span>
            <h3>Scalable Deployment</h3>
          </article>
        </div>
      </div>
    </section>
  );
}
