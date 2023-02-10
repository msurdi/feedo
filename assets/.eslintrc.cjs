/* eslint-env node */
module.exports = {
  globals: {
    up: true,
    process: true,
  },
  env: {
    browser: true,
    node: false,
  },
  rules: {
    "import/no-extraneous-dependencies": "off",
  },
};
