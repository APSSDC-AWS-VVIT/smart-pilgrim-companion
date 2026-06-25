// import { defineConfig } from 'vite';
// import { loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), 'VITE_');

//   return {
//     base: env.VITE_BASE_PATH || '/smart-pilgrim-companion/',
//     plugins: [react()],
//   };
// });
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins:[react()],
  base:"/smart-pilgrim-companion/"
})