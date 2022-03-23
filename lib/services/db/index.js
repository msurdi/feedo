import Prisma, { PrismaClient } from "@prisma/client";

const getPrismaClient = () => {
  if (process.env.NODE_ENV === "production") {
    const { PrismaClient: PrismaClientProd } = Prisma;
    return new PrismaClientProd();
  }
  return new PrismaClient();
};

export default getPrismaClient();
