import express from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import config from "../config.js";
import {
  getArticle,
  getUnreadArticles,
  markArticlesAsRead,
} from "../core/articles.js";
import urls from "../urls.js";
import articlesView from "../views/articles.js";
import articleDetailView from "../views/articles/detail.js";

const router = express.Router();

const {
  feedo: { unreadPageSize },
} = config;

router.get(urls.home(), async (req, res) => {
  const { afterArticleId } = req.query;
  const unreadArticles = await getUnreadArticles({
    afterArticleId,
    pageSize: unreadPageSize + 1,
  });
  const hasMoreArticles = unreadArticles.length === unreadPageSize + 1;

  if (hasMoreArticles) {
    unreadArticles.pop();
  }

  res.send(
    articlesView({ req, articles: unreadArticles, hasMoreArticles }).render()
  );
});

router.get(urls.articleDetail(":articleId"), async (req, res) => {
  const { articleId } = req.params;
  const article = await getArticle(articleId);

  if (!article) {
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
  }

  return res.send(articleDetailView({ article }).render());
});

router.post(urls.api.read(), async (req, res) => {
  const { articleIds } = req.body;

  await markArticlesAsRead(articleIds);

  return res.send({ markedAsRead: articleIds });
});

export default router;
