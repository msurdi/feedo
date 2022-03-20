const urls = {
  home: () => "/",
  public: (path = "") => `/${path}`,
  status: () => "/status",
  feeds: () => "/feeds",
  newFeed: () => "/feeds/new",
  deleteFeed: (feedId) => `/feeds/${feedId}/delete`,
  articleDetail: (articleId) => `/articles/${articleId}`,
  markAsRead: () => "/read",
  feedsApi: () => "/api/feeds",
};

export default urls;
