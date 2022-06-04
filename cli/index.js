import { program } from "commander";
import { readFileSync } from "fs";
import { join } from "path";
import findRoot from "../lib/find-root.js";
import migrate from "./commands/migrate.js";
import start from "./commands/start.js";
import sync from "./commands/sync.js";

const projectRoot = findRoot();
const packageJsonPath = join(projectRoot, "./package.json");
const packageJSON = JSON.parse(readFileSync(packageJsonPath));

const cli = async () => {
  const run = (command) => async (options) => {
    try {
      await command(options);
      process.exit(0);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.trace(error);
      process.exit(1);
    }
  };

  program.version(packageJSON.version);

  program
    .command("start")
    .option("-m, --migrate", "Automatically run migrations")
    .option(
      "-s, --sync <minutes>",
      "Automatically sync feeds periodically",
      "0"
    )
    .description("Start web application")
    .action(run(start));

  program.command("sync").description("Sync all feeds").action(run(sync));

  program
    .command("migrate")
    .description("Migrate the database to the latest schema")
    .action(run(migrate));

  program.parse(process.argv);
};

export default cli;
