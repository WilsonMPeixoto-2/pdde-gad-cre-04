import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
});

test.describe("Mesa de Análise GAD", () => {
  test("mantém o guia como padrão e ativa uma experiência própria para a GAD", async ({ page }) => {
    await page.goto("/");

    const modeGroup = page.getByRole("group", { name: /modo de uso/i });
    await expect(modeGroup).toBeVisible();
    await expect(modeGroup.getByRole("button", { name: "Unidade", exact: true })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.getByRole("heading", { name: /mesa de análise da prestação de contas/i })).toHaveCount(0);

    await modeGroup.getByRole("button", { name: /análise gad/i }).click();

    await expect(page.getByRole("heading", { name: /mesa de análise da prestação de contas/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /guia operacional e fontes para apoiar a análise/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: /prestação de contas/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /abrir modo guiado da prestação de contas/i })).toHaveCount(0);
    await expect(modeGroup.getByRole("button", { name: /análise gad/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  test("registra o caso, classifica a conferência e cria apontamento rastreável", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("group", { name: /modo de uso/i }).getByRole("button", { name: /análise gad/i }).click();

    const workbench = page.locator("#gad-analysis-workbench");
    await expect(workbench).toBeVisible();

    await workbench.getByLabel("Unidade escolar").fill("E.M. Teste de Produto");
    await workbench.getByLabel("CNPJ do CEC/UEx").fill("11222333000181");
    await workbench.getByLabel("Exercício").fill("2026");
    await workbench.getByLabel("Programa / ação").fill("PDDE Básico");
    await workbench.getByLabel("NUP do processo").fill("000704.000123/2026-45");
    await workbench.getByLabel("Responsável pela análise").fill("Servidor de Teste");

    const priceReview = workbench.locator("#gad-review-document-2");
    await priceReview.getByLabel(/resultado da conferência de consolidação de pesquisas de preços/i).selectOption("issue");
    await priceReview.getByLabel(/nota da análise/i).fill("Cotação sem identificação suficiente do fornecedor.");

    await expect(workbench.getByRole("button", { name: /filtrar análise por pendências/i })).toContainText("1");
    await workbench.getByRole("button", { name: /filtrar análise por pendências/i }).click();
    await expect(workbench.locator("[data-review-status='issue']")).toHaveCount(1);
    await expect(workbench.locator("[data-review-status='not-reviewed']")).toHaveCount(0);

    await priceReview.getByRole("button", { name: /registrar apontamento/i }).click();
    await expect(workbench.getByRole("heading", { name: /registrar apontamento/i })).toBeVisible();
    await expect(workbench.getByLabel("Título")).toHaveValue(/apontamento/i);
    await expect(workbench.getByLabel("Descrição")).toHaveValue(/cotação sem identificação/i);

    await workbench.getByRole("button", { name: "Registrar apontamento", exact: true }).click();

    await expect(workbench.getByText("1 em aberto", { exact: true })).toBeVisible();
    await expect(workbench.getByText(/ajuste necessário/i).first()).toBeVisible();
    await expect(workbench.getByText(/vinculado a: consolidação de pesquisas de preços/i)).toBeVisible();

    await workbench.getByRole("button", { name: /marcar resolvido/i }).click();
    await expect(workbench.getByText("0 em aberto", { exact: true })).toBeVisible();
    await expect(workbench.getByText("Resolvido", { exact: true })).toBeVisible();
  });

  test("preserva o caso no navegador e permite exportar o resumo", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("group", { name: /modo de uso/i }).getByRole("button", { name: /análise gad/i }).click();

    const workbench = page.locator("#gad-analysis-workbench");
    await workbench.getByLabel("Unidade escolar").fill("E.M. Persistência");
    await workbench.getByLabel("Exercício").fill("2026");

    const firstReview = workbench.locator("#gad-review-document-1");
    await firstReview.getByLabel(/resultado da conferência/i).selectOption("conform");

    const downloadPromise = page.waitForEvent("download");
    await workbench.getByRole("button", { name: /exportar resumo/i }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/^PDDE_ANALISE_GAD_2026_EM_PERSISTENCIA\.txt$/);

    await page.reload();

    await expect(page.getByRole("heading", { name: /mesa de análise da prestação de contas/i })).toBeVisible();
    await expect(page.locator("#gad-analysis-workbench").getByLabel("Unidade escolar")).toHaveValue("E.M. Persistência");
    await expect(page.locator("#gad-review-document-1").getByLabel(/resultado da conferência/i)).toHaveValue("conform");
  });

  test("permite alternar para análise GAD no menu mobile sem overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: /mais ações/i }).click();
    await page.getByRole("menuitem", { name: /modo análise gad/i }).click();

    await expect(page.getByRole("heading", { name: /mesa de análise da prestação de contas/i })).toBeVisible();

    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasOverflow).toBe(false);
  });
});
