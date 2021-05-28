const express = require("express");
const feedsHandlers = require("./feeds");
const homeHandlers = require("./home");
const statusHandlers = require("./status");

const router = express.Router();

router.use(homeHandlers);
router.use(statusHandlers);
router.use(feedsHandlers);

module.exports = router;
