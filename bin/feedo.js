#!/usr/bin/env -S node --experimental-specifier-resolution=node

// // Prisma relies on relative directories for schema loading, etc.
// process.chdir(`${__dirname}/..`);

import cli from "../cli";

cli().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
