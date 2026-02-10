import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/cardle/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        dir: resolve(__dirname, "dist"),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        // 移除 'mixed-decls'：新版本 Sass s
        silenceDeprecations: ["import", "color-functions", "global-builtin"],
        verbose: false,
      },
    },
  },
  optimizeDeps: {
    include: ["swiper/react", "swiper", "swiper/modules"],
  },
});
