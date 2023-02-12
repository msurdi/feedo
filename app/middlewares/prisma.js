import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { ValidationError } from "../exceptions.js";

const getErrorMessageFromPrismaCode = (prismaCode) => {
  switch (prismaCode) {
    case "P2002":
      return "Already exists";
    default:
      return "Invalid value";
  }
};

const prismaMiddleware = (err, req, res, next) => {
  if (err instanceof PrismaClientKnownRequestError) {
    const {
      code,
      meta: {
        target: [field],
      },
    } = err;
    const message = getErrorMessageFromPrismaCode(code);
    return next(new ValidationError().add(field, message));
  }

  return next(err);
};

export default prismaMiddleware;
