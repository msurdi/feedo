import { useCallback, useEffect, useState } from "react";
import {
  getUnreadArticles,
  markArticleIdAsRead,
} from "../lib/store/articles.js";
import config from "../next.config.js";
import useSyncArticles from "./use-sync-articles.js";

const {
  serverRuntimeConfig: { unreadPageSize },
} = config;

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = useCallback(async () => {
    setIsLoadingMore(true);
    try {
      const unreadArticles = await getUnreadArticles({
        limit: unreadPageSize + 1,
      });
      const hasMoreArticles = unreadArticles.length === unreadPageSize + 1;
      setHasMore(hasMoreArticles);
      setArticles(
        hasMoreArticles ? unreadArticles.slice(0, -1) : unreadArticles
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, []);

  const onSynced = useCallback(async () => {
    if (!articles.length) {
      loadMore();
    }
  }, [articles.length, loadMore]);

  useSyncArticles({ onSynced });

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  const markAsRead = useCallback(async (readArticle) => {
    await markArticleIdAsRead(readArticle);
    setArticles((currentArticles) =>
      currentArticles.map((currentArticle) =>
        currentArticle.id === readArticle.id
          ? { ...currentArticle, isRead: true }
          : currentArticle
      )
    );
  }, []);

  return { data: articles, markAsRead, loadMore, hasMore, isLoadingMore };
};

export default useArticles;
