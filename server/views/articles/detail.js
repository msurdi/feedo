const html = require("html-string");
const sanitizeHtml = require("sanitize-html");
const articleMeta = require("../components/article-meta");
const layout = require("../components/layout");
const link = require("../components/link");

const articleDetailView = ({ article }) =>
  layout({
    body: html`
      <article class="px-2 py-6 flex flex-col break-words">
        <a href="${article.link}">
          <h1 class="font-bold text-xl">${article.title}</h1>
        </a>
        ${articleMeta({ article })}
        <div class="text-gray-600 mt-2 prose max-w-full prose-purple">
          ${sanitizeHtml(article.content)}:safe
        </div>
      </article>
      <div class="flex flex-row justify-center">
        ${link("Visit Website", {
          href: article.link,
          variant: link.variants.button,
        })}
      </div>
    `,
  });

module.exports = articleDetailView;
