const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFiles: ["<rootDir>/jest.setup.js"],
};

module.exports = createJestConfig(customJestConfig);
