const { program } = require("commander");
const packageJSON = require("../package.json");
const migrate = require("./commands/migrate");
const start = require("./commands/start");
const sync = require("./commands/sync");

const cli = async () => {
  const run = (command) => async () => {
    try {
      await command(program.opts());
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
    .description("Start web application")
    .action(run(start));

  program.command("sync").description("Sync all feeds").action(run(sync));

  program
    .command("migrate")
    .description("Migrate the database to the latest schema")
    .action(run(migrate));

  program.parse(process.argv);
};

module.exports = cli;
