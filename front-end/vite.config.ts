import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('../ssl/localhost-key.pem'),
      cert: fs.readFileSync('../ssl/localhost.pem'),
    },
    host: 'localhost',
    port: 5173, // or whatever port you're using
  },
  plugins: [react()],
});
