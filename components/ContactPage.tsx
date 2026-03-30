export function ContactPage() {
  return (
    <main id="main-content" className="site-main">
      <section className="products-hero company-page-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Company</span>
            <h1>Contact Track Fleetio</h1>
            <p>Talk to our team about hardware solutions.</p>
          </div>
        </div>
      </section>

      <section className="content-section company-page-section">
        <div className="container">
          <div className="company-contact-grid">
            <article className="company-page-card company-contact-card">
              <p className="eyebrow">Contact Info</p>
              <div className="company-contact-list">
                <div className="company-contact-item">
                  <span className="company-contact-label">Sales</span>
                  <a className="company-contact-value" href="mailto:hello@trackfleetio.com">
                    hello@trackfleetio.com
                  </a>
                </div>
                <div className="company-contact-item">
                  <span className="company-contact-label">Support</span>
                  <a className="company-contact-value" href="mailto:support@trackfleetio.com">
                    support@trackfleetio.com
                  </a>
                </div>
                <div className="company-contact-item">
                  <span className="company-contact-label">Phone</span>
                  <a className="company-contact-value" href="tel:+000000520">
                    +000 000 0520
                  </a>
                </div>
              </div>
            </article>

            <article className="company-page-card company-contact-card">
              <p className="eyebrow">Request Demo</p>
              <form id="contact-form" className="company-contact-form" action="#contact-form">
                <label className="sr-only" htmlFor="contact-name">
                  Name
                </label>
                <input id="contact-name" name="name" type="text" placeholder="Name" />

                <label className="sr-only" htmlFor="contact-company">
                  Company
                </label>
                <input id="contact-company" name="company" type="text" placeholder="Company" />

                <label className="sr-only" htmlFor="contact-email">
                  Email
                </label>
                <input id="contact-email" name="email" type="email" placeholder="Email" />

                <label className="sr-only" htmlFor="contact-message">
                  Message
                </label>
                <textarea id="contact-message" name="message" placeholder="Message"></textarea>

                <button className="button button-primary" type="submit">
                  Request Demo
                </button>
              </form>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section section-cta company-page-cta">
        <div className="container">
          <div className="cta-panel">
            <h2>Connect with our team to plan the right hardware deployment for your fleet.</h2>
            <a className="button button-primary" href="#contact-form">
              Request Demo
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
