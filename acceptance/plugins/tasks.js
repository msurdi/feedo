import * as articles from "../../app/core/articles.js";
import * as feeds from "../../app/core/feeds.js";
import Article from "../../app/models/article.js";
import Feed from "../../app/models/feed.js";

const tasks = {
  async createFeed(values) {
    return feeds.createFeed(values);
  },
  async createArticle(values) {
    return articles.putArticle(values);
  },
  async resetDatabase() {
    await Article.destroy({ truncate: true });
    await Feed.destroy({ truncate: true });
    return null;
  },
};

export default tasks;
