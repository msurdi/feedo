const express = require("express");
const urls = require("../urls");
const feedsView = require("../views/feeds");
const newFeedView = require("../views/feeds/new");

const router = express.Router();

router.get(urls.feeds(), async (req, res) => res.send(feedsView().render()));

router.get(urls.newFeed(), async (req, res) =>
  res.send(newFeedView().render())
);

module.exports = router;
