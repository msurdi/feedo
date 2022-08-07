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
    test("Marks as read all articles", async ({
      page,
      scrollToArticle,
      scrollToEndOfViewport,
    }) => {
      for (const [article, position] of mockArticles.map(
        (mockArticle, index) => [mockArticle, index]
      )) {
        // Ensure the current article we're scrolling to exists
        await expect(
          page.locator(`h1:has-text("${article.title}")`)
        ).toHaveCount(1);

        // Scroll to the current article
        await scrollToArticle(article);

        // If there is a previous article, ensure it's marked as read
        if (position > 0) {
          await expect(
            page.locator(
              `article:has-text("${mockArticles[position - 1].title}")`
            )
          ).toHaveClass(/opacity-50/);
        }
      }

      // Scroll to the end of the viewport
      await scrollToEndOfViewport();

      // Ensure the last article is marked as read too
      await expect(
        page.locator(`article:has-text("${mockArticles.at(-1).title}")`)
      ).toHaveClass(/opacity-50/);

      // Reload the page
      await page.reload();

      // Ensure read articles are not shown anymore
      for (const article of mockArticles) {
        await expect(
          page.locator(`h1:has-text("${article.title}")`)
        ).toHaveCount(0);
      }
    });
  });
});
