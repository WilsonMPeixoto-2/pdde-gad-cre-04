import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

test.describe("Sistema visual institucional", () => {
  test("mantém a capa sem efeitos promocionais concorrentes", async ({ page }) => {
    await page.goto("/");

    const hero = page.locator("#hero-cover");
    await expect(
      hero.getByRole("heading", { level: 1, name: /prestação de contas do pdde no sei!rio/i }),
    ).toBeVisible();
    await expect(hero.locator(".bg-clip-text")).toHaveCount(0);
    await expect(hero.locator(".animate-pulse")).toHaveCount(0);
    await expect(hero.getByRole("button", { name: /iniciar guia/i })).toHaveCount(0);
    await expect(hero.locator(".cover-intro-v5__orientation")).toBeVisible();
  });

  test("mantém cabeçalho e sumário sem pulsação, rotação ou brilho promocional", async ({ page }) => {
    await page.goto("/");

    const header = page.locator("header.no-print").first();
    const sidebar = page.getByRole("navigation", { name: /menu principal de navegação/i });

    await expect(header).toBeVisible();
    await expect(sidebar).toBeVisible();
    await expect(header.locator(".animate-pulse, .btn-premium")).toHaveCount(0);
    await expect(sidebar.locator(".animate-pulse, .btn-premium")).toHaveCount(0);
    await expect(header.getByRole("button", { name: /abrir busca global/i })).toBeVisible();
  });

  test("usa divisores editoriais claros e ícones padronizados", async ({ page }) => {
    await page.goto("/");
    const divider = page.locator(".section-divider-print").first();

    await expect(divider).toBeVisible();
    await expect(divider.locator(".icon-tile")).toHaveCount(1);
    await expect(divider.locator("svg.animate-pulse")).toHaveCount(0);
    await expect(divider.getByRole("button", { name: /copiar link da seção/i })).toBeVisible();
  });

  test("preserva seis cartões funcionais no mapa das etapas", async ({ page }) => {
    await page.goto("/?secao=mapa-jornada");

    const journey = page.locator(".journey-list");
    await expect(journey).toBeVisible();
    await expect(journey.getByRole("listitem")).toHaveCount(6);
    await expect(journey.locator(".journey-card__toggle")).toHaveCount(6);
    await expect(journey.locator(".step-diamond")).toHaveCount(0);
  });

  test("propaga o padrão das etapas 3 e 4 para os módulos operacionais", async ({ page }) => {
    await page.goto("/?secao=secao-2");

    const sectionTwo = page.locator("#secao-2");
    await expect(sectionTwo).toBeVisible();
    await expect(
      sectionTwo.getByRole("heading", { name: /compreenda, organize e só então confira a instrução/i }),
    ).toBeVisible();

    expect(await sectionTwo.locator(".section-card").count()).toBeGreaterThanOrEqual(4);
    await expect(sectionTwo.locator(".rounded-3xl")).toHaveCount(0);
    await expect(sectionTwo.locator('[class*="bg-linear-to-r"]')).toHaveCount(0);

    const templates = sectionTwo.locator(".smart-templates");
    await expect(templates).toBeVisible();
    await expect(templates.locator(".rounded-3xl")).toHaveCount(0);

    const ruleCard = sectionTwo.getByText("Critério aplicável", { exact: true }).first();
    await expect(ruleCard).toBeVisible();

    const ruleCardFontSize = await ruleCard.evaluate((element) =>
      Number.parseFloat(window.getComputedStyle(element).fontSize),
    );
    expect(ruleCardFontSize).toBeGreaterThanOrEqual(12);
  });

});
