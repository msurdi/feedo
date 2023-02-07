require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const config = require("./config");
const logger = require("./services/logger");
const handlers = require("./handlers");
const urls = require("./urls");
const authMiddleware = require("./middlewares/auth");

module.exports = async () => {
  const app = express();

  app.set("trust proxy", true);

  app.use(authMiddleware({ excludeUrls: [urls.status()] }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cookieSession(config.session));
  app.use(compression());
  app.use(morgan("combined", { stream: logger.stream }));
  app.use(helmet(config.helmet));
  app.use(urls.public(), express.static(config.publicRoot));
  app.use(handlers);

  return app;
};
