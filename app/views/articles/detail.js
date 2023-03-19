import html from "html-string";
import sanitizeHtml from "sanitize-html";
import articleMeta from "../components/article-meta.js";
import articleTitle from "../components/article-title.js";
import layout from "../components/layout.js";
import link from "../components/link.js";

const articleDetailView = ({ article }) =>
  layout.js({
    body: html`
      <article class="px-2 py-6 flex flex-col break-words">
        ${articleTitle({
          article,
          href: article.link,
        })}
        ${articleMeta({ article })}
        <div class="text-gray-600 mt-2 prose max-w-full prose-purple">
          ${html.unsafe(sanitizeHtml(article.content))}
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

export default articleDetailView;
