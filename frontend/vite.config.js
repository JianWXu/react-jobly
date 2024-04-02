import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'axios': 'axios/dist/axios.min.js' // Adjust the path as needed
    }
  },
  build: {
    rollupOptions: {
      external: ["axios"],
    },
  },
});