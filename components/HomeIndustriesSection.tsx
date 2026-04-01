import Image from "next/image";
import Link from "next/link";
import { Boxes, Briefcase, Crosshair, Package, Route, Truck, Wrench } from "lucide-react";

export function HomeIndustriesSection() {
  return (
    <section id="industries" className="content-section section-industries" data-reveal>
      <div className="container">
        <div className="section-heading section-heading-centered">
          <h2>Industries</h2>
          <p className="section-subtitle">Solutions by Industry</p>
        </div>

        <div className="industries-showcase" data-reveal-group>
          <Link className="industry-featured-card" href="/industries/logistics" aria-label="View logistics industry details" data-reveal-item>
            <div className="industry-featured-media" data-parallax="soft">
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
                    <Truck size={18} strokeWidth={1.9} />
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
                        <Crosshair size={18} strokeWidth={1.9} />
                      </span>
                      <span className="industry-card-micro-label">Tracking</span>
                    </div>
                    <span>Real-time tracking</span>
                  </div>
                  <div className="industry-feature-item">
                    <div className="industry-feature-meta">
                      <span className="industry-feature-icon" aria-hidden="true">
                        <Route size={18} strokeWidth={1.9} />
                      </span>
                      <span className="industry-card-micro-label">Routing</span>
                    </div>
                    <span>Route optimization</span>
                  </div>
                  <div className="industry-feature-item">
                    <div className="industry-feature-meta">
                      <span className="industry-feature-icon" aria-hidden="true">
                        <Boxes size={18} strokeWidth={1.9} />
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
            <Link className="industry-stack-card" href="/industries/logistics" aria-label="View delivery and logistics industry details" data-reveal-item>
              <div className="industry-stack-content">
                <div className="industry-card-copy">
                  <div className="industry-card-meta">
                    <span className="industry-card-icon" aria-hidden="true">
                      <Package size={18} strokeWidth={1.9} />
                    </span>
                    <span className="industry-card-micro-label">Logistics</span>
                  </div>
                  <h3>Delivery</h3>
                  <p>Manage your last-mile fleet and monitor delivery performance.</p>
                </div>
              </div>
            </Link>

            <Link className="industry-stack-card" href="/industries/construction" aria-label="View construction industry details" data-reveal-item>
              <div className="industry-stack-content">
                <div className="industry-card-copy">
                  <div className="industry-card-meta">
                    <span className="industry-card-icon" aria-hidden="true">
                      <Wrench size={18} strokeWidth={1.9} />
                    </span>
                    <span className="industry-card-micro-label">Industry Use Case</span>
                  </div>
                  <h3>Construction</h3>
                  <p>Increase safety and productivity across active construction sites.</p>
                </div>
              </div>
            </Link>

            <Link className="industry-stack-card" href="/industries/transportation" aria-label="View enterprise fleet transportation details" data-reveal-item>
              <div className="industry-stack-content">
                <div className="industry-card-copy">
                  <div className="industry-card-meta">
                    <span className="industry-card-icon" aria-hidden="true">
                      <Briefcase size={18} strokeWidth={1.9} />
                    </span>
                    <span className="industry-card-micro-label">Enterprise</span>
                  </div>
                  <h3>Enterprise Fleet</h3>
                  <p>Simplify fleet management for your entire organization.</p>
                </div>
              </div>
            </Link>

            <Link className="industry-stack-card" href="/industries/transportation" aria-label="View fleet operations transportation details" data-reveal-item>
              <div className="industry-stack-content">
                <div className="industry-card-copy">
                  <div className="industry-card-meta">
                    <span className="industry-card-icon" aria-hidden="true">
                      <Truck size={18} strokeWidth={1.9} />
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
