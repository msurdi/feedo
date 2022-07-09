import { uniqBy } from "lodash-es";
import getConfig from "next/config";
import { useEffect, useState } from "react";
import ArticleList from "../components/article-list.jsx";
import IntersectionObserver from "../components/intersection-observer.jsx";
import LoadingSpinner from "../components/loading-spinner.jsx";
import NoSsr from "../components/no-ssr.jsx";
import ReadableArticleItem from "../components/readable-article-item.jsx";
import { getUnreadArticles } from "../lib/core/articles.js";
import withDefault from "../lib/helpers/pages/with-default.js";
import { useLazyRefresh } from "../lib/next-lazy.js";
import { articleListPresenter } from "../lib/presenters.js";

const IndexPage = (props) => {
  const { articles, hasMoreArticles } = props;
  const [articlesBuffer, setArticlesBuffer] = useState(articles);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const refresh = useLazyRefresh();

  useEffect(() => {
    setArticlesBuffer((previousArticles) =>
      uniqBy([...previousArticles, ...articles], "id")
    );
  }, [articles]);

  const refreshArticles = async () => {
    setIsLoadingMore(true);
    await refresh();
    setIsLoadingMore(false);
  };

  return (
    <>
      <ArticleList>
        {articlesBuffer.map((article) => (
          <ReadableArticleItem key={article.id} article={article} />
        ))}
      </ArticleList>
      {hasMoreArticles && (
        <NoSsr>
          <IntersectionObserver
            rootMargin="200px"
            multiple
            onEnterBottom={refreshArticles}
          />
          {isLoadingMore && (
            <div className="m-4 flex justify-center">
              <LoadingSpinner />
            </div>
          )}
        </NoSsr>
      )}
      {!hasMoreArticles && (
        <div className="h-content flex flex-col items-center justify-center">
          <span className="text-2xl text-gray-400">
            That&apos;s all for now.
          </span>
        </div>
      )}
    </>
  );
};

const {
  serverRuntimeConfig: { unreadPageSize },
} = getConfig();

const serverSideProps = async ({ query: { afterArticleId } }) => {
  const unreadArticles = await getUnreadArticles({
    afterArticleId,
    pageSize: unreadPageSize + 1,
  });
  const hasMoreArticles = unreadArticles.length === unreadPageSize + 1;

  if (hasMoreArticles) {
    unreadArticles.pop();
  }

  return {
    props: {
      articles: unreadArticles.map(articleListPresenter),
      hasMoreArticles,
    },
  };
};

export const getServerSideProps = withDefault(serverSideProps);

export default IndexPage;
