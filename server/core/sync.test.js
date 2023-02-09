// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeEach, describe, expect, it, vi } from "vitest";
import { putArticle } from "./articles.js";
import { syncFeed } from "./sync.js";

vi.mock("./articles.js", () => ({
  default: vi.fn(),
  putArticle: vi.fn(),
}));

vi.mock("./feeds.js", () => ({
  clearFeedLastError: vi.fn(),
  getAllFeeds: vi.fn(),
  setFeedLastError: vi.fn(),
}));

vi.mock("../lib/find-feeds.js", () => ({
  default: vi.fn((url) => [url]),
}));

vi.mock("rss-parser", () => {
  const item = {
    id: "123",
    title: "Article title",
    author: "John Doe",
    link: "https://example.com/article",
    isoDate: new Date("2021-06-05T15:48:28.305Z"),
    publishedAt: new Date("2021-06-05T15:48:28.305Z"),
    content: "Article content",
  };
  const items = [item];
  const RSSParser = vi.fn();
  RSSParser.prototype.parseURL = vi.fn(() => ({ items }));
  return { default: RSSParser };
});

vi.setSystemTime(new Date("2021-06-05T15:48:28.305Z"));

describe("core/sync", () => {
  beforeEach(async () => {
    await vi.restoreAllMocks();
  });

  it("syncFeed", async () => {
    const feed = {
      id: "feed-id",
      url: "https://example.com/feed.xml",
    };

    await syncFeed(feed);

    expect(putArticle).toBeCalledWith({
      author: "John Doe",
      commentsLink: undefined,
      content: "Article content",
      feedId: "feed-id",
      guid: "123",
      link: "https://example.com/article",
      publishedAt: new Date("2021-06-05T15:48:28.305Z"),
      title: "Article title",
    });
  });
});
