import styles from './About.module.css'

const certs = [
  { color: 'gold',   status: 'Completed ✓',        label: 'Google Cloud GAIL Certification' },
  { color: 'blue',   status: 'Coming Q2 2026',     label: 'CompTIA SecAI+' },
  { color: 'purple',   status: 'Coming Q3 2026',     label: 'CompTIA Security+ (SY0-701)' },
  { color: 'purple',   status: 'Coming Q3 2026',     label: 'CMMC Registered Practitioner' },
  { color: 'gold', status: 'Completed ✓',        label: 'Certified Blockchain Expert' },
  { color: 'gold', status: 'Completed ✓',        label: 'B.S. Computer Engineering, NC A&T' },
]

const credItems = [
  { icon: '⚡', text: 'Enterprise Salesforce implementations — Commerce Cloud, OMS & Revenue Cloud' },
  { icon: '📦', text: 'Order Management & Billing system modernization at scale' },
  { icon: '🌐', text: 'Global business process optimization across cross-functional teams' },
  { icon: '🎯', text: 'Cross-functional product ownership & delivery leadership' },
  { icon: '🛡️', text: 'Embedded software engineering — U.S. Navy submarine programs' },
  { icon: '🤖', text: 'AI automation & agentic workflow design across industries' },
]

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={`${styles.visual} fade-in`}>
          <div className={styles.card}>
            <div className={styles.initials}>CJ</div>
            <div className={styles.name}>Cameron Jones</div>
            <div className={styles.titleLabel}>Founder · IBIZ Digital Solutions, LLC</div>
            <div className={styles.divider} />
            <div className={styles.roadmapLabel}>Credential Roadmap</div>
            <div className={styles.certList}>
              {certs.map((c) => (
                <div key={c.label} className={styles.cert}>
                  <span className={`${styles.dot} ${styles[c.color]}`} />
                  <div className={styles.certInfo}>
                    <span className={styles.certLabel}>{c.label}</span>
                    <span className={`${styles.certStatus} ${c.status.includes('✓') ? styles.done : c.status.includes('Progress') ? styles.active : styles.upcoming}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fade-in">
          <div className="section-label">About</div>
          <h2 className="section-title">Practitioner First. Consultant Second.</h2>
          <p className={styles.text}>
            IBIZ Digital Solutions, LLC was founded by <strong>Cameron Jones</strong>, a computer engineer with{' '}
            <strong>16+ years of experience</strong> spanning embedded software, enterprise IT consulting,
            Salesforce implementation, and product ownership.
          </p>
          <p className={styles.text}>
            Cameron has delivered technology solutions across defense, healthcare, financial services, and
            e-commerce — including leading Salesforce Commerce Cloud, OMS, and Revenue Cloud implementations at scale.
            That breadth of real-world delivery is what separates IBIZ from firms that only advise.
          </p>
          <div className={styles.credBlock}>
            <div className={styles.credBlockLabel}>Proven Enterprise Experience</div>
            <div className={styles.credGrid}>
              {credItems.map((c) => (
                <div key={c.text} className={styles.credItem}>
                  <span className={styles.credIcon}>{c.icon}</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.highlight}>
            "The firms that win the next decade won't be the ones that adopted AI fastest. They'll be the ones that adopted it most responsibly."
          </div>
        </div>
      </div>
    </section>
  )
}
