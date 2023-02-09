/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

import tasks from "./tasks.js";

export default (on) => {
  on("task", tasks);
};
