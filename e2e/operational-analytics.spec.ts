import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

test.describe("Camada analítica operacional", () => {
  test("resume a Etapa 2 com indicadores navegáveis derivados do conteúdo", async ({ page }) => {
    await page.goto("/?secao=secao-2");

    const section = page.locator("#secao-2");
    const dashboard = section.getByRole("navigation", { name: /quatro blocos para orientar a leitura/i });

    await expect(dashboard).toBeVisible();
    await expect(dashboard.getByRole("button")).toHaveCount(4);
    await expect(dashboard.getByText("4 grupos", { exact: true })).toBeVisible();
    await expect(dashboard.getByText("11 critérios", { exact: true })).toBeVisible();
    await expect(dashboard.getByText("16 itens", { exact: true })).toBeVisible();
    await expect(dashboard.getByText("8 PDFs", { exact: true })).toBeVisible();

    await dashboard.getByRole("button", { name: /ir para 2.3: conferir a documentação/i }).click();
    await expect(page.locator("#checklist-documentos")).toBeInViewport();
  });

  test("usa KPIs do checklist como filtros clicáveis", async ({ page }) => {
    await page.goto("/?secao=checklist-documentos");

    const checklist = page.locator("#checklist-documentos");
    await expect(checklist.getByRole("heading", { name: /checklist mínimo/i })).toBeVisible();

    const kpis = checklist.getByTestId("checklist-kpis");
    await expect(kpis.getByRole("button")).toHaveCount(4);
    await expect(kpis.getByRole("button", { name: /filtrar checklist por pendentes/i })).toContainText("16");
    await expect(kpis.getByRole("button", { name: /filtrar checklist por concluídos/i })).toContainText("0");
    await expect(kpis.getByRole("button", { name: /filtrar checklist por essenciais/i })).toContainText("0/10");
    await expect(kpis.getByRole("button", { name: /filtrar checklist por complementares/i })).toContainText("0/6");

    await checklist.getByRole("button", { name: /marcar item 1:/i }).click();
    await kpis.getByRole("button", { name: /filtrar checklist por concluídos/i }).click();

    await expect(kpis.getByRole("button", { name: /filtrar checklist por concluídos/i })).toContainText("1");
    await expect(checklist.getByText("Concluídos", { exact: true }).last()).toBeVisible();
    await expect(checklist.getByRole("button", { name: /desmarcar item 1:/i })).toBeVisible();
    await expect(checklist.getByRole("button", { name: /marcar item 2:/i })).toHaveCount(0);

    await checklist.getByRole("button", { name: /limpar filtro/i }).click();
    await expect(checklist.getByRole("button", { name: /marcar item 2:/i })).toBeVisible();
  });

  test("combina filtros de área e tipo na biblioteca de modelos", async ({ page }) => {
    await page.goto("/?secao=modelos-documentos");

    const models = page.locator("#modelos-documentos");
    await expect(models.getByText(/de 8 documentos exibidos/i)).toBeVisible();

    await models.getByRole("button", { name: "Documentos Financeiros", exact: true }).click();
    await models.getByRole("button", { name: "Referência visual", exact: true }).click();

    await expect(models.getByText("3", { exact: true }).first()).toBeVisible();
    await expect(models.getByRole("button", { name: /abrir visíveis (3)/i })).toBeVisible();
    await expect(models.getByText(/documentos financeiros · referência visual/i)).toBeVisible();
    await expect(models.getByRole("heading", { name: "Nota Fiscal Eletrônica — DANFE", exact: true })).toBeVisible();
    await expect(models.getByRole("heading", { name: "Planejamento com Ata", exact: true })).toHaveCount(0);

    await models.getByRole("button", { name: /limpar filtros/i }).click();
    await expect(models.getByRole("button", { name: /abrir visíveis (8)/i })).toBeVisible();
  });

  test("mostra etapa atual e atualiza a visão da jornada após conclusão", async ({ page }) => {
    await page.goto("/?secao=mapa-jornada");

    const dashboard = page.getByTestId("journey-dashboard");
    await expect(dashboard).toBeVisible();
    await expect(dashboard.getByText("Etapa 1", { exact: true })).toBeVisible();
    await expect(
      dashboard.getByRole("button", { name: /consultar etapa 1: abertura e identificação do processo/i }),
    ).toHaveAttribute("aria-current", "step");

    await page.getByRole("button", { name: /marcar etapa 1: abertura e identificação do processo/i }).click();

    await expect(dashboard.getByText("Etapa 2", { exact: true })).toBeVisible();
    await expect(
      dashboard.getByRole("button", { name: /consultar etapa 2: preparação e instrução dos autos/i }),
    ).toHaveAttribute("aria-current", "step");
    await expect(dashboard.getByText("1/6", { exact: true })).toBeVisible();
  });

  test("mantém os painéis analíticos sem overflow em 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const target of ["mapa-jornada", "checklist-documentos", "modelos-documentos"]) {
      await page.goto(`/?secao=${target}`);
      await page.waitForTimeout(150);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(overflow).toBe(false);
    }
  });
});
