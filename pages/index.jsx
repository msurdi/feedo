import { uniqBy } from "lodash";
import getConfig from "next/config";
import { useEffect, useState } from "react";
import ArticleList from "../components/article-list";
import IntersectionObserver from "../components/intersection-observer";
import NoSsr from "../components/no-ssr";
import useRefresh from "../hooks/use-refresh";
import { getUnreadArticles } from "../lib/core/articles";
import withSerialize from "../lib/helpers/pages/with-serialize";
import { withExcerpt, withSafeHtml, withTimeAgo } from "../lib/presenters";

const IndexPage = ({ articles, hasMoreArticles }) => {
  const [articlesBuffer, setarticlesBuffer] = useState([]);
  const refresh = useRefresh();

  useEffect(() => {
    setarticlesBuffer((previousArticles) =>
      uniqBy([...previousArticles, ...articles], "id")
    );
  }, [articles]);

  return (
    <>
      <ArticleList articles={articlesBuffer} />
      {hasMoreArticles && (
        <NoSsr>
          <IntersectionObserver multiple onEnterBottom={refresh} />
        </NoSsr>
      )}
      {!hasMoreArticles && (
        <div className="flex flex-col items-center justify-center">
          <span className="text-gray-400">That&apos;s all for now.</span>
        </div>
      )}
    </>
  );
};

const {
  serverRuntimeConfig: { unreadPageSize },
} = getConfig();

const articlePresenter = (article) =>
  withSafeHtml(
    withSafeHtml(withExcerpt(withTimeAgo(article)), {
      source: "excerpt",
      target: "excerpt",
    }),
    { source: "title", target: "title" }
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
