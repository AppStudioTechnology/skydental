# Website Performance Guide

Slow loading (images, video) can usually be fixed by optimizing assets and following the steps below.

---

## What We've Already Done (Code)

- **Hero video**: Preload in HTML, `preload="auto"`, `fetchPriority="high"`, dark background while loading
- **Code splitting**: Other pages load on demand (only HomePage loads initially)
- **Lazy loading**: Below-the-fold images use `loading="lazy"`
- **Preconnect**: DNS/connection hints in `index.html` for faster asset loading

---

## What You Need to Do (Assets)

### 1. Compress the hero video (≈2.3 MB → ~800 KB–1.2 MB)

Run the built-in script:

```bash
pnpm run compress:hero-video
```

This compresses `public/assets/videos/hero-video.mp4` for web and adds `faststart` so the video can start playing while it downloads.

---

### 2. Compress the before/after images (CRITICAL – these are huge)

These files are very large and cause slow loading:

| File | Current size | Target |
|------|--------------|--------|
| `public/assets/images/before-treatment.jp.png` | **~10.7 MB** | Under 500 KB |
| `public/assets/images/after-treatment.jpg.jpg` | **~1.9 MB** | Under 400 KB |

**How to compress:**

1. **TinyPNG** (https://tinypng.com) – upload, download compressed
2. **Squoosh** (https://squoosh.app) – choose WebP or JPEG, set quality ~80
3. **Script** (if ffmpeg/imagemagick is installed):
   ```bash
   pnpm run compress:images
   ```

Replace the originals in `public/assets/images/` with the compressed versions (keep the same filenames).

---

### 3. Compress the technology video (≈7.2 MB)

The technology section video is large. Compress it with ffmpeg:

```bash
ffmpeg -i public/assets/videos/technology-video.mp4 -c:v libx264 -b:v 1.5M -movflags +faststart -c:a aac -b:a 128k public/assets/videos/technology-video-optimized.mp4
mv public/assets/videos/technology-video-optimized.mp4 public/assets/videos/technology-video.mp4
```

(Or use HandBrake to compress.)

---

### 4. Add a hero video poster (optional but recommended)

A poster image shows instantly while the video loads. Export the first frame of your hero video as `public/assets/images/hero-poster.jpg`, then we can wire it up in `HeroSection.tsx`.

---

## Checklist

- [ ] Run `pnpm run compress:hero-video`
- [ ] Compress `before-treatment.jp.png` (currently ~10 MB)
- [ ] Compress `after-treatment.jpg.jpg` (currently ~2 MB)
- [ ] Compress `technology-video.mp4` (~7 MB)
- [ ] (Optional) Add hero poster image

---

## Server / Hosting

- **CDN**: If possible, serve static assets (images, videos) from a CDN
- **Caching**: Ensure the server sends cache headers for images and videos (e.g. `Cache-Control: max-age=31536000` for static assets)
