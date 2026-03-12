import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/** Copy .htaccess from public to dist (Vite may not copy dotfiles on some setups). */
function copyHtaccess() {
  return {
    name: 'copy-htaccess',
    closeBundle() {
      const src = path.resolve(__dirname, 'public/.htaccess')
      const outDir = path.resolve(__dirname, 'dist')
      const dest = path.join(outDir, '.htaccess')
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest)
        console.log('Copied .htaccess to dist/')
      }
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copyHtaccess(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Avoid "Some chunks are larger than 500 kB" warning (large deps: MUI, Radix, motion, etc.)
    chunkSizeWarningLimit: 1100,
  },
  server: {
    proxy: {
      // When running locally, forward /api/* to the deployed API (beta or live) so forms work
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'https://beta.skydc.ae',
        changeOrigin: true,
      },
    },
  },
})
