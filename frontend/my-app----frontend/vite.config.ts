import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
//import babel from '@rolldown/plugin-babel'
//import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
//export default defineConfig({
//  plugins: [
//    react(),
//    babel({ presets: [reactCompilerPreset()] }),
//    tailwindcss(),
//  ],
//})
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        // do not rewrite the path; forward /api/* to backend as-is
        // rewrite: (path) => path,
      },
    },
  },
})