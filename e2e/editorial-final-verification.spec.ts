import { expect, test, type TestInfo } from "@playwright/test";

const attachScreenshot = async (
  testInfo: TestInfo,
  name: string,
  body: Buffer,
) => testInfo.attach(name, { body, contentType: "image/png" });

test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

test.describe("Verificação visual final do sistema editorial", () => {
  test("valida mapa escuro e leads sem numeração", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });

    await page.goto("/?secao=secao-2");
    await page.getByRole("button", { name: /alternar para modo escuro/i }).click();
    const darkChapter = page.locator('[data-editorial-chapter="secao-2"]');
    await expect(darkChapter).toBeVisible();
    await expect(darkChapter.locator(".editorial-map__step strong").first()).toHaveCSS("color", "rgb(242, 247, 250)");
    await attachScreenshot(testInfo, "01-mapa-escuro-final", await darkChapter.screenshot({ animations: "disabled" }));

    await page.goto("/?secao=contatos");
    const contactsLead = page.locator("#contatos .editorial-section-lead");
    await expect(contactsLead).toBeVisible();
    const contactsBox = await contactsLead.boundingBox();
    expect(contactsBox?.width ?? 0).toBeGreaterThan(700);
    await attachScreenshot(testInfo, "02-atendimento-lead-final", await contactsLead.screenshot({ animations: "disabled" }));

    await page.goto("/?secao=anexo");
    const sourcesLead = page.locator("#anexo .editorial-section-lead");
    await expect(sourcesLead).toBeVisible();
    const sourcesBox = await sourcesLead.boundingBox();
    expect(sourcesBox?.width ?? 0).toBeGreaterThan(700);
    await attachScreenshot(testInfo, "03-fontes-lead-final", await sourcesLead.screenshot({ animations: "disabled" }));
  });

  test("gera PDF final com todas as seções prontas", async ({ page }, testInfo) => {
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
    expect(pdf.byteLength).toBeGreaterThan(100_000);
    await testInfo.attach("04-guia-editorial-final.pdf", { body: pdf, contentType: "application/pdf" });
  });
});
