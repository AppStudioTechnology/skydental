# Go live on cPanel (skydc.ae) – Step by step

Do these steps in order. Emails use cPanel’s built-in mail and **smile@skydc.ae** (no Resend, no Vercel).

---

## Before you upload

### Step 1: Build the site with the correct API URLs

1. In your project folder, create or edit **`.env.production`** (same level as `package.json`).
2. Put these three lines in it (use skydc.ae or www.skydc.ae):

   ```
   VITE_BOOKING_API_URL=https://skydc.ae/api/send-booking.php
   VITE_JOB_APPLICATION_API_URL=https://skydc.ae/api/send-job-application.php
   VITE_CONTACT_API_URL=https://skydc.ae/api/send-contact-message.php
   ```

   If the site uses **www**, use `https://www.skydc.ae` in all three lines.

3. Run:

   ```bash
   npm run build
   ```

4. You should have a **`dist`** folder. Keep it for the next steps.

---

## Upload to cPanel

### Step 2: Upload the website (frontend)

1. Log in to **cPanel** for skydc.ae.
2. Open **File Manager**.
3. Go to **public_html**.
4. Upload **everything inside** the **`dist`** folder into **public_html** (e.g. `index.html`, `assets/`, `.htaccess`). The `.htaccess` is needed for React Router.

Result: https://skydc.ae shows the new Sky Dental site.

---

### Step 3: Create the `api` folder and upload PHP files

1. Inside **public_html**, create a folder **`api`**.
2. Upload these files from the project’s **`api-php`** folder into **public_html/api/**:
   - `cpanel-mail-helper.php`
   - `send-booking.php`
   - `send-job-application.php`
   - `send-contact-message.php`
   - `config.sample.php`

You should have:
- `public_html/api/cpanel-mail-helper.php`
- `public_html/api/send-booking.php`
- `public_html/api/send-job-application.php`
- `public_html/api/send-contact-message.php`
- `public_html/api/config.sample.php`

---

### Step 4: Create and fill in `config.php`

1. In **public_html/api/**, copy **config.sample.php** and name the copy **config.php**.
2. Open **config.php**. The sample already has:
   - **FROM_EMAIL** – `Sky Dental <smile@skydc.ae>` (must be an address from cPanel → Email Accounts)
   - **CLINIC_EMAIL**, **JOB_APPLICATIONS_EMAIL**, **CONTACT_INQUIRIES_EMAIL** – `smile@skydc.ae`
3. If your sending/receiving address is different, edit those values. Save.

Result: the PHP scripts send email via cPanel mail to smile@skydc.ae.

---

## Test

### Step 5: Test the three forms

1. Open **https://skydc.ae** (or https://www.skydc.ae).
2. **Request Appointment** – Submit the form. Check smile@skydc.ae for the booking email and PDF. The user’s email gets a copy if they entered one.
3. **Careers – Apply Now** – Submit with a CV. Check smile@skydc.ae for the application.
4. **Contact Us – Send Us a Message** – Submit. Check smile@skydc.ae for the message.

If something fails:
- Check the browser **Developer Tools (F12)** → **Console** for errors.
- Confirm **config.php** exists in **public_html/api/** and uses an email that exists in cPanel → Email Accounts (e.g. smile@skydc.ae).
- Confirm the three `VITE_*` URLs in `.env.production` use **https://skydc.ae** and **/api/...php**.

---

## Quick checklist

- [ ] `.env.production` has the three `VITE_*` URLs with skydc.ae (or www).
- [ ] `npm run build` was run and `dist` exists.
- [ ] Contents of `dist` are in **public_html**.
- [ ] **public_html/api/** exists with the 5 PHP files.
- [ ] **config.php** created from **config.sample.php** in **public_html/api/**.
- [ ] **config.php** has FROM_EMAIL and recipients set (e.g. smile@skydc.ae).
- [ ] smile@skydc.ae exists in cPanel → Email Accounts.
- [ ] All three forms tested and emails received at smile@skydc.ae.

You’re live when the site loads and all three forms send emails to smile@skydc.ae.

---

## 404 when refreshing inner pages (e.g. /contact, /about-us) on beta/cPanel

If the site works on Vercel but **beta.skydc.ae** (or skydc.ae) shows **404** when you refresh a page like `/contact` or open a direct link to it, the server is not applying the SPA fallback.

### 1. Confirm `.htaccess` is on the server

- In cPanel **File Manager**, open **public_html** (or the folder where the site is deployed).
- Check that **`.htaccess`** exists at the same level as **`index.html`**.
- If you don’t see it: enable “Show Hidden Files” (e.g. Settings → check “Show Hidden Files”). If it’s missing, upload the **`.htaccess`** from your project’s **`dist`** folder (or from **`public`** before build).

### 2. Ask your host to allow `.htaccess` or add the rewrite

Many cPanel/LiteSpeed hosts **ignore `.htaccess`** unless **AllowOverride** is enabled for that directory. Contact support and send them something like this:

**Subject:** Enable .htaccess RewriteRules (or AllowOverride) for SPA routing

**Message:**

> My site is a single-page application (SPA). All requests that don’t match a real file (e.g. `/contact`, `/about-us`) need to be served `index.html` so the app can handle routing.  
>
> Please either:
> 1. **Enable AllowOverride** for my document root (so my `.htaccess` rewrite rules apply), or  
> 2. **Add this rewrite** in the server/virtual host config for my domain:
>
> **Apache / LiteSpeed:**
> ```apache
> <Directory "/path/to/document/root">
>   RewriteEngine On
>   RewriteCond %{REQUEST_FILENAME} !-f
>   RewriteCond %{REQUEST_FILENAME} !-d
>   RewriteRule ^ index.html [L]
> </Directory>
> ```
>
> (Replace `/path/to/document/root` with the actual path to public_html or the folder where index.html lives.)

Once the server applies this (via `.htaccess` or server config), refreshing `/contact` or opening direct links will work.

### 3. Last resort: `ErrorDocument 404` (if host won’t change rewrites)

If the host will not enable rewrites, you can try serving `index.html` when the server would return 404:

1. In your project, open **`public/.htaccess`**.
2. Find the commented line: `# ErrorDocument 404 /index.html`
3. Uncomment it so it reads: `ErrorDocument 404 /index.html`
4. Save, run **`npm run build`**, and upload the new **`dist/.htaccess`** to the server.

Note: the response may still be HTTP 404 (only the body is `index.html`). Use this only if you cannot get the proper rewrite applied.
