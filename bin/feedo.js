#!/usr/bin/env node

// Prisma relies on relative directories for schema loading, etc.
import cli from "../cli/index.js";

// process.chdir(`${__dirname}/..`);

cli().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
