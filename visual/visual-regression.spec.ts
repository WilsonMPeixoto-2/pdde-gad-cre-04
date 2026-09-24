import { expect, test, type Page } from "@playwright/test";

const stabilizePage = async (page: Page) => {
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }

      button[title="Voltar ao topo"],
      button[title="Abrir modo guiado"],
      [data-sonner-toaster] {
        display: none !important;
      }
    `,
  });

  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  await page.waitForTimeout(120);
};

const openTarget = async (page: Page, target: string, heading: RegExp) => {
  await page.goto(`/?secao=${target}`);
  await expect(page.getByRole("heading", { name: heading }).first()).toBeVisible({
    timeout: 15_000,
  });
  await stabilizePage(page);
};

test.describe("Regressão visual institucional", () => {
  test("capa desktop 1440", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: /prestação de contas do pdde/i })).toBeVisible();
    await stabilizePage(page);

    await expect(page.locator("#hero-cover")).toHaveScreenshot("cover-desktop-1440.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.003,
    });
  });

  test("capa mobile 390", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: /prestação de contas do pdde/i })).toBeVisible();
    await stabilizePage(page);

    await expect(page.locator("#hero-cover")).toHaveScreenshot("cover-mobile-390.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.004,
    });
  });

  test("etapa 2 desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await openTarget(page, "secao-2", /compreenda, organize e só então confira a instrução/i);

    const section = page.locator("#secao-2");
    await section.scrollIntoViewIfNeeded();
    await stabilizePage(page);

    await expect(page).toHaveScreenshot("section-2-desktop-1440.png", {
      animations: "disabled",
      fullPage: false,
      maxDiffPixelRatio: 0.004,
    });
  });

  test("etapa 3 desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await openTarget(page, "secao-3", /inclua cada documento com classificação e identificação adequadas/i);

    await page.locator("#secao-3").scrollIntoViewIfNeeded();
    await stabilizePage(page);

    await expect(page).toHaveScreenshot("section-3-desktop-1440.png", {
      animations: "disabled",
      fullPage: false,
      maxDiffPixelRatio: 0.004,
    });
  });

  test("etapa 3 dark desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await openTarget(page, "secao-3", /inclua cada documento com classificação e identificação adequadas/i);
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.locator("#secao-3").scrollIntoViewIfNeeded();
    await stabilizePage(page);

    await expect(page).toHaveScreenshot("section-3-dark-desktop-1440.png", {
      animations: "disabled",
      fullPage: false,
      maxDiffPixelRatio: 0.004,
    });
  });

  test("etapa 4 mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openTarget(page, "secao-4", /autentique somente os documentos que vieram do papel/i);

    await page.locator("#secao-4").scrollIntoViewIfNeeded();
    await stabilizePage(page);

    await expect(page).toHaveScreenshot("section-4-mobile-390.png", {
      animations: "disabled",
      fullPage: false,
      maxDiffPixelRatio: 0.005,
    });
  });

  test("fontes e aplicabilidade mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openTarget(page, "anexo", /fontes oficiais e aplicabilidade/i);

    const table = page.locator(".table-responsive-cards");
    await table.scrollIntoViewIfNeeded();
    await stabilizePage(page);

    await expect(page).toHaveScreenshot("sources-mobile-390.png", {
      animations: "disabled",
      fullPage: false,
      maxDiffPixelRatio: 0.005,
    });
  });
});
