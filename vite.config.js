import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // সব /api/* request এখানে forward হবে
      '/api': {
        target: 'https://events.deepanwita.fun', // তোমার backend URL
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // /api remove করে backend এ যাবে
      },
    },
  },
});
