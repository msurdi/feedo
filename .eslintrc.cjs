module.exports = {
  root: true,
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
    "plugin:@next/next/recommended",
    "prettier",
  ],
  plugins: ["react", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  overrides: [
    {
      files: "./*",
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
    },
    {
      files: "./test/*",
      extends: ["plugin:playwright/playwright-test"],
    },
  ],
  rules: {
    "import/extensions": ["error", "always", { ignorePackages: true }],
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
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelComponents: ["Label"],
        labelAttributes: ["label"],
        controlComponents: ["Input"],
        depth: 3,
        assert: "either",
      },
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
  },
};
