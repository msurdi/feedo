import urls from "../lib/urls";

const ArticleTitle = ({ article }) => (
  <h1 className="text-lg font-bold">
    <a href={urls.articleDetail(article.id)}>{article.title}</a>
  </h1>
);

export default ArticleTitle;
