"use client";

import styles from "./ResultsSection.module.css";
import { useAppStore } from "@/store/store";

export function ResultsSection() {
  const resultsDraft = useAppStore((state) => state.cmsDrafts.homepageResults);

  return (
    <section className={`content-section ${styles.section}`} data-reveal>
      <div className="container">
        <div className={styles.shell}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{resultsDraft.eyebrow}</p>
            <h2 className={styles.heading}>
              {resultsDraft.heading[0]}
              <br />
              {resultsDraft.heading[1]}
            </h2>
            <p className={styles.copy}>{resultsDraft.description}</p>
          </div>

          <ol className={styles.list} data-reveal-group>
            {resultsDraft.outcomes.map((outcome) => (
              <li className={styles.row} key={outcome.number} data-reveal-item>
                <span className={styles.number}>{outcome.number}</span>
                <div className={styles.content}>
                  <h3 className={styles.title}>{outcome.title}</h3>
                  <p className={styles.description}>{outcome.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
