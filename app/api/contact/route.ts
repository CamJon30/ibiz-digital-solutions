import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

function parseROIData(raw: string) {
  const get = (key: string) => {
    const match = raw.match(new RegExp(`${key}:\\s*([^\\n]+)`))
    return match ? match[1].trim() : null
  }
  return {
    rating: get('• Rating'),
    hourlyRate: get('• Hourly rate')?.split('|')[0]?.replace('Hourly rate:', '').trim(),
    hoursPerWeek: get('• Hourly rate')?.split('|')[1]?.replace('Hours/week:', '').trim(),
    employees: get('• Hourly rate')?.split('|')[2]?.replace('Employees:', '').trim(),
    buildCost: get('• AI build cost')?.split('|')[0]?.replace('AI build cost:', '').trim(),
    monthlyCost: get('• AI build cost')?.split('|')[1]?.replace('Monthly cost:', '').trim(),
    timeSavings: get('• AI build cost')?.split('|')[2]?.replace('Time savings:', '').trim(),
    netMonthly: get('• Net monthly savings'),
    breakeven: get('• Break-even'),
    roi12: get('• 12-month ROI'),
    net12: get('• Net 12-month result'),
  }
}

function getRatingColor(rating: string | null) {
  if (!rating) return '#6b7280'
  if (rating.includes('Strong')) return '#16a34a'
  if (rating.includes('Moderate')) return '#d97706'
  return '#dc2626'
}

function getRatingEmoji(rating: string | null) {
  if (!rating) return '📊'
  if (rating.includes('Strong')) return '🟢'
  if (rating.includes('Moderate')) return '🟡'
  return '🔴'
}

