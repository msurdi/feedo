import express from "express";
import urls from "../urls.js";

const router = express.Router();

router.get(urls.status(), async (req, res) => res.send("ok"));

export default router;
