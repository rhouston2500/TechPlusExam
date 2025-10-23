import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/TechPlusExam/', // This line is required for deploying to GitHub Pages under a repo subpath
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
