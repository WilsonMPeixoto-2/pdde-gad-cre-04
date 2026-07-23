import { expect, test, type TestInfo } from "@playwright/test";

test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

const attachScreenshot = async (
  testInfo: TestInfo,
  name: string,
  body: Buffer,
) => testInfo.attach(name, { body, contentType: "image/png" });

test.describe("Homologação visual do sistema editorial de referência", () => {
  test("captura capa, mapas e componentes editoriais no desktop", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    const hero = page.locator('[data-editorial-hero="true"]');
    await expect(hero).toBeVisible();
    await attachScreenshot(testInfo, "01-capa-desktop", await hero.screenshot({ animations: "disabled" }));

    await page.goto("/?secao=secao-2");
    const chapterTwo = page.locator('[data-editorial-chapter="secao-2"]');
    await expect(chapterTwo).toBeVisible();
    await attachScreenshot(testInfo, "02-mapa-etapa-2", await chapterTwo.screenshot({ animations: "disabled" }));

    const documentGuide = page.locator("#secao-2 .document-function-grid").first();
    await expect(documentGuide).toBeVisible();
    await attachScreenshot(testInfo, "03-funcoes-documentais", await documentGuide.screenshot({ animations: "disabled" }));

    const firstRuleGroup = page.locator("#secao-2 .editorial-rule-group").first();
    await expect(firstRuleGroup).toBeVisible();
    await attachScreenshot(testInfo, "04-regras-semânticas", await firstRuleGroup.screenshot({ animations: "disabled" }));

    await page.goto("/?secao=secao-3");
    const comparison = page.locator("#secao-3 [data-editorial-role='comparison']");
    await expect(comparison).toBeVisible();
    await attachScreenshot(testInfo, "05-comparacao-documental", await comparison.screenshot({ animations: "disabled" }));

    await page.goto("/?secao=secao-5");
    const decision = page.locator("#secao-5 [data-editorial-role='decision']");
    await expect(decision).toBeVisible();
    await attachScreenshot(testInfo, "06-decisao-assinatura", await decision.screenshot({ animations: "disabled" }));

    const control = page.locator("#secao-5 [data-editorial-role='control']");
    await expect(control).toBeVisible();
    await attachScreenshot(testInfo, "07-controle-remessa", await control.screenshot({ animations: "disabled" }));
  });

  test("captura capa e etapa no mobile", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const hero = page.locator('[data-editorial-hero="true"]');
    await expect(hero).toBeVisible();
    await attachScreenshot(testInfo, "08-capa-mobile", await hero.screenshot({ animations: "disabled" }));

    await page.goto("/?secao=secao-2");
    const chapterTwo = page.locator('[data-editorial-chapter="secao-2"]');
    await expect(chapterTwo).toBeVisible();
    await attachScreenshot(testInfo, "09-mapa-etapa-2-mobile", await chapterTwo.screenshot({ animations: "disabled" }));

    const firstDocumentCard = page.locator("#secao-2 .document-function-card").first();
    await expect(firstDocumentCard).toBeVisible();
    await attachScreenshot(testInfo, "10-funcao-documental-mobile", await firstDocumentCard.screenshot({ animations: "disabled" }));
  });

  test("captura modo escuro e gera PDF nativo", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/?secao=secao-2");
    await page.getByRole("button", { name: /alternar para modo escuro/i }).click();

    const chapterTwo = page.locator('[data-editorial-chapter="secao-2"]');
    await expect(chapterTwo).toBeVisible();
    await attachScreenshot(testInfo, "11-mapa-etapa-2-escuro", await chapterTwo.screenshot({ animations: "disabled" }));

    const ruleCard = page.locator("#secao-2 .legal-rule-card").first();
    await expect(ruleCard).toBeVisible();
    await attachScreenshot(testInfo, "12-regra-escuro", await ruleCard.screenshot({ animations: "disabled" }));

    await page.addInitScript(() => {
      window.print = () => undefined;
    });
    await page.goto("/");
    await page.getByRole("button", { name: /imprimir ou salvar em pdf/i }).click();
    await page.waitForFunction(() => document.documentElement.classList.contains("print-prepared"));
    await page.emulateMedia({ media: "print" });
    const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true });
    await testInfo.attach("13-guia-editorial.pdf", { body: pdf, contentType: "application/pdf" });
  });
});
