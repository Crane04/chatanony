import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // chatanony is linked from ../library and written as CommonJS, so Vite has to be told
  // to pre-bundle it in dev and convert it in production builds.
  optimizeDeps: {
    include: ['chatanony'],
  },
  build: {
    commonjsOptions: {
      include: [/library/, /node_modules/],
    },
  },
})
