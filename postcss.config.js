export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-import": {},
    cssnano: process.env.NODE_ENV === "production" ? {} : false,
  },
};
