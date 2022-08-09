jest.useFakeTimers();
jest.mock("./lib/services/logger");
jest.mock("./next.config.js", () => ({
  config: { publicRuntimeConfig: { oldestArticleDays: 1, unreadPageSize: 20 } },
}));
