const articles = import("../../lib/core/articles");
const feeds = import("../../lib/core/feeds");
const db = import("../../lib/services/db");

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

module.exports = tasks;
