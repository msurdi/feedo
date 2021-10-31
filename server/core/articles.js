const { formatDistanceToNowStrict } = require("date-fns");
const downsize = require("downsize");
const db = require("../services/db");
const { getOldestDate } = require("./is-expired");

const asArticle = (article) => ({
  ...article,
  excerpt: downsize(article.content, { words: 70, append: "..." }),
  timeAgo: formatDistanceToNowStrict(article.publishedAt),
});

const getArticle = async (articleId) => {
  const article = await db.article.findUnique({ where: { id: articleId } });
  if (article) {
    return asArticle(article);
  }
  return null;
};

const putArticle = async ({
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

const getAllArticles = async () => {
  const articles = await db.article.findMany();
  return articles.map(asArticle);
};

const getUnreadArticles = async ({ afterArticleId, pageSize = 10 } = {}) => {
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

const getArticlesByIds = async (articleIds) => {
  const articles = await db.article.findMany({
    where: { id: { in: articleIds } },
  });
  return articles.map(asArticle);
};

const markArticlesAsRead = async (articleIds) =>
  db.article.updateMany({
    data: { isRead: true },
    where: { id: { in: articleIds } },
  });

const removeReadAndExpiredArticles = async () => {
  const oldestArticleDate = getOldestDate();
  await db.article.deleteMany({
    where: { isRead: true, publishedAt: { lt: oldestArticleDate } },
  });
};

module.exports = {
  getArticle,
  putArticle,
  getAllArticles,
  getUnreadArticles,
  markArticlesAsRead,
  removeReadAndExpiredArticles,
  getArticlesByIds,
};
