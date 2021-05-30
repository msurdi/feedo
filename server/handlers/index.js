const express = require("express");
const feedsHandlers = require("./feeds");
const articlesHandlers = require("./articles");
const statusHandlers = require("./status");

const router = express.Router();

router.use(articlesHandlers);
router.use(statusHandlers);
router.use(feedsHandlers);

module.exports = router;
