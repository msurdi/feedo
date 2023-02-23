import html from "html-string";
import sanitizeHtml from "sanitize-html";
import urls from "../../urls.js";
import articleMeta from "./article-meta.js";
import articleTitle from "./article-title.js";

const articleItem = ({ article }) => html`
  <article
    id="article-${article.id}"
    class="px-2 py-6 flex flex-col break-words ${article.isRead
      ? "opacity-50"
      : ""}"
    data-controller="article-item"
    data-article-item-id-value="${article.id}"
    data-article-item-read-class="opacity-50"
  >
    ${articleTitle({
      article,
      href: urls.articleDetail(article.id),
    })}
    ${articleMeta({ article })}
    <section class="text-gray-600 mt-2 prose max-w-full prose-purple">
      ${sanitizeHtml(article.excerpt)}:safe
    </section>
  </article>
`;

export default articleItem;
