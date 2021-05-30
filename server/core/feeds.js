/* eslint-disable no-underscore-dangle */
const yup = require("yup");
const validate = require("../lib/validate");
const withPrismaErrors = require("../lib/with-prisma-errors");
const db = require("../services/db");

const createFeedSchema = yup.object().shape({
  url: yup.string().trim().url().required(),
});

const createFeed = async ({ url }) => {
  const { values: feed, errors: validationErrors } = await validate(
    createFeedSchema,
    { url }
  );
  if (validationErrors) {
    return { feed, errors: validationErrors };
  }
  const { result: newFeed, errors } = await withPrismaErrors(
    db.feed.create({
      data: { ...feed, name: "unknown" },
    })
  );
  return { feed: newFeed ?? feed, errors };
};

const getFeed = async (id) => db.feed.findUnique({ where: { id } });

const removeFeed = async (id) => {
  const deleteFeedArticles = db.article.deleteMany({ where: { feedId: id } });
  const deleteFeed = db.feed.delete({ where: { id } });
  await db.$transaction([deleteFeedArticles, deleteFeed]);
};

const getAllFeeds = async () => db.feed.findMany();

const setFeedLastError = async (feedId, lastError) =>
  db.feed.update({ where: { id: feedId }, data: { lastError } });

const clearFeedLastError = async (feedId) =>
  db.feed.update({ where: { id: feedId }, data: { lastError: null } });

module.exports = {
  createFeed,
  getFeed,
  removeFeed,
  getAllFeeds,
  setFeedLastError,
  clearFeedLastError,
};
