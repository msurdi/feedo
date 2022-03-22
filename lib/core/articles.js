import db from "../services/db";
import { getOldestDate } from "./is-expired";

export const getArticle = async (articleId) =>
  db.article.findUnique({ where: { id: articleId } });

export const putArticle = async ({
  guid,
  link,
  title,
  publishedAt,
  author,
  content,
  commentsLink,
  feedId,
}) =>
  db.article.upsert({
    where: { guid_feedId: { feedId, guid } },
    update: { link, title, content, commentsLink, author, publishedAt },
    create: {
      link,
      title,
      content,
      commentsLink,
      author,
      publishedAt,
      guid,
      Feed: { connect: { id: feedId } },
    },
  });

export const getAllArticles = async () => db.article.findMany();

export const getUnreadArticles = async ({
  afterArticleId,
  pageSize = 10,
} = {}) => {
  const paginationParams = {
    cursor: {
      id: afterArticleId,
    },
    skip: 1,
  };

  return db.article.findMany({
    where: { isRead: false },
    take: pageSize,
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    ...(afterArticleId ? paginationParams : {}),
  });
};

export const getArticlesByIds = async (articleIds) =>
  db.article.findMany({
    where: { id: { in: articleIds } },
  });

export const markArticlesAsRead = async (articleIds) =>
  db.article.updateMany({
    data: { isRead: true },
    where: { id: { in: articleIds } },
  });

export const removeReadAndExpiredArticles = async () => {
  const oldestArticleDate = getOldestDate();
  await db.article.deleteMany({
    where: { isRead: true, publishedAt: { lt: oldestArticleDate } },
  });
};
