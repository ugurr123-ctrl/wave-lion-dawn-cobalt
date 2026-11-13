import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: 'mobile',
  publicDir: resolve('public'),
  plugins: [tailwindcss(), react()],
  build: { outDir: resolve('mobile-www'), emptyOutDir: true },
});
