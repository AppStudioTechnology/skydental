# Booking API (send confirmation emails)

The **Request Appointment** form generates a PDF and can send it by email to:
1. **The user** – copy to the email they entered  
2. **The clinic** – currently `aliaslam683@gmail.com` (for testing; change back to `smile@skydc.ae` in `api/send-booking.ts` and `BookingFormSidebar.tsx` when finalizing).

## Vercel (current – testing)

When the app is deployed on **Vercel**, the frontend and this API are on the same deployment. The app automatically calls `/api/send-booking` on the same domain, so **you do not need to set `VITE_BOOKING_API_URL`**.

1. Deploy the project to Vercel (the `api/` folder is picked up as serverless functions).
2. In **Vercel → your project → Settings → Environment Variables**, add:
   - **`RESEND_API_KEY`** – your [Resend](https://resend.com) API key (create an account, get the key from the dashboard).
   - Optionally **`FROM_EMAIL`** – e.g. `Sky Dental <onboarding@resend.dev>` for testing, or a verified domain later.
3. Redeploy so the new env vars are applied.

After that, submitting the Request Appointment form will send the PDF to the user (if they entered an email) and to the clinic address.

### If you don’t receive emails

1. **Redeploy**  
   After adding env vars, use **Deployments → ⋯ → Redeploy** so the new values are used.

2. **Check the browser**  
   Submit the form, then open **Developer Tools (F12) → Console**. If you see `[Booking] API error:` or `[Booking] Request failed:`, the API call failed (e.g. 404 = API not deployed, 500 = Resend error).

3. **Check Vercel logs**  
   In Vercel: **Deployments → open the latest deployment → Functions** (or **Logs**). Click the `api/send-booking` function and look at the logs. You’ll see “Resend clinic email error” or “RESEND_API_KEY not configured” if something is wrong.

4. **Resend dashboard**  
   At [resend.com](https://resend.com) → **Logs**, check whether the send was attempted and if it was rejected (e.g. invalid from address or domain).

## cPanel / other host (after finalization)

When you move the site to **cPanel** (or another host) and no longer use Vercel:

- The **frontend** can be deployed as static files (e.g. via File Manager or FTP).
- The **email-sending logic** must run somewhere that can call Resend (or another email provider). Options:
  1. **Keep using Vercel only for the API**  
     Deploy just this repo to Vercel, use only the serverless function, and in your cPanel-hosted app set:
     `VITE_BOOKING_API_URL=https://your-vercel-app.vercel.app/api/send-booking`
  2. **Backend on cPanel**  
     Recreate the same behaviour in a small backend (e.g. Node/Express or PHP) on cPanel that accepts the booking + PDF and sends email (e.g. via Resend, SendGrid, or SMTP). Then set `VITE_BOOKING_API_URL` to that backend URL.

Until then, the Vercel setup above is enough for testing.
