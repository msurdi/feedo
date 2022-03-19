import cn from "classnames";
import ArticleMeta from "./article-meta";
import ArticleTitle from "./article-title";

const ArticleItem = ({ article }) => (
  <article className="flex flex-col px-2 py-6 break-words">
    <ArticleTitle article={article} />
    <ArticleMeta article={article} />
    <section
      className={cn("max-w-full mt-2 prose text-gray-600 prose-purple", {
        "opacity-50": article.isRead,
      })}
    >
      {article.excerpt}
    </section>
  </article>
);

export default ArticleItem;
