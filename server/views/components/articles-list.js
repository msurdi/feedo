const html = require("html-string");
const articleItem = require("./article-item");

const articlesList = ({ articles, ...rest }) => html`
  <div class="divide-y divide-gray-300" ${rest}:attrs>
    ${articles.map((article) => articleItem({ article }))}
  </div>
`;

module.exports = articlesList;
