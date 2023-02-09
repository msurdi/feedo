import { formatDistanceToNowStrict } from "date-fns";
import downsize from "downsize";
import db from "../services/db/index.js";
import { getOldestDate } from "./is-expired.js";

const asArticle = (article) => ({
  ...article,
  excerpt: downsize(article.content, { words: 70, append: "..." }),
  timeAgo: formatDistanceToNowStrict(article.publishedAt),
});

export const getArticle = async (articleId) => {
  const article = await db.article.findUnique({ where: { id: articleId } });
  if (article) {
    return asArticle(article);
  }
  return null;
};

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

export const getAllArticles = async () => {
  const articles = await db.article.findMany();
  return articles.map(asArticle);
};

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

  const articles = await db.article.findMany({
    where: { isRead: false },
    take: pageSize,
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    ...(afterArticleId ? paginationParams : {}),
  });
  return articles.map(asArticle);
};

export const getArticlesByIds = async (articleIds) => {
  const articles = await db.article.findMany({
    where: { id: { in: articleIds } },
  });
  return articles.map(asArticle);
};

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
