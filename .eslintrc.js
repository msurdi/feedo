module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
