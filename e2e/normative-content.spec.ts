import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block" });

const pageText = async (page: import("@playwright/test").Page) =>
  page.locator("body").innerText();

test.describe("Hotfix normativo v2.5.1", () => {
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
  });

  test("remove orientações normativas de maior risco nas regras e no anexo", async ({ page }) => {
    await page.goto("/?secao=regras-operacionais");

    await expect(page.getByText(/Resolução CD\/FNDE nº 15\/2021, arts\. 23 e 27/i)).toBeVisible();
    await expect(page.getByText(/Gastos com pessoal e contratação de serviços não são conceitos equivalentes/i)).toBeVisible();
    await expect(page.getByText(/fornecedor ou prestador privado é admitida/i)).toBeVisible();

    let body = await pageText(page);
    expect(body).not.toContain("Resolução CD/FNDE nº 15/2021 (Art. 17)");
    expect(body).not.toContain("prestadores e gratificações");

    await page.goto("/?secao=anexo");

    await expect(page.getByText(/Contratação de pessoa física — consulta prévia obrigatória/i)).toBeVisible();
    await expect(page.getByText(/Este guia não define, isoladamente, o documento fiscal/i)).toBeVisible();

    body = await pageText(page);
    expect(body).not.toContain("Recibo comum com CPF do prestador");
    expect(body).not.toContain("Recibo de Pagamento de Autônomo (RPA)");
  });
});
