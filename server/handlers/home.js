const express = require("express");
const urls = require("../urls");
const homeView = require("../views/home");

const router = express.Router();

router.get(urls.home(), async (req, res) => res.send(homeView().render()));

module.exports = router;
