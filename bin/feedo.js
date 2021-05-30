#!/usr/bin/env node
const cli = require("../cli");

cli().catch((e) => {
  // eslint-disable-next-line no-console
  console.trace(e);
  process.exit(1);
});
