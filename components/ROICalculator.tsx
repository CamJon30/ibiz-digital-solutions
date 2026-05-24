'use client'
import { useState, useCallback } from 'react'
import styles from './ROICalculator.module.css'

interface Inputs {
  hourlyRate: string
  hoursPerWeek: string
  employees: string
  buildCost: string
  monthlyCost: string
  timeSavings: number
}

const emptyInputs: Inputs = {
  hourlyRate: '',
  hoursPerWeek: '',
  employees: '',
  buildCost: '',
  monthlyCost: '',
  timeSavings: 50,
}

type Rating = 'green' | 'yellow' | 'red'

interface Results {
  grossMonthlySavings: number
  netMonthlySavings: number
  breakEvenMonths: number | null
  roi12Month: number
  net12: number
  rating: Rating
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function formatPercent(n: number) {
  return `${n > 0 ? '+' : ''}${n.toFixed(0)}%`
}

function compute(inputs: Inputs): Results | null {
  const hr = parseFloat(inputs.hourlyRate)
  const hpw = parseFloat(inputs.hoursPerWeek)
  const emp = parseFloat(inputs.employees)
  const build = parseFloat(inputs.buildCost)
  const monthly = parseFloat(inputs.monthlyCost)
  const savings = inputs.timeSavings

  // Only calculate if all required fields have valid numbers
  if (isNaN(hr) || isNaN(hpw) || isNaN(emp) || isNaN(build) || isNaN(monthly)) return null
  if (hr <= 0 || hpw <= 0 || emp <= 0) return null

  const weeklyHoursSaved = (hpw * savings) / 100
  const monthlyHoursSaved = weeklyHoursSaved * 4.33 * emp
  const grossMonthlySavings = monthlyHoursSaved * hr
  const netMonthlySavings = grossMonthlySavings - monthly

  let breakEvenMonths: number | null = null
  if (netMonthlySavings > 0 && build > 0) breakEvenMonths = build / netMonthlySavings

  const gross12 = grossMonthlySavings * 12
  const totalCost12 = build + monthly * 12
  const net12 = gross12 - totalCost12
  const roi12Month = totalCost12 > 0 ? (net12 / totalCost12) * 100 : 0

  let rating: Rating = 'red'
  if (breakEvenMonths !== null && breakEvenMonths <= 6) rating = 'green'
  else if (breakEvenMonths !== null && breakEvenMonths <= 12) rating = 'yellow'

  return { grossMonthlySavings, netMonthlySavings, breakEvenMonths, roi12Month, net12, rating }
}

const ratingConfig = {
  green: {
    label: 'Strong ROI',
    sublabel: 'Breaks even under 6 months',
    color: '#34c759',
    bg: 'rgba(52,199,89,0.08)',
    border: 'rgba(52,199,89,0.25)',
    icon: '🟢',
    body: 'Your numbers show a compelling case for AI investment. This task is a strong candidate for automation — the savings justify the build cost quickly and compound over time.',
  },
  yellow: {
    label: 'Moderate ROI',
    sublabel: 'Breaks even in 6–12 months',
    color: '#ffd60a',
    bg: 'rgba(255,214,10,0.08)',
    border: 'rgba(255,214,10,0.25)',
    icon: '🟡',
    body: 'The investment is viable but worth optimizing. Consider reducing build cost with a phased approach, or identifying additional tasks that could be automated in the same engagement.',
  },
  red: {
    label: 'Needs Review',
    sublabel: "Doesn't break even within 12 months",
    color: '#ff6b6b',
    bg: 'rgba(255,107,107,0.08)',
    border: 'rgba(255,107,107,0.25)',
    icon: '🔴',
    body: "The numbers need adjustment before this investment makes sense. Try increasing the time savings percentage, reducing build cost, or identifying higher-value tasks to automate.",
  },
}

export default function ROICalculator() {
  const [inputs, setInputs] = useState<Inputs>(emptyInputs)

  const results = compute(inputs)

  const handleChange = (key: keyof Inputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [key]: value }))
  }

  const handleCTA = useCallback(() => {
    if (!results) return
    const r = ratingConfig[results.rating]
    const summary = `AI ROI Calculator Results:
• Rating: ${r.label}
• Hourly rate: ${formatCurrency(parseFloat(inputs.hourlyRate))} | Hours/week: ${inputs.hoursPerWeek} | Employees: ${inputs.employees}
• AI build cost: ${formatCurrency(parseFloat(inputs.buildCost))} | Monthly cost: ${formatCurrency(parseFloat(inputs.monthlyCost))} | Time savings: ${inputs.timeSavings}%
• Net monthly savings: ${formatCurrency(results.netMonthlySavings)}
• Break-even: ${results.breakEvenMonths === null ? 'Does not break even' : results.breakEvenMonths < 1 ? 'Under 1 month' : `${results.breakEvenMonths.toFixed(1)} months`}
• 12-month ROI: ${formatPercent(results.roi12Month)}
• Net 12-month result: ${formatCurrency(results.net12)}`

    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('roi-results', { detail: summary }))
      }, 600)
    }
  }, [inputs, results])

  const hasResults = results !== null

  return (
    <section id="roi-calculator" className={styles.section}>
      <div className={styles.inner}>
        <div className={`${styles.header} fade-in`}>
          <div className="section-label">Free Tool</div>
          <h2 className="section-title">AI ROI Calculator</h2>
          <p className="section-sub">
            Find out in 60 seconds whether an AI investment makes financial sense for your organization — before you spend a dollar.
          </p>
        </div>

        <div className={styles.calculator}>
          {/* INPUTS */}
          <div className={styles.inputs}>
            <div className={styles.inputsHeader}>
              <span className={styles.inputsLabel}>Your Numbers</span>
              <button className={styles.resetBtn} onClick={() => setInputs(emptyInputs)}>Clear</button>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.groupLabel}>Current Task Cost</div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Hourly rate per employee ($)</label>
                <div className={styles.inputWrap}>
                  <span className={styles.prefix}>$</span>
                  <input type="number" className={styles.input} value={inputs.hourlyRate} onChange={e => handleChange('hourlyRate', e.target.value)} placeholder="e.g. 75" min="0" />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Hours per week on this task</label>
                <div className={styles.inputWrap}>
                  <input type="number" className={styles.input} value={inputs.hoursPerWeek} onChange={e => handleChange('hoursPerWeek', e.target.value)} placeholder="e.g. 20" min="0" />
                  <span className={styles.suffix}>hrs</span>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Number of employees doing it</label>
                <div className={styles.inputWrap}>
                  <input type="number" className={styles.input} value={inputs.employees} onChange={e => handleChange('employees', e.target.value)} placeholder="e.g. 3" min="1" />
                  <span className={styles.suffix}>people</span>
                </div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.groupLabel}>AI Investment</div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>One-time build cost ($)</label>
                <div className={styles.inputWrap}>
                  <span className={styles.prefix}>$</span>
                  <input type="number" className={styles.input} value={inputs.buildCost} onChange={e => handleChange('buildCost', e.target.value)} placeholder="e.g. 15,000" min="0" />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Monthly AI running cost ($)</label>
                <div className={styles.inputWrap}>
                  <span className={styles.prefix}>$</span>
                  <input type="number" className={styles.input} value={inputs.monthlyCost} onChange={e => handleChange('monthlyCost', e.target.value)} placeholder="e.g. 500" min="0" />
                </div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.groupLabel}>Expected Impact</div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>
                  Time savings from AI
                  <span className={styles.sliderValue}>{inputs.timeSavings}%</span>
                </label>
                <input
                  type="range"
                  className={styles.slider}
                  value={inputs.timeSavings}
                  onChange={e => handleChange('timeSavings', parseInt(e.target.value))}
                  min="5" max="95" step="5"
                />
                <div className={styles.sliderLabels}><span>5%</span><span>50%</span><span>95%</span></div>
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className={styles.results}>
            <div className={styles.resultsHeader}>
              <span className={styles.inputsLabel}>Your Results</span>
              {hasResults && results.rating && (
                <div
                  className={styles.ratingBadge}
                  style={{ background: ratingConfig[results.rating].bg, border: `1px solid ${ratingConfig[results.rating].border}`, color: ratingConfig[results.rating].color }}
                >
                  {ratingConfig[results.rating].icon} {ratingConfig[results.rating].label}
                </div>
              )}
            </div>

            {!hasResults ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📊</div>
                <h3 className={styles.emptyTitle}>Determine Your ROI</h3>
                <p className={styles.emptyText}>
                  Enter your numbers on the left to see your monthly savings, break-even timeline, and 12-month ROI projection.
                </p>
                <div className={styles.emptyHints}>
                  <div className={styles.emptyHint}><span className={styles.emptyHintDot} style={{ background: '#34c759' }} />Break-even under 6 months = Strong ROI</div>
                  <div className={styles.emptyHint}><span className={styles.emptyHintDot} style={{ background: '#ffd60a' }} />Break-even 6–12 months = Moderate ROI</div>
                  <div className={styles.emptyHint}><span className={styles.emptyHintDot} style={{ background: '#ff6b6b' }} />Beyond 12 months = Needs Review</div>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.metricsGrid}>
                  <div className={styles.metric}>
                    <div className={styles.metricValue} style={{ color: results.netMonthlySavings >= 0 ? '#34c759' : '#ff6b6b' }}>
                      {formatCurrency(results.netMonthlySavings)}
                    </div>
                    <div className={styles.metricLabel}>Net Monthly Savings</div>
                    <div className={styles.metricSub}>After AI running costs</div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.metricValue}>
                      {results.breakEvenMonths === null ? '∞' : results.breakEvenMonths < 1 ? '< 1 mo' : `${results.breakEvenMonths.toFixed(1)} mo`}
                    </div>
                    <div className={styles.metricLabel}>Break-Even Point</div>
                    <div className={styles.metricSub}>Months to recover build cost</div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.metricValue} style={{ color: results.roi12Month >= 0 ? '#34c759' : '#ff6b6b' }}>
                      {formatPercent(results.roi12Month)}
                    </div>
                    <div className={styles.metricLabel}>12-Month ROI</div>
                    <div className={styles.metricSub}>Return on total investment</div>
                  </div>
                </div>

                <div className={styles.ratingBlock} style={{ background: ratingConfig[results.rating].bg, borderColor: ratingConfig[results.rating].border }}>
                  <div className={styles.ratingBlockTitle} style={{ color: ratingConfig[results.rating].color }}>
                    {ratingConfig[results.rating].icon} {ratingConfig[results.rating].label}
                  </div>
                  <div className={styles.ratingBlockDesc}>{ratingConfig[results.rating].sublabel}</div>
                  <p className={styles.ratingBlockText}>{ratingConfig[results.rating].body}</p>
                </div>

                <div className={styles.breakdownTable}>
                  <div className={styles.breakdownTitle}>12-Month Breakdown</div>
                  <div className={styles.breakdownRow}>
                    <span>Gross savings (12mo)</span>
                    <span className={styles.positive}>{formatCurrency(results.grossMonthlySavings * 12)}</span>
                  </div>
                  <div className={styles.breakdownRow}>
                    <span>Running costs (12mo)</span>
                    <span className={styles.negative}>-{formatCurrency(parseFloat(inputs.monthlyCost) * 12)}</span>
                  </div>
                  <div className={styles.breakdownRow}>
                    <span>Build cost (one-time)</span>
                    <span className={styles.negative}>-{formatCurrency(parseFloat(inputs.buildCost))}</span>
                  </div>
                  <div className={`${styles.breakdownRow} ${styles.breakdownTotal}`}>
                    <span>Net 12-month result</span>
                    <span style={{ color: results.net12 >= 0 ? '#34c759' : '#ff6b6b' }}>{formatCurrency(results.net12)}</span>
                  </div>
                </div>

                <button onClick={handleCTA} className={styles.cta}>
                  Get a Free AI Readiness Review →
                </button>
                <p className={styles.ctaSub}>
                  Share your results with our team and we'll validate the numbers against your actual workflows — no obligation.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
