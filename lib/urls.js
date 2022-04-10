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
  feedApi: (id) => `/api/feeds/${id}`,
  feedPreviewApi: () => `/api/feeds/preview`,
  articleApi: (id) => `/api/articles/${id}`,
};

export default urls;
