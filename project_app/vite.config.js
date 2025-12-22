import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import cesium from "vite-plugin-cesium";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), cesium()],
  server: {
    proxy: {
      "/api": { // tells vite to forward any request to the target when the request starts with api
        target: "http://localhost:3001",
        changeOrigin: true,
      }
    }
  }
})
