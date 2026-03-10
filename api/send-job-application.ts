/**
 * Serverless API: send job application (name, email, CV file) to clinic.
 * Deploy with the rest of the app on Vercel. Uses same RESEND_API_KEY and FROM_EMAIL as send-booking.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.FROM_EMAIL || 'Sky Dental <onboarding@resend.dev>'
// Recipient for job applications (use aliaslam683@gmail.com for testing if Resend is in test mode)
const JOB_APPLICATIONS_EMAIL = process.env.JOB_APPLICATIONS_EMAIL || 'smile@skydc.ae'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, cvBase64, cvFilename } = req.body as {
    name: string
    email: string
    cvBase64: string
    cvFilename: string
  }

  if (!name?.trim() || !email?.trim() || !cvBase64) {
    return res.status(400).json({ error: 'Missing name, email, or CV file' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY not configured' })
  }

  const cvBuffer = Buffer.from(cvBase64, 'base64')
  const filename = cvFilename && /^[\w.-]+\.(pdf|doc|docx)$/i.test(cvFilename)
    ? cvFilename
    : `CV-${name.replace(/\s+/g, '-')}.pdf`

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [JOB_APPLICATIONS_EMAIL],
      subject: `Job Application – ${name}`,
      html: `
        <p><strong>New job application</strong></p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>CV is attached.</p>
      `,
      attachments: [{ filename, content: cvBuffer }]
    })

    if (result.error) {
      console.error('Resend job application error:', result.error)
      return res.status(500).json({
        error: 'Failed to send application',
        message: (result.error as { message?: string })?.message || 'Email service error',
        details: result.error
      })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Send job application error:', err)
    return res.status(500).json({
      error: 'Failed to send application',
      message: err instanceof Error ? err.message : 'Unknown error'
    })
  }
}
