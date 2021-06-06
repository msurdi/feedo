const html = require("html-string");
const sanitizeHtml = require("sanitize-html");

const articleMeta = ({ article }) => html`
  <span class="text-sm text-gray-500">
    <time title="${article.publishedAt}">${article.timeAgo} </time>
    ago
    ${article.author &&
    html`<span> by ${sanitizeHtml(article.author)}:safe</span>`}
  </span>
`;

module.exports = articleMeta;
