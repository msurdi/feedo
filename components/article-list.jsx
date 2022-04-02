import ArticleItem from "./article-item";

const ArticleList = ({ articles }) => (
  <div className=" divide-y divide-gray-300">
    {articles.map((article) => (
      <ArticleItem key={article.id} article={article} />
    ))}
  </div>
);

export default ArticleList;
