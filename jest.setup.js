jest.mock("./lib/services/logger");
jest.useFakeTimers();

jest.mock("./server/config", () => ({
  port: 8080,
  address: "0.0.0.0",
  auth: {
    username: "unittestuser",
    password: "unittestpassword",
  },
  rootDir: __dirname,
  dataDir: `${__dirname}/data`,
  publicRoot: `${__dirname}/public`,
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
}));
