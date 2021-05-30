require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const reload = require("reload");
const helmet = require("helmet");
const compression = require("compression");
const basicAuth = require("express-basic-auth");
const config = require("./config");
const logger = require("./services/logger");
const handlers = require("./handlers");
const urls = require("./urls");

module.exports = async () => {
  const app = express();

  app.set("trust proxy", true);
  const { username, password } = config.auth;
  if (username || password) {
    app.use(
      basicAuth({
        users: { [username]: password },
        challenge: true,
      })
    );
  }
  app.use(compression());
  app.use(morgan("combined", { stream: logger.stream }));
  app.use(helmet(config.helmet));
  app.use(urls.public(), express.static(config.publicRoot));
  app.use(express.urlencoded({ extended: true }));
  app.use(handlers);

  if (config.reload) {
    await reload(app);
    // eslint-disable-next-line no-console
    console.info("Auto reloading enabled");
  }
  return app;
};
