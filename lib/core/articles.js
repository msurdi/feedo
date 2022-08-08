import { ulid } from "ulid";
import db from "../services/db/index.js";
import { getOldestDate } from "./is-expired.js";

export const getArticle = async (articleId) =>
  db.article.findUnique({
    where: { id: articleId },
    include: {
      feed: {
        select: {
          name: true,
        },
      },
    },
  });

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
      id: ulid(),
      link,
      title,
      content,
      commentsLink,
      author,
      publishedAt,
      guid,
      feed: { connect: { id: feedId } },
    },
  });

export const getAllArticles = async () => db.article.findMany();

export const getUnreadArticles = async ({ afterId = "", pageSize = 10 } = {}) =>
  db.article.findMany({
    where: { isRead: false, id: { gt: afterId } },
    take: pageSize,
    orderBy: [{ id: "asc" }],
    include: {
      feed: {
        select: {
          name: true,
        },
      },
    },
  });

export const getArticlesByIds = async (articleIds) =>
  db.article.findMany({
    where: { id: { in: articleIds } },
  });

export const markArticlesAsRead = async (lastReadArticleId) =>
  db.article.updateMany({
    data: { isRead: true },
    where: { id: { lte: lastReadArticleId } },
  });

export const removeReadAndExpiredArticles = async () => {
  const oldestArticleDate = getOldestDate();
  await db.article.deleteMany({
    where: { isRead: true, publishedAt: { lt: oldestArticleDate } },
  });
};

export const getLastReadArticle = async () =>
  db.article.findFirst({
    where: { isRead: true },
    orderBy: [{ id: "desc" }],
  });
