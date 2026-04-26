import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.gridBg} />
      <div className={styles.glow} />
      <div className={styles.glow2} />
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          SAM.gov Registered · CAGE: 9YST6
        </div>
        <h1 className={styles.h1}>
          AI. Security.<br />
          <span className={styles.accent}>Digital Modernization.</span>
        </h1>
        <p className={styles.sub}>
          We help government contractors and regulated organizations eliminate manual processes, achieve CMMC
          compliance, and modernize operations using AI and secure systems — before compliance becomes a business blocker.
        </p>
        <div className={styles.urgency}>
          ⚠️ CMMC compliance is becoming a requirement for all DoD contractors. Early preparation reduces cost, risk, and disruption.
        </div>
        <div className={styles.actions}>
          <a href="#assessment" className="btn-primary">Request an Assessment</a>
          <a href="#trifecta" className="btn-secondary">Explore Our Services →</a>
        </div>
        <div className={styles.stats}>
          <div>
            <div className={styles.statNum}>16+</div>
            <div className={styles.statLabel}>Years of Experience</div>
          </div>
          <div>
            <div className={styles.statNum}>3-in-1</div>
            <div className={styles.statLabel}>Integrated Service Model</div>
          </div>
          <div>
            <div className={styles.statNum}>DoD</div>
            <div className={styles.statLabel}>Mentor-Protégé Eligible</div>
          </div>
        </div>
      </div>
    </section>
  )
}
