import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <h1>
                Smarter&nbsp;Hardware
                <br />
                for&nbsp;Modern&nbsp;Fleet
                <br />
                Operations
              </h1>
              <p className="hero-text">
                Track Fleetio provides reliable fleet tracking devices, dash cameras,
                and asset monitoring hardware to help businesses improve visibility
                and security.
              </p>

              <div className="hero-actions">
                <Link className="button button-primary" href="#hardware">
                  Request Demo
                </Link>
                <Link className="button button-secondary" href="#hardware">
                  Explore Hardware
                </Link>
              </div>

              <p className="hero-trust">Trusted by fleet operators and logistics companies</p>
            </div>

            <div className="hero-visual">
              <div className="hero-devices" aria-label="Track Fleetio hardware showcase">
                <Image
                  className="hero-cluster-image"
                  src="/Products/3Products.png"
                  alt="Track Fleetio hardware showcase"
                  width={760}
                  height={560}
                  loading="eager"
                  fetchPriority="high"
                  priority
                  sizes="(max-width: 991px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="metrics-section" aria-label="Trust metrics">
        <div className="container">
          <div className="metrics-strip">
            <article className="metric-card">
              <strong>500+</strong>
              <div className="metric-meta">
                <span className="metric-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M2 5.25h7v4.5H2z" />
                    <path d="M9 6.75h2.5l1.5 1.5v1.5H9z" />
                    <path d="M4.5 12.25a1 1 0 1 0 0 .01" />
                    <path d="M10.75 12.25a1 1 0 1 0 0 .01" />
                  </svg>
                </span>
                <span>Fleets Supported</span>
              </div>
            </article>
            <article className="metric-card">
              <strong>50K+</strong>
              <div className="metric-meta">
                <span className="metric-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <rect x="4" y="2.75" width="8" height="10.5" rx="2" />
                    <path d="M6.25 10.75h3.5" />
                  </svg>
                </span>
                <span>Devices Deployed</span>
              </div>
            </article>
            <article className="metric-card">
              <strong>99.9%</strong>
              <div className="metric-meta">
                <span className="metric-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M8 2.5 12.5 4.5v3.25c0 3-2.25 4.75-4.5 5.9-2.25-1.15-4.5-2.9-4.5-5.9V4.5L8 2.5Z" />
                    <path d="M6.5 8 7.5 9l2-2" />
                  </svg>
                </span>
                <span>Reliability</span>
              </div>
            </article>
            <article className="metric-card">
              <strong>24/7</strong>
              <div className="metric-meta">
                <span className="metric-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M3 5.5a5 5 0 0 1 10 0v3l-1.25 1.75h-7.5L3 8.5v-3Z" />
                    <path d="M6 12a2 2 0 0 0 4 0" />
                  </svg>
                </span>
                <span>Support</span>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
