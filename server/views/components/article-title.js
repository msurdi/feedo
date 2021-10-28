const html = require("html-string");
const sanitizeHtml = require("sanitize-html");

const articleTitle = ({ article, href }) => html`
  <h1 class="font-bold text-lg">
    <a href="${href}" up-target="body"> ${sanitizeHtml(article.title)} </a>
  </h1>
`;

module.exports = articleTitle;
