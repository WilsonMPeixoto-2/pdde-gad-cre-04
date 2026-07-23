import { expect, test, type TestInfo } from "@playwright/test";

test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

const attachScreenshot = async (testInfo: TestInfo, name: string, body: Buffer) => {
  await testInfo.attach(name, { body, contentType: "image/png" });
};

test.describe("Capturas de revisão editorial", () => {
  test("desktop: capa e abertura da etapa 2", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    await expect(page.locator('[data-editorial-hero="true"]')).toBeVisible();

    await attachScreenshot(
      testInfo,
      "01-capa-desktop",
      await page.screenshot({ animations: "disabled" }),
    );

    await page.goto("/?secao=secao-2");
    const chapter = page.locator('[data-editorial-chapter="secao-2"]');
    await expect(chapter).toBeVisible();
    await attachScreenshot(
      testInfo,
      "02-capitulo-2-desktop",
      await chapter.screenshot({ animations: "disabled" }),
    );

    const lead = page.locator("#secao-2 .editorial-section-lead").first();
    await expect(lead).toBeVisible();
    await attachScreenshot(
      testInfo,
      "03-lead-etapa-2-desktop",
      await lead.screenshot({ animations: "disabled" }),
    );
  });

  test("mobile: capa e sumário", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.locator('[data-editorial-hero="true"]')).toBeVisible();

    await attachScreenshot(
      testInfo,
      "04-capa-mobile",
      await page.screenshot({ animations: "disabled" }),
    );

    await page.getByRole("button", { name: /abrir menu de navegação/i }).click();
    const sidebar = page.getByRole("navigation", { name: /menu principal de navegação/i });
    await expect(sidebar).toBeVisible();
    await attachScreenshot(
      testInfo,
      "05-sumario-mobile",
      await page.screenshot({ animations: "disabled" }),
    );
  });

  test("modo escuro e impressão: etapa 2", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/?secao=secao-2");
    await page.getByRole("button", { name: /alternar para modo escuro/i }).click();

    const chapter = page.locator('[data-editorial-chapter="secao-2"]');
    await expect(chapter).toBeVisible();
    await attachScreenshot(
      testInfo,
      "06-capitulo-2-escuro",
      await chapter.screenshot({ animations: "disabled" }),
    );

    await page.emulateMedia({ media: "print" });
    await attachScreenshot(
      testInfo,
      "07-capitulo-2-impressao",
      await chapter.screenshot({ animations: "disabled" }),
    );

    const pdf = await page.pdf({ format: "A4", printBackground: true });
    await testInfo.attach("08-guia-impressao", { body: pdf, contentType: "application/pdf" });
  });
});
