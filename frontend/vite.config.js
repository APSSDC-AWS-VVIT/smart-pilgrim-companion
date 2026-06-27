// import { defineConfig } from 'vite';
// import { loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';
<<<<<<< HEAD
=======

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), 'VITE_');

//   return {
//     base: env.VITE_BASE_PATH || '/smart-pilgrim-companion/',
//     plugins: [react()],
//   };
// });
import { defineConfig } from 'vite';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
>>>>>>> f4b35f38cad29673eaecb595130ae1eb98477f85

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), 'VITE_');

<<<<<<< HEAD
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
=======
  return {
    base: env.VITE_BASE_PATH || '/smart-pilgrim-companion/',
    plugins: [react()],
  };
});
>>>>>>> f4b35f38cad29673eaecb595130ae1eb98477f85
