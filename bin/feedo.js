#!/usr/bin/env node
import dotenv from "dotenv";

dotenv.config();

const cli = (await import("../cli/index.js")).default;

cli().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
