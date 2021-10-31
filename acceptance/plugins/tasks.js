const articles = require("../../server/core/articles");
const feeds = require("../../server/core/feeds");
const db = require("../../server/services/db");

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
