import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8000,
  },
  proxy: {
    // Redirect requests from http://localhost:5173/api to http://localhost:4567/api
    '/api': {
      target: 'http://localhost:4567',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
  define: {
    'process.env.REACT_APP_APILINK': JSON.stringify(process.env.REACT_APP_APILINK),
  },
});
