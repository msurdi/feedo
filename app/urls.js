export const homeUrl = () => "/";
export const publicUrl = (path = "") => `/${path}`;
export const assetUrl = (path = "") => `/dist/${path}`;
export const statusUrl = () => "/status";
export const feedsUrl = () => "/feeds";
export const newFeedUrl = () => "/feeds/new";
export const deleteFeedUrl = (feedId) => `/feeds/${feedId}/delete`;
export const articleDetailUrl = (articleId) => `/articles/${articleId}`;
export const apiUrl = {
  read: () => `/api/read`,
};

export default {
  home: homeUrl,
  public: publicUrl,
  asset: assetUrl,
  status: statusUrl,
  feeds: feedsUrl,
  newFeed: newFeedUrl,
  deleteFeed: deleteFeedUrl,
  articleDetail: articleDetailUrl,
  api: apiUrl,
};
