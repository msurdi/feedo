const ArticleMeta = ({ article }) => (
  <span className="text-sm tesxt-gray-500">
    <time title={article.publishedAt}>{article.timeAgo}</time> ago
    {article.author && <span>by {article.author}</span>}
  </span>
);

export default ArticleMeta;
