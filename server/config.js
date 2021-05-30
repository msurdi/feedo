const findRoot = require("find-root");
const dotenv = require("dotenv");
const os = require("os");
const path = require("path");
const fs = require("fs-extra");

dotenv.config();

const env = (name) => {
  const normalizedName = name.toUpperCase();
  const appSpecificEnv = `MP_${normalizedName}`;
  return process.env[appSpecificEnv] ?? process.env[normalizedName];
};

const rootDir = findRoot(__dirname);
const defaultDataDir = path.join(os.homedir(), ".feedo");
const dataDir = env("DATA_DIR") ?? defaultDataDir;
fs.ensureDirSync(dataDir);

const devMode = env("NODE_ENV") === "development";

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
    contentSecurityPolicy: !devMode,
  },
  feedo: {
    oldestArticleDays: 30,
  },
};
module.exports = config;
