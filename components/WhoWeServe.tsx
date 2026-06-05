import styles from './WhoWeServe.module.css'

const clients = [
  { icon: '🏛️', title: 'Defense Contractors & DIB Companies', desc: 'Organizations pursuing or maintaining CMMC certification who also need to understand how AI fits into their security posture and operational future.' },
  { icon: '🏥', title: 'Healthcare Organizations', desc: 'Healthcare systems navigating HIPAA, AI clinical tool adoption, and legacy infrastructure modernization — all three problems converging simultaneously.' },
  { icon: '🏦', title: 'Financial Services & Professional Firms', desc: "Mid-market firms that need SOC 2 alignment, AI governance policies, and operational automation but can't afford Big 4 pricing for straightforward problems." },
  { icon: '🏭', title: 'Manufacturing & Industrial', desc: 'Companies in the defense industrial base dealing with OT security requirements, AI-driven process improvements, and evolving compliance mandates.' },
]

const creds = [
  'SAM.gov Registered Small Business (UEI: D3D1NUFGK994)',
  'DoD Mentor-Protégé Program eligible',
  'Small Disadvantaged Business (SDB)',
 // 'Georgia Tech APEX Accelerator participant',
  'Google Cloud GAIL Certified',
  'CompTIA SecAI+ (In Progress)',
  'CompTIA Security+ (coming Q3 2026)',
  'CMMC Registered Practitioner (coming Q3 2026)',
]

export default function WhoWeServe() {
  return (
    <section id="serve" className={styles.section}>
      <div className={styles.inner}>
        <div className="fade-in">
          <div className="section-label">Who We Serve</div>
          <h2 className="section-title">Built for Organizations at the Intersection</h2>
          <div className={styles.list}>
            {clients.map((c) => (
              <div key={c.title} className={styles.item}>
                <div className={styles.itemIcon}>{c.icon}</div>
                <div>
                  <div className={styles.itemTitle}>{c.title}</div>
                  <div className={styles.itemDesc}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.right} fade-in`}>
          <div className="section-label">Our Differentiator</div>
          <h2 className="section-title">The Shovel Seller Advantage</h2>
          <div className={styles.callout}>
            <div className={styles.calloutLabel}>Why IBIZ</div>
            <div className={styles.calloutText}>"We don't chase the gold rush. We supply the tools to survive it."</div>
            <div className={styles.calloutSub}>While everyone else is racing to deploy AI, smart organizations are asking who helps them do it safely, securely, and in compliance with the regulations that are already here. That's exactly where IBIZ operates.</div>
            <div className={styles.creds}>{creds.map((c) => <div key={c} className={styles.cred}>{c}</div>)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
