import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

test.describe("Sistema visual institucional", () => {
  test("mantém a capa sem efeitos promocionais concorrentes", async ({ page }) => {
    await page.goto("/");

    const hero = page.locator("#hero-cover");
    await expect(hero.getByRole("heading", { level: 1, name: /prestação de contas pdde no sei!rio/i })).toBeVisible();
    await expect(hero.locator(".bg-clip-text")).toHaveCount(0);
    await expect(hero.locator(".animate-pulse")).toHaveCount(0);
    await expect(hero.getByRole("button", { name: /iniciar guia/i })).toBeVisible();
  });

  test("usa divisores editoriais claros e ícones padronizados", async ({ page }) => {
    await page.goto("/");
    const divider = page.locator(".section-divider-print").first();

    await expect(divider).toBeVisible();
    await expect(divider.locator(".icon-tile")).toHaveCount(1);
    await expect(divider.locator("svg.animate-pulse")).toHaveCount(0);
    await expect(divider.getByRole("button", { name: /copiar link da seção/i })).toBeVisible();
  });

  test("preserva seis losangos alinhados no mapa das etapas", async ({ page }) => {
    await page.goto("/?secao=mapa-jornada");

    const overview = page.locator(".journey-overview");
    await expect(overview).toBeVisible();
    await expect(overview.locator(".journey-overview__item")).toHaveCount(6);
    await expect(overview.locator(".step-diamond")).toHaveCount(6);
    await expect(page.locator(".journey-card")).toHaveCount(6);
  });
});
