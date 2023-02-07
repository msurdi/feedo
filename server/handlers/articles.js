const express = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const config = require("../config");
const {
  getUnreadArticles,
  getArticle,
  markArticlesAsRead,
  getArticlesByIds,
} = require("../core/articles");
const urls = require("../urls");
const articlesView = require("../views/articles");
const articleDetailView = require("../views/articles/detail");
const articlesList = require("../views/components/articles-list");

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

router.post(urls.markAsRead(), async (req, res) => {
  const { articleIds } = req.body;
  await markArticlesAsRead(articleIds);
  const updatedArticles = await getArticlesByIds(articleIds);
  return res.send(
    articlesList({
      articles: updatedArticles,
    }).render()
  );
});

module.exports = router;
