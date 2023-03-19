import html from "html-string";
import urls from "../../urls.js";

const fetchMore = ({ afterArticleId, ...attrs }) => html`
  <form
    ${html.attrs(attrs)}
    data-controller="fetch-more"
    data-fetch-more-has-more-value="${!afterArticleId ? "false" : "true"}"
    data-action="visibilitychange@document->fetch-more#documentVisibilityChanged"
    method="get"
    action="${urls.moreArticles()}"
  >
    <input type="hidden" name="afterArticleId" value="${afterArticleId}" />
  </form>
`;

export default fetchMore;
