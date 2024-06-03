import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    css: {
      fileName: "assets/index.css",
      assetsDir: "assets",
    },
    rollupOptions: {
      output: {
        entryFileNames: "assets/script.js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  server: {
    port: 6969,
  },
});
