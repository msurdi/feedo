import parseDuration from "parse-duration";
import runServer from "../../server/index.js";
import migrateCommand from "./migrate.js";
import syncCommand from "./sync.js";

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

export default start;
