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

const SKY_BLUE = '#0C0060'
const SKY_GREEN = '#CBFF8F'

/**
 * Generates a PDF with Sky Dental branding and booking details.
 * Returns the PDF as a base64 string (for sending via API) and as a Blob (for download).
 */
export function generateBookingPdf(
  bookingId: string,
  details: BookingDetails
): { blob: Blob; base64: string } {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  let y = 20

  // ---- Header: Sky Dental branding (English only; Arabic not supported by default font) ----
  doc.setFillColor(12, 0, 96) // #0C0060
  doc.rect(0, 0, pageWidth, 24, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('SKY DENTAL CENTER', pageWidth / 2, 14, { align: 'center' })

  doc.setTextColor(0, 0, 0)
  y = 34

  // ---- Title ----
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Appointment Request Confirmation', margin, y)
  y += 12

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 80, 80)
  doc.text(`Booking ID: ${bookingId}`, margin, y)
  y += 10

  // ---- Divider ----
  doc.setDrawColor(203, 255, 143) // #CBFF8F
  doc.setLineWidth(1)
  doc.line(margin, y, pageWidth - margin, y)
  y += 12

  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Patient & Contact', margin, y)
  y += 8
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Name: ${details.fullName}`, margin, y)
  y += 6
  doc.text(`Phone: ${details.countryCode} ${details.phone}`, margin, y)
  y += 6
  doc.text(`Email: ${details.email || '—'}`, margin, y)
  y += 14

  doc.setFont('helvetica', 'bold')
  doc.text('Appointment Details', margin, y)
  y += 8
  doc.setFont('helvetica', 'normal')
  doc.text(`Service: ${details.service}`, margin, y)
  y += 6
  doc.text(`Doctor: ${details.doctor}`, margin, y)
  y += 6
  doc.text(`Date: ${details.date}`, margin, y)
  y += 6
  doc.text(`Time: ${details.time}`, margin, y)
  y += 14

  if (details.message?.trim()) {
    doc.setFont('helvetica', 'bold')
    doc.text('Notes / Special Instructions', margin, y)
    y += 8
    doc.setFont('helvetica', 'normal')
    const splitMsg = doc.splitTextToSize(details.message, pageWidth - 2 * margin)
    doc.text(splitMsg, margin, y)
    y += splitMsg.length * 6 + 10
  }

  // ---- Footer ----
  y = doc.internal.pageSize.getHeight() - 20
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.text(
    'Sky Dental Center · Appointment Request · This is an automated confirmation.',
    pageWidth / 2,
    y,
    { align: 'center' }
  )

  const blob = doc.output('blob')
  const base64 = doc.output('datauristring').split(',')[1] ?? ''
  return { blob, base64 }
}
