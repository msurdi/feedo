import { filter } from "lodash-es";
import getConfig from "next/config";
import { useState } from "react";
import { useMount } from "react-use";
import {
  getUnreadArticles,
  markArticleIdAsRead,
} from "../lib/store/articles.js";

import useHandler from "./use-handler.js";
import useSyncArticles from "./use-sync-articles.js";

const {
  publicRuntimeConfig: { unreadPageSize },
} = getConfig.default();

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = useHandler(async () => {
    // Do not load more articles in memory if there are enough unreads shown already
    const unreadArticlesLoaded = articles.filter((article) => !article.isRead);
    if (unreadArticlesLoaded.length >= unreadPageSize) {
      return;
    }

    // Start loading more unread articles from local store
    setIsLoadingMore(true);
    const lastLoadedArticle = articles.at(-1);

    try {
      // Get a page of unread articles from local store (+1 to decide if there are still more to load or not)
      const unreadArticlesPage = await getUnreadArticles({
        afterId: lastLoadedArticle?.id ?? "",
        limit: unreadPageSize + 1,
      });

      const hasMoreArticles = unreadArticlesPage.length === unreadPageSize + 1;

      // Take just a page of unreads from the query result
      const unreadArticles = unreadArticlesPage.slice(0, unreadPageSize);

      // Update state with the new articles
      setHasMore(hasMoreArticles);
      setArticles([...articles, ...unreadArticles]);
    } finally {
      setIsLoadingMore(false);
    }
  });

  const onSynced = useHandler(async () => {
    const readArticles = filter(articles, { isRead: true });
    if (readArticles.length < unreadPageSize) {
      loadMore();
    }
  });

  useSyncArticles({ onSynced });

  useMount(loadMore);

  const markAsRead = useHandler(async (readArticle) => {
    await markArticleIdAsRead(readArticle);
    setArticles((currentArticles) =>
      currentArticles.map((currentArticle) =>
        currentArticle.id === readArticle.id
          ? { ...currentArticle, isRead: true }
          : currentArticle
      )
    );
  });
  return { data: articles, markAsRead, loadMore, hasMore, isLoadingMore };
};

export default useArticles;
