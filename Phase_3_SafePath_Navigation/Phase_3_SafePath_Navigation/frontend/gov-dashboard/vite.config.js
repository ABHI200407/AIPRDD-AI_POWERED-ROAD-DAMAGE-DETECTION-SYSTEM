import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 3000,
    minify: false
  }
})
