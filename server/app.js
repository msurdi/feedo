require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const reload = require("reload");
const helmet = require("helmet");
const compression = require("compression");
const basicAuth = require("express-basic-auth");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");
const config = require("./config");
const logger = require("./services/logger");
const handlers = require("./handlers");
const urls = require("./urls");

module.exports = async () => {
  const app = express();
  const csrfProtection = csurf({ cookie: true });

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
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cookieSession(config.session));
  app.use(csrfProtection);
  app.use(compression());
  app.use(morgan("combined", { stream: logger.stream }));
  app.use(helmet(config.helmet));
  app.use(urls.public(), express.static(config.publicRoot));
  app.use(handlers);

  if (config.reload) {
    await reload(app);
    // eslint-disable-next-line no-console
    console.info("Auto reloading enabled");
  }
  return app;
};
