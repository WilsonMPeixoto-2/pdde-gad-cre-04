import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

test.describe("Sistema visual institucional", () => {
  test("mantém a capa sem efeitos promocionais concorrentes", async ({ page }) => {
    await page.goto("/");

    const hero = page.locator("#hero-cover");
    await expect(
      hero.getByRole("heading", { level: 1, name: /prestação de contas do pdde no sei!rio/i }),
    ).toBeVisible();
    await expect(hero.locator(".bg-clip-text")).toHaveCount(0);
    await expect(hero.locator(".animate-pulse")).toHaveCount(0);
    await expect(hero.getByRole("button", { name: /iniciar guia/i })).toHaveCount(0);
    await expect(hero.locator(".cover-intro-v5__orientation")).toBeVisible();
  });

  test("mantém cabeçalho e sumário sem pulsação, rotação ou brilho promocional", async ({ page }) => {
    await page.goto("/");

    const header = page.locator("header.no-print").first();
    const sidebar = page.getByRole("navigation", { name: /menu principal de navegação/i });

    await expect(header).toBeVisible();
    await expect(sidebar).toBeVisible();
    await expect(header.locator(".animate-pulse, .btn-premium")).toHaveCount(0);
    await expect(sidebar.locator(".animate-pulse, .btn-premium")).toHaveCount(0);
    await expect(header.getByRole("button", { name: /abrir busca global/i })).toBeVisible();
  });

  test("usa divisores editoriais claros e ícones padronizados", async ({ page }) => {
    await page.goto("/");
    const divider = page.locator(".section-divider-print").first();

    await expect(divider).toBeVisible();
    await expect(divider.locator(".icon-tile")).toHaveCount(1);
    await expect(divider.locator("svg.animate-pulse")).toHaveCount(0);
    await expect(divider.getByRole("button", { name: /copiar link da seção/i })).toBeVisible();
  });

  test("preserva seis cartões funcionais no mapa das etapas", async ({ page }) => {
    await page.goto("/?secao=mapa-jornada");

    const journey = page.locator(".journey-list");
    await expect(journey).toBeVisible();
    await expect(journey.getByRole("listitem")).toHaveCount(6);
    await expect(journey.locator(".journey-card__toggle")).toHaveCount(6);
    await expect(journey.locator(".step-diamond")).toHaveCount(0);
  });

  test("propaga o padrão das etapas 3 e 4 para os módulos operacionais", async ({ page }) => {
    await page.goto("/?secao=secao-2");

    const sectionTwo = page.locator("#secao-2");
    await expect(sectionTwo).toBeVisible();
    await expect(
      sectionTwo.getByRole("heading", { name: /compreenda, organize e só então confira a instrução/i }),
    ).toBeVisible();

    expect(await sectionTwo.locator(".section-card").count()).toBeGreaterThanOrEqual(4);
    await expect(sectionTwo.locator(".rounded-3xl")).toHaveCount(0);
    await expect(sectionTwo.locator('[class*="bg-linear-to-r"]')).toHaveCount(0);

    const templates = sectionTwo.locator(".smart-templates");
    await expect(templates).toBeVisible();
    await expect(templates.locator(".rounded-3xl")).toHaveCount(0);

    const ruleCard = sectionTwo.getByText("Critério aplicável", { exact: true }).first();
    await expect(ruleCard).toBeVisible();

    const ruleCardFontSize = await ruleCard.evaluate((element) =>
      Number.parseFloat(window.getComputedStyle(element).fontSize),
    );
    expect(ruleCardFontSize).toBeGreaterThanOrEqual(12);
  });


  test("rotula corretamente a matriz de aplicabilidade no mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/?secao=anexo");

    await expect(
      page.getByRole("heading", { level: 2, name: /fontes oficiais e aplicabilidade/i }),
    ).toBeVisible();

    const firstRowCells = page.locator(".table-responsive-cards tbody tr").first().locator("td");
    await expect(firstRowCells).toHaveCount(6);

    const expectedLabels = [
      "Exercício",
      "Status",
      "UEx",
      "EEx/EM",
      "Orientação do site",
      "Fontes",
    ];

    for (const [index, label] of expectedLabels.entries()) {
      await expect(firstRowCells.nth(index)).toHaveAttribute("data-label", label);
    }

    const matrix = page.locator(".table-responsive-cards");
    const display = await matrix.evaluate((element) => getComputedStyle(element).display);
    expect(display).toBe("block");

    await expect(firstRowCells.nth(0)).toContainText("Até 2011");
    await expect(firstRowCells.nth(1)).toContainText("Referência histórica");
    await expect(firstRowCells.nth(2)).toContainText("Fluxo histórico por protocolo.");
    await expect(firstRowCells.nth(4)).toContainText("Tratar somente como referência histórica.");

    for (let index = 0; index < 6; index += 1) {
      await expect(firstRowCells.nth(index)).toBeVisible();
    }

    const matrixMetrics = await matrix.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      minWidth: getComputedStyle(element).minWidth,
    }));
    expect(matrixMetrics.scrollWidth).toBeLessThanOrEqual(matrixMetrics.clientWidth + 1);
    expect(matrixMetrics.minWidth).toBe("0px");
  });

  test("mede o progresso lateral pela leitura real da seção", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/?secao=secao-2");

    const sectionTwo = page.locator("#secao-2");
    await expect(
      sectionTwo.getByRole("heading", { name: /compreenda, organize e só então confira a instrução/i }),
    ).toBeVisible();

    const sidebarItem = page.locator(
      'button[aria-label^="Ir para seção 2: Preparação e Instrução dos Autos"]',
    );
    await expect(sidebarItem).toBeVisible();

    await sectionTwo.evaluate((element) => {
      const target = element.getBoundingClientRect().top + window.scrollY + element.scrollHeight;
      window.scrollTo(0, target);
    });

    await expect(sidebarItem).toHaveAttribute("data-read", "true");
    const progress = Number(await sidebarItem.getAttribute("data-reading-progress"));
    expect(progress).toBeGreaterThanOrEqual(99);
  });


  test("mantém regras resumidas na tela e completas na impressão", async ({ page }) => {
    await page.goto("/?secao=regras-operacionais");

    const rule = page
      .locator("details.legal-rule-card")
      .filter({ hasText: "Pesquisa e consolidação de preços" })
      .first();

    await expect(rule).toBeVisible();
    await expect(rule).not.toHaveAttribute("open", "");
    await expect(rule.getByText(/Considerar o valor efetivo da aquisição ou contratação/i)).toBeHidden();

    await rule.locator("summary").click();
    await expect(rule).toHaveAttribute("open", "");
    await expect(rule.getByText(/Considerar o valor efetivo da aquisição ou contratação/i)).toBeVisible();

    await rule.locator("summary").click();
    await expect(rule).not.toHaveAttribute("open", "");

    await page.emulateMedia({ media: "print" });
    const detailsDisplay = await rule.locator(".legal-rule-card__details").evaluate(
      (element) => getComputedStyle(element).display,
    );
    expect(detailsDisplay).not.toBe("none");
    await expect(rule.locator(".legal-rule-card__toggle-label")).toBeHidden();
  });


  test("aproxima divisor e conteúdo sem repetir a numeração da etapa", async ({ page }) => {
    await page.goto("/?secao=secao-3");

    const divider = page.locator(".section-divider-print").filter({ hasText: "Inclusão de Documentos Externos" }).first();
    await expect(divider).toBeVisible();

    const dividerMetrics = await divider.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        marginTop: Number.parseFloat(style.marginTop),
        marginBottom: Number.parseFloat(style.marginBottom),
        borderRadius: Number.parseFloat(style.borderRadius),
      };
    });

    expect(dividerMetrics.marginTop).toBe(0);
    expect(dividerMetrics.marginBottom).toBe(0);
    expect(dividerMetrics.borderRadius).toBeLessThanOrEqual(18);

    const operationalHeading = page.getByRole("heading", {
      name: /inclua cada documento com classificação e identificação adequadas/i,
    });
    await expect(operationalHeading).toBeVisible();

    const lead = operationalHeading.locator("xpath=ancestor::header[1]");
    const hiddenStepLabel = lead.locator(".sr-only").filter({ hasText: /Etapa 3/i });
    await expect(hiddenStepLabel).toHaveCount(1);
  });

  test("reduz metadados técnicos e gradientes residuais nos modelos", async ({ page }) => {
    await page.goto("/?secao=modelos-documentos");

    const models = page.locator("#modelos-documentos");
    await expect(models.getByRole("heading", { name: /modelos e minutas para apoiar a elaboração/i })).toBeVisible();
    await expect(models.getByText("MODELO_DE_OFICIO_PDDE.pdf", { exact: true })).toHaveCount(0);
    await expect(models.getByText(/PDF · .*página/i).first()).toBeVisible();
    await expect(models.locator('[class*="bg-linear-to-br"]')).toHaveCount(0);
  });

  test("mantém os controles flutuantes discretos e sem gradiente", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    await page.evaluate(() => window.scrollTo(0, Math.max(document.body.scrollHeight * 0.35, 1200)));

    const backToTop = page.getByRole("button", { name: /voltar ao topo da página/i });
    const guided = page.getByRole("button", { name: /abrir modo guiado da prestação de contas/i });

    await expect(backToTop).toBeVisible();
    await expect(guided).toBeVisible();

    const backgroundImage = await backToTop.evaluate((element) => getComputedStyle(element).backgroundImage);
    expect(backgroundImage).toBe("none");

    const [backBox, guidedBox] = await Promise.all([backToTop.boundingBox(), guided.boundingBox()]);
    expect(backBox).not.toBeNull();
    expect(guidedBox).not.toBeNull();
    expect(Math.abs((backBox?.x ?? 0) - (guidedBox?.x ?? 0))).toBeLessThanOrEqual(2);
    expect((guidedBox?.y ?? 0) + (guidedBox?.height ?? 0)).toBeLessThan(backBox?.y ?? Number.POSITIVE_INFINITY);
  });

});
