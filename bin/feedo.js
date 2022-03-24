#!/usr/bin/env -S node --experimental-specifier-resolution=node

// Prisma relies on relative directories for schema loading, etc.
import cli from "../cli";
import findRoot from "../lib/find-root";

process.chdir(findRoot());

cli().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
