import cn from "classnames";
import { useRef, useState } from "react";
import useApi from "../hooks/use-api";
import urls from "../lib/urls";
import ArticleMeta from "./article-meta";
import ArticleTitle from "./article-title";
import IntersectionObserver from "./intersection-observer";
import NoSsr from "./no-ssr";

const ArticleItem = ({ article }) => {
  const intersectionRef = useRef(null);
  const [isRead, setIsRead] = useState(article.isRead);
  const { put } = useApi();

  const handleOnExit = () => {
    setIsRead(true);
    put(urls.articleApi(article.id), { isRead: true });
  };

  return (
    <article
      ref={intersectionRef}
      className={cn("flex flex-col px-2 py-6 break-words", {
        "opacity-50": isRead,
      })}
    >
      <NoSsr>
        {!article.isRead && (
          <IntersectionObserver
            intersectionRef={intersectionRef}
            onExitTop={handleOnExit}
          />
        )}
      </NoSsr>
      <ArticleTitle article={article} />
      <ArticleMeta article={article} />
      <section
        className={cn("max-w-full mt-2 prose text-gray-600 prose-purple")}
      >
        {article.excerpt}
      </section>
    </article>
  );
};

export default ArticleItem;
