const RSSParser = require("rss-parser");
const logger = require("../services/logger");
const { putArticle } = require("./articles");
const {
  clearFeedLastError,
  getAllFeeds,
  setFeedLastError,
} = require("./feeds");
const { isExpired } = require("./is-expired");

const getAuthorFromFeedItem = (feedItem) => {
  if (typeof feedItem?.author === "string") {
    return feedItem.author;
  }
  if (typeof feedItem?.creator === "string") {
    return feedItem.creator;
  }

  if (Array.isArray(feedItem?.author?.name)) {
    return feedItem.author.name.join(", ");
  }
  return null;
};

const processFeed = async (feed) => {
  const processFeedItems = async (feedData) => {
    for (const feedItem of feedData.items) {
      const articleId = feedItem.id ?? feedItem.guid ?? feedItem.link;
      const author = getAuthorFromFeedItem(feedItem);
      const publishedAtDate = new Date(feedItem.isoDate);

      if (isExpired(publishedAtDate)) {
        logger.info(`Skipping sync of old article (${publishedAtDate})`);
        continue;
      }

      const article = {
        guid: articleId,
        link: new URL(feedItem.link, feed.url).href,
        title: feedItem.title,
        author,
        content: feedItem.content || feedItem.summary || "",
        publishedAt: feedItem.isoDate,
        commentsLink: feedItem.comments,
        feedId: feed.id,
      };
      await putArticle(article);
    }
  };

  const parser = new RSSParser();

  try {
    logger.info(`Syncing ${feed.url}`);
    const feedData = await parser.parseURL(feed.url);
    await processFeedItems(feedData);
    if (feed.lastError) {
      await clearFeedLastError(feed.id);
    }
  } catch (error) {
    if (
      error.message.match(/Status code (4|5).*/) ||
      error.message.match(/Invalid character/)
    ) {
      logger.error(`Failed syncing ${feed.url}: ${error.message}`);
      await setFeedLastError(feed.id, error.message);
    } else {
      throw error;
    }
  }
};

const syncAllFeeds = async () => {
  const feeds = await getAllFeeds();
  logger.info(`Starting sync of ${feeds.length} feeds`);
  for (const feed of feeds) {
    await processFeed(feed);
  }
  logger.info("Sync completed");
};

module.exports = { syncAllFeeds, processFeed };
