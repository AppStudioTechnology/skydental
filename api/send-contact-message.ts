/**
 * Serverless API: send general inquiry (contact form) to clinic.
 * Uses same RESEND_API_KEY and FROM_EMAIL as send-booking.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.FROM_EMAIL || 'Sky Dental <smile@skydc.ae>'
const CONTACT_INQUIRIES_EMAIL = process.env.CONTACT_INQUIRIES_EMAIL || 'smile@skydc.ae'

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

  const { fullName, emailAddress, phoneNumber, subject, message } = req.body as {
    fullName: string
    emailAddress: string
    phoneNumber?: string
    subject: string
    message: string
  }

  if (!fullName?.trim() || !emailAddress?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Missing required fields: full name, email, subject, message' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY not configured' })
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [CONTACT_INQUIRIES_EMAIL],
      replyTo: [emailAddress.trim()],
      subject: `Contact: ${subject.trim().slice(0, 60)}${subject.trim().length > 60 ? '…' : ''}`,
      html: `
        <p><strong>New message from the website contact form</strong></p>
        <p><strong>Name:</strong> ${fullName.trim()}</p>
        <p><strong>Email:</strong> ${emailAddress.trim()}</p>
        ${phoneNumber?.trim() ? `<p><strong>Phone:</strong> ${phoneNumber.trim()}</p>` : ''}
        <p><strong>Subject:</strong> ${subject.trim()}</p>
        <p><strong>Message:</strong></p>
        <p>${message.trim().replace(/\n/g, '<br>')}</p>
      `
    })

    if (result.error) {
      console.error('Resend contact message error:', result.error)
      return res.status(500).json({
        error: 'Failed to send message',
        message: (result.error as { message?: string })?.message || 'Email service error',
        details: result.error
      })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Send contact message error:', err)
    return res.status(500).json({
      error: 'Failed to send message',
      message: err instanceof Error ? err.message : 'Unknown error'
    })
  }
}
