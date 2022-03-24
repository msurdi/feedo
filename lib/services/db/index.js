import PrismaImport from "@prisma/client";

const getPrismaClient = () => {
  if (PrismaImport?.PrismaClient) {
    return new PrismaImport.PrismaClient();
  }
  // eslint-disable-next-line global-require
  const PrismaRequire = require("@prisma/client");
  return new PrismaRequire.PrismaClient();
};

export default getPrismaClient();
