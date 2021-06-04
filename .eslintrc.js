module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
    node: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier", "plugin:jest/recommended"],
  plugins: ["prettier", "jest"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-restricted-syntax": "off",
    "no-continue": "off",
    "no-await-in-loop": "off",
  },
};
