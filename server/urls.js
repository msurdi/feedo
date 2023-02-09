export default {
  home: () => "/",
  public: (path = "") => `/${path}`,
  status: () => "/status",
  feeds: () => "/feeds",
  newFeed: () => "/feeds/new",
  deleteFeed: (feedId) => `/feeds/${feedId}/delete`,
  articleDetail: (articleId) => `/articles/${articleId}`,
  markAsRead: () => `/read`,
};
