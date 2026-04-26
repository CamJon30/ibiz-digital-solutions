'use client'
import styles from './Contact.module.css'

const details = [
  { icon: '📍', label: 'Location', value: 'Lawrenceville, Georgia' },
  { icon: '🏢', label: 'Registration', value: 'SAM.gov Registered · UEI: D3D1NUFGK994' },
  { icon: '⏱️', label: 'Response Time', value: 'Within one business day' },
]

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className="fade-in">
          <div className="section-label">Contact</div>
          <h2 className="section-title">Request an Assessment or Book a Consultation</h2>
          <p className="section-sub">Whether you're a defense contractor navigating CMMC, an enterprise exploring AI governance, or a government agency looking for a reliable small business partner — take the first step today.</p>
          <div className={styles.details}>
            {details.map((d) => (
              <div key={d.label} className={styles.detail}>
                <div className={styles.detailIcon}>{d.icon}</div>
                <div><div className={styles.detailLabel}>{d.label}</div><div className={styles.detailValue}>{d.value}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.form} fade-in`}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formGroup}><label className={styles.label}>Full Name</label><input type="text" className={styles.input} placeholder="Jane Smith" /></div>
            <div className={styles.formGroup}><label className={styles.label}>Organization</label><input type="text" className={styles.input} placeholder="Your company or agency" /></div>
            <div className={styles.formGroup}><label className={styles.label}>Email Address</label><input type="email" className={styles.input} placeholder="jane@organization.com" /></div>
            <div className={styles.formGroup}><label className={styles.label}>What are you working on?</label><textarea className={`${styles.input} ${styles.textarea}`} placeholder="Tell us about your challenge, project, or goal..." /></div>
            <button type="submit" className={styles.submit}>Send Message →</button>
          </form>
        </div>
      </div>
    </section>
  )
}
