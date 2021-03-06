import { flow } from "lodash-es";
import ArticleMeta from "../../components/article-meta.jsx";
import ArticleTitle from "../../components/article-title.jsx";
import Link from "../../components/link.jsx";
import { getArticle } from "../../lib/core/articles.js";
import withDefault from "../../lib/helpers/pages/with-default.js";
import { withSafeHtml, withTimeAgo } from "../../lib/presenters.js";

const ArticleDetailPage = ({ article }) => (
  <div>
    <article className="flex flex-col break-words px-2 py-6">
      <ArticleTitle article={article} />
      <ArticleMeta article={article} />
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: article.content }}
        className="prose prose-purple mt-2 max-w-full text-gray-600"
      />
    </article>
    <div className="flex flex-row justify-center">
      <Link href={article.link} variant={Link.variants.button}>
        Visit website
      </Link>
    </div>
  </div>
);

const articlePresenter = flow(
  withSafeHtml(),
  withTimeAgo(),
  withSafeHtml({ source: "title" })
);

const serverSideProps = async ({ params: { id } }) => {
  const article = await getArticle(id);

  if (!article) {
    return { notFound: true };
  }

  return { props: { article: articlePresenter(article) } };
};

export const getServerSideProps = withDefault(serverSideProps);

export default ArticleDetailPage;
