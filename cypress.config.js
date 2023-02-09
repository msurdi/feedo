/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "cypress";
import appConfig from "./server/config.js";

export default defineConfig({
  downloadsFolder: "acceptance/downloads",
  env: {
    username: appConfig.auth.username,
    password: appConfig.auth.password,
  },
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
    async setupNodeEvents(on, config) {
      // eslint-disable-next-line global-require
      return (await import("./acceptance/plugins/index.js")).default(
        on,
        config
      );
    },
    baseUrl: `http://${appConfig.address}:${appConfig.port}`,
    specPattern: "acceptance/tests/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "acceptance/support",
  },
  component: {
    setupNodeEvents() {},
    specPattern: "acceptance/component/**/*.cy.{js,jsx,ts,tsx}",
  },
});
