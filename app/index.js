import createApp from "./app.js";
import config from "./config.js";
import touch from "./lib/touch.js";

const runServer = async () => {
  const server = await createApp();
  server.listen(config.port, config.addres, async () => {
    // eslint-disable-next-line no-console
    console.log(`Server Ready at http://${config.address}:${config.port}`);
    if (config.devMode && config.reloadFile) {
      await touch(config.reloadFile);
    }
  });

  return new Promise((resolve) => {
    process.on("SIGINT", () => {
      // eslint-disable-next-line no-console
      console.log("Stopping server...");
      resolve();
    });
  });
};

export default runServer;
