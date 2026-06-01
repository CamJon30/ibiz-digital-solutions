import styles from './Capability.module.css'

const contractInfo = [
  { label: 'UEI', value: 'D3D1NUFGK994' },
  { label: 'CAGE Code', value: '9YST6' },
  { label: 'Business Type', value: 'Small Business' },
  { label: 'SAM.gov Status', value: 'Active' },
]
const naics = ['541519','541512','541511','541611','518210','541990']
const downloads = [
  { icon: '📄', title: 'Technology & Consulting', sub: 'AI · Cybersecurity · Digital Modernization', href: '/IBIZ_Capability_Statement.pdf' },
  { icon: '📦', title: 'Government Supplier', sub: 'Office, Janitorial & Breakroom Supplies', href: 'https://docs.google.com/document/d/1nC_JNSneNYPza-OvdDdkJey4zsV7GWGYDqbypbK2IeQ/export?format=pdf&attachment=true' },
]

export default function Capability() {
  return (
    <section id="capability" className={styles.section}>
      <div className={styles.inner}>
        <div className="fade-in">
          <div className="section-label">Government Contracting</div>
          <h2 className="section-title">Registered. Verified. Ready to Work.</h2>
          <p className="section-sub">IBIZ Digital Solutions, LLC is an active SAM.gov registered small business positioned to support federal and state agencies across technology consulting and digital modernization.</p>
          <div className={styles.infoGrid}>{contractInfo.map((i) => <div key={i.label} className={styles.infoItem}><div className={styles.infoLabel}>{i.label}</div><div className={styles.infoValue}>{i.value}</div></div>)}</div>
          <div className={styles.naicsBlock}>
            <div className={styles.naicsLabel}>Primary NAICS — Technology &amp; Consulting</div>
            <div className={styles.naicsCodes}>{naics.map((c) => <span key={c} className={styles.naicsCode}>{c}</span>)}</div>
          </div>
        </div>
        <div className="fade-in">
          <div className="section-label">Resources</div>
          <h2 className="section-title">Download Our Capability Statements</h2>
          <p className="section-sub" style={{ marginBottom: 0 }}>Get the full picture of what IBIZ brings to your program or procurement.</p>
          <div className={styles.downloads}>
            {downloads.map((d) => (
              <a key={d.title} href={d.href} target="_blank" rel="noopener noreferrer" className={styles.downloadCard}>
                <div className={styles.downloadLeft}><div className={styles.downloadIcon}>{d.icon}</div><div><div className={styles.downloadTitle}>{d.title}</div><div className={styles.downloadSub}>{d.sub}</div></div></div>
                <div className={styles.downloadArrow}>↓</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
