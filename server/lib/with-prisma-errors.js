const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

const getErrorMessageFromPrismaCode = (prismaCode) => {
  switch (prismaCode) {
    case "P2002":
      return "Already exists";
    default:
      return "Invalid value";
  }
};

const withPrismaErrors = async (prismaQuery) => {
  try {
    const result = await prismaQuery;
    return { result, errors: null };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      const {
        code,
        meta: {
          target: [field],
        },
      } = err;
      console.log("--------------------", err);
      const message = getErrorMessageFromPrismaCode(code);
      return { result: null, errors: { [field]: [message] } };
    }
    throw err;
  }
};

module.exports = withPrismaErrors;
