import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block" });

test.describe("Busca global", () => {
  test("localiza regras estruturadas e preserva a ressalva de validação local", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Control+k");
    const input = page.getByPlaceholder("Buscar seções, documentos, procedimentos...");
    await expect(input).toBeVisible();

    await input.fill("pessoa física");
    await expect(page.getByText("Contratação de pessoa física — consulta prévia obrigatória", { exact: true })).toBeVisible();
    await expect(page.getByText(/Este guia não define, isoladamente, o documento fiscal/i)).toBeVisible();

    await input.fill("tipo de processo");
    await expect(page.getByText("Tipo de processo no SEI!RIO", { exact: true })).toBeVisible();
    await expect(page.getByText(/Confirme a denominação no sistema e na orientação local vigente/i)).toBeVisible();
  });
});
