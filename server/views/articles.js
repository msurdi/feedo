const html = require("html-string");
const sanitizeHtml = require("sanitize-html");
const urls = require("../urls");
const articleMeta = require("./components/article-meta");
const button = require("./components/button");
const csrfInput = require("./components/csrf-input");
const layout = require("./components/layout");

const articlesView = ({ req, articles }) =>
  layout({
    body: html`

      ${
        !!articles.length &&
        html`
          <div class="divide-y divide-gray-300">
            ${articles.map(
              (article) => html`
                <article class="px-2 py-6 flex flex-col break-words">
                  <h1 class="font-bold text-lg">
                    <a
                      class="text-black visited:text-gray-500"
                      href="${urls.articleDetail(article.id)}"
                      up-target="body"
                    >
                      ${article.title}
                    </a>
                  </h1>
                  ${articleMeta({ article })}
                  <section
                    class="text-gray-600 mt-2 prose max-w-full prose-purple"
                  >
                    ${sanitizeHtml(article.excerpt)}:safe
                  </section>
                </article>
              `
            )}
          </div>
          <div class="flex justify-center p-4">
            <form up-target="body" method="post" action="${urls.markAsRead()}">
              ${csrfInput(req.csrfToken())}
              ${articles.map(
                (article) => html`
                  <input
                    type="hidden"
                    name="articleIds[]"
                    value="${article.id}"
                  />
                `
              )}
              ${button("Mark as read", {
                upDisable: true,
                dataDisableWith: "Loading...",
              })}
            </form>
          </div>
        `
      }
        ${
          !articles.length &&
          html`<div class="flex justify-center my-4">
            <span class="text-gray-400">That's all for now.</span>
          </div>`
        }
      </div>
    `,
  });

module.exports = articlesView;
