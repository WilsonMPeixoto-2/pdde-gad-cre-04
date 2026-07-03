import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block" });

const pageText = async (page: import("@playwright/test").Page) =>
  page.locator("body").innerText();

test.describe("Conteúdo normativo PDDE", () => {
  test("neutraliza prazos automáticos e exibe aviso permanente de escopo", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /escopo e limites deste guia/i })).toBeVisible();
    await expect(page.getByText(/não substitui os registros, as classificações, os documentos ou os procedimentos exigidos pelo FNDE/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /prazos: consulte o calendário formal do ciclo/i })).toBeVisible();
    await expect(page.getByText(/não utilize esta página para presumir um prazo interno/i)).toBeVisible();

    const body = await pageText(page);
    expect(body).not.toContain("Data limite oficial para envio dos autos eletrônicos à GAD");
    expect(body).not.toContain("prazo legal de entrega");
    expect(body).not.toContain("Até 31/12/");
    expect(body).not.toContain("Data do Crédito em Conta");
    expect(body).toContain("saldos financeiros existentes");
    expect(body).toContain("reprogramação");
  });

  test("renderiza regras de execução a partir da camada normativa estruturada", async ({ page }) => {
    await page.goto("/?secao=regras-operacionais");

    await expect(page.getByText(/Pesquisa e consolidação de preços/i)).toBeVisible();
    await expect(page.getByText(/Utilização de Ata de Registro de Preços/i)).toBeVisible();
    await expect(page.getByText(/Gastos com pessoal e contratação de serviços/i)).toBeVisible();
    await expect(page.getByText(/Admitir contratação de fornecedor ou prestador privado/i)).toBeVisible();
    await expect(page.getByText(/Contratação de pessoa física — consulta prévia obrigatória/i)).toBeVisible();
    await expect(page.getByText(/Elementos mínimos dos comprovantes/i)).toBeVisible();
    await expect(page.getByText(/Disponibilidade financeira e vinculação ao exercício/i)).toBeVisible();
    await expect(page.getByRole("link", { name: "Resolução CD/FNDE nº 15/2021 · arts. 23, 27", exact: true })).toBeVisible();

    const body = await pageText(page);
    expect(body).not.toContain("Resolução CD/FNDE nº 15/2021 (Art. 17)");
    expect(body).not.toContain("prestadores e gratificações");
    expect(body).not.toContain("internet e aluguel como vedação federal genérica");
    expect(body).not.toContain("As despesas devem possuir data igual ou posterior ao crédito dos recursos na conta bancária");
    expect(body).not.toContain("não fragmente artificialmente a despesa");
    expect(body).toContain("fornecedor ou prestador privado");
  });

  test("separa orientação documental, patrimônio e linhas de aplicabilidade pendentes", async ({ page }) => {
    await page.goto("/?secao=secao-2");

    await expect(page.getByText(/Contratação de pessoa física — consulta prévia obrigatória/i)).toBeVisible();
    await expect(page.getByText(/Este guia não define, isoladamente, o documento fiscal/i)).toBeVisible();
    await expect(page.getByText("Ata de aprovação da execução do plano de gastos", { exact: true })).toBeVisible();
    await expect(page.getByText("Documentação patrimonial cabível", { exact: true })).toBeVisible();

    await page.goto("/?secao=anexo");
    await expect(page.getByRole("heading", { level: 2, name: /fontes oficiais e aplicabilidade/i })).toBeVisible();
    await expect(page.locator('[data-applicability-status="pending-local-validation"]')).toHaveCount(2);
    await expect(page.getByText(/não constituem orientação operacional definitiva/i)).toBeVisible();

    const body = await pageText(page);
    expect(body).not.toContain("Recibo comum com CPF do prestador");
    expect(body).not.toContain("Recibo de Pagamento de Autônomo (RPA)");
    expect(body).not.toContain("Resolução CD/FNDE nº 6/2006");
    expect(body).not.toContain("conter os elements exigidos");
    expect(body).not.toContain("árvore do SE e separe");
  });

  test("padroniza NUP e classificação documental no SEI!RIO", async ({ page }) => {
    await page.goto("/");
    await page.locator("#secao-1").scrollIntoViewIfNeeded();
    await expect(page.getByText("000704.000123/2026-45")).toBeVisible();

    let body = await pageText(page);
    expect(body).toContain("000704.000123/2026-45");
    expect(body).toContain("Não utilize este campo para dados pessoais desnecessários");
    expect(body).not.toContain("SEI-000000/000000/2025");
    expect(body).not.toContain("E/4a.CRE/000000/2026");

    await page.goto("/?secao=secao-3");
    await page.locator("#secao-3").scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: /Documento externo e classificação do arquivo/i })).toBeVisible();
    body = await pageText(page);
    expect(body).toContain("Nato-digital");
    expect(body).toContain("Digitalizado nesta unidade");
    expect(body).toContain("Cópia autenticada administrativamente");
    expect(body).toContain("Cópia autenticada por cartório");
    expect(body).toContain("Cópia simples");
    expect(body).toContain("Documento original");
    expect(body).not.toContain("confere com o original");

    await page.goto("/?secao=secao-4");
    body = await pageText(page);
    expect(body).not.toContain("Esta etapa treats");
  });
});
