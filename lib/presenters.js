import { formatDistanceToNowStrict } from "date-fns";
import downsize from "downsize";
import sanitizeHtml from "sanitize-html";

export const withExcerpt = (
  attributes,
  { source = "content", target = "excerpt", words = 70 } = {}
) => ({
  ...attributes,
  [target]: downsize(attributes[source], { words }),
});

export const withTimeAgo = (
  attributes,
  { source = "createdAt", target = "timeAgo" } = {}
) => ({
  ...attributes,
  [target]: formatDistanceToNowStrict(attributes[source]),
});

export const withSafeHtml = (
  attributes,
  { source = "content", target = "content" } = {}
) => ({
  ...attributes,
  [target]: sanitizeHtml(attributes[source]),
});
