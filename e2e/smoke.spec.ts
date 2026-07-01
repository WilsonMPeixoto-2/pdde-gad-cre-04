import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block" });

const collectConsoleIssues = (page: import("@playwright/test").Page) => {
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

const collectPageErrors = (page: import("@playwright/test").Page) => {
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

const searchAndOpen = async (
  page: import("@playwright/test").Page,
  query: string,
  optionName: RegExp,
) => {
  await page.getByRole("button", { name: /abrir busca global/i }).click();
  const searchInput = page.getByPlaceholder("Buscar seções, documentos, procedimentos...");
  await expect(searchInput).toBeVisible();
  await searchInput.fill(query);
  await page.getByRole("option", { name: optionName }).click();
};

test.describe("Fluxo desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("restaura a seção compartilhada a partir da URL", async ({ page }) => {
    const consoleIssues = collectConsoleIssues(page);
    const pageErrors = collectPageErrors(page);

    await page.goto("/?secao=secao-4");
    await expect(page.locator("h2").filter({ hasText: /autenticação de documentos/i }).first()).toBeVisible();
    await expect(page.locator("main").getByText(/procedimento para autenticar documentos externos/i)).toBeVisible();
    await page.waitForTimeout(1800);
    await expect(page).toHaveURL(/[?&]secao=secao-4$/i);
    await expect(page.getByText(/^build [a-f0-9]{12} · (produção|preview|desenvolvimento)$/i)).toBeVisible();
    expect(pageErrors).toEqual([]);
    expect(consoleIssues).toEqual([]);
  });

  test("carrega sem regressões visíveis e mantém o guia instrucional como foco principal", async ({ page }) => {
    const consoleIssues = collectConsoleIssues(page);
    const pageErrors = collectPageErrors(page);

    await page.goto("/");
    await page.waitForTimeout(300);
    expect(pageErrors).toEqual([]);
    expect(consoleIssues).toEqual([]);

    await expect(page.getByRole("heading", { level: 1, name: /prestação de contas/i })).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 2, name: /prezados\(as\) diretores\(as\)/i })).toBeVisible();
    await expect(page.getByText(/a rotina de uma gestão escolar é intensa/i)).toBeVisible();
    await expect(page.getByText(/assinam esta apresentação/i)).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: /calculadora de prazos operacionais/i })).toBeVisible();
    await expect(page.getByText(/planeje as etapas do processo com base na data de crédito da verba/i)).toBeVisible();
    await expect(page.getByRole("list", { name: /recursos centrais do guia/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /ler guia completo/i })).toHaveCount(0);
    await expect(page.getByText(/painel do processo/i)).toHaveCount(0);
    await expect(page.getByText(/resumo compartilhável/i)).toHaveCount(0);

    await expect(page.locator(".hero-tech-board")).toHaveCount(0);

    const searchButton = page.getByRole("button", { name: /abrir busca global/i });
    await expect(searchButton).toBeVisible();
    await page.waitForTimeout(300);
    await searchButton.click();
    const searchInput = page.getByPlaceholder("Buscar seções, documentos, procedimentos...");
    await expect(searchInput).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(searchInput).toBeHidden();

    await expect(page.getByRole("button", { name: /compartilhar via qr code/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /ativar texto maior/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /ativar movimento reduzido/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /visualização automática/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /modo diretor\(a\) \/ escola/i })).toHaveCount(0);

    await searchAndOpen(page, "checklist", /checklist de documentos/i);
    await expect(page.getByRole("heading", { name: /checklist mínimo/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: /consulta rápida para não montar os autos com fragilidade documental/i })).toBeVisible();
    await expect(page.getByText(/roteiro de instrução para as próximas etapas deste guia/i)).toHaveCount(0);

    await page.getByRole("button", { name: /ir para seção 6:/i }).click();
    await expect(page.locator("h2").filter({ hasText: /despacho e finalização/i }).first()).toBeVisible();

    await page.getByRole("button", { name: /ir para seção 8: referências normativas/i }).click();
    await expect(page.getByRole("heading", { level: 2, name: /fontes oficiais prioritárias para consulta rápida/i })).toBeVisible();
    await expect(page.getByText(/central operacional/i)).toHaveCount(0);

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

  test("preserva navegação, responsividade e acesso ao conteúdo principal no mobile", async ({ page }) => {
    test.setTimeout(45000);
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
    await expect(page.getByRole("heading", { level: 2, name: /prezados\(as\) diretores\(as\)/i })).toBeVisible();

    await searchAndOpen(page, "checklist", /checklist de documentos/i);
    await expect(page.getByRole("heading", { name: /checklist mínimo/i })).toBeVisible();
    await page.waitForTimeout(1800);
    await expect(page).toHaveURL(/[?&]secao=secao-2$/i);

    await page.getByRole("button", { name: /mais ações/i }).click();
    await expect(page.getByRole("menuitem", { name: /modo escuro/i })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /imprimir \/ salvar em pdf/i })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /ativar texto maior/i })).toHaveCount(0);
    await expect(page.getByRole("menuitem", { name: /ativar movimento reduzido/i })).toHaveCount(0);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("menuitem", { name: /modo escuro/i })).toHaveCount(0);

    await page.getByRole("button", { name: /abrir menu de navegação/i }).first().click();
    await page.getByRole("button", { name: /ir para seção 8: referências normativas/i }).click();
    await expect(page.getByRole("heading", { level: 2, name: /fontes oficiais prioritárias para consulta rápida/i })).toBeVisible();

    await page.goto("/?secao=secao-4");
    await expect(page.locator("h2").filter({ hasText: /autenticação de documentos/i }).first()).toBeVisible();
    await page.waitForTimeout(1800);
    await expect(page).toHaveURL(/[?&]secao=secao-4$/i);

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
        hasProcessPanel:
          document.body.textContent?.includes("Painel do processo") ?? false,
        hasSharePack:
          document.body.textContent?.includes("Resumo compartilhável") ?? false,
      };
    });

    expect(diagnostics.hasOverflow).toBe(false);
    expect(diagnostics.heroTechDisplay).toBe("missing");
    expect(diagnostics.focusableInIllustrations).toBe(0);
    expect(diagnostics.hasProcessPanel).toBe(false);
    expect(diagnostics.hasSharePack).toBe(false);
    await expect(page.getByRole("button", { name: /abrir modo guiado da prestação de contas/i })).toHaveCount(0);
    expect(pageErrors).toEqual([]);
    expect(consoleIssues).toEqual([]);
  });
});
