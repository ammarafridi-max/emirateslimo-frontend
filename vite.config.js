import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteCompression()],
  server: {
    allowedHosts: [
      '2208e8b6-a05a-4a4d-ac70-1b4a3be30b79-00-2issp31vfbzwn.sisko.replit.dev',
    ],
  },
});
