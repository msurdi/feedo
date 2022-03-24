module.exports = {
  root: true,
  plugins: ["prettier", "cypress"],
  env: {
    "cypress/globals": true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  extends: ["airbnb-base", "prettier", "plugin:cypress/recommended"],
  rules: {
    "import/no-extraneous-dependencies": "off",
  },
};
