import urls from "../lib/urls";
import Link from "./link";

const ArticleTitle = ({ article }) => (
  <h1 className="text-lg font-bold">
    <Link href={urls.articleDetail(article.id)}>{article.title}</Link>
  </h1>
);

export default ArticleTitle;
