import { program } from "commander";
import packageJSON from "../app/lib/package.js";
import { setupDatabase } from "../app/services/db.js";
import start from "./commands/start.js";
import sync from "./commands/sync.js";

const cli = async () => {
  await setupDatabase();
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
    .option(
      "-s, --sync <minutes>",
      "Automatically sync feeds periodically",
      "0"
    )
    .description("Start web application")
    .action(run(start));

  program.command("sync").description("Sync all feeds").action(run(sync));

  program.parse(process.argv);
};

export default cli;
