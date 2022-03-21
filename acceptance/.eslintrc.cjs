module.exports = {
  root: true,
  plugins: ["prettier", "cypress"],
  env: {
    "cypress/globals": true,
  },
  extends: ["airbnb-base", "prettier", "plugin:cypress/recommended"],
};
