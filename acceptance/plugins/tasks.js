import * as articles from "../../server/core/articles.js";
import * as feeds from "../../server/core/feeds.js";
import db from "../../server/services/db/index.js";

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
