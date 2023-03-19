import html from "html-string";
import articleItem from "./article-item.js";

const articlesList = ({ articles, ...rest }) => html`
  <div class="divide-y divide-gray-300" ${html.attrs(rest)}>
    ${articles.map((article) => articleItem({ article }))}
  </div>
`;

export default articlesList;
