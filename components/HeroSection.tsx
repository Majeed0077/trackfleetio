import Image from "next/image";
import Link from "next/link";
import { Headset, ShieldCheck, Smartphone, Truck } from "lucide-react";

export function HeroSection() {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid" data-reveal-group>
            <div className="hero-copy" data-reveal-item>
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

            <div className="hero-visual" data-reveal-item>
              <div className="hero-devices" aria-label="Track Fleetio hardware showcase" data-parallax="soft">
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

      <section className="metrics-section" aria-label="Trust metrics" data-reveal-group>
        <div className="container">
          <div className="metrics-strip">
            <article className="metric-card" data-reveal-item>
              <strong>500+</strong>
              <div className="metric-meta">
                <span className="metric-icon" aria-hidden="true">
                  <Truck size={15} strokeWidth={1.9} />
                </span>
                <span>Fleets Supported</span>
              </div>
            </article>
            <article className="metric-card" data-reveal-item>
              <strong>50K+</strong>
              <div className="metric-meta">
                <span className="metric-icon" aria-hidden="true">
                  <Smartphone size={15} strokeWidth={1.9} />
                </span>
                <span>Devices Deployed</span>
              </div>
            </article>
            <article className="metric-card" data-reveal-item>
              <strong>99.9%</strong>
              <div className="metric-meta">
                <span className="metric-icon" aria-hidden="true">
                  <ShieldCheck size={15} strokeWidth={1.9} />
                </span>
                <span>Reliability</span>
              </div>
            </article>
            <article className="metric-card" data-reveal-item>
              <strong>24/7</strong>
              <div className="metric-meta">
                <span className="metric-icon" aria-hidden="true">
                  <Headset size={15} strokeWidth={1.9} />
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
