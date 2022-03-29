import { flow, uniqBy } from "lodash";
import getConfig from "next/config";
import { useEffect, useState } from "react";
import ArticleList from "../components/article-list";
import IntersectionObserver from "../components/intersection-observer";
import LoadingSpinner from "../components/loading-spinner";
import NoSsr from "../components/no-ssr";
import useRefresh from "../hooks/use-refresh";
import { getUnreadArticles } from "../lib/core/articles";
import withSerialize from "../lib/helpers/pages/with-serialize";
import { withExcerpt, withSafeHtml, withTimeAgo } from "../lib/presenters";

const IndexPage = ({ articles, hasMoreArticles }) => {
  const [articlesBuffer, setarticlesBuffer] = useState(articles);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const refresh = useRefresh();
  useEffect(() => {
    setarticlesBuffer((previousArticles) =>
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
      <ArticleList articles={articlesBuffer} />
      {hasMoreArticles && (
        <NoSsr>
          <IntersectionObserver
            rootMargin="200px"
            multiple
            onEnterBottom={refreshArticles}
          />
          {isLoadingMore && (
            <div className="flex justify-center m-4">
              <LoadingSpinner />
            </div>
          )}
        </NoSsr>
      )}
      {!hasMoreArticles && (
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-gray-400 text-2xl">
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

const articlePresenter = flow(
  withSafeHtml(),
  withSafeHtml({ source: "title" }),
  withTimeAgo(),
  withExcerpt()
);

export const getServerSideProps = withSerialize(
  async ({ query: { afterArticleId } }) => {
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
        articles: unreadArticles.map(articlePresenter),
        hasMoreArticles,
      },
    };
  }
);

export default IndexPage;
