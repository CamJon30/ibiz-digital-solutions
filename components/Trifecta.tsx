import styles from './Trifecta.module.css'

const services = [
  {
    num: '01', icon: '🤖',
    title: 'AI Strategy & Implementation',
    desc: 'We help organizations move from AI curiosity to AI capability. That means governance frameworks, responsible deployment roadmaps, agentic workflow design, and practical integration that delivers measurable results — not demos.',
    tags: ['AI Governance','Agentic Workflows','LLM Integration','AI Risk Management','NIST AI RMF'],
    cta: null,
  },
  {
    num: '02', icon: '🛡️',
    title: 'CMMC Readiness for DoD Contractors',
    desc: 'If your organization works with the Department of Defense, CMMC compliance is no longer optional. We deliver gap assessments, remediation roadmaps, policy documentation, and CMMC readiness support that prepares you for certification — and positions you to win more contracts.',
    tags: ['CMMC Advisory','Gap Assessments','Policy Documentation','NIST 800-171','Post-Quantum Readiness'],
    cta: { label: 'Start Your Assessment', href: '#assessment' },
  },
  {
    num: '03', icon: '⚡',
    title: 'Digital Modernization',
    desc: 'Legacy systems, manual processes, and disconnected data are the hidden tax on your operations. We analyze, architect, and guide modernization efforts that reduce friction, cut costs, and build the technical foundation AI and security need to function.',
    tags: ['Process Automation','Systems Architecture','Business Analysis','Cloud Migration','Digital Transformation'],
    cta: null,
  },
]

export default function Trifecta() {
  return (
    <section id="trifecta" className={styles.section}>
      <div className={`${styles.header} fade-in`}>
        <div className="section-label">Our Services</div>
        <h2 className="section-title">The Trifecta Advantage</h2>
        <p className="section-sub">Most firms pick one lane. We built a practice that covers all three — because your challenges don't stay in separate boxes.</p>
      </div>
      <div className={`${styles.grid} fade-in`}>
        {services.map((s) => (
          <div key={s.num} className={styles.card}>
            <div className={styles.cardNum}>{s.num}</div>
            <div className={styles.cardIcon}>{s.icon}</div>
            <h3 className={styles.cardTitle}>{s.title}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
            <div className={styles.tags}>{s.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
            {s.cta && <a href={s.cta.href} className={styles.cardCta}>{s.cta.label} →</a>}
          </div>
        ))}
      </div>
    </section>
  )
}
