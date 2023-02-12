import html from "html-string";
import urls from "../urls.js";
import articlesList from "./components/articles-list.js";
import layout from "./components/layout.js";

const articlesView = ({ articles, hasMoreArticles }) =>
  layout({
    body: html`
      ${!!articles.length &&
      html`
        ${articlesList({
          articles,
          id: "articles-list",
        })}
      `}
      ${hasMoreArticles &&
      html`
        <div
          id="fetch-more"
          data-submit-observer-form="#fetch-more-form"
          data-submit-observer-mode="enter-bottom"
        >
          <form id="fetch-more-form" method="get" action="${urls.home()}">
            <input
              type="hidden"
              name="afterArticleId"
              value="${articles.slice(-1)[0].id}"
            />
          </form>
        </div>
      `}
      <div id="no-more-articles" class="h-[calc(100vh-5rem)]">
        ${!hasMoreArticles &&
        html`<div id="articles-list"></div>
          <div id="fetch-more"></div>
          <div class="flex flex-col justify-center items-center h-full">
            <span class="text-gray-400">That's all for now.</span>
          </div>`}
      </div>
    `,
  });

export default articlesView;
