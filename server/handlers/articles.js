const express = require("express");
const { getUnreadArticles } = require("../core/articles");
const urls = require("../urls");
const articlesView = require("../views/articles");

const router = express.Router();

router.get(urls.home(), async (req, res) => {
  const unreadArticles = await getUnreadArticles();
  res.send(articlesView({ articles: unreadArticles }).render());
});

module.exports = router;
