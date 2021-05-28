const express = require("express");
const urls = require("../urls");
const feedsView = require("../views/feeds");

const router = express.Router();

router.get(urls.feeds(), async (req, res) => res.send(feedsView().render()));

module.exports = router;
