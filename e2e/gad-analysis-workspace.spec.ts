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
    await expect(page.locator("main")).toHaveCount(1);
    await expect(
      page.getByRole("region", { name: /mesa de análise da prestação de contas/i }),
    ).toBeVisible();
    await expect(
      workspace.getByRole("heading", {
        level: 1,
        name: /mesa de análise da prestação de contas/i,
      }),
    ).toBeVisible();

    await workspace.getByLabel("Unidade escolar", { exact: true }).fill("E.M. Teste de Fiscalização");
    await workspace.getByLabel("CNPJ do CEC/UEx", { exact: true }).fill("11.222.333/0001-81");
    await workspace.getByLabel("Exercício", { exact: true }).fill("2026");
    await workspace.getByLabel("Programa / ação", { exact: true }).fill("PDDE Básico");
    await workspace.getByLabel("NUP do processo no SEI!RIO", { exact: true }).fill("000704.000123/2026-45");
    await workspace.getByLabel("Responsável pela análise", { exact: true }).fill("Servidor Teste");

    await expect(
      workspace.getByRole("heading", { level: 2, name: /continuar a conferência documental/i }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Item 1: Conforme" }).click();

    await expect(workspace.getByTestId("analysis-metric-reviewed")).toContainText("1/16");
    await expect(workspace.getByTestId("analysis-metric-pending")).toContainText("0");

    await workspace.getByLabel("Título do apontamento").fill("Pesquisa de preços incompleta");
    await workspace.getByLabel("Vincular ao item da matriz").selectOption("2");
    await workspace.getByLabel("Gravidade").selectOption("critical");
    await workspace
      .getByLabel("Descrição")
      .fill("Cotação sem identificação suficiente do fornecedor para conferência.");
    await workspace.getByRole("button", { name: /registrar apontamento/i }).click();

    await expect(workspace.getByTestId("analysis-metric-reviewed")).toContainText("2/16");
    await expect(workspace.getByTestId("analysis-metric-pending")).toContainText("1");
    await expect(workspace.getByTestId("analysis-metric-findings")).toContainText("1");
    await expect(workspace.getByTestId("analysis-metric-critical")).toContainText("1");
    await expect(
      workspace.getByRole("heading", {
        level: 2,
        name: /tratar apontamento crítico antes de avançar/i,
      }),
    ).toBeVisible();

    const finding = workspace.getByTestId("analysis-finding").first();
    await expect(finding).toContainText("Pesquisa de preços incompleta");
    await expect(finding).toContainText("2. Consolidação de Pesquisas de Preços");

    const downloadPromise = page.waitForEvent("download");
    await workspace.getByRole("button", { name: /baixar minuta de diligência/i }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe(
      "PDDE_MINUTA_DILIGENCIA_2026_E_M_TESTE_DE_FISCALIZACAO.txt",
    );

    await finding.getByRole("button", { name: "Resolvido", exact: true }).click();
    await expect(workspace.getByTestId("analysis-metric-findings")).toContainText("0");
    await expect(workspace.getByTestId("analysis-metric-critical")).toContainText("0");
    await expect(
      workspace.getByRole("heading", {
        level: 2,
        name: /continuar a conferência documental/i,
      }),
    ).toBeVisible();
    await expect(
      workspace.getByRole("button", { name: /baixar minuta de diligência/i }),
    ).toBeDisabled();

    await page.reload();

    await expect(page.getByTestId("gad-analysis-workspace")).toBeVisible();
    await expect(workspace.getByLabel("Unidade escolar", { exact: true })).toHaveValue("E.M. Teste de Fiscalização");
    await expect(workspace.getByLabel("Programa / ação", { exact: true })).toHaveValue("PDDE Básico");
    await expect(workspace.getByLabel("NUP do processo no SEI!RIO", { exact: true })).toHaveValue(
      "000704.000123/2026-45",
    );
    await expect(page.getByTestId("analysis-metric-reviewed")).toContainText("2/16");
    await expect(page.getByTestId("analysis-metric-pending")).toContainText("1");

    await page.getByRole("button", { name: "Limpar dados desta análise" }).click();
    await expect(workspace.getByLabel("Unidade escolar", { exact: true })).toHaveValue("");
    await expect(workspace.getByLabel("NUP do processo no SEI!RIO", { exact: true })).toHaveValue("");
    await expect(page.getByTestId("analysis-metric-reviewed")).toContainText("0/16");

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
