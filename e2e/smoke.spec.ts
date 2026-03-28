import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block" });

const collectConsoleIssues = (page: Parameters<typeof test.beforeEach>[0]["page"]) => {
  const issues: string[] = [];

  page.on("console", (message) => {
    if (message.text().includes("Service Worker registration blocked by Playwright")) {
      return;
    }

    if (message.type() === "error" || message.type() === "warning") {
      issues.push(`[${message.type()}] ${message.text()}`);
    }
  });

  return issues;
};

const collectPageErrors = (page: Parameters<typeof test.beforeEach>[0]["page"]) => {
  const issues: string[] = [];

  page.on("pageerror", (error) => {
    issues.push(error.stack || error.message);
  });

  return issues;
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
});

test.describe("Fluxo desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("carrega sem regressões visíveis e mantém os atalhos principais funcionando", async ({ page }) => {
    const consoleIssues = collectConsoleIssues(page);
    const pageErrors = collectPageErrors(page);

    await page.goto("/");
    await page.waitForTimeout(300);
    expect(pageErrors).toEqual([]);
    expect(consoleIssues).toEqual([]);

    await expect(page.getByRole("heading", { level: 1, name: /prestação de contas/i })).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);

    const searchButton = page.getByRole("button", { name: /abrir busca global/i });
    await expect(searchButton).toBeVisible();
    await page.waitForTimeout(300);
    await searchButton.click();
    const searchInput = page.getByPlaceholder("Buscar seções, documentos, procedimentos...");
    await expect(searchInput).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(searchInput).toBeHidden();

    await page.locator("#hub-acoes-rapidas").scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { level: 2, name: /o que fazer agora/i })).toBeVisible();
    await page.getByRole("button", { name: /Retomar trabalho/i }).click();
    await expect(page.locator("#central-operacional-pdde")).toBeInViewport();
    await expect(page.getByRole("button", { name: /Exportar progresso/i })).toBeVisible();

    await page.locator("#hub-acoes-rapidas").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Padrão de nomes/i }).click();
    await expect(page.locator("#kit-nomenclatura-pdde")).toBeInViewport();
    await expect(page.getByRole("heading", { level: 2, name: /kit de nomes/i })).toBeVisible();

    await page.locator("#hub-acoes-rapidas").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Resumo da conferência/i }).click();
    await expect(page.locator("#resumo-compartilhavel-pdde")).toBeInViewport();
    await expect(page.getByRole("heading", { level: 2, name: /gere um handoff claro/i })).toBeVisible();

    await page.locator("#hub-acoes-rapidas").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Notas do caso/i }).click();
    await expect(page.locator("#notas-operacionais-pdde")).toBeInViewport();
    await expect(page.getByRole("heading", { level: 2, name: /notas, diligências e contexto/i })).toBeVisible();

    await page.getByRole("button", { name: /Checklist mínimo/i }).click();
    await expect(page.locator("#checklist-documentos")).toBeInViewport();

    const hasOverflow = await page.evaluate(() => {
      const allowance = 1;
      return (
        document.documentElement.scrollWidth > window.innerWidth + allowance ||
        document.body.scrollWidth > window.innerWidth + allowance
      );
    });

    expect(hasOverflow).toBe(false);
    expect(pageErrors).toEqual([]);
    expect(consoleIssues).toEqual([]);
  });
});

test.describe("Fluxo mobile", () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test("preserva navegação, responsividade e mockups inertes no mobile", async ({ page }) => {
    const consoleIssues = collectConsoleIssues(page);
    const pageErrors = collectPageErrors(page);

    await page.goto("/");
    await page.waitForTimeout(300);
    expect(pageErrors).toEqual([]);
    expect(consoleIssues).toEqual([]);

    const menuButton = page.getByRole("button", { name: /abrir menu de navegação/i }).first();
    await expect(menuButton).toBeVisible();
    await page.waitForTimeout(400);

    await menuButton.click();
    await expect(page.getByRole("button", { name: /fechar menu de navegação/i })).toBeVisible();
    await page.getByRole("button", { name: /fechar menu de navegação/i }).click();
    await expect(page.getByRole("button", { name: /fechar menu de navegação/i })).toBeHidden();

    await page.locator("#hub-acoes-rapidas").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Retomar trabalho/i }).click();
    await expect(page.locator("#central-operacional-pdde")).toBeInViewport();
    await page.locator("#hub-acoes-rapidas").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Padrão de nomes/i }).click();
    await expect(page.locator("#kit-nomenclatura-pdde")).toBeInViewport();
    await page.locator("#hub-acoes-rapidas").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Resumo da conferência/i }).click();
    await expect(page.locator("#resumo-compartilhavel-pdde")).toBeInViewport();
    await page.locator("#hub-acoes-rapidas").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Notas do caso/i }).click();
    await expect(page.locator("#notas-operacionais-pdde")).toBeInViewport();
    await page.getByRole("button", { name: /Modelos e exemplos/i }).click();
    await expect(page.locator("#modelos-documentos")).toBeInViewport();

    const diagnostics = await page.evaluate(() => {
      const allowance = 1;
      const heroTechBoard = document.querySelector<HTMLElement>(".hero-tech-board");
      const focusableInIllustrations = document.querySelectorAll(
        '[role="img"] button, [role="img"] a, [role="img"] input, [role="img"] select, [role="img"] textarea, [role="img"] [tabindex]:not([tabindex="-1"])',
      ).length;

      return {
        hasOverflow:
          document.documentElement.scrollWidth > window.innerWidth + allowance ||
          document.body.scrollWidth > window.innerWidth + allowance,
        heroTechDisplay: heroTechBoard ? window.getComputedStyle(heroTechBoard).display : "missing",
        focusableInIllustrations,
      };
    });

    expect(diagnostics.hasOverflow).toBe(false);
    expect(diagnostics.heroTechDisplay).toBe("none");
    expect(diagnostics.focusableInIllustrations).toBe(0);
    expect(pageErrors).toEqual([]);
    expect(consoleIssues).toEqual([]);
  });
});
