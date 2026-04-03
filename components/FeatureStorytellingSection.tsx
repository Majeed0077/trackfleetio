import Image from "next/image";
import Link from "next/link";

import { ViewportVideo } from "@/components/ViewportVideo";
import { fieldUseCasesContent } from "@/lib/content/homepage";

export function FeatureStorytellingSection() {
  const [videoCard, imageCard] = fieldUseCasesContent.cards;

  return (
    <section id="story" className="content-section content-section-last section-story" data-reveal>
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">{fieldUseCasesContent.eyebrow}</p>
            <h2>{fieldUseCasesContent.heading}</h2>
            <p className="section-subtitle">{fieldUseCasesContent.description}</p>
          </div>

        <div className="story-layout" data-reveal-group>
          <article className="story-card" data-reveal-item>
            <div className="story-media story-media-shell">
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
              <h3>{videoCard.title}</h3>
              <p>{videoCard.description}</p>
              <div className="story-copy-actions">
                <Link className="button button-outline story-button" href={videoCard.ctaHref}>
                  {videoCard.ctaLabel}
                </Link>
              </div>
            </div>
          </article>

          <article className="story-card story-card-reverse" data-reveal-item>
            <div className="story-copy-block">
              <h3>{imageCard.title}</h3>
              <p>{imageCard.description}</p>
              <div className="story-copy-actions">
                <Link className="button button-outline story-button" href={imageCard.ctaHref}>
                  {imageCard.ctaLabel}
                </Link>
              </div>
            </div>
            <div className="story-media story-media-alt story-media-shell" data-parallax="soft">
              <Image
                className={`story-media-image ${imageCard.imageClass ?? ""}`}
                src={imageCard.imageSrc ?? ""}
                alt={imageCard.imageAlt ?? ""}
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
