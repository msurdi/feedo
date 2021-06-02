#!/usr/bin/env node

// Prisma relies on relative directories for schema loading, etc.
process.chdir(`${__dirname}/..`);

const cli = require("../cli");

cli().catch((e) => {
  // eslint-disable-next-line no-console
  console.trace(e);
  process.exit(1);
});
