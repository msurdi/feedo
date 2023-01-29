/// <reference types="Cypress" />
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from "@faker-js/faker";

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

describe("Articles view", () => {
  let fakeArticles;
  beforeEach(() => {
    fakeArticles = [];
    cy.task("resetDatabase");
    cy.task("createFeed", { url: "https://example.com/rss" }).then(
      ({ feed }) => {
        [...Array(25)].forEach(() => {
          cy.task("createArticle", createFakeArticle({ feedId: feed.id })).then(
            (fakeArticle) => {
              fakeArticles.push(fakeArticle);
            }
          );
        });
      }
    );
    cy.visit("/", {
      auth: {
        username: "testuser",
        password: "testpassword",
      },
    });
  });

  describe("Initial reading page", () => {
    it("Lists only first 10 articles", () => {
      fakeArticles.slice(0, 10).forEach(({ title }) => {
        cy.contains("h1", title);
      });
    });
  });

  describe("Scrolling down to 5th article", () => {
    beforeEach(() => {
      cy.contains("h1", fakeArticles[4].title).scrollIntoView({
        duration: 1000,
      });
    });
    it("Marks as read previous 4 articles", () => {
      fakeArticles.slice(0, 3).forEach(({ title }) => {
        cy.contains("article", title).should("have.class", "opacity-50");
      });
    });

    it("Keeps as unread remaining loaded articles", () => {
      fakeArticles.slice(4, 10).forEach(({ title }) => {
        cy.contains("article", title).should("not.have.class", "opacity-50");
      });
    });
  });

  describe("Scrolling down to 10th article", () => {
    beforeEach(() => {
      cy.contains("h1", fakeArticles[9].title).scrollIntoView({
        duration: 1000,
      });
    });
    it("Marks as read previous 9 articles", () => {
      fakeArticles.slice(0, 8).forEach(({ title }) => {
        cy.contains("article", title).should("have.class", "opacity-50");
      });
    });

    it("Loads more articles", () => {
      fakeArticles.slice(10, 20).forEach(({ title }) => {
        cy.contains("article", title);
      });
    });

    it("Keeps as unread remaining loaded articles", () => {
      fakeArticles.slice(10, 20).forEach(({ title }) => {
        cy.contains("article", title).should("not.have.class", "opacity-50");
      });
    });
  });

  describe("Scrolling to the end", () => {
    beforeEach(() => {
      cy.contains("h1", fakeArticles[9].title).scrollIntoView({
        duration: 1000,
      });
      cy.contains("h1", fakeArticles[19].title).scrollIntoView({
        duration: 1000,
      });
      cy.contains("h1", fakeArticles[24].title).scrollIntoView({
        duration: 1000,
      });
    });
    it("Marks as read all articles", () => {
      fakeArticles.slice(0, 24).forEach(({ title }) => {
        cy.contains("article", title).should("have.class", "opacity-50");
      });
    });

    it("Shows 'no more articles' message", () => {
      cy.contains("span", "That's all for now.").isInViewport();
    });
  });
});
