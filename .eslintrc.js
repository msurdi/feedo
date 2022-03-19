module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:react/recommended",
    "prettier",
    "plugin:jest/recommended",
  ],
  plugins: ["react", "prettier", "jest"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-restricted-syntax": "off",
    "no-continue": "off",
    "no-await-in-loop": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
  },
};
