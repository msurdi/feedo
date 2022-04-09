import feedrat from "feedrat";
import RSSParser from "rss-parser";
import { ValidationError } from "../exceptions";
import logger from "../services/logger";
import { putArticle } from "./articles";
import { clearFeedLastError, getAllFeeds, setFeedLastError } from "./feeds";
import { isExpired } from "./is-expired";

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

const extractArticlesFromFeed = (feedData) => {
  const articles = [];

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
      link: feedItem.link,
      title: feedItem.title,
      author,
      content: feedItem.content || feedItem.summary || "",
      publishedAt: new Date(feedItem.isoDate),
      commentsLink: feedItem.comments,
    };
    articles.push(article);
  }
  return articles;
};

const effectiveFeedurl = async (feedUrl) => {
  const effectiveFeeds = await new Promise((resolve, reject) => {
    feedrat(feedUrl, (err, feeds) => {
      if (err) {
        reject(err);
      } else {
        resolve(feeds);
      }
    });
  });

  if (!effectiveFeeds || !effectiveFeeds.length) {
    throw new ValidationError({ url: "No feeds found" });
  }
  return effectiveFeeds[0];
};

export const fetchFeed = async (feedUrl) => {
  const parser = new RSSParser();
  const effectiveFeedUrl = await effectiveFeedurl(feedUrl);
  const feedData = await parser.parseURL(effectiveFeedUrl);
  const articles = extractArticlesFromFeed(feedData);
  return articles;
};

export const syncFeed = async (feed) => {
  try {
    logger.info(`Syncing ${feed.url}`);
    const articles = await fetchFeed(feed.url);
    for (const article of articles) {
      await putArticle({
        ...article,
        feedId: feed.id,
        link: new URL(article.link, feed.url).href,
      });
    }
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

export const syncAllFeeds = async () => {
  const feeds = await getAllFeeds();
  logger.info(`Starting sync of ${feeds.length} feeds`);
  for (const feed of feeds) {
    await syncFeed(feed);
  }
  logger.info("Sync completed");
};
