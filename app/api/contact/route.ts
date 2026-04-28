import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'


export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.resend_email_key)
  try {
    const { name, organization, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'IBIZ Contact Form <noreply@ibizdigitalsolutions.com>',
      to: ['cameron@ibizdigitalsolutions.com'],
      replyTo: email,
      subject: `New Inquiry from ${name}${organization ? ` — ${organization}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 32px; border-radius: 8px;">
          <div style="background: #0066ff; padding: 24px 32px; border-radius: 8px 8px 0 0; margin: -32px -32px 32px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">New Inquiry — IBIZ Digital Solutions</h1>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; width: 140px;">
                <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Name</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                <span style="color: #111827; font-size: 15px;">${name}</span>
              </td>
            </tr>
            ${organization ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Organization</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                <span style="color: #111827; font-size: 15px;">${organization}</span>
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                <a href="mailto:${email}" style="color: #0066ff; font-size: 15px;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; vertical-align: top;">
                <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</strong>
              </td>
              <td style="padding: 12px 0;">
                <p style="color: #111827; font-size: 15px; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br/>')}</p>
              </td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding: 16px; background: #eff6ff; border-radius: 6px; border-left: 4px solid #0066ff;">
            <p style="margin: 0; color: #1d4ed8; font-size: 13px;">
              💡 Reply directly to this email to respond to ${name} at ${email}
            </p>
          </div>

          <p style="margin-top: 24px; color: #9ca3af; font-size: 12px; text-align: center;">
            Sent via ibizdigitalsolutions.com contact form
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
