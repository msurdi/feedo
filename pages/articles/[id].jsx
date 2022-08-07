import { useRouter } from "next/router.js";
import sanitizeHtml from "sanitize-html";
import ArticleMeta from "../../components/article-meta.jsx";
import ArticleTitle from "../../components/article-title.jsx";
import Link from "../../components/link.jsx";
import useArticleDetail from "../../hooks/use-article-detail.js";
import withDefault from "../../lib/helpers/pages/with-default.js";

const ArticleDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const article = useArticleDetail(id);

  if (!article) {
    return null;
  }

  return (
    <div>
      <article className="flex flex-col break-words px-2 py-6">
        <ArticleTitle article={article} />
        <ArticleMeta article={article} />
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
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
};

const serverSideProps = async () => ({ props: {} });

export const getServerSideProps = withDefault(serverSideProps);

export default ArticleDetailPage;
