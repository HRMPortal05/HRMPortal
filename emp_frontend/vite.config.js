import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1", // Bind the server to 127.0.0.1
    port: 5173, // Set the desired port for development
  },
  build: {
    outDir: "dist", // Output directory for the build
    rollupOptions: {
      // Ensure that all assets are relative to the root directory
      output: {
        assetFileNames: "assets/[name].[hash].[ext]",
        chunkFileNames: "assets/[name].[hash].js",
        entryFileNames: "assets/[name].[hash].js",
      },
    },
  },
});
