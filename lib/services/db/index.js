import Prisma from "@prisma/client";

const { PrismaClient } =
  process.env.NODE_ENV === "test" ? require("@prisma/client") : Prisma;

export default new PrismaClient();
