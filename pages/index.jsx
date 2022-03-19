import getConfig from "next/config";
import ArticleList from "../components/article-list";
import { getUnreadArticles } from "../lib/core/articles";
import withSerialize from "../lib/helpers/pages/with-serialize";

const IndexPage = ({ articles, hasMoreArticles }) => (
  <>
    <ArticleList articles={articles} />
    {!hasMoreArticles && (
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-gray-400">That&apos;s all for now.</span>
      </div>
    )}
  </>
);

const {
  serverRuntimeConfig: { unreadPageSize },
} = getConfig();

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
      props: { articles: unreadArticles, hasMoreArticles },
    };
  }
);

export default IndexPage;
