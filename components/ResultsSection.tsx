import styles from "./ResultsSection.module.css";

const outcomes = [
  {
    number: "01",
    title: "Reduce incident blind spots",
    description:
      "Capture events, footage, and field context without relying on incomplete reports.",
  },
  {
    number: "02",
    title: "Protect high-value mobile assets",
    description:
      "Track trailers, cargo, and equipment across active operations with full visibility.",
  },
  {
    number: "03",
    title: "Improve driver accountability",
    description: "Review behavior with event-based footage and actionable context.",
  },
  {
    number: "04",
    title: "Respond faster in the field",
    description: "Turn alerts into decisions across safety, compliance, and operations.",
  },
];

export function ResultsSection() {
  return (
    <section className={`content-section ${styles.section}`} data-reveal>
      <div className="container">
        <div className={styles.shell}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Operational Outcomes</p>
            <h2 className={styles.heading}>
              Results that show up
              <br />
              in the field
            </h2>
            <p className={styles.copy}>
              From driver behavior to asset tracking, the system is designed to improve visibility,
              response time, and control across real-world fleet operations.
            </p>
          </div>

          <ol className={styles.list} data-reveal-group>
            {outcomes.map((outcome) => (
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
