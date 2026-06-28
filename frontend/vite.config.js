import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the active mode (.env.production)
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    // Dynamically uses VITE_BASE_PATH ('/' on AWS, or fallback for gh-pages)
    base: env.VITE_BASE_PATH || '/',
    plugins: [react()],
  };
});