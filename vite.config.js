/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import FullReload from "vite-plugin-full-reload";

export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      input: "assets/app.js",
    },
    outDir: "public/assets",
  },
  test: {
    setupFiles: ["./vitest.setup.js"],
  },
  plugins: [FullReload([".reload"])],
});
