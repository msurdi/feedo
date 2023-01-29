/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  downloadsFolder: "acceptance/downloads",
  env: {},
  fixturesFolder: "acceptance/fixtures",
  nodeVersion: "system",
  retries: {
    openMode: 0,
    runMode: 1,
  },
  screenshotsFolder: "acceptance/screenshots",
  video: false,
  videosFolder: "acceptance/videos",
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // eslint-disable-next-line global-require
      return require("./acceptance/plugins")(on, config);
    },
    baseUrl: "http://localhost:3001",
    specPattern: "acceptance/tests/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "acceptance/support",
  },
  component: {
    setupNodeEvents() {},
    specPattern: "acceptance/component/**/*.cy.{js,jsx,ts,tsx}",
  },
});
