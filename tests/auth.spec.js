import { expect, test } from "@playwright/test";

test.describe("Authentication", () => {
  test("should log in with correct username and password", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).toContainText("Feedo");
  });

  test("should not log in without credentials", async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: "",
        password: "",
      },
    });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("body")).toContainText("Auth required");
  });

  test("should not log in with wrong credentials", async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: "wronguser",
        password: "wrongpassword",
      },
    });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("body")).toContainText("Auth required");
  });
});
