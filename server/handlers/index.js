import express from "express";
import articlesHandlers from "./articles.js";
import feedsHandlers from "./feeds.js";
import statusHandlers from "./status.js";

const router = express.Router();

router.use(articlesHandlers);
router.use(statusHandlers);
router.use(feedsHandlers);

export default router;
