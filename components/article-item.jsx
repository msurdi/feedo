import cn from "classnames";
import downsize from "downsize";
import sanitizeHtml from "sanitize-html";
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
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(downsize(article.content, { words: 70 })),
      }}
    />
  </article>
);

export default ArticleItem;
