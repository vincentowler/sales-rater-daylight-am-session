import { test, expect } from "@playwright/test";

test("should display a validation message onBlur of an empty field", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
  const originZone = page.getByLabel("Origin Zone");
  await originZone.focus();
  await originZone.blur(); // Check validation by blurring the empty field
  // Since we just blurred an empty field, we should see an error message
  await expect(
    page.getByText("Origin Zone must be a valid 5 digit Zip code.")
  ).toBeVisible();
});

test("should display a validation message onSubmit of an empty form", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");

  // Submit the empty form and assure validation displays
  await page.getByRole("button", { name: "Calculate" }).click();

  // Since we just blurred an empty field, we should see an error message
  await expect(
    page.getByText("Origin Zone must be a valid 5 digit Zip code.")
  ).toBeVisible();
});

test("should display city and state when a valid Origin zip is entered", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
  const originZone = page.getByLabel("Origin Zone");
  await originZone.fill("10001");
  await originZone.evaluate((e) => e.blur());
  await expect(page.getByText("New York, NY")).toBeVisible();
});
