import ArticleList from "../components/article-list.jsx";
import IntersectionObserver from "../components/intersection-observer.jsx";
import LoadingSpinner from "../components/loading-spinner.jsx";
import NoSsr from "../components/no-ssr.jsx";
import ReadableArticleItem from "../components/readable-article-item.jsx";
import useArticles from "../hooks/use-articles.js";
import withDefault from "../lib/helpers/pages/with-default.js";

const IndexPage = () => {
  const articles = useArticles();

  return (
    <>
      <ArticleList>
        {articles.data.map((article) => (
          <ReadableArticleItem
            key={article.id}
            article={article}
            onRead={articles.markAsRead}
          />
        ))}
      </ArticleList>
      {articles.hasMore && (
        <NoSsr>
          <IntersectionObserver
            rootMargin="200px"
            multiple
            onEnterBottom={articles.loadMore}
          />
          {articles.isLoadingMore && (
            <div className="m-4 flex justify-center">
              <LoadingSpinner />
            </div>
          )}
        </NoSsr>
      )}
      {!articles.hasMore && (
        <div className="h-content flex flex-col items-center justify-center">
          <span className="text-2xl text-gray-400">
            That&apos;s all for now.
          </span>
        </div>
      )}
    </>
  );
};

const serverSideProps = async () => ({
  props: {},
});

export const getServerSideProps = withDefault(serverSideProps);

export default IndexPage;
