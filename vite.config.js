/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import FullReload from "vite-plugin-full-reload";

export default defineConfig({
  build: {
    copyPublicDir: false,
    manifest: true,
    rollupOptions: {
      input: ["assets/app.js", "assets/app.css"],
    },
    outDir: "public/dist",
  },
  server: {
    origin: "http://localhost:8080",
  },
  test: {
    setupFiles: ["./vitest.setup.js"],
  },
  plugins: [FullReload([".reload"]), viteCompression()],
});
