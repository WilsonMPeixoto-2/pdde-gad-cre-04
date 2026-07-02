import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block" });

declare global {
  interface Window {
    __printCalls?: number;
    __printSnapshot?: {
      hasAnexo: boolean;
      hasPrintButtonHideRule: boolean;
      isPrintPrepared: boolean;
      sectionStatuses: string[];
      skeletonCount: number;
    };
  }
}

test("prepara todas as seções diferidas antes de imprimir", async ({ page }) => {
  await page.addInitScript(() => {
    window.__printCalls = 0;
    window.print = () => {
      window.__printCalls = (window.__printCalls ?? 0) + 1;
      window.__printSnapshot = {
        hasAnexo: document.body.innerText.includes("SEI!RIO, BB Gestão Ágil e SiGPC cumprem funções distintas"),
        hasPrintButtonHideRule: Array.from(document.styleSheets).some((sheet) => {
          try {
            return Array.from(sheet.cssRules).some((rule) =>
              rule.cssText.includes("@media print") &&
              rule.cssText.includes(".no-print") &&
              rule.cssText.includes("button")
            );
          } catch {
            return false;
          }
        }),
        isPrintPrepared: document.documentElement.classList.contains("print-prepared"),
        sectionStatuses: Array.from(document.querySelectorAll<HTMLElement>("[data-guide-section-slot]")).map(
          (element) => element.dataset.guideSectionStatus ?? "missing",
        ),
        skeletonCount: document.querySelectorAll(".skeleton-shimmer").length,
      };
    };
  });

  await page.goto("/");
  await page.getByRole("button", { name: /imprimir ou salvar em pdf/i }).click();
  await page.waitForFunction(() => window.__printCalls === 1);

  const snapshot = await page.evaluate(() => window.__printSnapshot);
  expect(snapshot).toEqual(
    expect.objectContaining({
      hasAnexo: true,
      hasPrintButtonHideRule: true,
      isPrintPrepared: true,
      skeletonCount: 0,
    }),
  );
  expect(snapshot?.sectionStatuses).toEqual(["ready", "ready", "ready", "ready", "ready", "ready", "ready"]);
});
