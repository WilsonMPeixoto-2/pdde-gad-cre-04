import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block" });

test.describe("Busca global", () => {
  test("localiza regras estruturadas e preserva a ressalva de validação local", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Control+k");
    const input = page.getByPlaceholder("Buscar seções, documentos, procedimentos...");
    await expect(input).toBeVisible();

    await input.fill("pessoa física");
    const personRule = page
      .getByRole("option")
      .filter({ hasText: "Contratação de pessoa física — consulta prévia obrigatória" })
      .first();
    await expect(personRule).toBeVisible();
    await expect(personRule).toContainText(/Este guia não define, isoladamente, o documento fiscal/i);

    await input.fill("tipo de processo");
    const processTypeRule = page
      .getByRole("option")
      .filter({ hasText: "Tipo de processo no SEI!RIO" })
      .first();
    await expect(processTypeRule).toBeVisible();
    await expect(processTypeRule).toContainText(
      /Confirme a denominação no sistema e na orientação local vigente/i,
    );
  });
});
