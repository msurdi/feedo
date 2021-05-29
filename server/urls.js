module.exports = {
  home: () => "/",
  public: (path = "") => `/public/${path}`,
  status: () => `/status`,
  feeds: () => `/feeds`,
  newFeed: () => `/feeed/new`,
};
