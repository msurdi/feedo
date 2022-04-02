import { flow } from "lodash";
import ArticleMeta from "../../components/article-meta";
import ArticleTitle from "../../components/article-title";
import Link from "../../components/link";
import { getArticle } from "../../lib/core/articles";
import withSerialize from "../../lib/helpers/pages/with-serialize";
import { withSafeHtml, withTimeAgo } from "../../lib/presenters";

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

export const getServerSideProps = withSerialize(async ({ params: { id } }) => {
  const article = await getArticle(id);

  if (!article) {
    return { notFound: true };
  }

  return { props: { article: articlePresenter(article) } };
});

export default ArticleDetailPage;
