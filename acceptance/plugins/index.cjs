/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
const tasks = require("./tasks.cjs");

module.exports = async (on) => {
  on("task", await tasks);
};
