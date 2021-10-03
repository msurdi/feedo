const parseDuration = require("parse-duration");
const runServer = require("../../server");
const migrateCommand = require("./migrate");
const syncCommand = require("./sync");

let syncing = false;

const periodicSync = async () => {
  if (syncing) {
    return;
  }
  syncing = true;

  try {
    await syncCommand();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error syncing feeds: ", error);
  } finally {
    syncing = false;
  }
};

const start = async ({ migrate, sync }) => {
  if (migrate) {
    await migrateCommand();
  }

  const syncInterval = parseDuration(sync);

  if (syncInterval) {
    setInterval(periodicSync, syncInterval);
    periodicSync();
  }

  await runServer();
};

module.exports = start;
