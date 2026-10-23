import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
});

test.describe("Mesa de Análise GAD", () => {
  test("transforma o modo GAD em uma bancada real de conferência", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    await page.getByRole("button", { name: "Usar modo Análise GAD" }).click();

    const workspace = page.getByTestId("gad-analysis-workspace");
    await expect(workspace).toBeVisible();
    await expect(
      workspace.getByRole("heading", {
        level: 1,
        name: /mesa de análise da prestação de contas/i,
      }),
    ).toBeVisible();

    await page.getByLabel("Unidade escolar").fill("E.M. Teste de Fiscalização");
    await page.getByLabel("CNPJ do CEC/UEx").fill("11.222.333/0001-81");
    await page.getByLabel("Exercício").fill("2026");
    await page.getByLabel("Programa / ação").fill("PDDE Básico");
    await page.getByLabel("NUP do processo no SEI!RIO").fill("000704.000123/2026-45");
    await page.getByLabel("Responsável pela análise").fill("Servidor Teste");

    await expect(
      workspace.getByRole("heading", { level: 2, name: /continuar a conferência documental/i }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Item 1: Pendência" }).click();

    await expect(workspace.getByTestId("analysis-metric-reviewed")).toContainText("1/16");
    await expect(workspace.getByTestId("analysis-metric-pending")).toContainText("1");

    const firstReview = workspace.getByTestId("analysis-review-item").first();
    await firstReview
      .getByPlaceholder(/descreva objetivamente a inconsistência encontrada/i)
      .fill("Ausência de identificação suficiente em uma das cotações.");

    await workspace.getByLabel("Título do apontamento").fill("Pesquisa de preços incompleta");
    await workspace.getByLabel("Vincular ao item da matriz").selectOption("1");
    await workspace.getByLabel("Gravidade").selectOption("critical");
    await workspace
      .getByLabel("Descrição")
      .fill("Cotação sem identificação suficiente do fornecedor para conferência.");
    await workspace.getByRole("button", { name: /registrar apontamento/i }).click();

    await expect(workspace.getByTestId("analysis-metric-findings")).toContainText("1");
    await expect(workspace.getByTestId("analysis-metric-critical")).toContainText("1");

    const finding = workspace.getByTestId("analysis-finding").first();
    await expect(finding).toContainText("Pesquisa de preços incompleta");
    await expect(finding).toContainText("1. Rol de Materiais, Bens e Serviços Prioritários");

    await finding.getByRole("button", { name: "Resolvido", exact: true }).click();
    await expect(workspace.getByTestId("analysis-metric-findings")).toContainText("0");
    await expect(workspace.getByTestId("analysis-metric-critical")).toContainText("0");

    await page.reload();

    await expect(page.getByTestId("gad-analysis-workspace")).toBeVisible();
    await expect(page.getByLabel("Unidade escolar")).toHaveValue("E.M. Teste de Fiscalização");
    await expect(page.getByLabel("Programa / ação")).toHaveValue("PDDE Básico");
    await expect(page.getByLabel("NUP do processo no SEI!RIO")).toHaveValue(
      "000704.000123/2026-45",
    );
    await expect(page.getByTestId("analysis-metric-reviewed")).toContainText("1/16");

    await page.getByRole("button", { name: "Usar modo Unidade Escolar" }).click();
    await expect(page.getByTestId("gad-analysis-workspace")).toHaveCount(0);
    await expect(
      page.getByRole("heading", { level: 1, name: /prestação de contas/i }),
    ).toBeVisible();
  });

  test("mantém a bancada utilizável no mobile e troca de modo pelo menu", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: /mais ações/i }).click();
    await page.getByRole("menuitem", { name: /modo análise gad/i }).click();

    const workspace = page.getByTestId("gad-analysis-workspace");
    await expect(workspace).toBeVisible();
    await expect(workspace.getByTestId("analysis-review-item").first()).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });
});
