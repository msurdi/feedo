import { formatDistanceToNowStrict } from "date-fns";
import downsize from "downsize";
import { flow } from "lodash-es";
import sanitizeHtml from "sanitize-html";

export const withExcerpt =
  ({ source = "content", target = "excerpt", words = 70 } = {}) =>
  (attributes) => ({
    ...attributes,
    [target ?? source]: downsize(attributes[source], { words }),
  });

export const withTimeAgo =
  ({ source = "publishedAt", target = "timeAgo" } = {}) =>
  (attributes) => ({
    ...attributes,
    [target ?? source]: formatDistanceToNowStrict(attributes[source]),
  });

export const withSafeHtml =
  ({ source = "content", target } = {}) =>
  (attributes) => ({
    ...attributes,
    [target ?? source]: sanitizeHtml(attributes[source]),
  });

export const articleListPresenter = flow(
  withSafeHtml(),
  withSafeHtml({ source: "title" }),
  withTimeAgo(),
  withExcerpt()
);
