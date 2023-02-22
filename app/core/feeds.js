/* eslint-disable no-underscore-dangle */
import yup from "yup";
import validate from "../lib/validate.js";
import Article from "../models/article.js";
import Feed from "../models/feed.js";
import { sequelize } from "../services/db.js";
import uniqueValidation from "../validations/unique.js";

const createFeedSchema = yup.object().shape({
  url: yup
    .string()
    .trim()
    .url()
    .required()
    .test(uniqueValidation({ model: Feed, field: "url" })),
});

export const createFeed = async ({ url }) => {
  const values = await validate(createFeedSchema, { url });
  return Feed.create(values);
};

export const getFeed = async (id) => Feed.findOne({ where: { id } });

export const removeFeed = async (id) => {
  const t = await sequelize.transaction();
  await Article.destroy({ where: { feedId: id } }, { transaction: t });
  await Feed.destroy({ where: { id } }, { transaction: t });
  await t.commit();
};

export const getAllFeeds = async () => Feed.findAll();

export const setFeedLastError = async (feedId, lastError) =>
  Feed.update({ lastError }, { where: { id: feedId } });

export const clearFeedLastError = async (feedId) =>
  Feed.update({ lastError: null }, { where: { id: feedId } });