function buildAnalysis(d: ReturnType<typeof parseROIData>) {
  if (d.rating?.includes('Strong')) {
    return `This prospect's numbers show a compelling case for AI investment. At ${d.hourlyRate}/hr with ${d.employees} employee(s) spending ${d.hoursPerWeek} hrs/week on this task, there is significant labor cost being spent on work AI could automate. The investment pays for itself at ${d.breakeven} and returns ${d.net12} over 12 months. This is a strong candidate for a full engagement.`
  }
  if (d.rating?.includes('Moderate')) {
    return `This prospect has a viable but not exceptional case for AI investment. The numbers work, but there may be room to improve the ROI by reducing build scope or identifying additional tasks to automate in the same engagement. Break-even at ${d.breakeven} is reasonable — worth a conversation to explore optimization.`
  }
  return `This prospect's current numbers don't produce a strong ROI within 12 months. This could mean the task hourly rate is low, the time savings estimate is conservative, or the build cost is high relative to the savings. In the consultation, explore whether there are higher-value tasks to target, or whether a phased lower-cost approach could improve the economics.`
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.resend_email_key)

  try {
    const { name, organization, email, message, roiData } = await req.json()

    if (!name || !email || (!message && !roiData)) {
      return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 })
    }

    const hasROI = !!roiData
    const d = hasROI ? parseROIData(roiData) : null
    const ratingColor = getRatingColor(d?.rating ?? null)
    const ratingEmoji = getRatingEmoji(d?.rating ?? null)
    const analysis = d ? buildAnalysis(d) : null

    const roiSection = hasROI && d ? `
      <div style="margin-top:24px;border-top:2px solid #e5e7eb;padding-top:24px;">
        <h2 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 16px;">
          ${ratingEmoji} ROI Calculator Results
        </h2>

        <div style="display:inline-block;background:${ratingColor}18;border:1px solid ${ratingColor}40;border-radius:100px;padding:4px 14px;margin-bottom:20px;">
          <span style="font-size:13px;font-weight:700;color:${ratingColor};">${d.rating}</span>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr style="background:#f9fafb;">
            <td colspan="2" style="padding:8px 12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">Inputs</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;width:50%;">Hourly rate</td>
            <td style="padding:8px 12px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #f3f4f6;">${d.hourlyRate}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;">Hours per week</td>
            <td style="padding:8px 12px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #f3f4f6;">${d.hoursPerWeek}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;">Employees</td>
            <td style="padding:8px 12px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #f3f4f6;">${d.employees}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;">AI build cost</td>
            <td style="padding:8px 12px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #f3f4f6;">${d.buildCost}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;">Monthly AI cost</td>
            <td style="padding:8px 12px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #f3f4f6;">${d.monthlyCost}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#6b7280;">Time savings</td>
            <td style="padding:8px 12px;font-size:13px;color:#111827;font-weight:500;">${d.timeSavings}</td>
          </tr>
        </table>

        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr style="background:#f9fafb;">
            <td colspan="2" style="padding:8px 12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">Results</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;width:50%;">Net monthly savings</td>
            <td style="padding:8px 12px;font-size:14px;color:#16a34a;font-weight:700;border-bottom:1px solid #f3f4f6;">${d.netMonthly}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;">Break-even</td>
            <td style="padding:8px 12px;font-size:14px;color:#111827;font-weight:700;border-bottom:1px solid #f3f4f6;">${d.breakeven}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;">12-month ROI</td>
            <td style="padding:8px 12px;font-size:14px;color:${ratingColor};font-weight:700;border-bottom:1px solid #f3f4f6;">${d.roi12}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#6b7280;">Net 12-month result</td>
            <td style="padding:8px 12px;font-size:14px;color:${ratingColor};font-weight:700;">${d.net12}</td>
          </tr>
        </table>

        <div style="background:#f0f9ff;border-left:4px solid #0066ff;border-radius:0 8px 8px 0;padding:16px 20px;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#0066ff;">Your Analysis</p>
          <p style="margin:0;font-size:14px;color:#1e3a5f;line-height:1.7;">${analysis}</p>
        </div>
      </div>` : ''

    const messageSection = message ? `
      <tr>
        <td style="padding:12px 0;vertical-align:top;">
          <strong style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">
            ${hasROI ? 'Additional Notes' : 'Message'}
          </strong>
        </td>
        <td style="padding:12px 0;">
          <p style="color:#111827;font-size:15px;line-height:1.7;margin:0;">${message.replace(/\n/g, '<br/>')}</p>
        </td>
      </tr>` : ''

    const { data, error } = await resend.emails.send({
      from: 'IBIZ Contact Form <noreply@ibizdigitalsolutions.com>',
      to: ['cameron@ibizdigitalsolutions.com'],
      replyTo: email,
      subject: hasROI
        ? `ROI Inquiry — ${d?.rating} — ${name}${organization ? ` (${organization})` : ''}`
        : `New Inquiry from ${name}${organization ? ` — ${organization}` : ''}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#f9f9f9;padding:32px;border-radius:8px;">
          <div style="background:#0066ff;padding:24px 32px;border-radius:8px 8px 0 0;margin:-32px -32px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">
              ${hasROI ? 'ROI Calculator Inquiry' : 'New Inquiry'} — IBIZ Digital Solutions
            </h1>
          </div>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;width:140px;">
                <strong style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Name</strong>
              </td>
              <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                <span style="color:#111827;font-size:15px;">${name}</span>
              </td>
            </tr>
            ${organization ? `
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                <strong style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Organization</strong>
              </td>
              <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                <span style="color:#111827;font-size:15px;">${organization}</span>
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding:12px 0;border-bottom:${message ? '1px solid #e5e7eb' : 'none'};">
                <strong style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Email</strong>
              </td>
              <td style="padding:12px 0;border-bottom:${message ? '1px solid #e5e7eb' : 'none'};">
                <a href="mailto:${email}" style="color:#0066ff;font-size:15px;">${email}</a>
              </td>
            </tr>
            ${messageSection}
          </table>

          ${roiSection}

          <div style="margin-top:24px;padding:16px;background:#eff6ff;border-radius:6px;border-left:4px solid #0066ff;">
            <p style="margin:0;color:#1d4ed8;font-size:13px;">
              💡 Reply directly to this email to respond to ${name} at ${email}
            </p>
          </div>

          <p style="margin-top:24px;color:#9ca3af;font-size:12px;text-align:center;">
            Sent via ibizdigitalsolutions.com ${hasROI ? 'ROI Calculator' : 'contact form'}
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 })

  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
