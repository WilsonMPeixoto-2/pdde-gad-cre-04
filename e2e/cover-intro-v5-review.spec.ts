import { expect, test, type Page } from "@playwright/test";

const waitForCover = async (page: Page) => {
  await page.goto("/");
  await page.locator('[data-cover-intro-version="5"]').waitFor({ state: "visible" });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForTimeout(800);
};

test.describe("homologação visual temporária da capa e introdução v5", () => {
  test("captura desktop 4K em 16:9", async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 2160 });
    await waitForCover(page);

    const cover = page.locator(".cover-intro-v5__cover");
    await expect(cover).toBeVisible();
    await page.screenshot({
      path: test.info().outputPath("cover-desktop-4k-16x9.png"),
      fullPage: false,
    });
    await page.locator(".cover-intro-v5").screenshot({
      path: test.info().outputPath("cover-introduction-desktop-full.png"),
    });
    await page.locator(".cover-intro-v5__scope-stack").screenshot({
      path: test.info().outputPath("scope-journey-desktop-full.png"),
    });
  });

  test("captura mobile de alta densidade", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await waitForCover(page);

    await page.screenshot({
      path: test.info().outputPath("cover-mobile-390x844-3x.png"),
      fullPage: false,
    });
    await page.locator(".cover-intro-v5").screenshot({
      path: test.info().outputPath("cover-introduction-mobile-full-3x.png"),
    });
    await page.locator(".cover-intro-v5__scope-stack").screenshot({
      path: test.info().outputPath("scope-journey-mobile-full-3x.png"),
    });

    await context.close();
  });
});
