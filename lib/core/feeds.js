import db from "../services/db";

export const createFeed = async (feed) => {
  const { result: newFeed, errors } = await db.feed.create({
    data: { ...feed, name: "unknown" },
  });
  return { feed: newFeed ?? feed, errors };
};

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
