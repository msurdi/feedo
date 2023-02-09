/* eslint-disable no-underscore-dangle */
import yup from "yup";
import validate from "../lib/validate.js";
import withPrismaErrors from "../lib/with-prisma-errors.js";
import db from "../services/db/index.js";

const createFeedSchema = yup.object().shape({
  url: yup.string().trim().url().required(),
});

export const createFeed = async ({ url }) => {
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
