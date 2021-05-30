const createApp = require("./app");
const config = require("./config");

const runServer = async () => {
  const server = await createApp();
  server.listen(config.port, config.addres, () => {
    // eslint-disable-next-line no-console
    console.log(`Server Ready at http://${config.address}:${config.port}`);
  });
};

module.exports = runServer;
