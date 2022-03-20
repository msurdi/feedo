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
  feedItemApi: (id) => `/api/feeds/${id}`,
};

export default urls;
