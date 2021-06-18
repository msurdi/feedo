const html = require("html-string");
const sanitizeHtml = require("sanitize-html");
const articleMeta = require("../components/article-meta");
const articleTitle = require("../components/article-title");
const layout = require("../components/layout");
const link = require("../components/link");

const articleDetailView = ({ article }) =>
  layout({
    body: html`
      <article class="px-2 py-6 flex flex-col break-words">
        ${articleTitle({
          article,
          href: article.link,
        })}
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
