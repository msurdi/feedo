import createApp from "./app.js";
import config from "./config.js";

const runServer = async () => {
  const server = await createApp();
  server.listen(config.port, config.addres, () => {
    // eslint-disable-next-line no-console
    console.log(`Server Ready at http://${config.address}:${config.port}`);
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
