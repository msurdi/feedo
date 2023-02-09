module.exports = {
  root: true,
  plugins: ["prettier", "cypress"],
  env: {
    "cypress/globals": true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  extends: ["airbnb-base", "prettier", "plugin:cypress/recommended"],
  rules: {
    "import/extensions": ["error", "always", { ignorePackages: true }],
  },
};
