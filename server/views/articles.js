const html = require("html-string");
const urls = require("../urls");
const layout = require("./components/layout");

const articlesView = ({ articles }) =>
  layout({
    body: html`
      <div class="divide-y divide-gray-300">
        ${articles.map(
          (article) => html`
            <article class="px-2 py-6 flex flex-col break-words">
              <a
                class="text-black visited:text-gray-500"
                href="${urls.articleDetail(article.id)}"
              >
                <h1 class="font-bold text-lg">${article.title}</h1></a
              >
              <time title="${article.publishedAt}" class="text-sm text-gray-500"
                >${article.timeAgo}
              </time>
              <section class="text-gray-600 mt-2 prose max-w-full prose-purple">
                ${article.excerpt}
              </section>
            </article>
          `
        )}
        ${!articles.length &&
        html`<div class="flex justify-center my-4">
          <span class="text-gray-400">That's all for now.</span>
        </div>`}
      </div>
    `,
  });

module.exports = articlesView;
