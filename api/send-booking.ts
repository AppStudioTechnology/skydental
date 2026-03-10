/**
 * Serverless API: send booking confirmation PDF to user email and to clinic.
 *
 * Deploy as Vercel Serverless Function:
 *   - Put this file in /api/send-booking.ts (or .js) at project root.
 *   - Set env RESEND_API_KEY in Vercel dashboard (get key from https://resend.com).
 *   - Set VITE_BOOKING_API_URL in your app to your deployment URL, e.g. https://your-domain.vercel.app/api/send-booking
 *
 * Request body (JSON):
 *   { bookingId, booking: { fullName, email, ... }, pdfBase64, toUser?: string, toClinic }
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const CLINIC_EMAIL = 'aliaslam683@gmail.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'Sky Dental <onboarding@resend.dev>'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS: allow same-origin (Vercel app) and preflight
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

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

    // 1. Send PDF to clinic
    const clinicResult = await resend.emails.send({
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
    if (clinicResult.error) {
      console.error('Resend clinic email error:', clinicResult.error)
      return res.status(500).json({ error: 'Failed to send clinic email', details: clinicResult.error })
    }

    // 2. Send copy to user if email provided
    if (toUser && booking.email) {
      const userResult = await resend.emails.send({
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
      if (userResult.error) {
        console.error('Resend user email error:', userResult.error)
        // Clinic email already sent; still return 200 but log
      }
    }

    return res.status(200).json({ success: true, bookingId })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Send booking email error:', err)
    return res.status(500).json({
      error: 'Failed to send emails',
      details: process.env.NODE_ENV === 'development' ? message : undefined
    })
  }
}
