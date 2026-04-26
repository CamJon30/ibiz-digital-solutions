import styles from './Blog.module.css'

export default function Blog() {
  return (
    <section id="blog" className={styles.section}>
      <div className={styles.inner}>
        <div className={`${styles.header} fade-in`}>
          <div><div className="section-label">Insights</div><h2 className="section-title">Thought Leadership</h2></div>
          <a href="#" className="btn-secondary">View All →</a>
        </div>
        <div className={`${styles.comingSoon} fade-in`}>
          <strong>Content Coming Soon</strong>
          Practitioner perspectives on AI adoption, CMMC compliance, and digital transformation — from someone actually doing the work. Subscribe to be notified when we publish.
          <br /><br />
          <a href="#contact" className="btn-primary">Stay in the Loop</a>
        </div>
      </div>
    </section>
  )
}
