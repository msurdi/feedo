import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import {
  getLastReadArticle,
  getUnreadArticles,
  markArticlesAsRead,
} from "../../../lib/core/articles.js";
import authenticate from "../../../lib/middleware/authenticate.js";
import handle from "../../../lib/middleware/handle.js";
import { config } from "../../../next.config.js";

const {
  publicRuntimeConfig: { syncPageSize },
} = config;

const syncSchema = yup.object().shape({
  lastReadArticleId: yup.string().trim(),
  lastSyncedArticleId: yup.string().trim(),
});

const post = async (req, res) => {
  const { lastReadArticleId, lastSyncedArticleId } = await syncSchema.validate(
    req.body,
    {
      abortEarly: false,
    }
  );

  if (lastReadArticleId) {
    await markArticlesAsRead(lastReadArticleId);
  }

  const articlesPage = await getUnreadArticles({
    afterId: lastSyncedArticleId,
    pageSize: syncPageSize + 1,
  });

  const hasMoreUnreadArticles = articlesPage.length >= syncPageSize;
  const articles = articlesPage.slice(0, syncPageSize);
  const lastReadArticle = await getLastReadArticle();

  return res.status(StatusCodes.OK).json({
    articles,
    lastReadArticleId: lastReadArticle?.id,
    hasMoreUnreadArticles,
  });
};

export default authenticate(handle({ post }));
