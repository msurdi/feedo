import getConfig from "next/config";
import Layout from "../components/layout";
import { getUnreadArticles } from "../lib/core/articles";
import withSerialize from "../lib/helpers/pages/with-serialize";

const IndexPage = () => <Layout>Hello feedo</Layout>;

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
