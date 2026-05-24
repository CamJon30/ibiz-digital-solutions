'use client'
import { useState, useEffect } from 'react'
import styles from './ROICalculator.module.css'

const defaultInputs = {
  hourlyRate: 75,
  hoursPerWeek: 20,
  employees: 3,
  buildCost: 15000,
  monthlyCost: 500,
  timeSavings: 60,
}

type Rating = 'green' | 'yellow' | 'red' | null

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

export default function ROICalculator() {
  const [inputs, setInputs] = useState(defaultInputs)
  const [results, setResults] = useState<Results | null>(null)
  const [animated, setAnimated] = useState(false)

  const handleChange = (key: keyof typeof defaultInputs, value: string) => {
    const num = parseFloat(value) || 0
    setInputs(prev => ({ ...prev, [key]: num }))
  }

  useEffect(() => {
    const { hourlyRate, hoursPerWeek, employees, buildCost, monthlyCost, timeSavings } = inputs
    const weeklyHoursSaved = (hoursPerWeek * timeSavings) / 100
    const monthlyHoursSaved = weeklyHoursSaved * 4.33 * employees
    const grossMonthlySavings = monthlyHoursSaved * hourlyRate
    const netMonthlySavings = grossMonthlySavings - monthlyCost
    let breakEvenMonths: number | null = null
    if (netMonthlySavings > 0) breakEvenMonths = buildCost / netMonthlySavings
    const gross12 = grossMonthlySavings * 12
    const totalCost12 = buildCost + monthlyCost * 12
    const net12 = gross12 - totalCost12
    const roi12Month = totalCost12 > 0 ? (net12 / totalCost12) * 100 : 0
    let rating: Rating = 'red'
    if (breakEvenMonths !== null && breakEvenMonths <= 6) rating = 'green'
    else if (breakEvenMonths !== null && breakEvenMonths <= 12) rating = 'yellow'
    setResults({ grossMonthlySavings, netMonthlySavings, breakEvenMonths, roi12Month, net12, rating })
    setAnimated(false)
    setTimeout(() => setAnimated(true), 50)
  }, [inputs])

  const handleCTA = () => {
    if (!results) return
    const summary = buildSummary(inputs, results)
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
      // Pass results to contact form via custom event
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('roi-results', { detail: summary }))
      }, 600)
    }
  }

  const buildSummary = (inp: typeof defaultInputs, res: Results) => {
    const rating = res.rating === 'green' ? 'Strong ROI' : res.rating === 'yellow' ? 'Moderate ROI' : 'Needs Review'
    const breakeven = res.breakEvenMonths === null ? 'Does not break even' : res.breakEvenMonths < 1 ? 'Under 1 month' : `${res.breakEvenMonths.toFixed(1)} months`
    return `AI ROI Calculator Results:
• Rating: ${rating}
• Hourly rate: ${formatCurrency(inp.hourlyRate)} | Hours/week: ${inp.hoursPerWeek} | Employees: ${inp.employees}
• AI build cost: ${formatCurrency(inp.buildCost)} | Monthly cost: ${formatCurrency(inp.monthlyCost)} | Time savings: ${inp.timeSavings}%
• Net monthly savings: ${formatCurrency(res.netMonthlySavings)}
• Break-even: ${breakeven}
• 12-month ROI: ${formatPercent(res.roi12Month)}
• Net 12-month result: ${formatCurrency(res.net12)}`
  }

  const ratingConfig = {
    green: { label: 'Strong ROI', sublabel: 'Breaks even under 6 months', color: '#34c759', bg: 'rgba(52,199,89,0.08)', border: 'rgba(52,199,89,0.25)', icon: '🟢' },
    yellow: { label: 'Moderate ROI', sublabel: 'Breaks even in 6–12 months', color: '#ffd60a', bg: 'rgba(255,214,10,0.08)', border: 'rgba(255,214,10,0.25)', icon: '🟡' },
    red: { label: 'Needs Review', sublabel: "Doesn't break even within 12 months", color: '#ff6b6b', bg: 'rgba(255,107,107,0.08)', border: 'rgba(255,107,107,0.25)', icon: '🔴' },
  }

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
              <button className={styles.resetBtn} onClick={() => setInputs(defaultInputs)}>Reset</button>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.groupLabel}>Current Task Cost</div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Hourly rate per employee ($)</label>
                <div className={styles.inputWrap}>
                  <span className={styles.prefix}>$</span>
                  <input type="number" className={styles.input} value={inputs.hourlyRate} onChange={e => handleChange('hourlyRate', e.target.value)} min="0" />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Hours per week on this task</label>
                <div className={styles.inputWrap}>
                  <input type="number" className={styles.input} value={inputs.hoursPerWeek} onChange={e => handleChange('hoursPerWeek', e.target.value)} min="0" />
                  <span className={styles.suffix}>hrs</span>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Number of employees doing it</label>
                <div className={styles.inputWrap}>
                  <input type="number" className={styles.input} value={inputs.employees} onChange={e => handleChange('employees', e.target.value)} min="1" />
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
                  <input type="number" className={styles.input} value={inputs.buildCost} onChange={e => handleChange('buildCost', e.target.value)} min="0" />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Monthly AI running cost ($)</label>
                <div className={styles.inputWrap}>
                  <span className={styles.prefix}>$</span>
                  <input type="number" className={styles.input} value={inputs.monthlyCost} onChange={e => handleChange('monthlyCost', e.target.value)} min="0" />
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
                <input type="range" className={styles.slider} value={inputs.timeSavings} onChange={e => handleChange('timeSavings', e.target.value)} min="5" max="95" step="5" />
                <div className={styles.sliderLabels}><span>5%</span><span>50%</span><span>95%</span></div>
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className={styles.results}>
            <div className={styles.resultsHeader}>
              <span className={styles.inputsLabel}>Your Results</span>
              {results?.rating && (
                <div className={styles.ratingBadge} style={{ background: ratingConfig[results.rating].bg, border: `1px solid ${ratingConfig[results.rating].border}`, color: ratingConfig[results.rating].color }}>
                  {ratingConfig[results.rating].icon} {ratingConfig[results.rating].label}
                </div>
              )}
            </div>

            {results && (
              <>
                <div className={`${styles.metricsGrid} ${animated ? styles.visible : ''}`}>
                  <div className={styles.metric}>
                    <div className={styles.metricValue} style={{ color: results.netMonthlySavings >= 0 ? '#34c759' : '#ff6b6b' }}>{formatCurrency(results.netMonthlySavings)}</div>
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
                    <div className={styles.metricValue} style={{ color: results.roi12Month >= 0 ? '#34c759' : '#ff6b6b' }}>{formatPercent(results.roi12Month)}</div>
                    <div className={styles.metricLabel}>12-Month ROI</div>
                    <div className={styles.metricSub}>Return on total investment</div>
                  </div>
                </div>

                {results.rating && (
                  <div className={styles.ratingBlock} style={{ background: ratingConfig[results.rating].bg, borderColor: ratingConfig[results.rating].border }}>
                    <div className={styles.ratingBlockTitle} style={{ color: ratingConfig[results.rating].color }}>
                      {ratingConfig[results.rating].icon} {ratingConfig[results.rating].label}
                    </div>
                    <div className={styles.ratingBlockDesc}>{ratingConfig[results.rating].sublabel}</div>
                    {results.rating === 'green' && <p className={styles.ratingBlockText}>Your numbers show a compelling case for AI investment. This task is a strong candidate for automation — the savings justify the build cost quickly and compound over time.</p>}
                    {results.rating === 'yellow' && <p className={styles.ratingBlockText}>The investment is viable but worth optimizing. Consider reducing build cost with a phased approach, or identifying additional tasks that could be automated in the same engagement.</p>}
                    {results.rating === 'red' && <p className={styles.ratingBlockText}>The numbers need adjustment before this investment makes sense. Try increasing the time savings percentage, reducing build cost, or identifying higher-value tasks to automate.</p>}
                  </div>
                )}

                <div className={styles.breakdownTable}>
                  <div className={styles.breakdownTitle}>12-Month Breakdown</div>
                  <div className={styles.breakdownRow}>
                    <span>Gross savings (12mo)</span>
                    <span className={styles.positive}>{formatCurrency(results.grossMonthlySavings * 12)}</span>
                  </div>
                  <div className={styles.breakdownRow}>
                    <span>Running costs (12mo)</span>
                    <span className={styles.negative}>-{formatCurrency(inputs.monthlyCost * 12)}</span>
                  </div>
                  <div className={styles.breakdownRow}>
                    <span>Build cost (one-time)</span>
                    <span className={styles.negative}>-{formatCurrency(inputs.buildCost)}</span>
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
