import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // needed for alias

export default defineConfig({
  appType: 'spa', // fallback to index.html for SPA routing
  plugins: [react()],
  server: {
    port: 5173, // frontend dev server
    proxy: {
      '/api': {
        target: 'http://localhost:10000', // backend server
        changeOrigin: true,
        secure: false,
      },
    },
    fs: {
      strict: false, // allows access to files outside root if needed
    },
  },
  build: {
    outDir: 'dist', // output folder for production
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // <-- now "@/..." works
    },
  },
});

