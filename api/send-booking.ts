/**
 * Serverless API: send booking confirmation PDF to user email and to clinic (smile@skydc.ae).
 *
 * Deploy as Vercel Serverless Function:
 *   - Put this file in /api/send-booking.ts (or .js) at project root.
 *   - Set env RESEND_API_KEY in Vercel dashboard (get key from https://resend.com).
 *   - Set VITE_BOOKING_API_URL in your app to your deployment URL, e.g. https://your-domain.vercel.app/api/send-booking
 *
 * Request body (JSON):
 *   { bookingId, booking: { fullName, email, ... }, pdfBase64, toUser?: string, toClinic: 'smile@skydc.ae' }
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const CLINIC_EMAIL = 'smile@skydc.ae'
const FROM_EMAIL = process.env.FROM_EMAIL || 'Sky Dental <onboarding@resend.dev>'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { bookingId, booking, pdfBase64, toUser, toClinic } = req.body as {
    bookingId: string
    booking: { fullName: string; email?: string; service: string; doctor: string; date: string; time: string }
    pdfBase64: string
    toUser?: string
    toClinic?: string
  }

  if (!bookingId || !booking || !pdfBase64) {
    return res.status(400).json({ error: 'Missing bookingId, booking, or pdfBase64' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY not configured' })
  }

  const pdfBuffer = Buffer.from(pdfBase64, 'base64')
  const filename = `Sky-Dental-Booking-${bookingId}.pdf`

  try {
    const toClinicEmail = toClinic || CLINIC_EMAIL

    // 1. Send PDF to clinic (smile@skydc.ae)
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [toClinicEmail],
      subject: `New appointment request – ${booking.fullName} – ${bookingId}`,
      html: `
        <p><strong>New appointment request</strong></p>
        <p>Booking ID: ${bookingId}</p>
        <p>Name: ${booking.fullName}</p>
        <p>Service: ${booking.service}</p>
        <p>Doctor: ${booking.doctor}</p>
        <p>Date: ${booking.date} | Time: ${booking.time}</p>
        <p>See attached PDF for full details.</p>
      `,
      attachments: [{ filename, content: pdfBuffer }]
    })

    // 2. Send copy to user if email provided
    if (toUser && booking.email) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [booking.email],
        subject: `Your appointment request – Sky Dental Center – ${bookingId}`,
        html: `
          <p>Dear ${booking.fullName},</p>
          <p>We have received your appointment request.</p>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Service:</strong> ${booking.service}</p>
          <p><strong>Doctor:</strong> ${booking.doctor}</p>
          <p><strong>Date:</strong> ${booking.date} | <strong>Time:</strong> ${booking.time}</p>
          <p>Please find your confirmation details in the attached PDF.</p>
          <p>— Sky Dental Center</p>
        `,
        attachments: [{ filename, content: pdfBuffer }]
      })
    }

    return res.status(200).json({ success: true, bookingId })
  } catch (err) {
    console.error('Send booking email error:', err)
    return res.status(500).json({ error: 'Failed to send emails' })
  }
}
