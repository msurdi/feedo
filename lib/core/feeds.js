import { ulid } from "ulid";
import db from "../services/db/index.js";

export const createFeed = async ({ url, name }) =>
  db.feed.create({
    data: { id: ulid(), url, name },
  });

export const getFeed = async (id) => db.feed.findUnique({ where: { id } });

export const removeFeed = async (id) => {
  const deleteFeedArticles = db.article.deleteMany({ where: { feedId: id } });
  const deleteFeed = db.feed.delete({ where: { id } });
  await db.$transaction([deleteFeedArticles, deleteFeed]);
};

export const getAllFeeds = async () => db.feed.findMany();

export const setFeedLastError = async (feedId, lastError) =>
  db.feed.update({ where: { id: feedId }, data: { lastError } });

export const clearFeedLastError = async (feedId) =>
  db.feed.update({ where: { id: feedId }, data: { lastError: null } });
