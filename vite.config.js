import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANT: "base" must match your GitHub repository name, e.g. '/paradise-nursery/'
export default defineConfig({
  plugins: [react()],
  base: '/paradise-nursery/',
});
