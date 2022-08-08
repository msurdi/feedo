import { useEffect, useState } from "react";
import { getArticle } from "../lib/store/articles.js";

const useArticleDetail = (articleId) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const effect = async () => {
      const loadedArticle = await getArticle(articleId);
      setArticle(loadedArticle);
    };
    effect();
  }, [articleId]);

  return article;
};

export default useArticleDetail;
