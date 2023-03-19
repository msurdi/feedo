import html from "html-string";
import articlesList from "./components/articles-list.js";
import fetchMore from "./components/fetch-more.js";
import layout from "./components/layout.js";

const articlesView = ({ articles = [], hasMoreArticles }) =>
  layout({
    body: html`
      ${articles.length > 0 &&
      html`
        ${articlesList({
          articles,
          id: "article-list",
        })}
      `}
      ${fetchMore({
        id: "fetch-more",
        afterArticleId: articles.slice(-1)[0]?.id,
      })}
      <div class="h-[calc(100vh-5rem)]">
        ${!hasMoreArticles &&
        html`<div id="articles-list"></div>
          <div class="flex flex-col justify-center items-center h-full">
            <span class="text-gray-400">That's all for now.</span>
          </div>`}
      </div>
    `,
  });

export default articlesView;
