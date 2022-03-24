#!/usr/bin/env node

/**
 * This wrapper is required so that Cypress works within an ESM module project
 * as it is not supported by default at this moment
 */

// eslint-disable-next-line import/no-extraneous-dependencies
require("cypress/lib/cli").init();
