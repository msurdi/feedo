const setup = async () => {
  const articles = await import("../../lib/core/articles");
  const feeds = await import("../../lib/core/feeds");
  const db = (await import("../../lib/services/db")).default;

  const tasks = {
    async createFeed(feed) {
      return feeds.createFeed(feed);
    },
    async createArticle(article) {
      return articles.putArticle(article);
    },
    async resetDatabase() {
      await db.article.deleteMany({});
      await db.feed.deleteMany({});
      return null;
    },
  };

  return tasks;
};

module.exports = setup();
