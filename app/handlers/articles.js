import express from "express";
import html from "html-string";
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
import articleItem from "../views/components/article-item.js";

const router = express.Router();

const {
  feedo: { unreadPageSize },
} = config;

router.get(urls.home(), async (req, res) => {
  const { afterArticleId } = req.query;
  const unreadArticles = await getUnreadArticles({
    afterArticleId,
    pageSize: unreadPageSize,
  });

  res.send(html.render(articlesView({ articles: unreadArticles })));
});

router.get(urls.articleDetail(":articleId"), async (req, res) => {
  const { articleId } = req.params;
  const article = await getArticle(articleId);

  if (!article) {
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
  }

  return res.send(html.render(articleDetailView({ article })));
});

router.post(urls.api.read(), async (req, res) => {
  const articleIds = req.body;

  await markArticlesAsRead(articleIds);

  return res.send({ read: articleIds });
});

router.get(urls.moreArticles(), async (req, res) => {
  const { afterArticleId } = req.query;
  const unreadArticles = await getUnreadArticles({
    afterArticleId,
    pageSize: unreadPageSize,
  });

  res.turboStream
    .append(
      "article-list",
      unreadArticles.map((article) => articleItem({ article }))
    )
    // .replace("more-articles", "")
    .send();
});

export default router;
