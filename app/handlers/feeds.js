import express from "express";
import { StatusCodes } from "http-status-codes";
import { createFeed, getAllFeeds, removeFeed } from "../core/feeds.js";
import urls from "../urls.js";
import feedsView from "../views/feeds.js";
import newFeedView from "../views/feeds/new.js";

const router = express.Router();

router.get(urls.feeds(), async (req, res) => {
  const feeds = await getAllFeeds();
  return res.send(feedsView({ req, feeds }).render());
});

router.get(urls.newFeed(), async (req, res) =>
  res.send(newFeedView({ req }).render())
);

router.post(urls.newFeed(), async (req, res) => {
  const { url } = req.body;

  const { feed, errors } = await createFeed({ url });

  if (errors) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(newFeedView({ req, feed, errors }).render());
  }

  return res.redirect(urls.feeds());
});

router.post(urls.deleteFeed(":feedId"), async (req, res) => {
  const { feedId } = req.params;
  await removeFeed(feedId);
  return res.redirect(urls.feeds());
});

export default router;
