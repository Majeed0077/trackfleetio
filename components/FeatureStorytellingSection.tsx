import Image from "next/image";

import { ViewportVideo } from "@/components/ViewportVideo";

export function FeatureStorytellingSection() {
  return (
    <section id="story" className="content-section content-section-last section-story">
      <div className="container">
        <div className="section-heading section-heading-centered">
          <h2>Feature Storytelling</h2>
        </div>

        <div className="story-layout">
          <article className="story-card">
            <div className="story-media">
              <div className="story-media-frame">
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
              <h3>Driver Monitoring Hardware</h3>
              <p>
                AI Dashcam solutions support safer event capture, driver visibility,
                and modern monitoring workflows across commercial vehicles.
              </p>
            </div>
          </article>

          <article className="story-card story-card-reverse">
            <div className="story-copy-block">
              <h3>Asset Protection Hardware</h3>
              <p>
                Track Patrol devices provide reliable trailer tracking and
                monitoring for asset protection, remote visibility, and secure
                operations.
              </p>
            </div>
            <div className="story-media story-media-alt">
              <Image
                className="story-media-image story-media-image-asset"
                src="/Products/product2.png"
                alt="Asset protection tracker"
                width={560}
                height={420}
                sizes="(max-width: 991px) 100vw, 50vw"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
