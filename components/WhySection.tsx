import styles from "./WhySection.module.css";

const benefits = [
  {
    number: "01",
    title: "Installs without downtime",
    description: "Roll out across vehicles and assets without disrupting operations.",
  },
  {
    number: "02",
    title: "Built for real conditions",
    description: "Handles vibration, heat, and continuous fleet usage.",
  },
  {
    number: "03",
    title: "Works with your stack",
    description: "Integrates with dispatch, compliance, and reporting systems.",
  },
  {
    number: "04",
    title: "Support that stays involved",
    description: "From deployment to scale, support teams stay hands-on.",
  },
];

export function WhySection() {
  return (
    <section className={`content-section ${styles.section}`} data-reveal>
      <div className="container">
        <div className={styles.shell}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Why Track Fleetio</p>
            <h2 className={styles.heading}>Built for Fleet Reality</h2>
            <p className={styles.copy}>
              Hardware systems fail when they meet real-world conditions. This one is designed to
              hold up from install to daily operation.
            </p>
            <p className={styles.transition}>From hardware to operations, every layer works together.</p>
          </div>

          <ol className={styles.list} data-reveal-group>
            {benefits.map((benefit) => (
              <li className={styles.row} key={benefit.number} data-reveal-item>
                <span className={styles.number}>{benefit.number}</span>
                <div className={styles.content}>
                  <h3 className={styles.title}>{benefit.title}</h3>
                  <p className={styles.description}>{benefit.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
