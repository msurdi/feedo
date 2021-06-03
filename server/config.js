const findRoot = require("find-root");
const dotenv = require("dotenv");
const os = require("os");
const path = require("path");
const fs = require("fs-extra");
const { milliseconds } = require("date-fns");
const randomstring = require("randomstring");

dotenv.config();

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
  port: parseInt(env("PORT") ?? 8080, 10),
  address: env("ADDRESS") ?? "0.0.0.0",
  auth: {
    username: env("USERNAME"),
    password: env("PASSWORD"),
  },
  rootDir,
  dataDir,
  publicRoot: path.resolve(path.join(rootDir, "public")),
  reload: devMode,
  helmet: {
    contentSecurityPolicy: isAuthEnabled && !devMode,
    hsts: isAuthEnabled && !devMode,
  },
  session: {
    name: "s",
    maxAge: milliseconds({ years: 1 }),
    secure: !devMode,
    httpOnly: true,
    keys: [secretKey],
  },
  feedo: {
    oldestArticleDays: 30,
  },
};
module.exports = config;
