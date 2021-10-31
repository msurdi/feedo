/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

const tasks = require("./tasks");

module.exports = (on) => {
  on("task", tasks);
};
