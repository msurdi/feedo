/* eslint-disable no-restricted-syntax */
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import autoprefixer from "autoprefixer";
import filesize from "rollup-plugin-filesize";
import postcss from "rollup-plugin-postcss";
import sourcemaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";
import tailwindcss from "tailwindcss";

const isProduction = process.env.NODE_ENV === "production";
export default {
  plugins: [
    commonjs(),
    nodeResolve(),
    sourcemaps(),
    postcss({
      plugins: [tailwindcss, autoprefixer],
      extract: true,
    }),
    replace({
      preventAssignment: true,
      values: {
        "process.env.NODE_ENV": JSON.stringify(
          process.env.NODE_ENV ?? "production"
        ),
      },
    }),
    ...(isProduction ? [terser(), filesize()] : []),
  ],
  input: "./assets/app.js",
  output: {
    sourcemap: true,
    file: "./public/dist/app.js",
    format: "iife",
  },
};
