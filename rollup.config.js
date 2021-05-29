/* eslint-disable no-restricted-syntax */
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import autoprefixer from "autoprefixer";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";

export default {
  plugins: [
    commonjs(),
    nodeResolve(),
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
  ],
  input: "./assets/app.js",
  output: {
    file: "./public/dist/app.js",
    format: "iife",
  },
};
