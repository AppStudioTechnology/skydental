import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
