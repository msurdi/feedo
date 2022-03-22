import { formatDistanceToNowStrict } from "date-fns";
import downsize from "downsize";

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
