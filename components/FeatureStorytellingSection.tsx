import Image from "next/image";
import Link from "next/link";

import { ViewportVideo } from "@/components/ViewportVideo";

export function FeatureStorytellingSection() {
  return (
    <section id="story" className="content-section content-section-last section-story" data-reveal>
      <div className="container">
        <div className="section-heading section-heading-centered">
          <h2>Feature Storytelling</h2>
        </div>

        <div className="story-layout" data-reveal-group>
          <article className="story-card" data-reveal-item>
            <div className="story-media">
              <div className="story-media-frame" data-parallax="soft">
                <ViewportVideo
                  className="story-media-video story-media-video-dashcam"
                  src="/Products/Video 1.mp4"
                  poster="/Products/dashcam.png"
                  ariaLabel="Driver monitoring dashcam video"
                />
                <div className="story-media-overlay" aria-hidden="true">
                  <div className="story-overlay-top">
                    <span className="story-overlay-badge story-overlay-rec">
                      <span className="story-overlay-dot"></span>
                      <span>REC</span>
                    </span>
                    <span className="story-overlay-badge">1080P</span>
                  </div>
                  <div className="story-overlay-corners">
                    <span className="story-corner story-corner-tl"></span>
                    <span className="story-corner story-corner-tr"></span>
                    <span className="story-corner story-corner-bl"></span>
                    <span className="story-corner story-corner-br"></span>
                  </div>
                  <div className="story-overlay-bottom">
                    <span className="story-overlay-caption">GPS ACTIVE</span>
                    <span className="story-overlay-caption">AI MONITORING</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="story-copy-block">
              <h3>Detect Harsh Braking Events</h3>
              <p>
                AI dashcams monitor driver behavior and detect dangerous driving
                events like harsh braking, providing data-driven insights to
                improve fleet safety.
              </p>
              <div className="story-copy-actions">
                <Link className="button button-outline story-button" href="/solutions/monitoring-systems">
                  View Solutions
                </Link>
              </div>
            </div>
          </article>

          <article className="story-card story-card-reverse" data-reveal-item>
            <div className="story-copy-block">
              <h3>Monitor Equipment Location</h3>
              <p>
                Battery-powered GPS trackers keep tabs on portable equipment and
                tools, helping reduce loss and improve operational visibility.
              </p>
              <div className="story-copy-actions">
                <Link className="button button-outline story-button" href="/products/asset-tracking-device">
                  Explore Asset Tracking
                </Link>
              </div>
            </div>
            <div className="story-media story-media-alt" data-parallax="soft">
              <Image
                className="story-media-image story-media-image-asset"
                src="/Products/product3.png"
                alt="Battery-powered asset tracking device"
                width={720}
                height={520}
                sizes="(max-width: 991px) 100vw, 50vw"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
