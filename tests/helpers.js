/* eslint-disable no-empty-pattern */
import { faker } from "@faker-js/faker";
import base from "@playwright/test";
import { putArticle } from "../lib/core/articles.js";
import { createFeed } from "../lib/core/feeds.js";
import db from "../lib/services/db/index.js";

const createFakeArticle = (props) => ({
  id: faker.datatype.string(26),
  guid: faker.datatype.uuid(),
  link: faker.internet.url(),
  title: faker.lorem.sentence(),
  publishedAt: faker.date.recent(),
  author: faker.name.firstName(),
  content: faker.lorem.sentences(10),
  commentsLink: faker.internet.url(),
  ...props,
});

export const test = base.extend({
  resetDb: [
    async ({}, use) => {
      await db.article.deleteMany({});
      await db.feed.deleteMany({});
      await use();
    },
    { scope: "worker", auto: true },
  ],

  scrollToArticle: async ({ page }, use) => {
    const scroll = async (article) => {
      const nthArticle = await page.waitForSelector(
        `h1:has-text("${article.title}")`
      );
      await nthArticle.evaluate((e) =>
        e.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        })
      );
    };
    await use(scroll);
  },

  scrollToEndOfViewport: async ({ page }, use) => {
    const scroll = async () => {
      await page.evaluate(() => {
        const viewport = document.getElementById("viewport");
        viewport.scrollTop = viewport.scrollHeight;
      });
    };
    use(scroll);
  },

  articles: async ({}, use) => {
    const feed = await createFeed({
      id: faker.datatype.string(26),
      url: "https://example.com/rss",
      name: "Example feed",
    });
    const fakeArticles = [...Array(20)].map(() =>
      createFakeArticle({ feedId: feed.id })
    );
    const articles = [];
    for (const article of fakeArticles) {
      await putArticle(article);
      articles.push(article);
    }

    await use(articles);

    await db.article.deleteMany({});
    await db.feed.deleteMany({});
  },
});

export const { expect } = base;
