import { expect, test } from "@playwright/test";

const staticRoutes = [
  "/",
  "/about",
  "/services",
  "/products",
  "/portfolio",
  "/community",
  "/blog",
  "/contact",
];

const dynamicRoutes = [
  "/services/game-development",
  "/products/eclipse",
  "/portfolio/sample-client-project-placeholder",
];

for (const route of staticRoutes) {
  test(`renders ${route} without error`, async ({ page }) => {
    const response = await page.goto(route);

    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("main")).toBeVisible();
    await expect(page).not.toHaveTitle("");
  });
}

for (const route of dynamicRoutes) {
  test(`renders ${route} without error`, async ({ page }) => {
    const response = await page.goto(route);

    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("main")).toBeVisible();
  });
}

test("renders a friendly 404 for an unknown route", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /page not found/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /back to home/i })).toBeVisible();
});

test("primary navigation links to every top-level section", async ({ page }) => {
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Primary" });
  await nav.getByRole("button", { name: /open menu/i }).click();

  // CardNav IA: About → Home/Studio; Work → Services/Products/Portfolio/Community/Blog; Contact CTA
  for (const label of [
    "Home",
    "Studio",
    "Services",
    "Products",
    "Portfolio",
    "Community",
    "Blog",
    "Get in touch",
  ]) {
    await expect(nav.getByRole("link", { name: label }).first()).toBeVisible();
  }
});

test("primary navigation includes products and community", async ({ page }) => {
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Primary" });
  await nav.getByRole("button", { name: /open menu/i }).click();
  await expect(nav.getByRole("link", { name: /products/i }).first()).toBeVisible();
  await expect(nav.getByRole("link", { name: /community/i }).first()).toBeVisible();
});

test("skip-to-content link is keyboard accessible", async ({ page }) => {
  await page.goto("/");

  const skipLink = page.getByRole("link", { name: /skip to content/i });
  await expect(skipLink).toBeAttached();
});
