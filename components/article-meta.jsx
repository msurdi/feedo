import { formatDistanceToNowStrict } from "date-fns";

const ArticleMeta = ({ article }) => (
  <span className="text-xs text-gray-500">
    <time title={article.publishedAt}>
      {formatDistanceToNowStrict(new Date(article.publishedAt))}
    </time>{" "}
    ago
    {article.author && <span> by {article.author}</span>}
    {article.feed?.name && <span> in {article.feed.name}</span>}
  </span>
);

export default ArticleMeta;
