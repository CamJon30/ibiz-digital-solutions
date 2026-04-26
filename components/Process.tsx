import styles from './Process.module.css'

const steps = [
  { num: '01', title: 'Discovery', desc: 'We assess your current state across AI readiness, security posture, and operational maturity — identifying the gaps that matter most.' },
  { num: '02', title: 'Roadmap', desc: 'You receive a prioritized, plain-language action plan tied to your specific compliance requirements and business goals.' },
  { num: '03', title: 'Execute', desc: 'We work alongside your team to implement solutions, build documentation, and close gaps — without unnecessary complexity.' },
  { num: '04', title: 'Sustain', desc: 'Ongoing advisory support ensures your compliance posture and AI governance evolve as regulations and technology change.' },
]

export default function Process() {
  return (
    <section id="process" className={styles.section}>
      <div className={styles.inner}>
        <div className={`${styles.header} fade-in`}>
          <div><div className="section-label">How We Work</div><h2 className="section-title">A Process Built for Clarity</h2></div>
          <p className="section-sub" style={{ margin: 0 }}>No bloated engagements. No scope creep. We move fast, document everything, and deliver outcomes you can act on.</p>
        </div>
        <div className={`${styles.steps} fade-in`}>
          {steps.map((s) => (
            <div key={s.num} className={styles.step}>
              <div className={styles.stepNum}>{s.num}</div>
              <div className={styles.stepTitle}>{s.title}</div>
              <div className={styles.stepDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
