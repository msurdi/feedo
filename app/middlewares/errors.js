import accepts from "accepts";
import { StatusCodes } from "http-status-codes";
import config from "../config.js";
import { NotFoundError, ValidationError } from "../exceptions.js";

const handleInternalRedirect = (req, res) => {
  req.url = req.headers.referer;
  req.method = "GET";

  const originalSend = res.send;
  res.send = function send(body) {
    if (!this.statusCode || this.statusCode < 400) {
      this.status(StatusCodes.UNPROCESSABLE_ENTITY);
    }
    return originalSend.call(this, body);
  };

  return req.app.handle(req, res);
};

const errorsMiddleware = async (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const isJson = req.headers["content-type"] === "application/json";
  const isTurbo = accepts(req).type(["text/vnd.turbo-stream.html"]) !== false;

  if (err instanceof ValidationError) {
    req.flash("errors", err.errors);
    req.flash("values", req.body);

    if (isJson) {
      return res.status(StatusCodes.BAD_REQUEST).json(err.errors);
    }

    if (isTurbo) {
      return handleInternalRedirect(req, res);
    }

    return res.redirect("back");
  }

  if (err instanceof NotFoundError) {
    return res.status(StatusCodes.NOT_FOUND);
  }

  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);

    const message = config.devMode ? err.message : "Internal Server Error";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }

  return next();
};

export default errorsMiddleware;
