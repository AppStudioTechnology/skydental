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
4. **Config on server:** In `api/`, copy `config.sample.php` to `config.php` and set FROM_EMAIL and recipients to **smile@skydc.ae**.
5. **Test:** Open **https://beta.skydc.ae**, submit the forms. Emails go via cPanel to smile@skydc.ae.

When ready for **live** (www.skydc.ae), repeat with live URLs (`https://www.skydc.ae/api/...`) and upload to **public_html** and **public_html/api/**.

---

## Testing forms and email without going live

**Option A: Staging subdomain on the same cPanel (recommended)**  
1. In cPanel create a subdomain (e.g. `staging.skydc.ae` or `test.skydc.ae`) and point it to a folder (e.g. `public_html_staging`).  
2. Upload the **api-php** files into that folder’s `api/` (e.g. `public_html_staging/api/`). Copy `config.sample.php` to `config.php` and set smile@skydc.ae (same as production).  
3. Build the frontend with the staging API URLs:
   ```bash
   VITE_BOOKING_API_URL=https://staging.skydc.ae/api/send-booking.php \
   VITE_JOB_APPLICATION_API_URL=https://staging.skydc.ae/api/send-job-application.php \
   VITE_CONTACT_API_URL=https://staging.skydc.ae/api/send-contact-message.php \
   npm run build
   ```
4. Upload the contents of `dist/` to the staging folder.  
5. Open `https://staging.skydc.ae`, submit the forms. Emails will send via the same cPanel mail to smile@skydc.ae, so you can verify without touching the live site.

**Option B: Local PHP (see request/response only)**  
- From the project root: `cd api-php && php -S localhost:8080`.  
- In another terminal, run the app with env vars pointing to `http://localhost:8080` (e.g. `VITE_BOOKING_API_URL=http://localhost:8080/send-booking.php`).  
- Forms will POST to your machine; you can confirm the API returns success. PHP `mail()` on localhost often does not deliver real email unless you configure a local SMTP or use a mail catcher (e.g. Mailpit).

---

## Clinic gets email but the **user** (patient) doesn’t

The booking API sends one email to the clinic (smile@skydc.ae) and one to the patient’s email. If the clinic receives but the patient doesn’t:

1. **Spam/junk** – Mail from shared hosting to Gmail, Yahoo, etc. often goes to spam. Ask the user to check spam and to add smile@skydc.ae (or your FROM_EMAIL) as a safe sender.
2. **Host limits** – Some cPanel hosts throttle or restrict mail to external addresses. The clinic copy (same domain) works; the user copy (external) may be delayed or blocked. Check cPanel → Email → Delivery Reports or ask your host.
3. **Response flag** – The API returns `userEmailSent: true/false`. The booking success screen uses this to tell the user to check spam and use **Download PDF** when the server could not confirm delivery to their address.
4. **Verify the address** – The API only sends to the user when the address is valid (`filter_var(..., FILTER_VALIDATE_EMAIL)`). The frontend sends `toUser: formData.email` and the PHP uses `toUser` or `booking.email`; both should be the same.

The patient can always use **Download PDF** on the success screen as a backup.

---

## Not receiving email?

If the form shows success but no email arrives:

1. **Check spam/junk** for smile@skydc.ae (and the inbox you’re checking).
2. **cPanel → Email Accounts** – Ensure **smile@skydc.ae** exists and you can log in to it. PHP `mail()` should use an address that exists on the same server.
3. **From address** – In `config.php`, set `FROM_EMAIL` to the plain address first: `'smile@skydc.ae'`. If that works, you can try `'Sky Dental <smile@skydc.ae>'` later. Some hosts are strict about the From format.
4. **cPanel error logs** – In cPanel → Errors or Metrics → Errors, check for PHP or mail errors around the time you submitted the form.
5. **Test from cPanel** – Use cPanel → Email → Send Email (or webmail) to send a test to smile@skydc.ae. If that doesn’t arrive either, the issue is with the mailbox or server mail, not the PHP script.

---

## Security note

- Do **not** commit `config.php` (it contains email addresses). It is listed in `.gitignore`.
- If the `api` folder is inside the web root, you can restrict access (e.g. allow only POST) via `.htaccess` if your host supports it.
