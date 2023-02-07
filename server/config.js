const findRoot = require("find-root");
const os = require("os");
const path = require("path");
const fs = require("fs-extra");
const { milliseconds } = require("date-fns");
const randomstring = require("randomstring");

const homedir = os.homedir();

// Ensure a default database is set for Prisma to work
if (!process.env.FEEDO_DATABASE_URL) {
  process.env.FEEDO_DATABASE_URL = `file:${homedir}/.feedo.db`;
}

const env = (name) => {
  const normalizedName = name.toUpperCase();
  const appSpecificEnv = `FEEDO_${normalizedName}`;
  return process.env[appSpecificEnv] ?? process.env[normalizedName];
};

const rootDir = findRoot(__dirname);
const defaultDataDir = path.join(os.homedir(), ".feedo");
const dataDir = env("DATA_DIR") ?? defaultDataDir;
fs.ensureDirSync(dataDir);

const devMode = env("NODE_ENV") === "development";
const secretKey = env("SECRET_KEY") ?? randomstring.generate();
const isAuthEnabled = !!(env("USERNAME") || env("PASSWORD"));

const config = {
  port: parseInt(env("PORT"), 10) || 8080,
  address: env("ADDRESS") ?? "127.0.0.1",
  auth: {
    username: env("USERNAME"),
    password: env("PASSWORD"),
  },
  rootDir,
  dataDir,
  dbUrl: env("DATABASE_URL"),
  publicRoot: path.resolve(path.join(rootDir, "public")),
  helmet: {
    contentSecurityPolicy: isAuthEnabled && !devMode,
    hsts: isAuthEnabled && !devMode,
  },
  session: {
    name: "s",
    maxAge: milliseconds({ years: 1 }),
    secure: !devMode,
    httpOnly: true,
    sameSite: "lax",
    keys: [secretKey],
  },
  feedo: {
    oldestArticleDays: 30,
    unreadPageSize: 10,
  },
};
module.exports = config;
