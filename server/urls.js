module.exports = {
  home: () => "/",
  public: (path = "") => `/public/${path}`,
  status: () => "/status",
  feeds: () => "/feeds",
  newFeed: () => "/feeds/new",
  deleteFeed: (feedId) => `/feeds/${feedId}/delete`,
};
