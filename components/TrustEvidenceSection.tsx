"use client";

import { Boxes, Globe2, MapPinned, Route, Star } from "lucide-react";

import styles from "./TrustEvidenceSection.module.css";
import { useAppStore } from "@/store/store";

const trustIconMap = {
  globe: Globe2,
  route: Route,
  boxes: Boxes,
  map: MapPinned,
} as const;

export function TrustEvidenceSection() {
  const trustDraft = useAppStore((state) => state.cmsDrafts.homepageTrust);

  return (
    <section className={`content-section ${styles.section}`} data-reveal>
      <div className="container">
        <div className={styles.topline} data-reveal-group>
          <div className={styles.intro} data-reveal-item>
            <p className={styles.eyebrow}>{trustDraft.eyebrow}</p>
            <h2 className={styles.heading}>{trustDraft.heading}</h2>
            <p className={styles.copy}>{trustDraft.description}</p>
            <div className={styles.platformStrip} aria-label="Review platforms">
              {trustDraft.reviews.map((review) => (
                <span className={styles.platformPill} key={`${review.platform}-pill`}>
                  {review.platform}
                </span>
              ))}
            </div>
          </div>

          <aside className={styles.validationPanel} data-reveal-item>
            <p className={styles.validationEyebrow}>Validation Snapshot</p>
            <div className={styles.reviewStack}>
              {trustDraft.reviews.map((review) => (
                <article className={styles.reviewItem} key={review.platform}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewPlatform}>{review.platform}</span>
                    <span className={styles.reviewScore}>{review.score}</span>
                  </div>
                  <div
                    className={styles.reviewStars}
                    aria-label={`${review.platform} rating ${review.score}`}
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={`${review.platform}-${index}`}
                        size={14}
                        strokeWidth={1.8}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <p className={styles.reviewSummary}>{review.summary}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>

        <div className={styles.metricsGrid} data-reveal-group>
          {trustDraft.stats.map((stat) => {
            const Icon = trustIconMap[stat.icon];

            return (
              <article className={styles.metricCard} key={stat.label} data-reveal-item>
                <div className={styles.metricTopline}>
                  <span className={styles.metricIcon} aria-hidden="true">
                    <Icon size={16} strokeWidth={1.9} />
                  </span>
                  <span className={styles.metricLabel}>{stat.label}</span>
                </div>
                <strong className={styles.metricValue}>{stat.value}</strong>
                <p className={styles.metricDetail}>{stat.detail}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
