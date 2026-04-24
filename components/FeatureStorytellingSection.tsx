"use client";

import Link from "next/link";

import { ViewportVideo } from "@/components/ViewportVideo";
import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";
import { fieldUseCasesContent } from "@/lib/content/homepage";
import { useAppStore } from "@/store/store";

export function FeatureStorytellingSection() {
  const storyDraft = useAppStore((state) => state.cmsDrafts.homepageStory);
  const [videoCard, imageCard] = fieldUseCasesContent.cards;
  const videoSrc = storyDraft.videoCard.videoSrc.trim() || "/Products/Video 1.mp4";
  const videoPoster = storyDraft.videoCard.posterSrc.trim() || "/Products/DR03.png";
  const legacyStoryImage = "/Products/Industrial temperature sensor close-up.png";
  const previousStoryImage = "/Products/logistics.png";
  const draftImageSrc = storyDraft.imageCard.imageSrc.trim();
  const draftImageAlt = storyDraft.imageCard.imageAlt.trim();
  const storyImageSrc =
    !draftImageSrc || draftImageSrc === legacyStoryImage || draftImageSrc === previousStoryImage
      ? imageCard.imageSrc || "/Products/logistics.png"
      : draftImageSrc;
  const storyImageAlt =
    !draftImageAlt ||
    draftImageAlt === "Industrial temperature sensor device" ||
    draftImageAlt === "Logistics trailer at loading dock"
      ? imageCard.imageAlt || "Tracked refrigerated trailer parked in a logistics yard"
      : draftImageAlt;

  return (
    <section id="story" className="content-section content-section-last section-story" data-reveal>
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">{storyDraft.eyebrow}</p>
            <h2>{storyDraft.heading}</h2>
            <p className="section-subtitle">{storyDraft.description}</p>
          </div>

        <div className="story-layout" data-reveal-group>
          <article className="story-card" data-reveal-item>
            <div className="story-media story-media-shell">
              <div className="story-media-frame">
                <ViewportVideo
                  className="story-media-video story-media-video-dashcam"
                  src={videoSrc}
                  poster={resolveCloudinaryAsset(videoPoster)}
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
              <h3>{storyDraft.videoCard.title}</h3>
              <p>{storyDraft.videoCard.description}</p>
              <div className="story-copy-actions">
                <Link className="button button-outline story-button" href={videoCard.ctaHref}>
                  {storyDraft.videoCard.ctaLabel}
                </Link>
              </div>
            </div>
          </article>

          <article className="story-card story-card-reverse" data-reveal-item>
            <div className="story-copy-block">
              <h3>{storyDraft.imageCard.title}</h3>
              <p>{storyDraft.imageCard.description}</p>
              <div className="story-copy-actions">
                <Link className="button button-outline story-button" href={imageCard.ctaHref}>
                  {storyDraft.imageCard.ctaLabel}
                </Link>
              </div>
            </div>
            <div className="story-media story-media-alt story-media-shell">
              <div className="story-media-frame">
                <ViewportVideo
                  className="story-media-video"
                  src="/Videos/trailers.mp4"
                  poster={storyImageSrc}
                  ariaLabel={storyImageAlt}
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
