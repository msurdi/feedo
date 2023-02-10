module.exports = {
  env: {
    browser: false,
    commonjs: false,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  rules: {
    "no-restricted-syntax": "off",
    "no-continue": "off",
    "no-await-in-loop": "off",
    "import/extensions": ["error", "always", { ignorePackages: true }],
  },
};
