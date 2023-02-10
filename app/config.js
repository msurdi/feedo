import { milliseconds } from "date-fns";
import findRoot from "find-root";
import fs from "fs-extra";
import os from "os";
import path from "path";
import randomstring from "randomstring";

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

const rootDir = findRoot(import.meta.url);
const defaultDataDir = path.join(os.homedir(), ".feedo");
const dataDir = env("DATA_DIR") ?? defaultDataDir;
fs.ensureDirSync(dataDir);

const devMode = env("NODE_ENV") === "development";
const secretKey = env("SECRET_KEY") ?? randomstring.generate();
const isAuthEnabled = !!(env("USERNAME") || env("PASSWORD"));

const config = {
  devMode,
  port: parseInt(env("PORT"), 10) || 8080,
  address: env("ADDRESS") ?? "localhost",
  auth: {
    username: env("USERNAME"),
    password: env("PASSWORD"),
  },
  rootDir,
  dataDir,
  dbUrl: env("DATABASE_URL"),
  reloadFile: path.join(rootDir, ".reload"),
  publicRoot: path.resolve(path.join(rootDir, "public")),
  helmet: {
    crossOriginEmbedderPolicy: !devMode,
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

export default config;
