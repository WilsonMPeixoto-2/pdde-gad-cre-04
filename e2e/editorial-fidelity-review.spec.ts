import { expect, test, type TestInfo } from "@playwright/test";

const attach = async (testInfo: TestInfo, name: string, body: Buffer) =>
  testInfo.attach(name, { body, contentType: "image/png" });

test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

test.describe("Homologação visual da fidelidade editorial v4", () => {
  test("captura capa e etapas críticas no desktop", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });

    await page.goto("/");
    const hero = page.locator('[data-editorial-hero="true"]');
    await expect(hero).toBeVisible();
    await attach(testInfo, "01-capa-fiel-desktop", await hero.screenshot({ animations: "disabled" }));

    await page.goto("/?secao=secao-1");
    const chapterOne = page.locator('[data-editorial-chapter="secao-1"]');
    await expect(chapterOne).toBeVisible();
    await attach(testInfo, "02-etapa-1-abertura", await chapterOne.screenshot({ animations: "disabled" }));
    const firstAction = page.locator("#secao-1").first();
    await expect(firstAction).toBeVisible();
    await attach(testInfo, "03-etapa-1-conteudo", await firstAction.screenshot({ animations: "disabled" }));

    await page.goto("/?secao=secao-2");
    const chapterTwo = page.locator('[data-editorial-chapter="secao-2"]');
    await expect(chapterTwo).toBeVisible();
    await attach(testInfo, "04-etapa-2-abertura", await chapterTwo.screenshot({ animations: "disabled" }));
    const documentGrid = page.locator("#secao-2 .document-function-grid").first();
    await expect(documentGrid).toBeVisible();
    await attach(testInfo, "05-etapa-2-documentos", await documentGrid.screenshot({ animations: "disabled" }));

    await page.goto("/?secao=secao-3");
    const comparison = page.locator("#secao-3 [data-editorial-role='comparison']");
    await expect(comparison).toBeVisible();
    await attach(testInfo, "06-etapa-3-comparacao", await comparison.screenshot({ animations: "disabled" }));
    const previews = page.locator("#secao-3 [data-system-command-preview='true']");
    await expect(previews).toHaveCount(2);
    await attach(testInfo, "07-sei-vetorial-incluir", await previews.nth(0).screenshot({ animations: "disabled" }));
    await attach(testInfo, "08-sei-vetorial-externo", await previews.nth(1).screenshot({ animations: "disabled" }));
  });

  test("captura mobile e modo escuro", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await attach(
      testInfo,
      "09-capa-fiel-mobile",
      await page.locator('[data-editorial-hero="true"]').screenshot({ animations: "disabled" }),
    );

    await page.goto("/?secao=secao-2");
    await attach(
      testInfo,
      "10-etapa-2-mobile",
      await page.locator('[data-editorial-chapter="secao-2"]').screenshot({ animations: "disabled" }),
    );

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/?secao=secao-2");
    await page.getByRole("button", { name: /alternar para modo escuro/i }).click();
    await attach(
      testInfo,
      "11-etapa-2-escuro",
      await page.locator('[data-editorial-chapter="secao-2"]').screenshot({ animations: "disabled" }),
    );
    await attach(
      testInfo,
      "12-documentos-escuro",
      await page.locator("#secao-2 .document-function-grid").first().screenshot({ animations: "disabled" }),
    );
  });

  test("gera PDF final para inspeção", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.addInitScript(() => {
      window.print = () => undefined;
    });
    await page.goto("/");
    await page.getByRole("button", { name: /imprimir ou salvar em pdf/i }).click();
    await page.waitForFunction(() => {
      const slots = Array.from(document.querySelectorAll<HTMLElement>("[data-guide-section-slot]"));
      return slots.length === 7
        && slots.every((slot) => slot.dataset.guideSectionStatus === "ready")
        && document.querySelectorAll(".skeleton-shimmer").length === 0;
    });
    await page.evaluate(() => document.documentElement.classList.add("print-prepared"));
    await page.emulateMedia({ media: "print" });
    const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true });
    await testInfo.attach("13-guia-fidelidade-v4.pdf", { body: pdf, contentType: "application/pdf" });
  });
});