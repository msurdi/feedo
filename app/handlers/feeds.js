import express from "express";
import { createFeed, getAllFeeds, removeFeed } from "../core/feeds.js";
import { validationHandler } from "../middlewares/errors.js";
import urls from "../urls.js";
import feedsView from "../views/feeds.js";
import newFeedView from "../views/feeds/new.js";

const router = express.Router();

router.get(urls.feeds(), async (req, res) => {
  const feeds = await getAllFeeds();

  return res.send(feedsView({ req, feeds }).render());
});

const getNewFeed = async (req, res) =>
  res.send(
    newFeedView({
      values: req.flash("values"),
      errors: req.flash("errors"),
    }).render()
  );

router.get(urls.newFeed(), getNewFeed);

router.post(urls.newFeed(), validationHandler(getNewFeed), async (req, res) => {
  const { url } = req.body;

  await createFeed({ url });

  return res.redirect(urls.feeds());
});

router.post(urls.deleteFeed(":feedId"), async (req, res) => {
  const { feedId } = req.params;

  await removeFeed(feedId);

  return res.redirect(urls.feeds());
});

export default router;
