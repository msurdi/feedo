import { useCallback, useRef, useState } from "react";
import useApi from "../hooks/use-api.js";
import urls from "../lib/urls.js";
import ArticleItem from "./article-item.jsx";
import IntersectionObserver from "./intersection-observer.jsx";
import NoSsr from "./no-ssr.jsx";

const ReadableArticleItem = ({ article }) => {
  const intersectionRef = useRef(null);
  const [isRead, setIsRead] = useState(article.isRead);
  const { put } = useApi();

  const handleOnExit = useCallback(() => {
    setIsRead(true);
    put(urls.articleApi(article.id), { isRead: true });
  }, [article.id, put]);

  return (
    <div ref={intersectionRef}>
      <NoSsr>
        {!article.isRead && (
          <IntersectionObserver
            intersectionRef={intersectionRef}
            onExitTop={handleOnExit}
          />
        )}
      </NoSsr>
      <ArticleItem article={{ ...article, isRead }} />
    </div>
  );
};

export default ReadableArticleItem;
