import { useCallback, useRef, useState } from "react";
import useApi from "../hooks/use-api";
import urls from "../lib/urls";
import ArticleItem from "./article-item";
import IntersectionObserver from "./intersection-observer";
import NoSsr from "./no-ssr";

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
