# Sky Dental – API for cPanel (PHP)

Use this folder when the site is hosted **on cPanel**. Emails are sent using your cPanel **Email Accounts** and the server’s built-in mail (no Resend, no Vercel). All forms send to **smile@skydc.ae**.

## What’s in this folder

| File | Purpose |
|------|--------|
| `config.sample.php` | Template. Copy to `config.php` and set FROM_EMAIL (e.g. smile@skydc.ae) and recipients. |
| `config.php` | **You create this** (do not commit). Your email addresses. |
| `cpanel-mail-helper.php` | Sends email via PHP `mail()` (cPanel built-in). |
| `send-booking.php` | Request Appointment form → PDF to clinic + user. |
| `send-job-application.php` | Careers Apply form → CV to clinic. |
| `send-contact-message.php` | Contact Us form → message to clinic. |

---

## Setup on cPanel

### 1. Email in cPanel

- In cPanel, open **Email** → **Email Accounts**.
- Use **smile@skydc.ae** (or create it). This is the “From” address and where forms are sent. The sample config uses it for both.

### 2. Upload the API files

- Open **Files** → **File Manager**.
- Go to `public_html`, create a folder `api` if needed.
- Upload into `api/`:
  - `send-booking.php`
  - `send-contact-message.php`
  - `send-job-application.php`
  - `cpanel-mail-helper.php`
  - `config.sample.php`

### 3. Create config.php

- In `api/`, copy `config.sample.php` to `config.php`.
- Edit `config.php`: **FROM_EMAIL** and the three recipient addresses are already set to **smile@skydc.ae**. Change only if you use different addresses.

### 4. Point the frontend to these URLs

When you build the site for cPanel, set:

- `VITE_BOOKING_API_URL=https://skydc.ae/api/send-booking.php`
- `VITE_JOB_APPLICATION_API_URL=https://skydc.ae/api/send-job-application.php`
- `VITE_CONTACT_API_URL=https://skydc.ae/api/send-contact-message.php`

Replace `skydc.ae` with your domain. Then run `npm run build` and upload the `dist/` contents to cPanel (e.g. into `public_html`).

### 5. Test

Submit the Request Appointment, Contact, and Careers forms. Emails should arrive at smile@skydc.ae (or the addresses in your config.php).

---

## Security note

- Do **not** commit `config.php` (it contains email addresses). It is listed in `.gitignore`.
- If the `api` folder is inside the web root, you can restrict access (e.g. allow only POST) via `.htaccess` if your host supports it.
