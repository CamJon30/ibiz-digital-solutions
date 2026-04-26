import styles from './Footer.module.css'

const links = [
  { label: 'Services', href: '#trifecta' },
  { label: 'About', href: '#about' },
  { label: 'Contracting', href: '#capability' },
  { label: 'Insights', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <a href="#" className={styles.logo}>
          <div className={styles.logoMark}>IB</div>
          <span className={styles.logoText}>IBIZ Digital Solutions, LLC</span>
        </a>
        <span className={styles.copy}>© 2026 All rights reserved.</span>
      </div>
      <nav className={styles.links}>{links.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}</nav>
    </footer>
  )
}
