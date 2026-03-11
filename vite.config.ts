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
})
