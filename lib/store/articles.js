import { Level } from "level";
import { max } from "lodash-es";
import apiRequest from "../api-request.js";
import isServerSide from "../helpers/is-server-side.js";
import urls from "../urls.js";

const LAST_READ_ID_KEY = "lastReadId";

const articlesStore = !isServerSide
  ? new Level("articles", { valueEncoding: "json" })
  : null;
const metaStore = !isServerSide
  ? new Level("meta", { valueEncoding: "json" })
  : null;

const getLastReadArticle = async () => {
  const [lastReadId] = await metaStore.getMany([LAST_READ_ID_KEY]);
  return lastReadId;
};

const getLastSyncedArticle = async () => {
  const [lastSyncedArticle] = await articlesStore
    .values({
      limit: 1,
      reverse: true,
    })
    .all();
  return lastSyncedArticle;
};

export const saveUnreadArticles = async (articles) => {
  const operations = articles.map((article) => ({
    type: "put",
    key: article.id,
    value: article,
  }));

  return articlesStore.batch(operations);
};

export const markArticleIdAsRead = async (article) => {
  await articlesStore.put(article.id, { ...article, isRead: true });
  await metaStore.put(LAST_READ_ID_KEY, article.id);
};

export const getUnreadArticles = async ({ limit = 20, afterId = "" } = {}) => {
  const lastReadArticleId = await getLastReadArticle();

  const unreadArticles = await articlesStore
    .values({
      gt: max([lastReadArticleId, afterId]),
      limit,
    })
    .all();

  return unreadArticles;
};

const deleteReadArticles = async () => {
  const lastReadArticleId = await getLastReadArticle();
  await articlesStore.clear({ lte: lastReadArticleId });
};

export const sync = async ({ onPageSynced } = {}) => {
  let hasMore = true;
  while (hasMore) {
    const lastReadArticleId = await getLastReadArticle();
    const lastUnreadArticle = await getLastSyncedArticle();
    const response = await apiRequest(urls.syncArticlesApi(), {
      body: { lastReadArticleId, lastSyncedArticleId: lastUnreadArticle?.id },
    });

    if (response.articles?.length) {
      await saveUnreadArticles(response.articles);
      onPageSynced?.();
    }
    if (response.lastReadArticleId) {
      await metaStore.put(LAST_READ_ID_KEY, response.lastReadArticleId);
    }
    hasMore = response.hasMoreUnreadArticles;
  }

  await deleteReadArticles();
};

export const reloadArticles = async (articles) => {
  const reloadedArticles = await articlesStore.getMany(
    articles.map((article) => article.id)
  );
  return reloadedArticles;
};

export const getArticle = async (articleId) => {
  const [article] = await articlesStore.getMany([articleId]);
  return article ?? null;
};
