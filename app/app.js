import compression from "compression";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config.js";
import handlers from "./handlers/index.js";
import authMiddleware from "./middlewares/auth.js";
import errorsMiddleware from "./middlewares/errors.js";
import flashMiddleware from "./middlewares/flash.js";
import turboMiddleware from "./middlewares/turbo.js";
import logger from "./services/logger.js";
import urls from "./urls.js";

export default async () => {
  const app = express();

  app.set("trust proxy", true);

  app.use(turboMiddleware());
  app.use(authMiddleware({ excludeUrls: [urls.status()] }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cookieSession(config.session));
  app.use(flashMiddleware());
  app.use(compression());
  app.use(morgan("combined", { stream: logger.stream }));
  app.use(helmet(config.helmet));
  app.use(urls.public(), express.static(config.publicRoot));
  app.use(handlers);
  app.use(errorsMiddleware);

  return app;
};
