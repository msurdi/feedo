const express = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { getUnreadArticles, getArticle } = require("../core/articles");
const urls = require("../urls");
const articlesView = require("../views/articles");
const articleDetailView = require("../views/articles/detail");

const router = express.Router();

router.get(urls.home(), async (req, res) => {
  const unreadArticles = await getUnreadArticles();
  res.send(articlesView({ articles: unreadArticles }).render());
});

router.get(urls.articleDetail(":articleId"), async (req, res) => {
  const { articleId } = req.params;
  const article = await getArticle(articleId);

  if (!article) {
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
  }
  return res.send(articleDetailView({ article }).render());
});

module.exports = router;
