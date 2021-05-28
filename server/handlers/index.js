const express = require("express");
const homeHandlers = require("./home");
const statusHandlers = require("./status");

const router = express.Router();

router.use(homeHandlers);
router.use(statusHandlers);

module.exports = router;
