const createApp = require("./app");
const config = require("./config");

const main = async () => {
  const server = await createApp();
  server.listen(config.port, config.addres, () => {
    // eslint-disable-next-line no-console
    console.log(`Server Ready at http://${config.address}:${config.port}`);
  });
};

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.trace(e);
  process.exit(1);
});
