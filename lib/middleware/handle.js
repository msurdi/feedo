import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { StatusCodes } from "http-status-codes";
import { ValidationError as YupValidationError } from "yup";
import { config } from "../../next.config.js";
import { ValidationError } from "../exceptions.js";

const {
  serverRuntimeConfig: { isDevelopment },
} = config;

const mapYupErrors = (yupError) => {
  const errorsMap = {};
  for (const error of yupError.inner) {
    errorsMap[error.path] ||= error.message;
  }
  return errorsMap;
};

const errorHandler = (err, req, res) => {
  if (err instanceof YupValidationError) {
    const errors = mapYupErrors(err);
    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }

  if (err instanceof ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: err.errors });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: { [err.meta.target[0]]: "Already exists" } });
    }
  }

  // eslint-disable-next-line no-console
  console.error(err);

  const message = isDevelopment ? err.message : "Internal Server Error";
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};
const handle = (handlers) => async (req, res) => {
  const method = req.method.toLowerCase();
  const handler = method === "delete" ? handlers.del : handlers[method];
  if (!handler) {
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send({ error: "Method not allowed" });
  }
  try {
    await handler(req, res);
  } catch (err) {
    errorHandler(err, req, res);
  }
  return null;
};

export default handle;
