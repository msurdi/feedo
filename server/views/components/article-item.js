const html = require("html-string");
const sanitizeHtml = require("sanitize-html");
const urls = require("../../urls");
const articleMeta = require("./article-meta");
const articleTitle = require("./article-title");
const csrfInput = require("./csrf-input");

const articleItem = ({ article, csrfToken }) => html`
  <article
    id="article-${article.id}"
    class="px-2 py-6 flex flex-col break-words ${article.isRead
      ? "opacity-50"
      : ""}"
    ${!article.isRead ? "up-submit-observer" : ""}
    data-submit-observer-threshold="0.4"
    data-submit-observer-form="#form-mark-as-read-${article.id}"
  >
    ${articleTitle({
      article,
      href: urls.articleDetail(article.id),
    })}
    ${articleMeta({ article })}
    <section class="text-gray-600 mt-2 prose max-w-full prose-purple">
      ${sanitizeHtml(article.excerpt)}:safe
    </section>
    <form
      id="form-mark-as-read-${article.id}"
      action="${urls.markAsRead()}"
      up-target="#article-${article.id}"
      method="post"
    >
      ${csrfInput(csrfToken)}
      <input type="hidden" name="articleIds[]" value="${article.id}" />
    </form>
  </article>
`;

module.exports = articleItem;
