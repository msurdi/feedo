const html = require("html-string");
const articleItem = require("./article-item");

const articlesList = ({ articles, csrfToken, ...rest }) => html`
  <div class="divide-y divide-gray-300" ${rest}:attrs>
    ${articles.map((article) => articleItem({ article, csrfToken }))}
  </div>
`;

module.exports = articlesList;
