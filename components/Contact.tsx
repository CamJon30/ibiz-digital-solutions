'use client'
import { useState, useEffect } from 'react'
import styles from './Contact.module.css'

const details = [
  { icon: '📍', label: 'Location', value: 'Lawrenceville, Georgia' },
  { icon: '🏢', label: 'Registration', value: 'SAM.gov Registered · UEI: D3D1NUFGK994' },
  { icon: '⏱️', label: 'Response Time', value: 'Within one business day' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', organization: '', email: '', message: '' })
  const [roiData, setRoiData] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [fromCalculator, setFromCalculator] = useState(false)

  useEffect(() => {
    const handleROIResults = (e: CustomEvent) => {
      setRoiData(e.detail)
      setFromCalculator(true)
    }
    window.addEventListener('roi-results', handleROIResults as EventListener)
    return () => window.removeEventListener('roi-results', handleROIResults as EventListener)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, roiData }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', organization: '', email: '', message: '' })
        setRoiData(null)
        setFromCalculator(false)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className="fade-in">
          <div className="section-label">Contact</div>
          <h2 className="section-title">Request an Assessment or Book a Consultation</h2>
          <p className="section-sub">
            Whether you're a defense contractor navigating CMMC, an enterprise exploring AI governance, or a
            government agency looking for a reliable small business partner — take the first step today.
          </p>
          <div className={styles.details}>
            {details.map((d) => (
              <div key={d.label} className={styles.detail}>
                <div className={styles.detailIcon}>{d.icon}</div>
                <div>
                  <div className={styles.detailLabel}>{d.label}</div>
                  <div className={styles.detailValue}>{d.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.form} fade-in`}>
          {status === 'success' ? (
            <div className={styles.successBox}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>Message Sent!</h3>
              <p className={styles.successText}>
                Thanks for reaching out. Cameron will get back to you within one business day.
              </p>
              <button className={styles.resetBtn} onClick={() => setStatus('idle')}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {fromCalculator && (
                <div className={styles.calculatorBadge}>
                  <span className={styles.calculatorBadgeDot} />
                  Your ROI results have been attached to this message
                </div>
              )}
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className={styles.input} placeholder="Jane Smith" required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Organization</label>
                <input type="text" name="organization" value={form.organization} onChange={handleChange} className={styles.input} placeholder="Your company or agency" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className={styles.input} placeholder="jane@organization.com" required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  {fromCalculator ? 'Any additional notes?' : 'What are you working on? *'}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder={fromCalculator ? 'Add any context about your specific use case, timeline, or questions...' : 'Tell us about your challenge, project, or goal...'}
                  required={!fromCalculator}
                  rows={4}
                />
              </div>
              {status === 'error' && (
                <div className={styles.errorBox}>Something went wrong. Please try again or email directly.</div>
              )}
              <button type="submit" className={styles.submit} disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
