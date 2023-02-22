/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

import { setupDatabase } from "../../app/services/db.js";
import tasks from "./tasks.js";

export default async (on) => {
  await setupDatabase();
  on("task", tasks);
};
