import cn from "classnames";
import ArticleMeta from "./article-meta.jsx";
import ArticleTitle from "./article-title.jsx";

const ArticleItem = ({ article }) => (
  <article
    className={cn("flex flex-col break-words px-2 py-6", {
      "opacity-50": article.isRead,
    })}
  >
    <ArticleTitle article={article} />
    <ArticleMeta article={article} />
    <section
      className={cn(
        "prose prose-purple mt-2 max-w-full overflow-ellipsis text-sm text-gray-500 line-clamp-3"
      )}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: article.excerpt }}
    />
  </article>
);

export default ArticleItem;
