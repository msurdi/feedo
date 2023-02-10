import * as articles from "../../app/core/articles.js";
import * as feeds from "../../app/core/feeds.js";
import db from "../../app/services/db/index.js";

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

export default tasks;
