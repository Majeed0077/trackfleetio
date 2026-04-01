export function ResultsSection() {
  return (
    <section className="content-section section-results" data-reveal>
      <div className="container">
        <div className="section-heading section-heading-centered">
          <h2>Results</h2>
        </div>

        <div className="results-grid" data-reveal-group>
          <article className="result-card" data-reveal-item>
            <h3>Reduce operational risks</h3>
            <p>Reduce operational risk with better fleet hardware context and field visibility.</p>
          </article>

          <article className="result-card" data-reveal-item>
            <h3>Improve fleet accountability</h3>
            <p>Improve fleet accountability across drivers and vehicle events.</p>
          </article>

          <article className="result-card" data-reveal-item>
            <h3>Protect high-value assets</h3>
            <p>Protect trailers, cargo, and mobile equipment with asset level coverage.</p>
          </article>

          <article className="result-card" data-reveal-item>
            <h3>Improve driver safety</h3>
            <p>Support safer driving through monitoring and event based hardware data.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
