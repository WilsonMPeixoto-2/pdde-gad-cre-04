import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

test.use({ serviceWorkers: "block" });

const expectNoCriticalOrSeriousA11yViolations = async (page: Page, includeSelector?: string) => {
  let builder = new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]);

  if (includeSelector) {
    builder = builder.include(includeSelector);
  }

  const results = await builder.analyze();

  const blockingViolations = results.violations.filter((violation) =>
    violation.impact === "critical" || violation.impact === "serious"
  );

  expect(blockingViolations).toEqual([]);
};

test.describe("Acessibilidade automatizada", () => {
  test("não apresenta violações críticas ou sérias nas áreas principais", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: /prestação de contas/i })).toBeVisible();
    await expectNoCriticalOrSeriousA11yViolations(page);

    await page.goto("/?secao=checklist-documentos");
    await expect(page.getByRole("heading", { name: /checklist mínimo/i })).toBeVisible();
    await expectNoCriticalOrSeriousA11yViolations(page);

    await page.goto("/?secao=regras-operacionais");
    await expect(page.getByText(/Pesquisa e consolidação de preços/i)).toBeVisible();
    await expectNoCriticalOrSeriousA11yViolations(page);

    await page.goto("/?secao=anexo");
    await expect(page.getByRole("heading", { name: /base normativa organizada/i })).toBeVisible();
    await expectNoCriticalOrSeriousA11yViolations(page);
  });

  test("cobre busca, menu mobile e modo escuro", async ({ page }) => {
    await page.goto("/");

    const searchButton = page.getByRole("button", { name: /abrir busca global/i }).first();
    await expect(searchButton).toBeVisible();
    await searchButton.click();
    await expect(page.getByPlaceholder("Buscar seções, documentos, procedimentos...")).toBeVisible();
    await expectNoCriticalOrSeriousA11yViolations(page, "[role='dialog']");
    await page.keyboard.press("Escape");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: /abrir menu de navegação/i }).first().click();
    await expect(page.getByRole("button", { name: /fechar menu de navegação/i })).toBeVisible();
    await expectNoCriticalOrSeriousA11yViolations(page);
    await page.getByRole("button", { name: /fechar menu de navegação/i }).click();

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.getByRole("button", { name: /alternar para modo escuro/i }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expectNoCriticalOrSeriousA11yViolations(page);
  });
});
