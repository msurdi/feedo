import html from "html-string";
import sanitizeHtml from "sanitize-html";

const articleMeta = ({ article }) => html`
  <span class="text-sm text-gray-500">
    <time title="${article.publishedAt}">${article.timeAgo} </time>
    ago
    ${article.author &&
    html`<span> by ${html.unsafe(sanitizeHtml(article.author))}</span>`}
  </span>
`;

export default articleMeta;
