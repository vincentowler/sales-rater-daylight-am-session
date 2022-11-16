import { test, expect } from "@playwright/test";

test("should display city and state when a valid Origin zip is entered", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
  await page.getByLabel("Origin Zone").fill("10001");
  await page.getByLabel("Origin Zone").evaluate((e) => e.blur());
  await expect(page.getByText("New York, NY")).toBeVisible();
});
