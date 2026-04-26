'use client'
import styles from './Assessment.module.css'

const offers = [
  {
    id: 'cmmc',
    badge: '🔴 High Priority for DoD Contractors',
    badgeColor: 'red',
    label: 'Featured Service',
    title: 'CMMC Readiness Assessment',
    desc: 'If your organization works with the Department of Defense, CMMC compliance is no longer optional. Enforcement deadlines are approaching and delays in preparation can directly impact your contract eligibility.',
    deliverables: [
      'Identify compliance gaps against all CMMC requirements',
      'Map current security controls to NIST SP 800-171',
      'Provide a prioritized, actionable remediation roadmap',
      'Reduce risk of contract loss, delays, or audit failure',
      'Delivered as a clear written report — no jargon',
    ],
    cta: 'Request CMMC Assessment →',
    cardLabel: 'Why Act Now',
    urgencyItems: [
      { icon: '⚠️', title: 'Enforcement Deadlines Are Real', desc: 'CMMC requirements are being phased into DoD contracts now. Organizations without a compliance plan risk losing bids.' },
      { icon: '📋', title: 'Early Preparation Saves Money', desc: 'Gap assessments done early cost a fraction of emergency remediation. Know your posture before the auditors do.' },
      { icon: '🏆', title: 'Compliance = Competitive Advantage', desc: "Contractors with CMMC readiness win more bids. It's not just a requirement — it's a differentiator." },
    ],
  },
  {
    id: 'ai',
    badge: '🟢 Available Now — Post-GAIL',
    badgeColor: 'green',
    label: 'Starter Engagement',
    title: 'AI Readiness Snapshot',
    desc: 'Not sure where AI fits in your operations — or whether your team is ready to adopt it responsibly? The AI Readiness Snapshot gives you a clear-eyed view of your current state in 2 weeks, with a concrete path forward.',
    deliverables: [
      'Assess current AI tool usage and readiness across your org',
      'Identify high-value use cases aligned to your operations',
      'Flag risks: data exposure, governance gaps, policy needs',
      'Deliver a prioritized AI adoption roadmap',
      'Practical, jargon-free report your team can act on immediately',
    ],
    cta: 'Request AI Readiness Snapshot →',
    cardLabel: 'Who This Is For',
    urgencyItems: [
      { icon: '🤖', title: 'AI Adoption Is Accelerating', desc: "Your competitors are already exploring AI. The question isn't whether to adopt it — it's whether you do it safely." },
      { icon: '⚡', title: 'Fast Turnaround', desc: 'Delivered in 2 weeks. No lengthy contracts, no bloated scope. A focused snapshot with immediate value.' },
      { icon: '🎯', title: 'Entry Point to Bigger Work', desc: 'The Snapshot is designed to identify where deeper AI strategy, governance, or modernization work will move the needle most.' },
    ],
  },
]

export default function Assessment() {
  return (
    <section id="assessment" className={styles.section}>
      <div className={styles.inner}>
        <div className={`${styles.header} fade-in`}>
          <div className="section-label">Starter Engagements</div>
          <h2 className="section-title">Two Ways to Get Started</h2>
          <p className="section-sub">Clear scope. Clear deliverable. Clear price. No bloated consulting engagements — just focused work that moves you forward.</p>
        </div>
        {offers.map((offer, i) => (
          <div key={offer.id} className={`${styles.offerBlock} ${i % 2 === 1 ? styles.reverse : ''} fade-in`}>
            <div className={styles.left}>
              <div className={`${styles.badge} ${styles[offer.badgeColor]}`}>{offer.badge}</div>
              <div className="section-label">{offer.label}</div>
              <h3 className={styles.title}>{offer.title}</h3>
              <p className={styles.desc}>{offer.desc}</p>
              <ul className={styles.list}>
                {offer.deliverables.map((d) => (
                  <li key={d} className={styles.listItem}>
                    <span className={styles.check}>✓</span>{d}
                  </li>
                ))}
              </ul>
              <div className={styles.actions}>
                <a href="#contact" className="btn-primary">{offer.cta}</a>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.card}>
                <div className={styles.cardLabel}>{offer.cardLabel}</div>
                {offer.urgencyItems.map((u) => (
                  <div key={u.title} className={styles.urgencyItem}>
                    <div className={styles.urgencyIcon}>{u.icon}</div>
                    <div>
                      <div className={styles.urgencyTitle}>{u.title}</div>
                      <div className={styles.urgencyDesc}>{u.desc}</div>
                    </div>
                  </div>
                ))}
                <a href="#contact" className={styles.cardCta}>{offer.cta}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
