# Sky Dental – Deployment (Beta → Live www.skydc.ae)

## Quick reference

| Environment | Frontend URL        | API base (forms)              |
|-------------|---------------------|------------------------------|
| **Beta**    | https://beta.skydc.ae  | https://beta.skydc.ae/api/   |
| **Live**    | https://www.skydc.ae   | https://www.skydc.ae/api/    |

All forms (Request Appointment, Contact, Careers) send to **smile@skydc.ae** (configurable in `api-php/config.php`).

---

## Final checks before beta / live

### Code & links
- [ ] **Privacy / footer:** Website link is **www.skydc.ae** (updated in Privacy Policy page).
- [ ] **Email:** All contact references use **smile@skydc.ae** (no old domain).
- [ ] **Routing:** Clean URLs (no `#/contact`); 404 redirects to home with `?redirect=` then client-side route.
- [ ] **Build:** `npm run build` completes with no errors.

### Forms & API
- [ ] **Booking (Request Appointment):** Sidebar + Contact “Schedule a Consultation” both use same API and show success + PDF.
- [ ] **Contact:** Contact page form submits to contact API; success/error messages show.
- [ ] **Careers:** Job application form submits to job API; success/error messages show.
- [ ] **API URLs:** Build uses correct env (beta vs live). See below.

### Local dev
- [ ] **Proxy:** `vite.config.ts` proxies `/api` to `VITE_API_PROXY_TARGET` or **https://beta.skydc.ae** so forms work locally.

---

## Build for Beta (beta.skydc.ae)

1. **Set env for beta** (one of):
   - Copy `.env.beta.example` to `.env.production`, or
   - Run build with env vars:
     ```bash
     VITE_BOOKING_API_URL=https://beta.skydc.ae/api/send-booking.php \
     VITE_CONTACT_API_URL=https://beta.skydc.ae/api/send-contact-message.php \
     VITE_JOB_APPLICATION_API_URL=https://beta.skydc.ae/api/send-job-application.php \
     npm run build
     ```
2. **Upload**
   - Contents of `dist/` → beta folder (e.g. document root for beta.skydc.ae).
   - **Include `.htaccess`** (Vite copies it from `public/` to `dist/`). In cPanel File Manager, enable **Show Hidden Files** (Settings → check "Show Hidden Files") so `.htaccess` is visible and uploaded; otherwise refresh on `/about-us` or `/contact` will 404.
   - Contents of `api-php/` → `api/` inside that folder (so `https://beta.skydc.ae/api/send-booking.php` etc. exist).
3. **Server config**
   - In `api/`, copy `config.sample.php` to `config.php`, set `FROM_EMAIL` and recipients (e.g. smile@skydc.ae).
4. **Test**
   - Open https://beta.skydc.ae, submit each form; confirm emails at smile@skydc.ae.

---

## Build for Live (www.skydc.ae)

1. **Set env for live**
   - Copy `.env.production.example` to `.env.production` (already points to **www.skydc.ae**), or set:
     ```bash
     VITE_BOOKING_API_URL=https://www.skydc.ae/api/send-booking.php \
     VITE_CONTACT_API_URL=https://www.skydc.ae/api/send-contact-message.php \
     VITE_JOB_APPLICATION_API_URL=https://www.skydc.ae/api/send-job-application.php \
     npm run build
     ```
2. **Upload**
   - Contents of `dist/` → live document root (e.g. `public_html` for www.skydc.ae).
   - Contents of `api-php/` → `public_html/api/` (so `https://www.skydc.ae/api/send-booking.php` etc. exist).
3. **Server config**
   - In `api/`, copy `config.sample.php` to `config.php`, set `FROM_EMAIL` and recipients (e.g. smile@skydc.ae).
4. **Test**
   - Open https://www.skydc.ae, submit each form; confirm emails at smile@skydc.ae.

---

## Env variables summary

| Variable                      | Purpose                    | Example (live) |
|------------------------------|----------------------------|----------------|
| `VITE_BOOKING_API_URL`       | Request Appointment form   | `https://www.skydc.ae/api/send-booking.php` |
| `VITE_CONTACT_API_URL`       | Contact form              | `https://www.skydc.ae/api/send-contact-message.php` |
| `VITE_JOB_APPLICATION_API_URL` | Careers apply form      | `https://www.skydc.ae/api/send-job-application.php` |
| `VITE_API_PROXY_TARGET`      | Optional; local dev proxy | `https://beta.skydc.ae` |

If the three API URLs are **not** set, the app uses `window.location.origin + '/api/...'`, which works when the frontend and API are on the same domain (e.g. cPanel with `dist/` and `api/` under the same root).

---

## API files (api-php/)

- `send-booking.php` – Request Appointment (PDF to clinic + user).
- `send-contact-message.php` – Contact Us.
- `send-job-application.php` – Careers application.
- `cpanel-mail-helper.php` – Mail helper.
- `config.sample.php` – Copy to `config.php` and set emails (do not commit `config.php`).

See **api-php/README.md** for full cPanel setup and troubleshooting.

---

## 404 on cPanel when refreshing /about-us, /contact, etc.

The app is a single-page app (SPA): the server must serve `index.html` for routes like `/about-us` so React Router can handle them. On Vercel this is configured for you; on cPanel you need `.htaccess` to be active.

### 1. Ensure `.htaccess` is uploaded
- After `npm run build`, `dist/.htaccess` exists (copied from `public/.htaccess`).
- Upload **all** contents of `dist/`, including `.htaccess`.
- In **cPanel → File Manager**, enable **Show Hidden Files** (Settings → check "Show Hidden Files") so you can see and upload `.htaccess`. If you already uploaded without it, upload `.htaccess` into the beta (or live) document root.

### 2. If 404 still happens: enable `.htaccess` (AllowOverride)
Some hosts disable `.htaccess` for the domain or folder. Then the server ignores our rules and returns 404 for `/about-us`.

- In **cPanel**, check if there is an option for the domain/subdomain (e.g. **Domains** → **Domains** or **Subdomains** → **beta.skydc.ae**) to set **AllowOverride** to **All** for the document root.
- If you don’t see it, **contact your host** and ask: “Please enable AllowOverride All for the document root of beta.skydc.ae (and www.skydc.ae) so .htaccess rules apply for the SPA.”
- After they enable it, refresh https://beta.skydc.ae/about-us — it should load the About Us page instead of 404.
