import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

test.describe("Sistema visual editorial contemporâneo", () => {
  test("apresenta capa editorial integrada, sem ação redundante ou sobreposição", async ({ page }) => {
    await page.goto("/");

    const hero = page.locator('[data-editorial-hero="true"]');
    await expect(hero).toBeVisible();
    await expect(hero.getByRole("heading", { level: 1, name: /prestação de contas pdde no sei!rio/i })).toBeVisible();
    await expect(hero.locator('[data-editorial-media="hero"] img')).toBeVisible();
    await expect(hero.locator(".editorial-hero__summary .editorial-hero__stat")).toHaveCount(4);
    await expect(hero.getByRole("button", { name: /iniciar guia/i })).toHaveCount(0);
    await expect(hero.locator(".bg-clip-text, .animate-pulse")).toHaveCount(0);
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
    await expect(sidebar.locator('[data-sidebar-group="process"]')).toBeVisible();
    await expect(sidebar.locator('[data-sidebar-group="support"]')).toBeVisible();
  });

  test("usa mapas informacionais nas aberturas e leads internos hierarquizados", async ({ page }) => {
    await page.goto("/");

    const chapters = page.locator("[data-editorial-chapter]");
    await expect(chapters).toHaveCount(7);

    const divider = chapters.first();
    await expect(divider).toBeVisible();
    await expect(divider.locator(".editorial-map")).toBeVisible();
    await expect(divider.locator(".editorial-map__step")).toHaveCount(3);
    await expect(divider.locator('[data-editorial-media="chapter"] img')).toHaveCount(0);
    await expect(divider.getByRole("button", { name: /copiar link da seção/i })).toBeVisible();

    await page.goto("/?secao=secao-2");
    const lead = page.locator(".editorial-section-lead").first();
    await expect(lead).toBeVisible();
    await expect(lead.locator(".editorial-section-lead__index")).toContainText("02");
  });

  test("aplica componentes semânticos distintos à instrução documental e normativa", async ({ page }) => {
    await page.goto("/?secao=secao-2");

    await expect(page.locator(".document-function-card")).toHaveCount(4);
    await expect(page.locator(".editorial-rule-group")).toHaveCount(3);
    await expect(page.locator(".legal-rule-card").first()).toBeVisible();
    await expect(page.locator(".legal-rule-card__panel--correct").first()).toBeVisible();
    await expect(page.locator(".legal-rule-card__evidence").first()).toBeVisible();
    await expect(page.locator(".editorial-checkpoint")).toBeVisible();
    await expect(page.locator(".editorial-next-step")).toBeVisible();
  });

  test("preserva seis losangos alinhados no mapa das etapas", async ({ page }) => {
    await page.goto("/?secao=mapa-jornada");

    const overview = page.locator(".journey-overview");
    await expect(overview).toBeVisible();
    await expect(overview.locator(".journey-overview__item")).toHaveCount(6);
    await expect(overview.locator(".step-diamond")).toHaveCount(6);
    await expect(page.locator(".journey-card")).toHaveCount(6);
  });

  test("não cria rolagem horizontal no layout editorial mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/?secao=secao-2");

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );

    expect(hasHorizontalOverflow).toBe(false);
    await expect(page.locator('[data-editorial-hero="true"]')).toBeVisible();
  });
});
