import { Op } from "sequelize";
import Article from "../models/article.js";
import { getOldestDate } from "./is-expired.js";

export const getArticle = async (articleId) =>
  Article.findOne({ where: { id: articleId } });

export const putArticle = async ({
  guid,
  link,
  title,
  publishedAt,
  author,
  content,
  commentsLink,
  feedId,
}) => {
  const [article] = await Article.upsert({
    link,
    title,
    content,
    commentsLink,
    author,
    publishedAt,
    feedId,
    guid,
  });
  return article;
};

export const getAllArticles = async () => Article.findAll();

export const getUnreadArticles = async ({
  afterArticleId,
  pageSize = 10,
} = {}) =>
  Article.findAll({
    where: {
      isRead: false,
      id: {
        [Op.gt]: afterArticleId ?? 0,
      },
    },
    order: [["id", "ASC"]],
    limit: pageSize,
  });

export const getArticlesByIds = async (articleIds) =>
  Article.findAll({
    where: { id: { [Op.in]: articleIds } },
  });

export const markArticlesAsRead = async (articleIds) => {
  Article.update(
    {
      isRead: true,
    },
    {
      where: { id: { [Op.in]: articleIds } },
    }
  );
};

export const removeReadAndExpiredArticles = async () => {
  const oldestArticleDate = getOldestDate();

  await Article.destroy({
    where: {
      isRead: true,
      publishedAt: { [Op.lt]: oldestArticleDate },
    },
    force: true,
  });
};
