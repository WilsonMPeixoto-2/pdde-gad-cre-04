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
});
