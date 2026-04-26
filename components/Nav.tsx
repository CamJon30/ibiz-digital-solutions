'use client'
import styles from './Nav.module.css'

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <a href="#" className={styles.logo}>
        <div className={styles.logoMark}>IB</div>
        <span className={styles.logoText}>IBIZ Digital Solutions</span>
      </a>
      <ul className={styles.links}>
        <li><a href="#trifecta">Services</a></li>
        <li><a href="#serve">Who We Serve</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#capability">Contracting</a></li>
        <li><a href="#blog">Insights</a></li>
        <li><a href="#assessment" className={styles.cta}>Request an Assessment</a></li>
      </ul>
    </nav>
  )
}
