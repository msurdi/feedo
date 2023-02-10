/* eslint-disable import/no-extraneous-dependencies */
import { fileURLToPath } from "url";
import { vi } from "vitest";

const rootDir = fileURLToPath(import.meta.url);

vi.mock("./app/services/logger.js", () => ({
  default: {
    info: vi.fn(),
    warning: vi.fn(),
    error: vi.fn(),
  },
}));
vi.useFakeTimers();

vi.mock("./app/config.js", () => ({
  default: {
    port: 8080,
    address: "0.0.0.0",
    auth: {
      username: "unittestuser",
      password: "unittestpassword",
    },
    rootDir,
    dataDir: `${rootDir}/data`,
    publicRoot: `${rootDir}/public`,
    reload: false,
    helmet: {
      contentSecurityPolicy: false,
      hsts: false,
    },
    session: {
      name: "s",
      maxAge: 300000,
      secure: false,
      httpOnly: true,
      keys: ["SECRET"],
    },
    feedo: {
      oldestArticleDays: 10,
    },
  },
}));
