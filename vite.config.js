import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000, // Adjust the limit as needed
    assetsInclude: ['**/*.node'], // Include .node files as assets
    rollupOptions: {
      external: [
        'fs',  
        // Externalize Node.js modules
        'path',
        'url',
        'assert',
        'child_process',
        'module',
      ],
    },
  },
})
