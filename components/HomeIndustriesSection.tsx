import Image from "next/image";
import Link from "next/link";

export function HomeIndustriesSection() {
  return (
    <section id="industries" className="content-section section-industries">
      <div className="container">
        <div className="section-heading section-heading-centered">
          <h2>Industries</h2>
          <p className="section-subtitle">Solutions by Industry</p>
        </div>

        <div className="industries-showcase">
          <Link className="industry-featured-card" href="/industries/logistics" aria-label="View logistics industry details">
            <div className="industry-featured-media">
              <Image
                className="industry-featured-image"
                src="/Products/logistics.png"
                alt="Logistics operations"
                width={720}
                height={520}
                sizes="(max-width: 991px) 100vw, 50vw"
              />
            </div>
            <div className="industry-featured-content">
              <div className="industry-card-copy">
                <div className="industry-card-meta">
                  <span className="industry-card-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M3 7.5h10v7H3z" />
                      <path d="M13 10h3.5l2.5 2.5v2H13z" />
                      <path d="M7 18.5a1.5 1.5 0 1 0 0 .01" />
                      <path d="M17 18.5a1.5 1.5 0 1 0 0 .01" />
                    </svg>
                  </span>
                  <span className="industry-card-micro-label">Primary Industry</span>
                </div>
                <h3>Logistics</h3>
                <p>Optimize and track your fleet access across every stage of the supply chain.</p>
                <div className="industry-capabilities">
                  <span className="industry-capabilities-label">Key Capabilities</span>
                  <ul className="industry-capabilities-list">
                    <li>Real-time fleet tracking</li>
                    <li>Route optimization insights</li>
                    <li>Driver safety monitoring</li>
                    <li>Asset visibility analytics</li>
                  </ul>
                </div>
                <div className="industry-featured-features" aria-label="Logistics highlights">
                  <div className="industry-feature-item">
                    <div className="industry-feature-meta">
                      <span className="industry-feature-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M4 12h16" />
                          <path d="M12 4v16" />
                          <circle cx="12" cy="12" r="3.5" />
                        </svg>
                      </span>
                      <span className="industry-card-micro-label">Tracking</span>
                    </div>
                    <span>Real-time tracking</span>
                  </div>
                  <div className="industry-feature-item">
                    <div className="industry-feature-meta">
                      <span className="industry-feature-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M5 19 19 5" />
                          <path d="M11 5h8v8" />
                          <path d="M5 11V5h6" />
                        </svg>
                      </span>
                      <span className="industry-card-micro-label">Routing</span>
                    </div>
                    <span>Route optimization</span>
                  </div>
                  <div className="industry-feature-item">
                    <div className="industry-feature-meta">
                      <span className="industry-feature-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M4 8.5 12 5l8 3.5-8 3.5-8-3.5Z" />
                          <path d="M4 8.5v7L12 19l8-3.5v-7" />
                          <path d="M12 12v7" />
                        </svg>
                      </span>
                      <span className="industry-card-micro-label">Visibility</span>
                    </div>
                    <span>Asset monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="industries-stack">
            <Link className="industry-stack-card" href="/industries/logistics" aria-label="View delivery and logistics industry details">
              <div className="industry-stack-content">
                <div className="industry-card-copy">
                  <div className="industry-card-meta">
                    <span className="industry-card-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M4.5 8.5 12 5l7.5 3.5L12 12 4.5 8.5Z" />
                        <path d="M4.5 8.5V15.5L12 19l7.5-3.5V8.5" />
                        <path d="M12 12v7" />
                      </svg>
                    </span>
                    <span className="industry-card-micro-label">Logistics</span>
                  </div>
                  <h3>Delivery</h3>
                  <p>Manage your last-mile fleet and monitor delivery performance.</p>
                </div>
              </div>
            </Link>

            <Link className="industry-stack-card" href="/industries/construction" aria-label="View construction industry details">
              <div className="industry-stack-content">
                <div className="industry-card-copy">
                  <div className="industry-card-meta">
                    <span className="industry-card-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M4 14a8 8 0 0 1 16 0" />
                        <path d="M5 14h14" />
                        <path d="M7 14v3h10v-3" />
                        <path d="M9 10.5 12 7l3 3.5" />
                      </svg>
                    </span>
                    <span className="industry-card-micro-label">Industry Use Case</span>
                  </div>
                  <h3>Construction</h3>
                  <p>Increase safety and productivity across active construction sites.</p>
                </div>
              </div>
            </Link>

            <Link className="industry-stack-card" href="/industries/transportation" aria-label="View enterprise fleet transportation details">
              <div className="industry-stack-content">
                <div className="industry-card-copy">
                  <div className="industry-card-meta">
                    <span className="industry-card-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M3 13h8l2.5-4H18l3 4v3h-2" />
                        <path d="M7 18.5a1.5 1.5 0 1 0 0 .01" />
                        <path d="M17 18.5a1.5 1.5 0 1 0 0 .01" />
                        <path d="M3 18h2" />
                      </svg>
                    </span>
                    <span className="industry-card-micro-label">Enterprise</span>
                  </div>
                  <h3>Enterprise Fleet</h3>
                  <p>Simplify fleet management for your entire organization.</p>
                </div>
              </div>
            </Link>

            <Link className="industry-stack-card" href="/industries/transportation" aria-label="View fleet operations transportation details">
              <div className="industry-stack-content">
                <div className="industry-card-copy">
                  <div className="industry-card-meta">
                    <span className="industry-card-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M3 13h8l2.5-4H18l3 4v3h-2" />
                        <path d="M7 18.5a1.5 1.5 0 1 0 0 .01" />
                        <path d="M17 18.5a1.5 1.5 0 1 0 0 .01" />
                        <path d="M3 18h2" />
                      </svg>
                    </span>
                    <span className="industry-card-micro-label">Operations</span>
                  </div>
                  <h3>Fleet Operations</h3>
                  <p>Improve visibility across mixed vehicles and daily field programs.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
