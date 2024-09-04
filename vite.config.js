import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 3000, // Increase the limit as needed (e.g., 1000 kB)
  },
})
