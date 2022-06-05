/* eslint-disable no-empty-pattern */
import { faker } from "@faker-js/faker";
import base from "@playwright/test";
import { putArticle } from "../lib/core/articles.js";
import { createFeed } from "../lib/core/feeds.js";
import db from "../lib/services/db/index.js";

const createFakeArticle = (props) => ({
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

  articles: async ({}, use) => {
    const feed = await createFeed({ url: "https://example.com/rss" });
    const fakeArticles = [...Array(25)].map(() =>
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
