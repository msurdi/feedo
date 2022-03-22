import ArticleMeta from "../../components/article-meta";
import ArticleTitle from "../../components/article-title";
import Link from "../../components/link";
import { getArticle } from "../../lib/core/articles";
import withSerialize from "../../lib/helpers/pages/with-serialize";
import { withTimeAgo } from "../../lib/presenters";

const ArticleDetailPage = ({ article }) => (
  <div>
    <article className="flex flex-col px-2 py-6 break-words">
      <ArticleTitle article={article} />
      <ArticleMeta article={article} />
      <div className="max-w-full mt-2 prose text-gray-600 prose-purple">
        {article.content}
      </div>
    </article>
    <div className="flex flex-row justify-center">
      <Link href={article.link} variant={Link.variants.button}>
        Visit website
      </Link>
    </div>
  </div>
);

const articlePresenter = (article) => withTimeAgo(article);

export const getServerSideProps = withSerialize(async ({ params: { id } }) => {
  const article = await getArticle(id);

  if (!article) {
    return { notFound: true };
  }

  return { props: { article: articlePresenter(article) } };
});

export default ArticleDetailPage;
