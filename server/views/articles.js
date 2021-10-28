const html = require("html-string");
const urls = require("../urls");
const articlesList = require("./components/articles-list");
const layout = require("./components/layout");

const articlesView = ({ req, articles, hasMoreArticles }) =>
  layout({
    body: html`
      ${!!articles.length &&
      html`
        ${articlesList({
          articles,
          csrfToken: req.csrfToken(),
          id: "articles-list",
        })}
      `}
      ${hasMoreArticles &&
      html`
        <div
          id="fetch-more"
          up-hungry
          up-submit-observer
          data-submit-observer-form="#fetch-more-form"
          data-submit-observer-mode="enter-bottom"
        >
          <form
            id="fetch-more-form"
            method="get"
            action="${urls.home()}"
            up-hungry
            up-submit
            up-target="#articles-list:after"
          >
            <input
              type="hidden"
              name="afterArticleId"
              value="${articles.slice(-1)[0].id}"
            />
          </form>
        </div>
      `}
      <div id="no-more-articles" up-hungry class="h-[calc(100vh-5rem)]">
        ${!hasMoreArticles &&
        html`<div id="articles-list"></div>
          <div id="fetch-more"></div>
          <div class="flex flex-col justify-center items-center h-full">
            <span class="text-gray-400">That's all for now.</span>
          </div>`}
      </div>
    `,
  });

module.exports = articlesView;
