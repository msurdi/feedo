import { chunk } from "lodash-es";
import { expect, test } from "./helpers.js";

test.describe("Articles", () => {
  let mockArticles;

  test.beforeEach(async ({ page, articles }) => {
    mockArticles = articles;
    await page.goto("/");
  });

  test.describe("Initial reading page", () => {
    test("Lists only first 10 articles", async ({ page }) => {
      await Promise.all(
        mockArticles
          .slice(0, 1)
          .map(({ title }) =>
            expect(page.locator(`h1:has-text("${title}")`)).toHaveCount(1)
          )
      );
    });
  });

  test.describe("Scrolling down to 5th article", async () => {
    test.beforeEach(async ({ scrollToArticle }) => {
      await scrollToArticle(mockArticles[4]);
    });

    test("Marks as read previous 4 articles", async ({ page }) => {
      for (const article of mockArticles.slice(0, 4)) {
        await expect(
          page.locator(`article:has-text("${article.title}")`)
        ).toHaveClass(/opacity-50/);
      }
    });

    test("Keeps as unread remaining loaded articles", async ({ page }) => {
      for (const article of mockArticles.slice(4, 10)) {
        await expect(
          page.locator(`article:has-text("${article.title}")`)
        ).not.toHaveClass(/opacity-50/);
      }
    });
  });

  test.describe("Scrolling down to 10th article", () => {
    test.beforeEach(async ({ page, scrollToArticle }) => {
      await scrollToArticle(mockArticles[9]);
      await page.waitForTimeout(1000);
    });

    test("Marks as read previous 9 articles", async ({ page }) => {
      for (const article of mockArticles.slice(0, 8)) {
        await expect(
          page.locator(`article:has-text("${article.title}")`)
        ).toHaveClass(/opacity-50/);
      }
    });

    test("Loads more articles", async ({ page }) => {
      for (const article of mockArticles.slice(10, 20)) {
        await expect(
          page.locator(`article:has-text("${article.title}")`)
        ).toHaveCount(1);
      }
    });

    test("Keeps as unread remaining loaded articles", async ({ page }) => {
      for (const article of mockArticles.slice(10, 20)) {
        await expect(
          page.locator(`article:has-text("${article.title}")`)
        ).not.toHaveClass(/opacity-50/);
      }
    });
  });

  test.describe("Scrolling to the end", () => {
    test.beforeEach(async ({ page, scrollToArticle }) => {
      for (const articlesChunk of chunk(mockArticles, 2)) {
        const targetArticle = articlesChunk.slice(-1)[0];
        await expect(
          page.locator(`h1:has-text("${targetArticle.title}")`)
        ).toHaveCount(1);
        await scrollToArticle(targetArticle);
        // FIXME: Go slow to avoid overwheelming the database with request
        await page.waitForTimeout(500);
      }

      const doneText = await page.waitForSelector(
        `span:has-text("That's all for now.")`
      );
      await doneText.evaluate((e) =>
        e.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        })
      );
      await page.waitForTimeout(500);
    });

    test("Marks as read all articles", async ({ page }) => {
      for (const article of mockArticles) {
        await expect(
          page.locator(`article:has-text("${article.title}")`)
        ).toHaveClass(/opacity-50/);
      }
    });

    test.describe("Reloading the page", () => {
      test.beforeEach(async ({ page }) => {
        await page.reload();
      });

      test("Shows 'no more articles' message when reloading", async ({
        page,
      }) => {
        await expect(
          page.locator(`span:has-text("That's all for now.")`)
        ).toHaveCount(1);
      });

      test("Shows no articles", async ({ page }) => {
        for (const article of mockArticles) {
          await expect(
            page.locator(`h1:has-text("${article.title}")`)
          ).toHaveCount(0);
        }
      });
    });
  });
});
