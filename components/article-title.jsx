import urls from "../lib/urls";
import Link from "./link";

const ArticleTitle = ({ article }) => (
  <h1 className="text-lg font-bold">
    <Link href={article.id ? urls.articleDetail(article.id) : article.link}>
      {article.title}
    </Link>
  </h1>
);

export default ArticleTitle;
