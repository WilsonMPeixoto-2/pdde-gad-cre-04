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
        hasAnexo: document.body.innerText.includes("Fontes oficiais e aplicabilidade"),
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

test("preserva a capa editorial e evita rasterização integral do PDF", async ({ page }) => {
  await page.addInitScript(() => {
    window.print = () => undefined;
  });

  await page.goto("/");
  await page.getByRole("button", { name: /imprimir ou salvar em pdf/i }).click();
  await page.waitForFunction(() =>
    Array.from(document.querySelectorAll<HTMLElement>("[data-guide-section-slot]"))
      .every((element) => element.dataset.guideSectionStatus === "ready"),
  );
  await page.evaluate(async () => {
    await document.fonts.ready;
    document.documentElement.classList.add("print-prepared");
  });
  await page.emulateMedia({ media: "print" });

  const printContract = await page.evaluate(() => {
    const cover = document.querySelector<HTMLElement>("#hero-cover.cover-intro-v5__cover");
    const feature = document.querySelector<HTMLElement>(
      "#hero-cover.cover-intro-v5__cover > .cover-intro-v5__feature",
    );

    return {
      bodyWatermarkDisplay: getComputedStyle(document.body, "::after").display,
      coverBackgroundImage: cover ? getComputedStyle(cover).backgroundImage : "missing",
      featureDisplay: feature ? getComputedStyle(feature).display : "missing",
      title: document.querySelector(".cover-intro-v5__title")?.textContent,
    };
  });

  expect(printContract.bodyWatermarkDisplay).toBe("none");
  expect(printContract.coverBackgroundImage).toBe("none");
  expect(printContract.featureDisplay).toBe("grid");
  expect(printContract.title).toContain("Prestação de");

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  expect(pdf.byteLength).toBeGreaterThan(500_000);
  expect(pdf.byteLength).toBeLessThan(10_000_000);
});
