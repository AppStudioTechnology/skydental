# Booking API (send confirmation emails)

The **Request Appointment** form generates a PDF with Sky Dental branding and booking details, then can send it by email to:

1. **The user** – copy of the request to the email they entered  
2. **The clinic** – full request to `smile@skydc.ae`

## How it works

- **Frontend:** On submit, the app generates a PDF (with logo and booking details), shows a success message, and optionally calls this API with the PDF (base64) and booking data.
- **API:** When deployed, this serverless function sends two emails (user + clinic) with the PDF attached.

## Deploy on Vercel

1. Deploy your project to Vercel (the `api/` folder is used automatically).
2. In Vercel → Project → Settings → Environment Variables, add:
   - `RESEND_API_KEY` – your [Resend](https://resend.com) API key.
   - Optionally `FROM_EMAIL` – e.g. `Sky Dental <bookings@yourdomain.com>` (after verifying your domain in Resend).
3. In your app env (e.g. `.env` or Vercel env), set:
   - `VITE_BOOKING_API_URL` = `https://your-vercel-domain.vercel.app/api/send-booking`

Without `VITE_BOOKING_API_URL`, the form still works: the user sees the success message and the PDF is generated; only the email sending is skipped until the API is deployed and the URL is set.
