import { jsPDF } from 'jspdf'

export interface BookingDetails {
  fullName: string
  email: string
  countryCode: string
  phone: string
  service: string
  doctor: string
  date: string
  time: string
  message?: string
}

// Sky Dental green (header/footer)
const GREEN_RGB = { r: 203, g: 255, b: 143 } // #CBFF8F
const PAGE_WIDTH_MM = 210
const MARGIN = 20
const HEADER_H = 26
const FOOTER_H = 18
const COL_GAP = 16
const COL_WIDTH = (PAGE_WIDTH_MM - 2 * MARGIN - COL_GAP) / 2
// Logo in header: small, centered, no stretch (aspect ratio preserved)
const LOGO_MAX_W_MM = 28
const LOGO_MAX_H_MM = 14

/**
 * Format current date/time for "request generated" (at PDF generation time).
 */
function getRequestGeneratedLabel(): { date: string; time: string } {
  const now = new Date()
  const date = now.toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' })
  const time = now.toLocaleTimeString('en-AE', { hour: '2-digit', minute: '2-digit', hour12: true })
  return { date, time }
}

/**
 * Generates a PDF with Sky Dental branding and booking details.
 * Header and footer use green background; logo in header if logoBase64 is provided.
 * Logo is drawn small, centered, with aspect ratio preserved (no stretch).
 * Returns the PDF as a base64 string (for sending via API) and as a Blob (for download).
 */
export function generateBookingPdf(
  bookingId: string,
  details: BookingDetails,
  options?: { logoBase64?: string; logoNaturalWidth?: number; logoNaturalHeight?: number }
): { blob: Blob; base64: string } {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageHeight = doc.internal.pageSize.getHeight()
  const { date: reqDate, time: reqTime } = getRequestGeneratedLabel()

  // ---- Header: green background, logo or name ----
  doc.setFillColor(GREEN_RGB.r, GREEN_RGB.g, GREEN_RGB.b)
  doc.rect(0, 0, PAGE_WIDTH_MM, HEADER_H, 'F')

  if (options?.logoBase64) {
    try {
      const nw = options.logoNaturalWidth ?? 1
      const nh = options.logoNaturalHeight ?? 1
      // Fit within max box, preserve aspect ratio (no stretch)
      let wMm = LOGO_MAX_W_MM
      let hMm = (LOGO_MAX_W_MM * nh) / nw
      if (hMm > LOGO_MAX_H_MM) {
        hMm = LOGO_MAX_H_MM
        wMm = (LOGO_MAX_H_MM * nw) / nh
      }
      const x = PAGE_WIDTH_MM / 2 - wMm / 2
      const y = HEADER_H / 2 - hMm / 2
      doc.addImage(options.logoBase64, 'PNG', x, y, wMm, hMm)
    } catch {
      drawHeaderText(doc)
    }
  } else {
    drawHeaderText(doc)
  }

  let y = HEADER_H + 20

  // ---- Title and Booking ID ----
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text('Appointment Request Confirmation', MARGIN, y)
  y += 8
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 80, 80)
  doc.text(`Booking ID: ${bookingId}`, MARGIN, y)
  y += 14

  // ---- Two columns ----
  const leftX = MARGIN
  const rightX = MARGIN + COL_WIDTH + COL_GAP
  let leftY = y
  let rightY = y

  // Left column: Patient & Contact, Request generated
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(0, 0, 0)
  doc.text('Patient & Contact', leftX, leftY)
  leftY += 8
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Name: ${details.fullName}`, leftX, leftY)
  leftY += 6
  doc.text(`Phone: ${details.countryCode} ${details.phone}`, leftX, leftY)
  leftY += 6
  doc.text(`Email: ${details.email || '—'}`, leftX, leftY)
  leftY += 14

  doc.setFont('helvetica', 'bold')
  doc.text('Request generated', leftX, leftY)
  leftY += 8
  doc.setFont('helvetica', 'normal')
  doc.text(`Date: ${reqDate}`, leftX, leftY)
  leftY += 6
  doc.text(`Time: ${reqTime}`, leftX, leftY)
  leftY += 6

  // Right column: Appointment Details, Notes
  doc.setFont('helvetica', 'bold')
  doc.text('Appointment Details', rightX, rightY)
  rightY += 8
  doc.setFont('helvetica', 'normal')
  doc.text(`Service: ${details.service}`, rightX, rightY)
  rightY += 6
  doc.text(`Doctor: ${details.doctor}`, rightX, rightY)
  rightY += 6
  doc.text(`Date: ${details.date}`, rightX, rightY)
  rightY += 6
  doc.text(`Time: ${details.time}`, rightX, rightY)
  rightY += 14

  if (details.message?.trim()) {
    doc.setFont('helvetica', 'bold')
    doc.text('Notes / Special Instructions', rightX, rightY)
    rightY += 8
    doc.setFont('helvetica', 'normal')
    const splitMsg = doc.splitTextToSize(details.message, COL_WIDTH)
    doc.text(splitMsg, rightX, rightY)
    rightY += splitMsg.length * 6 + 10
  }

  // ---- Footer: green background and message ----
  const footerY = pageHeight - FOOTER_H
  doc.setFillColor(GREEN_RGB.r, GREEN_RGB.g, GREEN_RGB.b)
  doc.rect(0, footerY, PAGE_WIDTH_MM, FOOTER_H, 'F')
  doc.setFontSize(8)
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'normal')
  doc.text(
    'Sky Dental Center · Appointment Request · This is an automated confirmation.',
    PAGE_WIDTH_MM / 2,
    footerY + FOOTER_H / 2 + 1,
    { align: 'center' }
  )

  const blob = doc.output('blob')
  const base64 = doc.output('datauristring').split(',')[1] ?? ''
  return { blob, base64 }
}

function drawHeaderText(doc: jsPDF): void {
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(12, 0, 96) // #0C0060
  doc.text('SKY DENTAL CENTER', PAGE_WIDTH_MM / 2, 14, { align: 'center' })
}
