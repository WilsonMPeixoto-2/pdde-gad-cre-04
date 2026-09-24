import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

test.describe("Arquitetura integrada do guia", () => {
  test("apresenta o mapa global antes das etapas operacionais", async ({ page }) => {
    await page.goto("/");

    const positions = await page.evaluate(() => {
      const journey = document.getElementById("mapa-jornada");
      const sectionOne = document.getElementById("secao-1");
      if (!journey || !sectionOne) return null;

      return {
        journeyTop: journey.getBoundingClientRect().top + window.scrollY,
        sectionOneTop: sectionOne.getBoundingClientRect().top + window.scrollY,
      };
    });

    expect(positions).not.toBeNull();
    expect(positions?.journeyTop).toBeLessThan(positions?.sectionOneTop ?? 0);
  });

  test("explica os documentos antes das regras e do checklist", async ({ page }) => {
    await page.goto("/?secao=secao-2");

    await expect(page.getByRole("heading", { name: /o que cada grupo documental demonstra/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /regras que alteram a forma de preparar os documentos/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /checklist mínimo/i })).toBeVisible();

    const order = await page.evaluate(() => {
      const documents = document.getElementById("instruction-documents-title");
      const rules = document.getElementById("instruction-rules-title");
      const checklist = document.getElementById("instruction-checklist-transition");
      const tools = document.getElementById("support-tools-title");
      if (!documents || !rules || !checklist || !tools) return null;

      const top = (element: HTMLElement) => element.getBoundingClientRect().top + window.scrollY;
      return {
        documents: top(documents),
        rules: top(rules),
        checklist: top(checklist),
        tools: top(tools),
      };
    });

    expect(order).not.toBeNull();
    expect(order?.documents).toBeLessThan(order?.rules ?? 0);
    expect(order?.rules).toBeLessThan(order?.checklist ?? 0);
    expect(order?.checklist).toBeLessThan(order?.tools ?? 0);
  });

  test("mantém o anexo como referência e não repete a lista documental", async ({ page }) => {
    await page.goto("/?secao=anexo");

    const annex = page.locator("#anexo");
    await expect(annex.getByRole("heading", { level: 2, name: /fontes oficiais e aplicabilidade/i })).toBeVisible();
    await expect(annex.getByRole("heading", { name: /fontes federais prioritárias/i })).toBeVisible();
    await expect(annex.getByRole("heading", { name: /fontes municipais e guias do sei!rio/i })).toBeVisible();
    await expect(annex.getByText(/bloco a — base documental federal da uex/i)).toHaveCount(0);
    await expect(annex.getByText(/bloco b — instrução local/i)).toHaveCount(0);
  });

  test("mantém saldos e demonstrativos fora da etapa de assinatura", async ({ page }) => {
    await page.goto("/?secao=secao-5");

    const signatureSection = page.locator("#secao-5");
    await expect(signatureSection.getByRole("heading", { name: /função do bloco de assinatura/i })).toBeVisible();
    await expect(signatureSection.getByRole("heading", { name: /conferência final antes da remessa/i })).toBeVisible();
    await expect(signatureSection.getByText(/saldos e movimentações/i)).toHaveCount(0);
    await expect(signatureSection.getByText(/saldo total inicial/i)).toHaveCount(0);
  });

  test("organiza a etapa 2 em quatro blocos navegáveis e endereçáveis", async ({ page }) => {
    await page.goto("/?secao=secao-2");

    const sectionTwo = page.locator("#secao-2");
    const sectionNav = sectionTwo.getByRole("navigation", { name: /quatro blocos para orientar a leitura/i });

    await expect(sectionTwo.getByText("2.1", { exact: true }).first()).toBeVisible();
    await expect(sectionTwo.getByText("2.2", { exact: true }).first()).toBeVisible();
    await expect(sectionTwo.getByText("2.3", { exact: true }).first()).toBeVisible();
    await expect(sectionTwo.getByText("2.4", { exact: true }).first()).toBeVisible();

    const shortcuts = sectionNav.getByRole("button");
    await expect(shortcuts).toHaveCount(4);

    await shortcuts.nth(0).click();
    await expect(page.locator("#documentos-instrucao")).toBeInViewport();

    await page.goto("/?secao=documentos-instrucao");
    await expect(page.getByRole("heading", { name: /o que cada grupo documental demonstra/i })).toBeVisible();
    await expect(page).toHaveURL(/[?&]secao=documentos-instrucao$/i);
  });


  test("oferece acesso rápido sem interromper a apresentação institucional", async ({ page }) => {
    await page.goto("/");

    const quickAccess = page.getByRole("navigation", { name: /acesso rápido/i });
    await expect(quickAccess).toBeVisible();
    await expect(quickAccess.getByRole("button")).toHaveCount(4);

    await quickAccess.getByRole("button", { name: /abrir checklist/i }).click();
    await expect(page.getByRole("heading", { name: /checklist mínimo/i })).toBeVisible();
    await expect(page.locator("#checklist-documentos")).toBeInViewport();
  });

  test("distingue sequência recomendada de acesso ao conteúdo no mapa", async ({ page }) => {
    await page.goto("/?secao=mapa-jornada");

    const journey = page.locator(".journey-list");
    await expect(journey).toBeVisible();
    await expect(journey.getByText("Etapa posterior no fluxo", { exact: true }).first()).toBeVisible();
    await expect(journey.getByText("Aguardando etapa anterior", { exact: true })).toHaveCount(0);
    await expect(journey.getByRole("button", { name: /ir para a etapa/i })).toHaveCount(6);
  });

});
