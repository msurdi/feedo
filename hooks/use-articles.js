import { useState } from "react";
import { useMount } from "react-use";
import {
  getUnreadArticles,
  markArticleIdAsRead,
} from "../lib/store/articles.js";
import config from "../next.config.js";
import useHandler from "./use-handler.js";
import useSyncArticles from "./use-sync-articles.js";

const {
  serverRuntimeConfig: { unreadPageSize },
} = config;

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = useHandler(async () => {
    setIsLoadingMore(true);
    const lastLoadedArticle = articles.at(-1);

    try {
      const unreadArticlesPage = await getUnreadArticles({
        afterId: lastLoadedArticle?.id ?? "",
        limit: unreadPageSize + 1,
      });
      const hasMoreArticles = unreadArticlesPage.length === unreadPageSize + 1;
      const unreadArticles = unreadArticlesPage.slice(0, 5);

      setHasMore(hasMoreArticles);
      setArticles([...articles, ...unreadArticles]);
    } finally {
      setIsLoadingMore(false);
    }
  });

  const onSynced = useHandler(async () => {
    if (!articles.length) {
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
