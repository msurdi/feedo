const runServer = require("../../server");
const migrateCommand = require("./migrate");

const start = async ({ migrate }) => {
  if (migrate) {
    await migrateCommand();
  }
  await runServer();
};

module.exports = start;
