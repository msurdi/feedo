import { StatusCodes } from "http-status-codes";
import config from "../config.js";
import { NotFoundError, ValidationError } from "../exceptions.js";

const errorsMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const isJson = req.headers["content-type"] === "application/json";

  if (err instanceof ValidationError) {
    req.flash("errors", err.errors);
    if (isJson) {
      return res.status(StatusCodes.BAD_REQUEST).json(err.errors);
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
