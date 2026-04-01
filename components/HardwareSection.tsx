  import Image from "next/image";
import Link from "next/link";

export function HardwareSection() {
  return (
    <section id="hardware" className="content-section" data-reveal>
      <div className="container">
        <div className="section-heading section-heading-centered">
          <p className="eyebrow">Hardware Ecosystem</p>
          <h2>Fleet Hardware Built for Reliability</h2>
        </div>

        <div className="hardware-grid" data-reveal-group>
          <article className="product-card product-card-featured" data-reveal-item>
            <div className="product-media" data-parallax="soft">
              <Image
                className="product-media-image product-media-image-gps"
                src="/Products/product3.png"
                alt="Track Fleetio GPS tracker"
                width={360}
                height={280}
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
              />
            </div>
            <p className="product-category">Telematics Device</p>
            <h3>4G GPS Tracker</h3>
            <p className="product-specs">LTE | GNSS | CAN Support</p>
            <p>
              Track Fleetio hardwireable fleet tracking devices deliver dependable
              location, ignition, and status data.
            </p>
            <ul className="product-list">
              <li>Live vehicle telemetry</li>
              <li>Rugged install profile</li>
              <li>Operational visibility</li>
              <li>Fleet tracking ready</li>
            </ul>
            <Link className="button button-outline" href="/products/4g-gps-device">
              View Details
            </Link>
          </article>

          <article className="product-card" data-reveal-item>
            <div className="product-media" data-parallax="soft">
              <Image
                className="product-media-image product-media-image-dashcam"
                src="/Products/dashcam.png"
                alt="Track Fleetio AI dashcam"
                width={360}
                height={280}
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
              />
            </div>
            <p className="product-category">Video Telematics</p>
            <h3>AI Dashcam DVR</h3>
            <p className="product-specs">1080p | Dual Cam | ADAS</p>
            <p>
              Dual facing camera hardware built for event visibility, safer driving,
              and fleet video review.
            </p>
            <ul className="product-list">
              <li>Event video capture</li>
              <li>Driver review ready</li>
              <li>Cab-ready enclosure</li>
              <li>DVR recording support</li>
            </ul>
            <Link className="button button-outline" href="/products/ai-dashcam">
              View Details
            </Link>
          </article>

          <article className="product-card" data-reveal-item>
            <div className="product-media" data-parallax="soft">
              <Image
                className="product-media-image product-media-image-asset"
                src="/Products/product2.png"
                alt="Track Fleetio asset tracker"
                width={360}
                height={280}
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
              />
            </div>
            <p className="product-category">Tracking Devices</p>
            <h3>Battery Asset Tracker</h3>
            <p className="product-specs">3yr Battery | BLE | GNSS</p>
            <p>
              Compact battery powered devices designed for trailers, mobile assets,
              and field equipment monitoring.
            </p>
            <ul className="product-list">
              <li>Asset recovery ready</li>
              <li>Long life battery</li>
              <li>Reliable asset visibility</li>
              <li>Trailer monitoring</li>
            </ul>
            <Link className="button button-outline" href="/products/asset-tracking-device">
              View Details
            </Link>
          </article>

          <article className="product-card" data-reveal-item>
            <div className="product-media product-media-light" data-parallax="soft">
              <Image
                className="product-media-image product-media-image-sensor"
                src="/Products/product1.png"
                alt="Track Fleetio sensor device"
                width={360}
                height={280}
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
              />
            </div>
            <p className="product-category">Sensors</p>
            <h3>Industrial Sensors</h3>
            <p className="product-specs">Temp | Fuel | TPMS</p>
            <p>
              Sensor extensions for temperature, door, and cargo awareness across
              higher control operations.
            </p>
            <ul className="product-list">
              <li>Remote condition inputs</li>
              <li>Operational awareness</li>
              <li>Dependable sensor feed</li>
              <li>Fuel, temp, TPMS</li>
            </ul>
            <Link className="button button-outline" href="/products/fuel-sensors">
              View Details
            </Link>
          </article>
        </div>

        <div className="product-section-actions" data-reveal>
          <Link className="button button-primary" href="/products">
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
