import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    headers: {
      'Service-Worker-Allowed': '/'
    },

    // port: 3000,
    proxy: {
      "/api": {
        target: "http://192.168.0.211:5001",
        changeOrigin: true,
        secure: false,
      },
    },  

  },
});