const cheerio = require("cheerio");
const contentType = require("content-type");
const { join } = require("path");
const userAgents = require("top-user-agents");

/**
 * List of content types that are considered to be feeds.
 */
const FEED_CONTENT_TYPES = [
  "application/rss+xml",
  "application/atom+xml",
  "application/xml",
  "text/xml",
];

/**
 * List of content types that are considered to be HTML pages that may contain feed links.
 */
const DISCOVERABLE_CONTENT_TYPES = ["text/html", "application/xhtml+xml"];

/**
 * List of possible feed endpoints.
 */
const POSSIBLE_FEED_ENDPOINTS = [
  "/feed.xml",
  "/rss.xml",
  "/atom.xml",
  "/feed",
  "/rss",
  "/atom",
];

/**
 * Try to extract feed URLs from text.
 *
 * @param {string} contentUrl URL of the content.
 * @param {string} content  Content to parse.
 * @returns {string[]} List of feed URLs.
 */
const findFeedsInContent = async (contentUrl, content) => {
  const $ = cheerio.load(content);

  const extractHrefs = (el) => $(el).attr("href");

  const ensureAbsoluteUrls = (href) => {
    if (!href.startsWith("http://") || !href.startsWith("https://")) {
      return new URL(href, contentUrl).toString();
    }
    return href;
  };

  const linkElements = await $(
    FEED_CONTENT_TYPES.map((type) => `link[type~="${type}"]`).join(", ")
  ).get();

  const links = linkElements.map(extractHrefs).map(ensureAbsoluteUrls);

  return links;
};

/**
 * Try to fetch a URL and extract feed URLs from the response. If the response
 * looks like an actual feed, then just return the provided url as the feed.
 *
 * @param {string} url URL to fetch.
 * @returns {string[]} List of feed URLs.
 */
const tryUrl = async (url) => {
  const response = await fetch(url, {
    redirect: "follow",
    follow: 3,
    headers: { "User-Agent": userAgents[0] },
  });

  const responseContentType = contentType.parse(
    response.headers.get("content-type")
  ).type;

  if (FEED_CONTENT_TYPES.includes(responseContentType)) {
    return [url];
  }

  if (DISCOVERABLE_CONTENT_TYPES.includes(responseContentType)) {
    return findFeedsInContent(url, await response.text());
  }
  return [];
};

/**
 * Find feeds (their URLs) for a given URL.
 * For example, by providing a blog URL such as https://blog.example.com, it will try to find the feed URLs
 * and might return a list containing https://blog.example.com/posts.xml and https://blog.example.com/comments.xml.
 *
 * @param {string} url URL to find feeds for.
 * @returns {string[]} List of feed URLs.
 */
const findFeeds = async (url) => {
  const basePath = new URL(url).pathname;
  const discoverURLS = [
    url,
    ...POSSIBLE_FEED_ENDPOINTS.map((path) =>
      new URL(join(basePath, path), url).toString()
    ),
  ];

  for (const discoverURL of discoverURLS) {
    const feedUrls = await tryUrl(discoverURL);
    if (feedUrls.length) {
      return feedUrls;
    }
  }

  return [];
};

module.exports = findFeeds;
