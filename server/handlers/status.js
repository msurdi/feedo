const express = require("express");
const urls = require("../urls");

const router = express.Router();

router.get(urls.status(), async (req, res) => res.send("ok"));

module.exports = router;
