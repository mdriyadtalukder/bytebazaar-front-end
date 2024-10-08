import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,  // Disable source maps to reduce memory usage
    chunkSizeWarningLimit: 3000, // Set chunk size limit to 3000KB (3MB)
  },
  server: {
    port: 3000,
  }
})