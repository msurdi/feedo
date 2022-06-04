import { execa } from "execa";
import parseDuration from "parse-duration";
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

const start = async () => {
  const command = execa("npm start", { shell: true });
  command.stderr.pipe(process.stderr);
  command.stdout.pipe(process.stdout);
  await command;
};

const run = async ({ migrate, sync }) => {
  if (migrate) {
    await migrateCommand();
  }

  const syncInterval = parseDuration(sync);

  if (syncInterval) {
    setInterval(periodicSync, syncInterval);
    periodicSync();
  }

  await start();
};

export default run;
