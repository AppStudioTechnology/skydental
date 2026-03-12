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
- Edit `config.php`: **FROM_EMAIL** and **CLINIC_EMAIL** are already set to **smile@skydc.ae**. Change only if you use different addresses.

### 4. Point the frontend to these URLs

When you build the site for cPanel, set (see `.env.beta.example` and `.env.production.example` in project root):

- **Beta:** `https://beta.skydc.ae/api/...`
- **Live:** `https://www.skydc.ae/api/...`

Example for live (www.skydc.ae):

- `VITE_BOOKING_API_URL=https://www.skydc.ae/api/send-booking.php`
- `VITE_JOB_APPLICATION_API_URL=https://www.skydc.ae/api/send-job-application.php`
- `VITE_CONTACT_API_URL=https://www.skydc.ae/api/send-contact-message.php`

Then run `npm run build` and upload the `dist/` contents to cPanel (e.g. into `public_html` for live).

### 5. Test

Submit the Request Appointment, Contact, and Careers forms. Emails should arrive at smile@skydc.ae (or the addresses in your config.php).

---

## Beta testing checklist (beta.skydc.ae)

Use this to test on **beta** before going live. Your “server” is cPanel: no local server needed.

1. **Build for beta** (so forms call beta API):
   ```bash
   VITE_BOOKING_API_URL=https://beta.skydc.ae/api/send-booking.php \
   VITE_JOB_APPLICATION_API_URL=https://beta.skydc.ae/api/send-job-application.php \
   VITE_CONTACT_API_URL=https://beta.skydc.ae/api/send-contact-message.php \
   npm run build
   ```
2. **Upload site:** Upload the **contents** of `dist/` to the **beta** folder (e.g. the folder cPanel uses for beta.skydc.ae).
3. **Upload API:** In that same beta folder, create an `api/` folder. Upload the contents of **api-php/** into `api/` (all `.php` files + `config.sample.php`).
4. **Config on server:** In `api/`, copy `config.sample.php` to `config.php` and set FROM_EMAIL and CLINIC_EMAIL to **smile@skydc.ae**.
5. **Test:** Open **https://beta.skydc.ae**, submit the forms. Emails go via cPanel to smile@skydc.ae.

When ready for **live** (www.skydc.ae), repeat with live URLs (`https://www.skydc.ae/api/...`) and upload to **public_html** and **public_html/api/**.

---

## Security note

- Do **not** commit `config.php` (it contains email addresses). Add it to `.gitignore` if needed.
- If the `api` folder is inside the web root, you can restrict access (e.g. allow only POST) via `.htaccess` if your host supports it.
