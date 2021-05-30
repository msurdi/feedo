const RSSParser = require("rss-parser");
const logger = require("../services/logger");
const { putArticle } = require("./articles");
const {
  clearFeedLastError,
  getAllFeeds,
  setFeedLastError,
} = require("./feeds");
const { isExpired } = require("./is-expired");

const processFeed = async (feed) => {
  const processFeedItems = async (feedData) => {
    for (const feedItem of feedData.items) {
      const articleId = feedItem.id ?? feedItem.guid ?? feedItem.link;
      const author = feedItem.author || feedItem.creator;
      const publishedAtDate = new Date(feedItem.isoDate);

      if (isExpired(publishedAtDate)) {
        logger.info(`Skipping sync of old article (${publishedAtDate})`);
        continue;
      }

      const article = {
        guid: articleId,
        link: feedItem.link,
        title: feedItem.title,
        author: author ? author.toString() : null,
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
    const feedData = await parser.parseURL(feed.url);
    logger.info(`Syncing ${feedData.items.length} articles from ${feed.url}`);
    await processFeedItems(feedData);
    if (feed.lastError) {
      await clearFeedLastError(feed.id);
    }
  } catch (error) {
    if (error.message.match(/Status code (4|5).*/)) {
      await setFeedLastError(feed.id, error.message);
    } else {
      throw error;
    }
  }
};

// eslint-disable-next-line import/prefer-default-export
const syncAllFeeds = async () => {
  const feeds = await getAllFeeds();
  logger.info(`Starting sync of ${feeds.length} feeds`);
  for (const feed of feeds) {
    await processFeed(feed);
  }
  logger.info("Sync completed");
};

module.exports = { syncAllFeeds };
