import { useRef } from "react";
import ArticleItem from "./article-item.jsx";
import IntersectionObserver from "./intersection-observer.jsx";
import NoSsr from "./no-ssr.jsx";

const ReadableArticleItem = ({ article, onRead }) => {
  const intersectionRef = useRef(null);

  return (
    <div ref={intersectionRef}>
      <NoSsr>
        {!article.isRead && (
          <IntersectionObserver
            intersectionRef={intersectionRef}
            onExitTop={() => onRead?.(article)}
          />
        )}
      </NoSsr>
      <ArticleItem article={article} />
    </div>
  );
};

export default ReadableArticleItem;
