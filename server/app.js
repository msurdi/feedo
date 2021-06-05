require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");
const config = require("./config");
const logger = require("./services/logger");
const handlers = require("./handlers");
const urls = require("./urls");
const authMiddleware = require("./middlewares/auth");

module.exports = async () => {
  const app = express();
  const csrfProtection = csurf({ cookie: true });

  app.set("trust proxy", true);

  app.use(authMiddleware({ excludeUrls: [urls.status()] }));
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
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    const livereload = require("livereload");
    const livereloadServer = livereload.createServer({
      port: 8088,
      applyCSSLive: false,
    });
    livereloadServer.watch(config.publicRoot);
    livereloadServer.server.once("connection", () => {
      setTimeout(() => {
        livereloadServer.refresh("/");
      }, 100);
    });

    // eslint-disable-next-line no-console
    console.info("Auto reloading enabled");
  }
  return app;
};
