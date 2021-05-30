const express = require("express");
const { default: StatusCodes } = require("http-status-codes");
const { createFeed, getAllFeeds, removeFeed } = require("../core/feeds");
const urls = require("../urls");
const feedsView = require("../views/feeds");
const newFeedView = require("../views/feeds/new");

const router = express.Router();

router.get(urls.feeds(), async (req, res) => {
  const feeds = await getAllFeeds();
  return res.send(feedsView({ feeds }).render());
});

router.get(urls.newFeed(), async (req, res) =>
  res.send(newFeedView().render())
);

router.post(urls.newFeed(), async (req, res) => {
  const { url } = req.body;

  const { feed, errors } = await createFeed({ url });

  if (errors) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(newFeedView({ feed, errors }).render());
  }

  return res.redirect(urls.feeds());
});

router.post(urls.deleteFeed(":feedId"), async (req, res) => {
  const { feedId } = req.params;
  await removeFeed(feedId);
  return res.redirect(urls.feeds());
});

module.exports = router;
