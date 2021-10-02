#!/usr/bin/env node
const os = require("os");

const homedir = os.homedir();

// Ensure a default database is set for Prisma to work
if (!process.env.FEEDO_DATABASE_URL) {
  process.env.FEEDO_DATABASE_URL = `file:${homedir}/.feedo.db`;
}

// Prisma relies on relative directories for schema loading, etc.
process.chdir(`${__dirname}/..`);

const cli = require("../cli");

cli().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
