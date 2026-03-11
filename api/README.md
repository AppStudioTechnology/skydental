# APIs for Sky Dental

## cPanel hosting (recommended)

When the site is on **cPanel**, use the **PHP API** in the **`api-php/`** folder. Emails are sent with cPanel’s built-in mail to **smile@skydc.ae** (no Resend, no Vercel).

1. Upload the contents of `api-php/` to cPanel (e.g. into `public_html/api/`).
2. Copy `config.sample.php` to `config.php` in that folder. The sample already uses smile@skydc.ae.
3. When building for cPanel, set:
   - `VITE_BOOKING_API_URL=https://skydc.ae/api/send-booking.php`
   - `VITE_JOB_APPLICATION_API_URL=https://skydc.ae/api/send-job-application.php`
   - `VITE_CONTACT_API_URL=https://skydc.ae/api/send-contact-message.php`
4. Full steps are in **`api-php/README.md`** and **`DEPLOY-CPANEL-STEPS.md`**.

---

## Booking API

The **Request Appointment** form sends a PDF to the clinic (smile@skydc.ae) and a copy to the user if they entered an email.

---

## Job application API

The **Careers → Apply Now** form sends the applicant’s name, email, and CV to smile@skydc.ae (or the address in config.php).

---

## Contact API

The **Contact Us → Send Us a Message** form sends the message to smile@skydc.ae (or the address in config.php). Reply-To is set to the visitor’s email.
