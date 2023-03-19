import accepts from "accepts";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import Youch from "youch";
import { ValidationError } from "yup";
import config from "../config.js";
import { NotFoundError } from "../exceptions.js";

export const validationHandler = (handler) => (req, res, next) => {
  req.onValidationErrorHandler = handler;
  return next();
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

    if (isTurbo && req.onValidationErrorHandler) {
      const originalSend = res.send;
      res.send = function send(body) {
        if (!this.statusCode || this.statusCode < 400) {
          this.status(StatusCodes.UNPROCESSABLE_ENTITY);
        }
        return originalSend.call(this, body);
      };

      return req.onValidationErrorHandler(req, res, next);
    }

    return res.redirect("back");
  }

  if (err instanceof NotFoundError) {
    return res.status(StatusCodes.NOT_FOUND);
  }

  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);

    if (config.devMode) {
      const youch = new Youch(err, req);
      const html = await youch.toHTML();

      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, {
        "content-type": "text/html",
      });
      res.write(html);
      return res.end();
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }

  return next();
};

export default errorsMiddleware;
