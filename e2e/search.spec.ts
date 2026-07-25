import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block" });

test.describe("Busca global", () => {
  test("localiza regras estruturadas e preserva a ressalva de validação local", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog");
    const input = dialog.getByPlaceholder("Buscar seções, documentos, procedimentos...");
    await expect(input).toBeVisible();

    await input.fill("pessoa física");
    await expect(dialog.getByText("Contratação de pessoa física — consulta prévia obrigatória", { exact: true }).first()).toBeVisible();
    await expect(dialog.getByText(/Este guia não define, isoladamente, o documento fiscal/i).first()).toBeVisible();

    await input.fill("tipo de processo");
    await expect(dialog.getByText("Tipo de processo no SEI!RIO", { exact: true }).first()).toBeVisible();
    await expect(dialog.getByText(/Confirme a denominação no sistema e na orientação local vigente/i).first()).toBeVisible();
  });
});
